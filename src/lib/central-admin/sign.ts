import { createHash, createHmac, randomBytes } from "node:crypto";

/**
 * HMAC-SHA256 request signing for the central admin's server-to-server API.
 *
 * This must stay byte-for-byte identical to the verifier on the central admin
 * side (cpanel_othmane's `lib/security/signature.ts`) — see
 * cpanel_othmane/docs/INTEGRATION.md for the full specification.
 */
const SIGNATURE_VERSION = "v1";

export type SignedHeaders = {
  "content-type": string;
  "x-project": string;
  "x-timestamp": string;
  "x-nonce": string;
  "x-signature": string;
};

export function createSignedHeaders(options: {
  projectSlug: string;
  secret: string;
  method: string;
  path: string;
  body: string;
}): SignedHeaders {
  const { projectSlug, secret, method, path, body } = options;

  const timestamp = Date.now();
  const nonce = randomBytes(16).toString("hex");

  const bodyDigest = createHash("sha256").update(body, "utf8").digest("hex");
  const canonical = [
    SIGNATURE_VERSION,
    method.toUpperCase(),
    path,
    String(timestamp),
    nonce,
    bodyDigest,
  ].join("\n");

  const signature = createHmac("sha256", secret).update(canonical, "utf8").digest("hex");

  return {
    "content-type": "application/json",
    "x-project": projectSlug,
    "x-timestamp": String(timestamp),
    "x-nonce": nonce,
    "x-signature": signature,
  };
}
