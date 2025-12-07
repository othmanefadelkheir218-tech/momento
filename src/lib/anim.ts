// components/Layout/anim.ts
import gsap from "gsap";

const duration = 0.75; // Time to cover screen

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

export const logoAnim = (element: SVGPathElement) => {
    const tl = gsap.timeline();
    const length = element.getTotalLength();

    // Set initial state (hidden/undrawn)
    gsap.set(element, {
        strokeDasharray: length,
        strokeDashoffset: length,
        opacity: 1,
        scale: 1,
        transformOrigin: "center center"
    });

    return {
        enter: () => {
            // Fade out or undraw
            tl.to(element, { opacity: 0, duration: 0.5, ease: "power1.out" });
        },
        exit: () => {
            // Draw the logo
            tl.to(element, {
                strokeDashoffset: 0,
                duration: duration,
                ease: "power2.inOut"
            })
            .to(element, {
                scale: 0,
                duration: 0.2,
                ease: "power1.in"
            });
        }
    };
};