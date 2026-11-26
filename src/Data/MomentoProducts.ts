// Momento product catalogue, built from public/momento_product.
//
// Only the products whose folder is complete (a .txt spec sheet + images/ + images_nobg/) are listed.
// Every text (name, description, ingredients, allergens, storage...) lives in the messages files,
// under "MomentoProducts.Products.<key>" — edit the JSON, not this file, to change what is shown.
// An empty string in the JSON means "not available yet" (e.g. page 2 of the spec sheet is missing).
//
// This file only holds what is not translated: image paths, weight and nutrition figures.

const ROOT = "/momento_product";

// The 8 standard shots, in the order they are numbered in every folder.
const SHOTS = [
    "1 face avec etiquette",
    "2 arriere avec etiquette",
    "3 ouvert trois quarts",
    "4 ouvert vue plongeante",
    "5 sans etiquette ferme",
    "6 sans etiquette dessus ferme",
    "7 sans etiquette ouvert",
    "8 sans etiquette vue du dessus",
] as const;

/** Builds a public URL; file names contain spaces, so they are encoded. */
const asset = (...parts: string[]) => encodeURI([ROOT, ...parts].join("/"));

/** Per 100 g. `null` when the spec sheet does not give the figures. */
export interface MomentoNutrition {
    energyKj: number;
    energyKcal: number;
    fat: number;
    saturatedFat: number;
    carbohydrates: number;
    sugars: number;
    fiber: number;
    protein: number;
    salt: number;
}

export interface MomentoProduct {
    id: number;
    /** Key in messages: MomentoProducts.Products.<key> */
    key: string;
    slug: string;
    name: string;
    description: string;
    ingredients: string;
    allergens: string;
    /** "May contain traces of…" — empty when none are listed. */
    traces: string;
    storageTemperature: string;
    shelfLife: string;
    /** Extra instruction from the sheet (e.g. do not refreeze). */
    note: string;
    category: string;
    categoryKey: string;
    weight: string; // e.g. "120g", or "" when unknown
    nutrition: MomentoNutrition | null;
    /** The spec sheet only had page 1 of 2, or no sheet at all: some fields are missing. */
    incompleteSpec: boolean;
    /** Main picture: always the 4th shot of images_nobg (open, seen from above). */
    main_image: string;
    /** 3rd shot of images_nobg (open, three-quarter view): used by the home "Nos créations" arc. */
    card_image: string;
    /** Same product in the current catalogue (Desserts.Products.<key>), for its /menu page. */
    legacyKey: string | null;
    /** The other images_nobg shots, in order (main image excluded). */
    other_images: string[];
    /** The same shots with their original background (images/ folder). */
    photos: string[];
    isNew: boolean;
}

export interface ProductSource {
    key: string;
    /** Same product in the current catalogue (Desserts.Products.<key> → /menu/<slug> page), or null. */
    legacyKey: string | null;
    folder: string; // folder name in public/momento_product
    prefix: string; // file name prefix, e.g. "Cheesecake citron"
    weight: string;
    nutrition: MomentoNutrition | null;
    incompleteSpec: boolean;
    /** Exact images_nobg file names, only when a folder breaks the standard naming. */
    nobgOverride?: { main: string; others: string[] };
}

const n = (
    energyKj: number, energyKcal: number, fat: number, saturatedFat: number, carbohydrates: number,
    sugars: number, fiber: number, protein: number, salt: number,
): MomentoNutrition => ({ energyKj, energyKcal, fat, saturatedFat, carbohydrates, sugars, fiber, protein, salt });

