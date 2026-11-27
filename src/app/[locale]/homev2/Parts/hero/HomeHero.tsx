"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroFrameSequence from "../HeroFrameSequence";
import HeroPromoCopy from "../v1/HeroPromoCopy";
import { HeroV1Copy, HeroV2Title } from "./HeroCopy";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const CREAM = "#F7EFE2";

// ── Hero version switch ──
//   "v2" → (live) the picture fills the first screen with no text; on scroll it shrinks into a
//          frame and the title rides down with the frame's top edge (HeroV2Title).
//   "v1" → previous version: the title sits on the left, over a cream haze on the picture (HeroV1Copy).
// To switch, change the value below.
const HERO_VERSION: "v1" | "v2" = "v2";

// v2: soft mask on the framed picture, so its edges fade into the cream instead of a hard line.
// Two gradients (left/right and top/bottom) kept where both are opaque; widths come from CSS vars
// animated with the shrink (all 0% = no fade at full screen).
const FEATHER_MASK =
    "linear-gradient(to right, transparent, #000 var(--fx), #000 calc(100% - var(--fx)), transparent)," +
    "linear-gradient(to bottom, transparent var(--ts), #000 var(--te), #000 calc(100% - var(--fb)), transparent)";

// The old hero text (v1/HeroPromoCopy.tsx) is hidden — set to true to show it again.
const SHOW_HERO_CONTENT = false;

