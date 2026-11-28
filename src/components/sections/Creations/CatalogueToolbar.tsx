"use client";

import { useTranslations } from "next-intl";
import { CATEGORIES, TYPES } from "@/Data/creations";
import FilterRow from "./FilterRow";
import SearchField from "./SearchField";
import SortAndView from "./SortAndView";
import { setFilters, type Filters } from "./useCatalogueFilters";

// Above the creations, kept compact so the desserts show in the first screen:
//   1. search, with sort + grid/list on the same line
//   2. category and type filters (side by side on wide screens)
//   3. the number of results and "Clear all filters", over a hairline
// All changes go through setFilters (the page address). The previous, roomier toolbar is in ./v1/.

type Props = { filters: Filters; count: number; isFiltered: boolean; onReset: () => void };

export default function CatalogueToolbar({ filters, count, isFiltered, onReset }: Props) {
    const t = useTranslations("Sections.creations.toolbar");

    return (
        <div role="search" aria-label={t("label")} className="space-y-5">
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:gap-10">
                <div className="flex-1">
                    <SearchField value={filters.q} onChange={(q) => setFilters({ q })} />
                </div>
                <SortAndView sort={filters.sort} view={filters.view} onSort={(sort) => setFilters({ sort })} onView={(view) => setFilters({ view })} />
            </div>

            <div className="flex flex-col gap-3 xl:flex-row xl:gap-14">
                <FilterRow
                    label={t("category")}
                    value={filters.category}
                    onChange={(category) => setFilters({ category })}
                    options={[{ value: "all", label: t("all") }, ...CATEGORIES.map((c) => ({ value: c, label: t(`categories.${c}`) }))]}
                />
                <FilterRow
                    label={t("type")}
                    value={filters.type}
                    onChange={(type) => setFilters({ type })}
                    options={[{ value: "all", label: t("all") }, ...TYPES.map((c) => ({ value: c, label: t(`types.${c}`) }))]}
                />
            </div>

            <div className="flex items-center justify-between gap-4 border-b border-burgundy/15 pb-3">
                <p aria-live="polite" className="font-body text-[14px] text-chocolate/75">
                    {t("count", { count })}
                </p>
                {isFiltered && (
                    <button
                        type="button"
                        onClick={onReset}
                        className="font-body text-[14px] font-medium text-burgundy underline underline-offset-4 hover:text-burgundy-dark rounded-sm focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-caramel"
                    >
                        {t("reset")}
                    </button>
                )}
            </div>
        </div>
    );
}
