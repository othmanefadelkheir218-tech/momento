import { NextResponse } from "next/server";

// ─── Types ───────────────────────────────────────────────────────────────────

interface MomentoContactPayload {
  secret: string;
  type: "momento_contact";
  type_etablissement: string;
  nom_etablissement: string;
  ville: string;
  contact_personne: string;
  telephone: string;
  email: string;
  quantite_mensuelle?: string;
  informations?: string;
}

interface GoogleScriptResponse {
  success: boolean;
  error?: string;
}

// ─── Validation ──────────────────────────────────────────────────────────────

interface FormInput {
  type_etablissement: string;
  nom_etablissement: string;
  ville: string;
  contact_personne: string;
  telephone: string;
  email: string;
  quantite_mensuelle?: string;
  informations?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\+?[\d\s\-().]{7,20}$/;

function validate(data: FormInput): string | null {
  if (!data.type_etablissement?.trim()) return "type_etablissement is required";
  if (!data.nom_etablissement?.trim()) return "nom_etablissement is required";
  if (!data.ville?.trim()) return "ville is required";
  if (!data.contact_personne?.trim()) return "contact_personne is required";
  if (!data.telephone?.trim()) return "telephone is required";
  if (!PHONE_REGEX.test(data.telephone.trim())) return "telephone format is invalid";
  if (!data.email?.trim()) return "email is required";
  if (!EMAIL_REGEX.test(data.email.trim())) return "email format is invalid";

  // Length guards to prevent abuse
  if (data.nom_etablissement.length > 120) return "nom_etablissement is too long";
  if (data.contact_personne.length > 100) return "contact_personne is too long";
  if ((data.informations?.length ?? 0) > 1000) return "informations is too long";

  return null;
}

// ─── Route Handler ───────────────────────────────────────────────────────────

export async function POST(req: Request): Promise<NextResponse> {
  // 1. Read environment variables (server-side only — never exposed to client)
  const scriptUrl = 'https://script.google.com/macros/s/AKfycbzsEbt-F1-iNeSlxrriEuAmiiPzbE5WunH3ZGLnd2ADdv-asgtL968oWeOapeJgAlzc/exec';
  const secret = 'my_secret_123';

  if (!scriptUrl || scriptUrl.includes("YOUR_REAL_SCRIPT_ID")) {
    console.error(
      "[momento-contact] GOOGLE_SCRIPT_URL is not set or still contains the placeholder. " +
      "Add it to .env.local and restart the dev server.",
    );
    return NextResponse.json(
      { success: false, error: "Server configuration error: missing GOOGLE_SCRIPT_URL" },
      { status: 500 },
    );
  }

  if (!secret) {
    console.error(
      "[momento-contact] MOMENTO_CONTACT_SECRET is not set. " +
      "Add it to .env.local and restart the dev server.",
    );
    return NextResponse.json(
      { success: false, error: "Server configuration error: missing MOMENTO_CONTACT_SECRET" },
      { status: 500 },
    );
  }

  // 2. Parse request body
  let body: FormInput;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid JSON body" },
      { status: 400 },
    );
  }

  // 3. Validate input
  const validationError = validate(body);
  if (validationError) {
    return NextResponse.json(
      { success: false, error: validationError },
      { status: 422 },
    );
  }

  // 4. Build the payload for the Google Apps Script endpoint
  const payload: MomentoContactPayload = {
    secret,
    type: "momento_contact",
    type_etablissement: body.type_etablissement.trim(),
    nom_etablissement: body.nom_etablissement.trim(),
    ville: body.ville.trim(),
    contact_personne: body.contact_personne.trim(),
    telephone: body.telephone.trim(),
    email: body.email.trim(),
    quantite_mensuelle: body.quantite_mensuelle?.trim() ?? "",
    informations: body.informations?.trim() ?? "",
  };

  // 5. Forward to Google Apps Script (server → external API)
  // GAS sometimes redirects (302) to a login page — we follow and then verify
  // the response is actually JSON, not an HTML error page.
  let googleRes: Response;
  try {
    googleRes = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      redirect: "follow",
    });
  } catch (err) {
    console.error("[momento-contact] Network error reaching Google Script:", err);
    return NextResponse.json(
      { success: false, error: "Could not reach external API. Check GOOGLE_SCRIPT_URL." },
      { status: 502 },
    );
  }

  // 6. Guard against HTML responses (GAS login redirect / wrong URL)
  const contentType = googleRes.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    const preview = await googleRes.text();
    console.error(
      `[momento-contact] Google Script returned non-JSON (${googleRes.status}). ` +
      `Content-Type: ${contentType}. Preview: ${preview.slice(0, 200)}`,
    );
    return NextResponse.json(
      {
        success: false,
        error:
          "External API returned an unexpected response. " +
          "Verify the Google Script URL is deployed and public.",
      },
      { status: 502 },
    );
  }

  // 7. Parse the Google Apps Script JSON response
  let result: GoogleScriptResponse;
  try {
    result = (await googleRes.json()) as GoogleScriptResponse;
  } catch {
    console.error("[momento-contact] Could not parse Google Script JSON response");
    return NextResponse.json(
      { success: false, error: "Invalid JSON response from external API" },
      { status: 502 },
    );
  }

  // 8. Handle unauthorized / script-level errors
  if (!result.success) {
    console.error("[momento-contact] Google Script returned error:", result.error);
    return NextResponse.json(
      { success: false, error: result.error ?? "External API error" },
      { status: 400 },
    );
  }

  return NextResponse.json({ success: true }, { status: 200 });
}

// Reject all other HTTP methods
export function GET(): NextResponse {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
