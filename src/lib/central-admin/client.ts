import { centralAdminConfig } from "@/lib/central-admin/config";
import { createSignedHeaders } from "@/lib/central-admin/sign";

const PROJECT_SLUG = "momento";

export type CentralFormType = "subscriber" | "partner" | "contact";

export type CentralAdminResult =
  | { ok: true; id: string }
  | { ok: false; status: number; code: string; message: string };

/**
 * Sends one form submission to the central admin.
 *
 * Signs the request with the shared secret (see lib/central-admin/sign.ts) and
 * posts to `${CENTRAL_ADMIN_URL}/api/forms/{type}`. `data` must already match
 * the field names the central admin expects for that type — see each Route
 * Handler in app/api/central/ for the mapping from this site's own form
 * field names.
 */
export async function submitToCentralAdmin(
  type: CentralFormType,
  data: Record<string, unknown>,
): Promise<CentralAdminResult> {
  const { baseUrl, secret } = centralAdminConfig();
  const path = `/api/forms/${type}`;
  const body = JSON.stringify({ data });

  const headers = createSignedHeaders({
    projectSlug: PROJECT_SLUG,
    secret,
    method: "POST",
    path,
    body,
  });

  let response: Response;
  try {
    response = await fetch(`${baseUrl}${path}`, { method: "POST", headers, body });
  } catch (error) {
    console.error("[central-admin] network error", error);
    return { ok: false, status: 502, code: "NETWORK_ERROR", message: "Central admin unreachable." };
  }

  let payload: { ok?: boolean; data?: { id: string }; error?: { code?: string; message?: string } };
  try {
    payload = await response.json();
  } catch {
    return { ok: false, status: 502, code: "BAD_RESPONSE", message: "Central admin returned an invalid response." };
  }

  if (!response.ok || !payload.ok || !payload.data) {
    return {
      ok: false,
      status: response.status,
      code: payload.error?.code ?? "SERVER_ERROR",
      message: payload.error?.message ?? "Unknown error.",
    };
  }

  return { ok: true, id: payload.data.id };
}
