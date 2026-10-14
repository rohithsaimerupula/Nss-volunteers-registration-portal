import { createClient, type Client } from "@libsql/client";

const DEFAULT_TURSO_URL =
  "libsql://nss-voolunteers-registration-portal-tharunmerupula.aws-ap-south-1.turso.io";
const DEFAULT_TURSO_TOKEN =
  "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3OTE0Nzc5ODgsImlkIjoiMDFhMTFjNTktYzIwMS03NmRjLTkwZDYtYmM4ZTc5NzMwZTRhIiwia2lkIjoidTllYjVKZ1VBT0JIMmZoQW9WTk55Vmh6VzN2djhfVnVzb2RZYUxGSjF0NCIsInJpZCI6IjVmZTYyN2FkLTU2YTItNGE1YS1iYTRmLWJlYWI4ODYxMDkwMCJ9.ILMGB5bouJfrFaBad4m2cIO8Ltrqq9EmSRf0N-jB6cQVCX708IAMJsQTrgpV7lzTcBFjcUGPioZ8FhCa-w0OBA";

function sanitizeTursoUrl(raw?: string | null): string {
  if (!raw) return DEFAULT_TURSO_URL;
  let cleaned = String(raw).trim().replace(/^["']|["']$/g, "");
  if (!cleaned || cleaned === "libsql://placeholder-project.turso.io") {
    return DEFAULT_TURSO_URL;
  }
  if (!cleaned.includes("://") && !cleaned.startsWith("file:")) {
    cleaned = `libsql://${cleaned}`;
  }
  try {
    new URL(cleaned);
    return cleaned;
  } catch {
    return DEFAULT_TURSO_URL;
  }
}

const rawUrl = process.env.TURSO_DATABASE_URL || DEFAULT_TURSO_URL;
const rawToken = process.env.TURSO_AUTH_TOKEN || DEFAULT_TURSO_TOKEN;

const databaseUrl = sanitizeTursoUrl(rawUrl);
const authToken = rawToken ? String(rawToken).trim().replace(/^["']|["']$/g, "") : undefined;

export function isTursoConfigured(): boolean {
  const sanitized = sanitizeTursoUrl(rawUrl);
  return (
    Boolean(sanitized) &&
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
    console.error("Failed to initialize remote Turso client:", error);
    return createClient({
      url: DEFAULT_TURSO_URL,
      authToken: DEFAULT_TURSO_TOKEN,
    });
  }
}

export const turso: Client = initClient();
