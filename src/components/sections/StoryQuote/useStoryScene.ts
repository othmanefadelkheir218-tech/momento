"use client";

import { RefObject } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

// Animations of the desktop story scene, inspired by the old "We love partnerships" section:
//   1. slow parallax: the picture drifts down slowly while the page scrolls, so it feels almost fixed
//      behind the text. The layer is a bit taller than the section, so it never shows an edge.
//   2. the words rise in one after the other (eyebrow, sentence, button) when the section comes into
//      view, and go back down if the visitor scrolls back up above it.
// Parts are marked data-story-bg and data-story-rise in StoryScene.tsx. Reduced motion: no animation.

const DRIFT = 3.5; // how far the picture drifts, in % of its own height (up and down) — stays inside the extra 4%

export function useStoryScene(ref: RefObject<HTMLElement | null>) {
    useGSAP(() => {
        const root = ref.current;
        if (!root) return;
        const mm = gsap.matchMedia();
        mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
            gsap.fromTo(root.querySelector("[data-story-bg]"), { yPercent: -DRIFT }, {
                yPercent: DRIFT,
                ease: "none",
                scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: 1, invalidateOnRefresh: true },
            });

            gsap.from(root.querySelectorAll("[data-story-rise]"), {
                y: 70,
                autoAlpha: 0,
                duration: 1.1,
                stagger: 0.16,
                ease: "power3.out",
                scrollTrigger: { trigger: root, start: "top 65%", toggleActions: "play none none reverse" },
            });
        });
        return () => mm.revert();
    }, { scope: ref });
}
