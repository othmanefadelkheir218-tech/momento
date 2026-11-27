"use client";

import { ReactNode, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

// Calm entrance: the content fades in and rises a little, once, when it comes into view.
// `stagger`: animate the direct children one after the other instead (cards, lists).

type Props = {
    children: ReactNode;
    className?: string;
    delay?: number;
    stagger?: number;
};

export default function FadeIn({ children, className = "", delay = 0, stagger }: Props) {
    const ref = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const el = ref.current;
        if (!el) return;
        const mm = gsap.matchMedia();
        mm.add("(prefers-reduced-motion: no-preference)", () => {
            gsap.from(stagger ? el.children : el, {
                autoAlpha: 0,
                y: 28,
                duration: 1,
                delay,
                stagger,
                ease: "power3.out",
                // clamp(): content at the very end of the page (that can never reach 88% of the
                // screen) still plays when the page is scrolled to the bottom
                scrollTrigger: { trigger: el, start: "clamp(top 88%)", once: true },
            });
        });
        return () => mm.revert();
    }, { scope: ref });

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    );
}
