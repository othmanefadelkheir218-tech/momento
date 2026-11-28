import { MOMENTO_PRODUCT_SOURCES, images, type MomentoNutrition } from "./MomentoProducts";

// The creations shown on /creations and /creations/[slug], in the order of the menu.
// Texts (name, one-line description, description, quote) are translated under
// "Sections.creations.products.<key>". Pictures, weight and nutrition come from the product folders
// in public/momento_product (see MomentoProducts.ts), through `source`.
//
// To add a creation: add a line here, add its texts in the messages files, and its allergens in
// src/Data/allergens.ts.

export type CreationCategory = "creamy" | "fruity" | "chocolatey" | "crunchy";
export type CreationType = "everyday" | "seasonal";

export const CATEGORIES: CreationCategory[] = ["creamy", "fruity", "chocolatey", "crunchy"];
export const TYPES: CreationType[] = ["everyday", "seasonal"];

type Entry = {
    key: string;
    slug: string;
    categories: CreationCategory[];
    /** [To be confirmed] which creations are seasonal: all are "everyday" for now */
    type: CreationType;
    /** product folder key in MomentoProducts.ts, or null when there is no folder yet */
    source: string | null;
    /** who says the quote on the product page */
    voice: "marcelo" | "milo";
};

const ENTRIES: Entry[] = [
    { key: "speculoosSaltedCaramel", slug: "speculoos-salted-caramel", categories: ["creamy", "crunchy"], type: "everyday", source: "speculoosSaltedCaramel", voice: "marcelo" },
    { key: "speculoos", slug: "speculoos", categories: ["creamy"], type: "everyday", source: "speculoosTiramisu", voice: "marcelo" },
    { key: "tiramisuClassique", slug: "tiramisu-classique", categories: ["creamy"], type: "everyday", source: "classicTiramisu", voice: "marcelo" },
    { key: "oreo", slug: "oreo", categories: ["creamy", "crunchy"], type: "everyday", source: "oreoCrumble", voice: "milo" },
    { key: "snickers", slug: "snickers", categories: ["chocolatey", "crunchy"], type: "everyday", source: "tiramisuSnickers", voice: "milo" },
    { key: "pistache", slug: "pistache", categories: ["creamy"], type: "everyday", source: "tiramisuPistachio", voice: "marcelo" },
    { key: "bueno", slug: "bueno", categories: ["creamy", "chocolatey"], type: "everyday", source: "tiramisuBueno", voice: "milo" },
    { key: "citron", slug: "citron", categories: ["fruity"], type: "everyday", source: "lemonCheesecake", voice: "marcelo" },
    { key: "mangue", slug: "mangue", categories: ["fruity"], type: "everyday", source: "mangoCheesecake", voice: "milo" },
    { key: "framboise", slug: "framboise", categories: ["fruity"], type: "everyday", source: "raspberryCheesecake", voice: "marcelo" },
    { key: "nutellaCrousti", slug: "nutella-crousti", categories: ["chocolatey", "crunchy"], type: "everyday", source: "nutellaCrousti", voice: "milo" },
    { key: "redVelvet", slug: "red-velvet", categories: ["creamy"], type: "everyday", source: "redVelvet", voice: "marcelo" },
    { key: "mousseAuChocolat", slug: "mousse-au-chocolat", categories: ["chocolatey"], type: "everyday", source: "chocolateMousse", voice: "marcelo" },
    { key: "cookies", slug: "cookies", categories: ["crunchy"], type: "everyday", source: null, voice: "milo" },
];

// Cookies has no product folder yet: only photos with their background.
// [Image needed] a no-background shot of the pot, like the others (see IMAGES-NEEDED.md).
const cookiesPhoto = (view: string) => encodeURI(`/momento_product/Cookies Chocolat au lait - ${view}.jpeg`);
const COOKIES_PHOTO = cookiesPhoto("face 3-4 droite");
const COOKIES_GALLERY = ["face", "face inclinee", "arriere"].map(cookiesPhoto);

export type Creation = Entry & {
    /** position in the menu; higher = added later ("Newest first") */
    order: number;
    /** the pot, half open, no background */
    image: string;
    /** false when `image` still has its photo background (Cookies) */
    cutOut: boolean;
    /** other views for the product page: open from above, front with label, top */
    gallery: string[];
    weight: string;
    nutrition: MomentoNutrition | null;
};

export const CREATIONS: Creation[] = ENTRIES.map((entry, order) => {
    const src = MOMENTO_PRODUCT_SOURCES.find((s) => s.key === entry.source);
    const pics = src ? images(src) : null;
    return {
        ...entry,
        order,
        image: pics ? pics.card_image : COOKIES_PHOTO,
        cutOut: Boolean(pics),
        // other_images = shots 1, 2, 3, 5, 6, 7, 8 → [0] front with label, [6] seen from above
        gallery: pics ? [pics.main_image, pics.other_images[0], pics.other_images[6]] : COOKIES_GALLERY,
        weight: src?.weight ?? "",
        nutrition: src?.nutrition ?? null,
    };
});

export const findCreation = (slug: string) => CREATIONS.find((c) => c.slug === slug);

/** Three other creations: same category first, then the next ones in the menu. */
export function relatedCreations(creation: Creation, count = 3): Creation[] {
    const others = CREATIONS.filter((c) => c.key !== creation.key);
    const close = others.filter((c) => c.categories.some((cat) => creation.categories.includes(cat)));
    const rest = others.filter((c) => !close.includes(c));
    // start after the creation itself, so neighbours differ from page to page
    const rotate = (list: Creation[]) => {
        const i = list.findIndex((c) => c.order > creation.order);
        return i <= 0 ? list : [...list.slice(i), ...list.slice(0, i)];
    };
    return [...rotate(close), ...rotate(rest)].slice(0, count);
}
