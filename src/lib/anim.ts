// lib/anim.ts
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);

export const DURATION = 1; // Time to cover / uncover the screen

/**
 * Page-transition easing. Pick one and set TRANSITION_EASE below.
 *
 * - "current":  the feel the site has always had. The old code passed
 *               "cubic-bezier(0.76, 0, 0.24, 1)" as a string, which GSAP does
 *               not understand, so it silently fell back to its default
 *               (power1.out). This keeps that exact look.
 * - "intended": the cubic-bezier(0.76, 0, 0.24, 1) curve that was originally
 *               written — slow start, fast middle, slow landing.
 */
export const EASES = {
    current: "power1.out",
    intended: CustomEase.create("momentoInOut", "0.76,0,0.24,1"),
} as const;

export const TRANSITION_EASE = EASES.current;

/** How far the curtain's curved edges bulge, in px. */
export const CURTAIN_BULGE = 300;

/**
 * The two shapes of the red curtain, in CSS pixels of the current viewport.
 * The SVG they live in is (height + 2 * bulge) tall.
 */
export const curtainPaths = (w: number, h: number) => ({
    // Screen covered: bottom edge pushed down past the viewport, curving further down
    covered: `M0 ${CURTAIN_BULGE} Q${w / 2} 0 ${w} ${CURTAIN_BULGE} L${w} ${h + CURTAIN_BULGE} Q${w / 2} ${h + 2 * CURTAIN_BULGE} 0 ${h + CURTAIN_BULGE} L0 0`,
    // Screen revealed: bottom edge flattened (only seen while it slides away)
    revealed: `M0 ${CURTAIN_BULGE} Q${w / 2} 0 ${w} ${CURTAIN_BULGE} L${w} ${h} Q${w / 2} ${h} 0 ${h} L0 0`,
});

/** Vertical offset of the curtain SVG for each state. */
export const curtainY = (state: "covered" | "revealed", h: number) =>
    state === "covered" ? -CURTAIN_BULGE : -h;

export const logoAnim = (element: SVGPathElement, box?: HTMLElement | null) => {
    const length = element.getTotalLength();

    return {
        enter: () => {
            // Shrink away in place, from whatever the logo currently looks
            // like. No reset here: on a navigation the exit animation has
            // just drawn the logo, and wiping that would make it pop.
            const shrink = 0.32;

            const done = () => {
                if (box) gsap.set(box, { autoAlpha: 0 });
                else gsap.set(element, { autoAlpha: 0 });
            };

            gsap.timeline({ onComplete: done })
                .to(element, {
                    scale: 0,
                    duration: shrink,
                    ease: "power3.in",
                    transformOrigin: "center center"
                }, 0)
                // Fade only at the tail, so it reads as vanishing rather than
                // leaving a dot behind at the end of the scale.
                .to(element, {
                    opacity: 0,
                    duration: shrink * 0.5,
                    ease: "power1.in"
                }, shrink * 0.5);
        },
        exit: () => {
            // Pencil-trace the outline, then fill it in solid.
            // This is the only stage that needs a clean slate, so the reset
            // lives here rather than on every logoAnim() call.
            gsap.killTweensOf(element);
            if (box) gsap.killTweensOf(box);

            gsap.set(element, {
                strokeDasharray: length,
                strokeDashoffset: length,
                fillOpacity: 0,
                autoAlpha: 1,
                scale: 1,
                transformOrigin: "center center"
            });

            // autoAlpha, so it also clears the visibility:hidden left by enter()
            if (box) gsap.set(box, { y: 0, autoAlpha: 1 });

            return new Promise<void>((resolve) => {
                const tlExit = gsap.timeline({
                    onComplete: () => resolve()
                });

                tlExit.to(element, {
                    strokeDashoffset: 0,
                    duration: DURATION,
                    ease: "power2.inOut"
                })
                    .to(element, {
                        fillOpacity: 1,
                        duration: 0.3,
                        ease: "power1.out"
                    });
            });
        }
    };
};
