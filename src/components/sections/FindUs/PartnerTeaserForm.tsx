"use client";

import { useTranslations } from "next-intl";
import MomentoButton from "@/components/ui/MomentoButton";
import { useTransitionRouter } from "@/hooks/useTransitionRouter";
import TeaserField from "./TeaserField";

// The start of the partner form: a few fields and the business types. Nothing is filled in here —
// any click (a field, a type, the button) opens the partner page, where the real form is.

export const PARTNER_PAGE = "/become-a-client";

const FIELDS = ["business", "city", "email"] as const;
const TYPES = ["cafe", "restaurant", "hotel", "shop"] as const;

export default function PartnerTeaserForm() {
    const t = useTranslations("Sections.findUs.form");
    const router = useTransitionRouter();
    const open = () => router.push(PARTNER_PAGE);

    return (
        <div>
            <p className="font-display font-medium text-burgundy text-[clamp(22px,1.8vw,30px)] leading-tight">{t("title")}</p>

            <div className="mt-7">
                <span className="block font-body font-semibold text-[11px] uppercase tracking-[.18em] text-caramel">{t("typeLabel")}</span>
                <div className="mt-3 flex flex-wrap gap-2.5">
                    {TYPES.map((type) => (
                        <button
                            key={type}
                            type="button"
                            onClick={open}
                            className="rounded-2xl border border-burgundy/30 px-4 py-2 font-body text-sm text-burgundy transition-colors duration-300 hover:border-burgundy hover:bg-burgundy hover:text-cream focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-caramel"
                        >
                            {t(`types.${type}`)}
                        </button>
                    ))}
                </div>
            </div>

            <div className="mt-8 grid gap-7 sm:grid-cols-2 sm:gap-x-8">
                {FIELDS.map((field) => (
                    <TeaserField key={field} label={t(field)} onOpen={open} className={field === "business" ? "sm:col-span-2" : ""} />
                ))}
            </div>

            <MomentoButton href={PARTNER_PAGE} className="mt-10 w-fit">
                {t("cta")}
            </MomentoButton>
        </div>
    );
}
