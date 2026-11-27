"use client";

import { ReactNode, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

// Image reveal on scroll (desktop only): the picture opens from a smaller rounded window to its full
// size while it settles from a slight zoom — tied to the scroll, so it moves with the visitor.
// Phones / reduced motion: the picture is simply shown.

export default function RevealImage({ children, className = "" }: { children: ReactNode; className?: string }) {
    const outer = useRef<HTMLDivElement>(null);
    const inner = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!outer.current || !inner.current) return;
        const mm = gsap.matchMedia();
        mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
            const scrollTrigger = { trigger: outer.current, start: "top 85%", end: "center 38%", scrub: 0.8 };
            gsap.fromTo(
                outer.current,
                { clipPath: "inset(16% 12% 16% 12% round 32px)" },
                { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "power2.out", scrollTrigger },
            );
            gsap.fromTo(inner.current, { scale: 1.22 }, { scale: 1, ease: "power2.out", scrollTrigger: { ...scrollTrigger } });
        });
        return () => mm.revert();
    }, { scope: outer });

    return (
        <div ref={outer} className={className}>
            <div ref={inner} className="will-change-transform">
                {children}
            </div>
        </div>
    );
}
