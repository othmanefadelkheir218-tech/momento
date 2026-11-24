import { Playfair_Display, Jost } from "next/font/google";

// Same pairing as the Coming Soon page: elegant italic serif for titles,
// clean geometric sans for body text.
export const serif = Playfair_Display({
    subsets: ["latin"],
    weight: ["400", "500"],
    style: ["normal", "italic"],
    display: "swap",
    variable: "--font-hv2-serif",
});

export const sans = Jost({
    subsets: ["latin"],
    weight: ["400", "500"],
    display: "swap",
    variable: "--font-hv2-sans",
});
