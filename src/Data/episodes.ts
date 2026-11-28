// The Marcelo & Milo mini-series episodes, shown in the "Suivez les épisodes" section
// (src/components/sections/Episodes). Titles are translated: Sections.episodes.<key>.
// `focus`: which part of the picture stays visible in the portrait card (CSS object-position).

export type Episode = { key: "ep1" | "ep2" | "ep3" | "ep4"; image: string; focus: string };

export const EPISODES: Episode[] = [
    { key: "ep1", image: "/The_delivery.png", focus: "50% 40%" },
    { key: "ep2", image: "/handshake.png", focus: "50% 45%" },
    { key: "ep3", image: "/partners_display.png", focus: "50% 45%" },
    { key: "ep4", image: "/guests_moment.png", focus: "50% 55%" },
];

// Previous pictures (v1), to switch back:
//   ep1 "/Cozy_Bakery_Kitchen_with_Dessert_Cups.png" (42% 50%)
//   ep2 "/new_heroImage.jpeg" (46% 55%)
//   ep3 "/heroSection/frame_000100.jpeg" (30% 60%)
//   ep4 "/momento_product/Tiramisu speculoos 115g/images/Tiramisu speculoos - 1 face avec etiquette.jpg" (50% 55%)
