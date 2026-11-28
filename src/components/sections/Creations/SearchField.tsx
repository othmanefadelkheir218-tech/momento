"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { LABEL } from "@/components/ui/Hairline";

// The search line of the catalogue: a magnifying glass and an open underlined field.
// Results update while the visitor types. The field keeps its own text (the page address updates a
// moment later, which would otherwise lose letters typed quickly); it is emptied when the filters
// are cleared.

export default function SearchField({ value, onChange }: { value: string; onChange: (value: string) => void }) {
    const t = useTranslations("Sections.creations.toolbar");
    const [text, setText] = useState(value);
    const [lastValue, setLastValue] = useState(value);
    if (value !== lastValue) {
        setLastValue(value);
        if (value === "") setText("");
    }

    return (
        <div>
            <label htmlFor="creation-search" className={LABEL}>
                {t("search")}
            </label>
            <div className="mt-2 flex items-center gap-3 border-b border-burgundy/30 transition-colors focus-within:border-burgundy">
                <svg aria-hidden width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="shrink-0 text-burgundy">
                    <circle cx="11" cy="11" r="7" />
                    <path d="m20 20-3.5-3.5" strokeLinecap="round" />
                </svg>
                <input
                    id="creation-search"
                    type="search"
                    value={text}
                    onChange={(e) => {
                        setText(e.target.value);
                        onChange(e.target.value);
                    }}
                    placeholder={t("searchPlaceholder")}
                    className="w-full bg-transparent py-3 font-display text-[clamp(22px,1.8vw,30px)] text-burgundy outline-none placeholder:text-chocolate/35"
                />
            </div>
        </div>
    );
}
