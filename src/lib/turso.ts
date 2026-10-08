import { createClient } from "@libsql/client";

const url = process.env.TURSO_DATABASE_URL || "libsql://placeholder-project.turso.io";
const authToken = process.env.TURSO_AUTH_TOKEN || "placeholder-token";

export const turso = createClient({
  url,
  authToken,
});
