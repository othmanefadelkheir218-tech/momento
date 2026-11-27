"use client";

import { RefObject } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

// Animations of the three reasons (parts marked with data-* in Reason.tsx).
// Desktop, tied to the scroll (scrolling back plays it backwards):
//   1. each arch opens upwards from its baseline, one after the other, the picture settling from a zoom
//   2. then its hairline draws from left to right, then the number/title and the text rise in
//   3. depth: while scrolling, the picture moves a little slower than its frame
// Phones: the simple fade-in they always had. Reduced motion: no animation.

// Two parts, each spread over its own stretch of scroll (a longer stretch = slower); SMOOTH is how
// long (seconds) the animation takes to catch up with the scroll (higher = softer, floatier).
//   pictures: open from ARCH_START until the pictures' centre reaches ARCH_END — they are complete
//             before they reach the middle of the screen (a bit before, because of SMOOTH);
//   lines + text: follow, and are complete when the reasons' centre reaches TEXT_END (just before
//             the middle of the screen).
const ARCH_START = "top 95%"; // when the top of the pictures reaches 95% of the screen…
const ARCH_END = "center 62%"; // …until their centre reaches 62% of the screen
const TEXT_START = "top 80%"; // when the top of the reasons reaches 80% of the screen…
const TEXT_END = "center 58%"; // …until their centre reaches 58% of the screen
const SMOOTH = 1.6;
const STAGGER = 0.3; // delay between two reasons (in timeline units)

export function useReasonsReveal(ref: RefObject<HTMLElement | null>) {
    useGSAP(() => {
        const root = ref.current;
        if (!root) return;
        const reasons = [...root.querySelectorAll<HTMLElement>("[data-reason]")];
        const mm = gsap.matchMedia();

        mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
            const firstArch = root.querySelector("[data-arch]");
            const pictures = gsap.timeline({
                scrollTrigger: { trigger: firstArch, start: ARCH_START, end: ARCH_END, scrub: SMOOTH },
            });
            const texts = gsap.timeline({
                scrollTrigger: { trigger: root, start: TEXT_START, end: TEXT_END, scrub: SMOOTH },
            });
            reasons.forEach((reason, i) => {
                const at = i * STAGGER;
                const arch = reason.querySelector("[data-arch]");
                const move = reason.querySelector("[data-arch-move]");
                const line = reason.querySelector("[data-line]");
                const copy = reason.querySelectorAll("[data-copy]");
                pictures
                    .fromTo(arch, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: "sine.inOut" }, at)
                    .fromTo(move, { scale: 1.18 }, { scale: 1, duration: 1, ease: "sine.out" }, at);
                texts
                    .fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: "sine.inOut" }, at)
                    .fromTo(copy, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "sine.out" }, at + 0.2);

                // depth: the picture drifts inside its window while the section crosses the screen
                gsap.fromTo(move, { yPercent: -5 }, {
                    yPercent: 5,
                    ease: "none",
                    scrollTrigger: { trigger: arch, start: "top bottom", end: "bottom top", scrub: 1 },
                });
            });
        });

        mm.add("(max-width: 767px) and (prefers-reduced-motion: no-preference)", () => {
            gsap.from(reasons, {
                autoAlpha: 0,
                y: 28,
                duration: 1,
                stagger: 0.12,
                ease: "power3.out",
                scrollTrigger: { trigger: root, start: "clamp(top 88%)", once: true },
            });
        });

        return () => mm.revert();
    }, { scope: ref });
}
