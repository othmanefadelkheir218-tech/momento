// components/Layout/anim.ts
import gsap from "gsap";

const duration = 1; // Time to cover screen

export const textAnim = (element: HTMLElement) => {
    const tl = gsap.timeline();
    return {
        enter: () => {
            // Reveal Text
            tl.to(element, { opacity: 0, top: -100, duration: duration, ease: "cubic-bezier(0.76, 0, 0.24, 1)" });
        },
        exit: () => {
            // Show Text (during black screen)
            tl.to(element, { opacity: 1, top: "40%", duration: 0.5, ease: "power3.out" });
        }
    };
};

export const curveAnim = (element: SVGPathElement, initialPath: string, targetPath: string) => {
    const tl = gsap.timeline();
    return {
        enter: () => {
            // Uncover Screen (Go UP)
            tl.to(element, { attr: { d: targetPath }, duration: duration, ease: "cubic-bezier(0.76, 0, 0.24, 1)" });
        },
        exit: () => {
            // Cover Screen (Come DOWN)
            // We return a Promise to let the router know when we are done
            return new Promise<void>((resolve) => {
                // Safety timeout in case GSAP fails
                const timeout = setTimeout(() => {
                    console.warn("Animation timeout - forcing navigation");
                    resolve();
                }, (duration * 1000) + 100);

                tl.to(element, {
                    attr: { d: initialPath },
                    duration: duration,
                    ease: "cubic-bezier(0.76, 0, 0.24, 1)",
                    onComplete: () => {
                        clearTimeout(timeout);
                        resolve();
                    }
                });
            });
        }
    };
};

export const translateAnim = (element: SVGSVGElement) => {
    const tl = gsap.timeline();
    return {
        enter: () => {
            tl.to(element, { top: "-100vh", duration: duration, ease: "cubic-bezier(0.76, 0, 0.24, 1)" });
        },
        exit: () => {
            return new Promise<void>((resolve) => {
                tl.to(element, {
                    top: "-300px",
                    duration: duration,
                    ease: "cubic-bezier(0.76, 0, 0.24, 1)",
                    onComplete: () => { resolve() }
                });
            });
        }
    };
};

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
                    duration: duration,
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