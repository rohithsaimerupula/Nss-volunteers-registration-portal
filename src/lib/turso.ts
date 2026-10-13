import { createClient, type Client } from "@libsql/client";

function sanitizeTursoUrl(raw?: string | null): string {
  if (!raw) return "file:local.db";
  let cleaned = String(raw).trim().replace(/^["']|["']$/g, "");
  if (!cleaned || cleaned === "libsql://placeholder-project.turso.io") {
    return "file:local.db";
  }
  // Auto-prefix protocol if missing
  if (!cleaned.includes("://") && !cleaned.startsWith("file:")) {
    cleaned = `libsql://${cleaned}`;
  }
  try {
    new URL(cleaned);
    return cleaned;
  } catch {
    return "file:local.db";
  }
}

const rawUrl = process.env.TURSO_DATABASE_URL;
const rawToken = process.env.TURSO_AUTH_TOKEN;

const databaseUrl = sanitizeTursoUrl(rawUrl);
const authToken = rawToken ? String(rawToken).trim().replace(/^["']|["']$/g, "") : undefined;

export function isTursoConfigured(): boolean {
  if (!rawUrl || !rawToken) return false;
  const sanitized = sanitizeTursoUrl(rawUrl);
  return (
    sanitized !== "file:local.db" &&
    sanitized !== "libsql://placeholder-project.turso.io" &&
    Boolean(authToken)
  );
}

function initClient(): Client {
  try {
    return createClient({
      url: databaseUrl,
      authToken,
    });
  } catch (error) {
    console.warn("Failed to initialize remote Turso client, falling back to local file client:", error);
    return createClient({
      url: "file:local.db",
    });
  }
}

export const turso: Client = initClient();
