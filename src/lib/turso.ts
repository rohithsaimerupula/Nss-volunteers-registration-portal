import { createClient, type Client } from "@libsql/client";

function createSafeTursoClient(): Client {
  const envUrl = process.env.TURSO_DATABASE_URL?.trim();
  const envToken = process.env.TURSO_AUTH_TOKEN?.trim();

  // If a valid remote or file URL is provided, attempt connection
  if (
    envUrl &&
    (envUrl.startsWith("libsql://") ||
      envUrl.startsWith("https://") ||
      envUrl.startsWith("http://") ||
      envUrl.startsWith("file:"))
  ) {
    try {
      return createClient({
        url: envUrl,
        authToken: envToken || undefined,
      });
    } catch (err) {
      console.warn("Turso remote client init failed, falling back to local fallback:", err);
    }
  }

  // Safe fallback for build time and local demo environments
  // Ensures createClient never throws TypeError: Invalid URL during Next.js page collection
  try {
    return createClient({
      url: "file:local.db",
    });
  } catch {
    // Return mock client if file client is unavailable in edge environment
    return {
      execute: async () => ({ rows: [], columns: [] }),
      batch: async () => [],
      transaction: async () => ({} as any),
      close: () => {},
      sync: async () => {},
    } as unknown as Client;
  }
}

export const turso: Client = createSafeTursoClient();

export function isTursoConfigured(): boolean {
  const envUrl = process.env.TURSO_DATABASE_URL?.trim();
  const envToken = process.env.TURSO_AUTH_TOKEN?.trim();
  return Boolean(
    envUrl &&
    envToken &&
    (envUrl.startsWith("libsql://") || envUrl.startsWith("https://"))
  );
}
