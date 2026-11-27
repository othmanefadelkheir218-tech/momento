"use client";

import { useTranslations } from "next-intl";
import type { Country } from "@/Data/shops";

// Belgique / Maroc switch of the "Où nous trouver" section: country names in the display font,
// the chosen one in burgundy with a thin line under it.

type Props = {
    countries: Country[];
    active: Country;
    onChange: (country: Country) => void;
};

export default function CountryTabs({ countries, active, onChange }: Props) {
    const t = useTranslations("Sections.findUs");

    return (
        <div role="tablist" aria-label={t("countriesLabel")} className="flex gap-9">
            {countries.map((country) => {
                const selected = country === active;
                return (
                    <button
                        key={country}
                        type="button"
                        role="tab"
                        aria-selected={selected}
                        onClick={() => onChange(country)}
                        className={`relative pb-2 font-display font-medium text-[clamp(24px,2.4vw,32px)] leading-none transition-colors duration-300 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-caramel ${
                            selected ? "text-burgundy" : "text-burgundy/35 hover:text-burgundy/60"
                        }`}
                    >
                        {t(country)}
                        <span
                            aria-hidden
                            className={`absolute inset-x-0 bottom-0 h-px origin-left bg-burgundy transition-transform duration-500 ease-out ${
                                selected ? "scale-x-100" : "scale-x-0"
                            }`}
                        />
                    </button>
                );
            })}
        </div>
    );
}
