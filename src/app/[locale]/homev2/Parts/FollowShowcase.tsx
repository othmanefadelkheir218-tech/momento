"use client";

import { ReactNode, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

// Desktop only. The products showcase (CreationsArc) holds the page still for a short scroll
// (HOLD_VH) while its products move. Without this, the section after it kept scrolling up during
// that hold: far away at first, close only at the end. This holds it back part of the way (FOLLOW),
// so it starts closer and still comes a little closer while scrolling, ending ~100px under the
// showcase. Phones have no hold, so nothing happens there.

const HOLD_VH = 30; // = PIN_VH in CreationsArc.tsx: change both together
const FOLLOW = 0.6; // 0 = original (starts far), 1 = the gap never changes; 0.6 = starts closer, shrinks a little

export default function FollowShowcase({ children, className = "" }: { children: ReactNode; className?: string }) {
    const ref = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const el = ref.current;
        const showcase = document.getElementById("hv2-creations");
        if (!el || !showcase) return;
        const mm = gsap.matchMedia();
        mm.add("(min-width: 768px)", () => {
            gsap.fromTo(
                el,
                { y: () => -window.innerHeight * (HOLD_VH / 100) * FOLLOW },
                {
                    y: 0,
                    ease: "none",
                    scrollTrigger: { trigger: showcase, start: "top top", end: "bottom bottom", scrub: true, invalidateOnRefresh: true },
                },
            );
        });
        return () => mm.revert();
    }, { scope: ref });

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    );
}
