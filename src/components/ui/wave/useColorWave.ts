"use client";

import { RefObject } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

// Scroll colour wave (desktop only): all the WaveText letters inside `ref` start light; as the page
// scrolls, a warm wave runs through them in reading order — light caramel → caramel → deep red-brown
// → each letter's final colour (burgundy for titles, chocolate for text). Scroll back, it rewinds.

const BASE = [226, 198, 172]; // light caramel: "not read yet"
const STOPS: [number, number[]][] = [
    [0, BASE],
    [0.35, [198, 139, 78]], // caramel #C68B4E: the bright front of the wave
    [0.7, [142, 59, 42]], // deep red-brown, on the way to the final colour
];
const WAVE_LETTERS = 14; // how many letters the wave spreads over (bigger = softer)

const hexToRgb = (hex: string) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
const mix = (a: number[], b: number[], t: number) => a.map((v, i) => Math.round(v + (b[i] - v) * t));

/** Colour of a letter `d` along the wave (0 = not reached, 1 = passed). */
function colourAt(d: number, final: number[]) {
    if (d <= 0) return BASE;
    if (d >= 1) return final;
    const stops: [number, number[]][] = [...STOPS, [1, final]];
    for (let k = 1; k < stops.length; k++) {
        const [x1, c1] = stops[k];
        if (d <= x1) {
            const [x0, c0] = stops[k - 1];
            return mix(c0, c1, (d - x0) / (x1 - x0));
        }
    }
    return final;
}

export function useColorWave(ref: RefObject<HTMLElement | null>) {
    useGSAP(() => {
        const root = ref.current;
        if (!root) return;
        const mm = gsap.matchMedia();
        mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
            const letters = [...root.querySelectorAll<HTMLElement>("[data-wave]")];
            const finals = letters.map((el) => hexToRgb(el.dataset.wave!));
            const painted: string[] = [];
            const n = letters.length;

            const paint = (progress: number) => {
                const front = progress * (n + WAVE_LETTERS);
                letters.forEach((el, i) => {
                    const [r, g, b] = colourAt((front - i) / WAVE_LETTERS, finals[i]);
                    const css = `rgb(${r} ${g} ${b})`;
                    if (css !== painted[i]) el.style.color = painted[i] = css; // only what changed
                });
            };

            const state = { p: 0 };
            paint(0);
            gsap.to(state, {
                p: 1,
                ease: "none",
                onUpdate: () => paint(state.p),
                scrollTrigger: { trigger: root, start: "top 66%", end: "bottom 28%", scrub: 0.6 },
            });
            // a ScrollTrigger refresh restores the progress without onUpdate: repaint after it
            const repaint = () => paint(state.p);
            ScrollTrigger.addEventListener("refresh", repaint);

            return () => {
                ScrollTrigger.removeEventListener("refresh", repaint);
                letters.forEach((el) => (el.style.color = el.dataset.wave!)); // back to the final colours
            };
        });
        return () => mm.revert();
    }, { scope: ref });
}
