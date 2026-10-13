import { cookies } from "next/headers";
import crypto from "crypto";

const SESSION_COOKIE_NAME = "nss_admin_token";

function getExpectedToken(): string {
  const adminSecret = process.env.ADMIN_PASSWORD || "VIIT_NSS_SETU_ADMIN_2026!";
  return crypto.createHmac("sha256", "nss_setu_secret_salt").update(adminSecret).digest("hex");
}

export function generateAdminToken(): string {
  return getExpectedToken();
}

export async function verifyAdminAuth(request?: Request): Promise<boolean> {
  const expectedToken = getExpectedToken();

  // Check Bearer token in Authorization header
  if (request) {
    const authHeader = request.headers.get("authorization");
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.substring(7).trim();
      if (crypto.timingSafeEqual(Buffer.from(token), Buffer.from(expectedToken))) {
        return true;
      }
    }
  }

  // Check httpOnly cookie
  try {
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get(SESSION_COOKIE_NAME);
    if (tokenCookie && tokenCookie.value) {
      if (
        tokenCookie.value.length === expectedToken.length &&
        crypto.timingSafeEqual(
          Buffer.from(tokenCookie.value),
          Buffer.from(expectedToken)
        )
      ) {
        return true;
      }
    }
  } catch {
    // If running in a context where cookies() is unavailable
  }

  return false;
}

export { SESSION_COOKIE_NAME };
