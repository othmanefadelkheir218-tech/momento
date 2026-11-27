// Momento shops, shown in the "Où nous trouver" section (src/components/sections/FindUs).
// To add a real shop: fill in name / address / hours / phone. While `address` is empty, the
// section shows the "[À compléter…]" placeholder (translated) instead.

export type Shop = {
    id: string;
    name?: string; // empty → "Boutique Momento" (translated)
    address?: string;
    hours?: string;
    phone?: string;
};

export type Country = "belgium" | "morocco";

export const COUNTRIES: Country[] = ["belgium", "morocco"];

export const SHOPS: Record<Country, Shop[]> = {
    belgium: [{ id: "be-1" }, { id: "be-2" }],
    morocco: [{ id: "ma-1" }, { id: "ma-2" }],
};
