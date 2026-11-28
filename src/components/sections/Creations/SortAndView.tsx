"use client";

import { useTranslations } from "next-intl";
import { LABEL } from "@/components/ui/Hairline";
import { SORTS, type Sort, type View } from "./useCatalogueFilters";

// Sort (a simple underlined select) and the grid / list switch (two small drawn icons).

type Props = { sort: Sort; view: View; onSort: (sort: Sort) => void; onView: (view: View) => void };

const ICONS: Record<View, string> = {
    grid: "M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z",
    list: "M4 6h16M4 12h16M4 18h16",
};

export default function SortAndView({ sort, view, onSort, onView }: Props) {
    const t = useTranslations("Sections.creations.toolbar");
    return (
        <div className="flex items-end gap-8">
            <div>
                <label htmlFor="creation-sort" className={LABEL}>
                    {t("sort")}
                </label>
                <select
                    id="creation-sort"
                    value={sort}
                    onChange={(e) => onSort(e.target.value as Sort)}
                    className="mt-2 block cursor-pointer border-0 border-b border-burgundy/30 bg-transparent py-2 pr-6 font-body text-[15px] font-medium text-burgundy outline-none focus-visible:border-burgundy"
                >
                    {SORTS.map((s) => (
                        <option key={s} value={s}>
                            {t(`sorts.${s}`)}
                        </option>
                    ))}
                </select>
            </div>

            <div role="group" aria-label={t("view")} className="flex gap-1 pb-1">
                {(["grid", "list"] as View[]).map((v) => (
                    <button
                        key={v}
                        type="button"
                        aria-pressed={view === v}
                        aria-label={t(v)}
                        title={t(v)}
                        onClick={() => onView(v)}
                        className={`rounded-xl p-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-caramel ${
                            view === v ? "text-burgundy" : "text-chocolate/40 hover:text-burgundy"
                        }`}
                    >
                        <svg aria-hidden width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                            <path d={ICONS[v]} />
                        </svg>
                    </button>
                ))}
            </div>
        </div>
    );
}