const SOURCES: ProductSource[] = [
    { key: "lemonCheesecake", legacyKey: "lemonCheesecake", folder: "Cheesecake citroen 120g", prefix: "Cheesecake citron", weight: "120g", incompleteSpec: false, nutrition: n(2197, 526, 33.4, 18.5, 51.7, 22.1, 1.6, 3.8, 0.53) },
    { key: "raspberryCheesecake", legacyKey: "raspberryCheesecake", folder: "Cheesecake framboos 120g", prefix: "Cheesecake framboise", weight: "120g", incompleteSpec: true, nutrition: n(1778, 425, 16.8, 8.1, 62.1, 28.1, 1.2, 5.0, 0.72) },
    { key: "mangoCheesecake", legacyKey: "mangoCheesecake", folder: "Cheesecake mango 120g", prefix: "Cheesecake mangue", weight: "120g", incompleteSpec: true, nutrition: n(1987, 475, 26.9, 13.2, 53.2, 21.7, 1.7, 4.3, 0.57) },
    { key: "oreoCrumble", legacyKey: "oreoCrumble", folder: "Crumble Oreo 100g", prefix: "Tiramisu Oreo", weight: "100g", incompleteSpec: true, nutrition: n(1643, 393, 28.6, 9.3, 28.4, 22.3, 0.5, 4.4, 0.28) },
    { key: "chocolateMousse", legacyKey: "chocolateMousse", folder: "Lochtjes chocomousse 100g", prefix: "Mousse au chocolat", weight: "100g", incompleteSpec: false, nutrition: n(1358, 325, 26.4, 16.9, 17.7, 17.0, 1.3, 3.4, 0.10) },
    { key: "nutellaCrousti", legacyKey: null, folder: "Nutella Crousti", prefix: "Nutella Crousti", weight: "", incompleteSpec: true, nutrition: null },
    { key: "redVelvet", legacyKey: "redVelvetTiramisu", folder: "Red velvet 110g", prefix: "Red Velvet", weight: "110g", incompleteSpec: false, nutrition: n(1052, 252, 13.0, 6.8, 28.7, 24.9, 0.5, 4.8, 0.09) },
    { key: "tiramisuBueno", legacyKey: "kinderBueno", folder: "Tiramisu Bueno 110g", prefix: "Tiramisu Bueno", weight: "110g", incompleteSpec: true, nutrition: null },
    {
        key: "tiramisuSnickers", legacyKey: "snickersTiramisu", folder: "Tiramisu Snickers 110g", prefix: "Tiramisu Snickers", weight: "110g", incompleteSpec: true,
        nutrition: n(1527, 365, 25.1, 9.7, 25.2, 23.7, 0.3, 4.1, 0.24),
        // In this folder the 4th no-background shot is named "4 sans etiquette ferme".
        nobgOverride: {
            main: "Tiramisu Snickers - 4 sans etiquette ferme.png",
            others: [1, 2, 3, 5, 6, 7, 8].map((i) => `Tiramisu Snickers - ${SHOTS[i - 1]}.png`),
        },
    },
    {
        key: "classicTiramisu", legacyKey: "classicTiramisu", folder: "Tiramisu classique", prefix: "Tiramisu classique", weight: "", incompleteSpec: true, nutrition: null,
        // No "4 ouvert vue plongeante" without background here: the Momento cup shot takes its place.
        nobgOverride: {
            main: "Momento Classique Tiramisu Cup.png",
            others: [1, 2, 3, 5, 6, 7, 8].map((i) => `Tiramisu classique - ${SHOTS[i - 1]}.png`),
        },
    },
    { key: "tiramisuPistachio", legacyKey: "pistachioCream", folder: "Tiramisu pistache 100g", prefix: "Tiramisu pistache", weight: "100g", incompleteSpec: true, nutrition: n(1585, 379, 29.8, 9.3, 22.4, 20.3, 0.7, 4.8, 0.15) },
    { key: "speculoosTiramisu", legacyKey: "speculoosTiramisu", folder: "Tiramisu speculoos 115g", prefix: "Tiramisu speculoos", weight: "115g", incompleteSpec: true, nutrition: n(1521, 364, 25.7, 9.1, 28.2, 21.3, 0.5, 3.9, 0.25) },
    { key: "speculoosSaltedCaramel", legacyKey: "saltedCaramel", folder: "Tiramisu speculos caramel 110g", prefix: "Tiramisu speculoos salted caramel", weight: "110g", incompleteSpec: false, nutrition: n(1687, 404, 28.8, 10.1, 30.9, 23.7, 0.2, 4.2, 0.26) },
];

const MAIN_SHOT = 4;

export function images(src: ProductSource) {
    const shot = (dir: string, i: number, ext: string) => asset(src.folder, dir, `${src.prefix} - ${SHOTS[i - 1]}.${ext}`);
    const all = [1, 2, 3, 4, 5, 6, 7, 8];

    const main_image = src.nobgOverride
        ? asset(src.folder, "images_nobg", src.nobgOverride.main)
        : shot("images_nobg", MAIN_SHOT, "png");
    const other_images = src.nobgOverride
        ? src.nobgOverride.others.map((f) => asset(src.folder, "images_nobg", f))
        : all.filter((i) => i !== MAIN_SHOT).map((i) => shot("images_nobg", i, "png"));
    const photos = all.map((i) => shot("images", i, "jpg"));
    const card_image = shot("images_nobg", 3, "png");

    return { main_image, card_image, other_images, photos };
}

/** Raw list (no text): image paths, weights, nutrition. Useful outside React. */
export const MOMENTO_PRODUCT_SOURCES = SOURCES;

/**
 * Full product list with texts. Pass a translator scoped to "MomentoProducts":
 *   const t = useTranslations("MomentoProducts");  getMomentoProducts(t)
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getMomentoProducts = (t: any): MomentoProduct[] =>
    SOURCES.map((src, index) => {
        const p = (field: string) => t(`Products.${src.key}.${field}`) as string;
        const name = p("name");
        return {
            id: index + 1,
            key: src.key,
            slug: src.key.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(),
            name,
            description: p("description"),
            ingredients: p("ingredients"),
            allergens: p("allergens"),
            traces: p("traces"),
            storageTemperature: p("storageTemperature"),
            shelfLife: p("shelfLife"),
            note: p("note"),
            category: t("Categories.verrines"),
            categoryKey: "verrines",
            weight: src.weight,
            nutrition: src.nutrition,
            incompleteSpec: src.incompleteSpec,
            legacyKey: src.legacyKey,
            isNew: false,
            ...images(src),
        };
    });
