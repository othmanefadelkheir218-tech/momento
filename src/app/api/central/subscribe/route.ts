import { NextResponse } from "next/server";

import { submitToCentralAdmin } from "@/lib/central-admin/client";
import { requireEmail } from "@/lib/central-admin/validation";

/**
 * Newsletter subscription — used by the footer sign-up form
 * (components/layout/Footer/FooterSection.tsx).
 *
 * Forwards straight to the central admin; the payload shape already matches
 * what it expects, so there is no field mapping here.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const { email: rawEmail } = (body ?? {}) as { email?: unknown };

  let email: string;
  try {
    email = requireEmail(rawEmail);
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Invalid input." },
      { status: 422 },
    );
  }

  const result = await submitToCentralAdmin("subscriber", { email });

  if (!result.ok) {
    // A duplicate subscription is not an error from the visitor's point of
    // view — they are already on the list.
    if (result.code === "DUPLICATE") {
      return NextResponse.json({ success: true });
    }

    console.error("[central/subscribe]", result.code, result.message);
    return NextResponse.json(
      { success: false, error: "L'inscription a échoué." },
      { status: 502 },
    );
  }

  return NextResponse.json({ success: true, id: result.id });
}
