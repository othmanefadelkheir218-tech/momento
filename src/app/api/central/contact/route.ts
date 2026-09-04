import { NextResponse } from "next/server";

import { submitToCentralAdmin } from "@/lib/central-admin/client";
import { requireEmail, requirePhone, requireString } from "@/lib/central-admin/validation";

/**
 * Contact form — used by the footer contact form
 * (components/layout/Footer/FooterSection2.tsx).
 *
 * Field names already match the central admin's contact schema one for one,
 * so no mapping is needed here — only presence/format checks before
 * forwarding.
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
      cooperation: requireString(input.cooperation, "Le type de coopération"),
      city: requireString(input.city, "La ville"),
      name: requireString(input.name, "Le nom"),
      phone: requirePhone(input.phone),
      email: requireEmail(input.email),
      message: requireString(input.message, "Le message"),
    };

    const result = await submitToCentralAdmin("contact", data);

    if (!result.ok) {
      console.error("[central/contact]", result.code, result.message);
      return NextResponse.json(
        { success: false, error: "L'envoi du message a échoué." },
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
