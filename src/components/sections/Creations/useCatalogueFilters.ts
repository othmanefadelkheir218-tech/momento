"use client";

import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { CATEGORIES, CREATIONS, TYPES, type CreationCategory, type CreationType } from "@/Data/creations";

// The catalogue's search, filters, sort and view, kept in the page address
// (e.g. /creations?type=seasonal&view=list), so a filtered list can be shared or linked to
// (the "See seasonal specials" button does that). Default values are left out of the address.

export type Sort = "az" | "za" | "newest";
export type View = "grid" | "list";
export const SORTS: Sort[] = ["az", "za", "newest"];

export type Filters = {
    q: string;
    category: CreationCategory | "all";
    type: CreationType | "all";
    sort: Sort;
    view: View;
};

const DEFAULTS: Filters = { q: "", category: "all", type: "all", sort: "az", view: "grid" };
const KEYS: Record<keyof Filters, string> = { q: "q", category: "category", type: "type", sort: "sort", view: "view" };

const pick = <T extends string>(value: string | null, allowed: readonly T[], fallback: T): T =>
    allowed.includes(value as T) ? (value as T) : fallback;

/** Changes some filters (keeps the others) by rewriting the address, without reloading the page. */
export function setFilters(change: Partial<Filters>) {
    const params = new URLSearchParams(window.location.search);
    for (const [key, value] of Object.entries(change) as [keyof Filters, string][]) {
        if (!value || value === DEFAULTS[key]) params.delete(KEYS[key]);
        else params.set(KEYS[key], value);
    }
    const qs = params.toString();
    window.history.replaceState(null, "", `${window.location.pathname}${qs ? `?${qs}` : ""}`);
}

export function useCatalogueFilters() {
    const params = useSearchParams();
    const t = useTranslations("Sections.creations.products");

    const filters: Filters = {
        q: params.get("q") ?? "",
        category: pick(params.get("category"), ["all", ...CATEGORIES] as const, "all"),
        type: pick(params.get("type"), ["all", ...TYPES] as const, "all"),
        sort: pick(params.get("sort"), SORTS, "az"),
        view: pick(params.get("view"), ["grid", "list"] as const, "grid"),
    };

    // accents and case don't matter when searching ("speculoos" finds "Spéculoos")
    const plain = (s: string) => s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
    const query = plain(filters.q.trim());

    const results = CREATIONS.filter((c) => filters.category === "all" || c.categories.includes(filters.category as CreationCategory))
        .filter((c) => filters.type === "all" || c.type === filters.type)
        .filter((c) => !query || plain(`${t(`${c.key}.name`)} ${t(`${c.key}.short`)}`).includes(query))
        .sort((a, b) => {
            if (filters.sort === "newest") return b.order - a.order;
            const byName = t(`${a.key}.name`).localeCompare(t(`${b.key}.name`));
            return filters.sort === "za" ? -byName : byName;
        });

    const isFiltered = filters.q !== "" || filters.category !== "all" || filters.type !== "all";
    const reset = () => setFilters({ q: "", category: "all", type: "all" });

    return { filters, results, isFiltered, reset };
}
