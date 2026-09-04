import { NextResponse } from "next/server";

import { submitToCentralAdmin } from "@/lib/central-admin/client";
import {
  optionalString,
  requireEmail,
  requirePhone,
  requireString,
} from "@/lib/central-admin/validation";

/**
 * "Become a partner" form — used by the become-a-client page
 * (app/[locale]/become-a-client/Parts/BecomeClientPage.tsx).
 *
 * The frontend already posts French snake_case field names (a leftover from
 * the old Google Apps Script contract it used to call). Those are translated
 * here to the field names the central admin's partner schema expects — the
 * frontend component needed no changes beyond its target URL.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const input = (body ?? {}) as Record<string, unknown>;

  try {
    const data = {
      establishmentType: requireString(input.type_etablissement, "Le type d'établissement"),
      establishmentName: requireString(input.nom_etablissement, "Le nom de l'établissement"),
      city: requireString(input.ville, "La ville"),
      contactPerson: requireString(input.contact_personne, "La personne de contact"),
      phone: requirePhone(input.telephone),
      email: requireEmail(input.email),
      // Optional in the real form: no `required` attribute in BecomeClientPage.
      estimatedMonthlyQuantity: optionalString(input.quantite_mensuelle),
      additionalInformation: optionalString(input.informations),
    };

    const result = await submitToCentralAdmin("partner", data);

    if (!result.ok) {
      console.error("[central/partner]", result.code, result.message);
      return NextResponse.json(
        { success: false, error: "L'envoi de la demande a échoué." },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true, id: result.id });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Invalid input." },
      { status: 422 },
    );
  }
}