/** Home hero: the scroll-driven frame sequence (HeroFrameSequence) + the hero text and its animation. */
export default function HomeHero() {
    const t = useTranslations("HomeV2");

    const heroStageRef = useRef<HTMLDivElement>(null); // the picture (inside HeroFrameSequence)
    const heroV2TitleRef = useRef<HTMLDivElement>(null);
    const heroV1CopyRef = useRef<HTMLDivElement>(null);
    const heroV1HazeRef = useRef<HTMLDivElement>(null);

    // Hero v2: full-screen picture first, then on scroll it shrinks into a frame
    // and the title comes down with the frame's top edge.
    useGSAP(() => {
        if (HERO_VERSION !== "v2") return;
        const stage = heroStageRef.current;
        const copy = heroV2TitleRef.current;
        if (!stage || !copy) return;
        const section = stage.closest("section");
        if (!section) return;

        const mm = gsap.matchMedia();
        mm.add(
            {
                desktop: "(min-width: 768px)",
                mobile: "(max-width: 767px)",
                reduce: "(prefers-reduced-motion: reduce)",
            },
            (ctx) => {
                const { desktop, reduce } = ctx.conditions as { desktop: boolean; reduce: boolean };

                // Final look of the picture:
                //  desktop → scaled down to 70% towards a point 75% down the screen: its top edge lands at
                //            22.5% (0.75 × 0.3), leaving 7.5% of cream under it — so the title above sits higher;
                //  mobile  → the top is clipped away (the screen is too narrow to scale it down).
                // Its edges are feathered into the cream (soft mask, see FEATHER_MASK) instead of
                // ending on a hard line: the mask grows from nothing (full screen) to these values.
                //   --fx: left/right fade · --ts → --te: top fade (from → to) · --fb: bottom fade
                //
                // Mobile uses NO mask and NO clip-path: the top of the picture is simply covered by a
                // cream layer that fades out (the phones-only cover div in HeroFrameSequence, driven by
                // the same --ts / --te vars): solid cream down to --ts, then a fade to --te. It looks
                // the same, but phones (iOS Safari especially) mis-place masked / clipped layers inside
                // a sticky box while scrolling, which showed the frame's edge there.
                const framed = desktop
                    ? { scale: 0.7, "--fx": "9%", "--ts": "0%", "--te": "13%", "--fb": "6%" }
                    : { "--ts": "38%", "--te": "47%" };

                if (desktop) {
                    stage.style.setProperty("-webkit-mask-image", FEATHER_MASK);
                    stage.style.setProperty("mask-image", FEATHER_MASK);
                    stage.style.setProperty("-webkit-mask-composite", "source-in");
                    stage.style.setProperty("mask-composite", "intersect");
                    gsap.set(stage, { "--fx": "0%", "--ts": "0%", "--te": "0%", "--fb": "0%", transformOrigin: "50% 75%" });
                } else {
                    // The fade keeps the SAME height (9%) the whole time: it starts just above the
                    // picture (-9% → 0%, invisible) and slides down to 38% → 47%. If it grew from
                    // 0%/0% instead, it was only a few px tall at the start of the scroll and showed
                    // as a hard line across the picture.
                    gsap.set(stage, { "--ts": "-9%", "--te": "0%" });
                }
                // Initial state: the title block is fully hidden over the full-screen picture.
                gsap.set(copy, { autoAlpha: 0 });

                if (reduce) {
                    gsap.set(stage, framed);
                    gsap.set(copy, { autoAlpha: 1 });
                    return;
                }

                gsap.timeline({
                    scrollTrigger: {
                        trigger: section,
                        start: "top top",
                        end: "+=65%", // the shrink's scroll length (unchanged)
                        scrub: 0.8,
                        invalidateOnRefresh: true,
                    },
                })
                    .to(stage, { ...framed, duration: 1, ease: "power2.inOut" }, 0)
                    // The title rides ON the frame's top edge: it starts above the screen and comes
                    // down with the edge (same duration + ease, so its bottom stays exactly on the edge).
                    // So the cream space above the picture is never empty, and the title can never
                    // overlap the picture. (Before, it only appeared once the frame was ~90% shrunk,
                    // with words rising out of masks: a long empty gap, and half-cut words whenever
                    // the user stopped scrolling mid-reveal.)
                    .fromTo(
                        copy,
                        { y: () => -(copy.offsetTop + copy.offsetHeight) },
                        { y: 0, duration: 1, ease: "power2.inOut" },
                        0,
                    )
                    .to(copy, { autoAlpha: 1, duration: 0.35, ease: "none" }, 0.1);
            },
        );
        return () => {
            mm.revert();
            ["-webkit-mask-image", "mask-image", "-webkit-mask-composite", "mask-composite"].forEach((p) =>
                heroStageRef.current?.style.removeProperty(p),
            );
        };
    });

    // Hero v1: words rise in, the accent word "writes" itself in, then it all drifts away on scroll.
    // (Does nothing while v2 is live: its markup isn't rendered.)
    useGSAP(() => {
        const copy = heroV1CopyRef.current;
        if (!copy) return;
        const mm = gsap.matchMedia();
        mm.add("(prefers-reduced-motion: no-preference)", () => {
            gsap.timeline({ delay: 0.15 })
                .from(".hv2-rule", { scaleX: 0, duration: 0.55, ease: "power3.out" })
                .from(".hv2-eyebrow-text", { opacity: 0, y: 10, duration: 0.5, ease: "power3.out" }, "<0.05")
                .from(".hv2-w", { yPercent: 115, duration: 0.7, stagger: 0.05, ease: "power4.out" }, "-=0.3")
                .fromTo(
                    ".hv2-accent",
                    { clipPath: "inset(-30% 100% -30% -10%)" },
                    { clipPath: "inset(-30% -10% -30% -10%)", duration: 0.75, ease: "power2.inOut" },
                    "-=0.35",
                )
                .from(".hv2-dot", { opacity: 0, scale: 0, duration: 0.3, ease: "back.out(3)" }, "-=0.1");

            const section = copy.closest("section");
            if (section) {
                const st = { trigger: section, start: "top top", end: "+=40%", scrub: true };
                gsap.to(copy, { y: -80, opacity: 0, ease: "none", scrollTrigger: st });
                gsap.to(heroV1HazeRef.current, { opacity: 0, ease: "none", scrollTrigger: { ...st, end: "+=55%" } });
            }
        });
        return () => mm.revert();
    }, { scope: heroV1CopyRef });

    return (
        <HeroFrameSequence backgroundColor={CREAM} stageRef={heroStageRef}>
            {HERO_VERSION === "v2" ? (
                <HeroV2Title titleRef={heroV2TitleRef} eyebrow={t("heroEyebrow")} title={t.raw("heroTitle") as string} />
            ) : (
                <HeroV1Copy
                    copyRef={heroV1CopyRef}
                    hazeRef={heroV1HazeRef}
                    eyebrow={t("heroEyebrow")}
                    title={t.raw("heroTitle") as string}
                />
            )}
            {SHOW_HERO_CONTENT && <HeroPromoCopy />}
        </HeroFrameSequence>
    );
}
