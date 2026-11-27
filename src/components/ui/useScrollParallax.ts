"use client";

import { RefObject } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

// Depth while scrolling (desktop only): every element marked `data-parallax="<amount>"` inside `ref`
// drifts vertically while it crosses the screen — from +amount% to -amount% of its own height.
// Different amounts give layers that move at different speeds. Reduced motion: nothing moves.

export function useScrollParallax(ref: RefObject<HTMLElement | null>) {
    useGSAP(() => {
        const root = ref.current;
        if (!root) return;
        const mm = gsap.matchMedia();
        mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
            root.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
                const amount = Number(el.dataset.parallax) || 6;
                gsap.fromTo(el, { yPercent: amount }, {
                    yPercent: -amount,
                    ease: "none",
                    scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 1 },
                });
            });
        });
        return () => mm.revert();
    }, { scope: ref });
}
