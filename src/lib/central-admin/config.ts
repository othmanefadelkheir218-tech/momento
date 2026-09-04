/**
 * Configuration for talking to the central admin (cpanel_othmane).
 *
 * Read lazily inside each Route Handler call, never at module load time —
 * a missing variable should fail the one request that needs it, not crash
 * the whole server on boot.
 */
export interface CentralAdminConfig {
  baseUrl: string;
  secret: string;
}

export function centralAdminConfig(): CentralAdminConfig {
  const baseUrl = process.env.CENTRAL_ADMIN_URL;
  const secret = process.env.MOMENTO_API_SECRET;

  if (!baseUrl) {
    throw new Error("CENTRAL_ADMIN_URL is not set. Add it to .env and restart the dev server.");
  }

  if (!secret) {
    throw new Error("MOMENTO_API_SECRET is not set. Add it to .env and restart the dev server.");
  }

  return { baseUrl: baseUrl.replace(/\/+$/, ""), secret };
}
