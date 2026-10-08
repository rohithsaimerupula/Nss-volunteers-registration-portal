import { createClient } from "@libsql/client";
import fs from "fs";
import path from "path";

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url || !authToken) {
  console.error("Missing TURSO credentials in environment.");
  process.exit(1);
}

const client = createClient({ url, authToken });

async function migrate() {
  try {
    const schemaSql = fs.readFileSync(path.join(process.cwd(), "turso/schema.sql"), "utf-8");
    
    // LibSQL client can execute multiple statements in a batch
    const statements = schemaSql
      .split(";")
      .map(s => s.trim())
      .filter(s => s.length > 0);

    for (const stmt of statements) {
      console.log("Executing:", stmt.substring(0, 50) + "...");
      await client.execute(stmt);
    }
    
    console.log("Migration completed successfully!");
  } catch (err) {
    console.error("Migration failed:", err);
  }
}

migrate();
