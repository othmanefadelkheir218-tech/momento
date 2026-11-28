// The Marcelo & Milo mini-series, one per season, shown on The Momento World page (/world).
// Titles and texts: Sections.world.series.<key>.
// `reel`: link to the Reel or playlist — "" until it exists [To be confirmed]; the row then links to
// the Instagram profile. `image`: the cover picture, null until it exists (see IMAGES-NEEDED.md).

export type MiniSeries = { key: string; image: string | null; reel: string };

export const MINI_SERIES: MiniSeries[] = [
    { key: "christmas", image: null, reel: "" },
    { key: "valentine", image: null, reel: "" },
    { key: "ramadan", image: null, reel: "" },
    { key: "easter", image: null, reel: "" },
    { key: "summer", image: null, reel: "" },
    { key: "backToSchool", image: null, reel: "" },
];
