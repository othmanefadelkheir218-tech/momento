/**
 * Minimal request-shape checks for the routes in app/api/central/.
 *
 * These only guard against obviously malformed requests (missing/empty
 * fields, bad email or phone format) before forwarding to the central admin,
 * which owns the authoritative validation. Keeping this lightweight avoids
 * adding a validation library for three small routes.
 */
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PHONE_REGEX = /^\+?[\d\s\-().]{6,20}$/;

export function requireString(value: unknown, field: string): string {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${field} est requis.`);
  }
  return value.trim();
}

export function optionalString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export function requireEmail(value: unknown, field = "L'e-mail"): string {
  const email = requireString(value, field);
  if (!EMAIL_REGEX.test(email)) {
    throw new Error(`${field} n'est pas une adresse valide.`);
  }
  return email.toLowerCase();
}

export function requirePhone(value: unknown, field = "Le téléphone"): string {
  const phone = requireString(value, field);
  if (!PHONE_REGEX.test(phone)) {
    throw new Error(`${field} n'est pas un numéro valide.`);
  }
  return phone;
}
