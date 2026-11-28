// Allergens per creation, for the Allergens & Nutrition page (/allergens-nutrition).
// DRAFT: copied from the supplier spec sheets in public/momento_product (the "Contient" and
// "Peut contenir des traces de" lines). [To be confirmed] — every value must be checked against the
// official recipes before the site is published. "tbc" = no spec sheet yet.
//
//   "yes"    → contains it
//   "traces" → may contain traces
//   "no"     → not listed on the spec sheet
//   "tbc"    → to be confirmed

export type AllergenValue = "yes" | "traces" | "no" | "tbc";

export const ALLERGENS = ["milk", "eggs", "gluten", "nuts", "peanuts", "soy", "sesame"] as const;
export type Allergen = (typeof ALLERGENS)[number];

type Row = Record<Allergen, AllergenValue> & {
    /** other allergens, as keys of Sections.allergens.table.other (fish, lupin, sulphites…) */
    other: string[];
};

const TBC: Row = { milk: "tbc", eggs: "tbc", gluten: "tbc", nuts: "tbc", peanuts: "tbc", soy: "tbc", sesame: "tbc", other: ["tbc"] };

/** key = creation key (src/Data/creations.ts) */
export const ALLERGEN_TABLE: Record<string, Row> = {
    speculoosSaltedCaramel: { milk: "yes", eggs: "yes", gluten: "yes", nuts: "no", peanuts: "no", soy: "no", sesame: "no", other: ["fish"] },
    speculoos: { milk: "yes", eggs: "yes", gluten: "yes", nuts: "no", peanuts: "no", soy: "yes", sesame: "no", other: ["fish"] },
    tiramisuClassique: TBC,
    oreo: { milk: "yes", eggs: "yes", gluten: "yes", nuts: "no", peanuts: "no", soy: "yes", sesame: "no", other: ["fish"] },
    snickers: { milk: "yes", eggs: "yes", gluten: "traces", nuts: "traces", peanuts: "yes", soy: "yes", sesame: "no", other: ["fish"] },
    pistache: { milk: "yes", eggs: "yes", gluten: "no", nuts: "yes", peanuts: "traces", soy: "traces", sesame: "no", other: ["fish"] },
    bueno: { milk: "yes", eggs: "yes", gluten: "yes", nuts: "yes", peanuts: "no", soy: "yes", sesame: "no", other: ["fish"] },
    citron: { milk: "yes", eggs: "yes", gluten: "yes", nuts: "traces", peanuts: "no", soy: "traces", sesame: "no", other: [] },
    mangue: { milk: "yes", eggs: "yes", gluten: "yes", nuts: "traces", peanuts: "no", soy: "traces", sesame: "no", other: ["lupin", "sulphites"] },
    framboise: { milk: "yes", eggs: "traces", gluten: "yes", nuts: "no", peanuts: "no", soy: "traces", sesame: "no", other: ["lupin", "sulphites"] },
    nutellaCrousti: TBC,
    redVelvet: { milk: "yes", eggs: "yes", gluten: "yes", nuts: "no", peanuts: "no", soy: "no", sesame: "no", other: ["fish"] },
    mousseAuChocolat: { milk: "yes", eggs: "yes", gluten: "no", nuts: "no", peanuts: "no", soy: "yes", sesame: "no", other: [] },
    cookies: TBC,
};
