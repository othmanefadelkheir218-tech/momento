// The Marcelo & Milo mini-series episodes, shown in the "Suivez les épisodes" section
// (src/components/sections/Episodes). Titles are translated: Sections.episodes.<key>.
// `focus`: which part of the picture stays visible in the portrait card (CSS object-position).

export type Episode = { key: "ep1" | "ep2" | "ep3" | "ep4"; image: string; focus: string };

export const EPISODES: Episode[] = [
    { key: "ep1", image: "/Cozy_Bakery_Kitchen_with_Dessert_Cups.png", focus: "42% 50%" },
    { key: "ep2", image: "/new_heroImage.jpeg", focus: "46% 55%" },
    { key: "ep3", image: "/heroSection/frame_000100.jpeg", focus: "30% 60%" },
    {
        key: "ep4",
        image: "/momento_product/Tiramisu speculoos 115g/images/Tiramisu speculoos - 1 face avec etiquette.jpg",
        focus: "50% 55%",
    },
];
