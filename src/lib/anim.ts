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

    // Set initial state (hidden/undrawn, unfilled)
    gsap.set(element, {
        strokeDasharray: length,
        strokeDashoffset: length,
        fillOpacity: 0,
        opacity: 1,
        scale: 1,
        transformOrigin: "center center"
    });

    // Logo always starts centered and visible for every transition
    if (box) gsap.set(box, { y: 0, opacity: 1 });

    return {
        enter: () => {
            // Ride up and off with the curtain, instead of dissolving
            // in place on top of the page that just got revealed.
            if (!box) {
                gsap.to(element, { opacity: 0, duration: 0.8, ease: "sine.inOut" });
                return;
            }

            const travel = typeof window !== "undefined" ? window.innerHeight : 1000;

            gsap.timeline()
                .to(box, {
                    y: -travel,
                    duration: duration,
                    ease: "cubic-bezier(0.76, 0, 0.24, 1)" // same as translateAnim, so it moves locked to the curtain
                }, 0)
                // Scale down as it rises, so it reads as receding rather than just sliding
                .to(element, {
                    scale: 0.55,
                    duration: duration,
                    ease: "sine.inOut"
                }, 0)
                .to(box, {
                    opacity: 0,
                    duration: duration * 0.55,
                    ease: "sine.in"
                }, duration * 0.4);
        },
        exit: () => {
            // Pencil-trace the outline, then fill it in solid
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