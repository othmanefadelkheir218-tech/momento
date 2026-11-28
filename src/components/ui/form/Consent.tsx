"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ROUTES } from "@/Data/routes";

// The consent checkbox under every form, with a link to the privacy policy.
// `ns`: the form's translations (needs "consent" with a <link>…</link> part).

export default function Consent({ ns, error }: { ns: string; error?: string }) {
    const t = useTranslations(ns);
    return (
        <div>
            <label className="flex items-start gap-3 font-body text-[14px] leading-relaxed text-chocolate/85">
                <input
                    type="checkbox"
                    name="consent"
                    required
                    className="mt-1 h-4 w-4 shrink-0 accent-burgundy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-caramel"
                />
                <span>
                    {t.rich("consent", {
                        link: (chunks) => (
                            <Link href={ROUTES.privacy} className="text-burgundy underline underline-offset-4 hover:text-burgundy-dark">
                                {chunks}
                            </Link>
                        ),
                    })}
                </span>
            </label>
            {error && <p className="mt-2 font-body text-[13px] text-burgundy">{error}</p>}
        </div>
    );
}
