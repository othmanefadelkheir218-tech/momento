"use client";

import { useEffect } from "react";
import ReactLenis, { useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "@/i18n/navigation";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

/**
 * Keeps Lenis and ScrollTrigger in step:
 * - Lenis is driven by GSAP's ticker, so smooth scroll and scroll animations
 *   update in the same frame (no extra lag on top of `scrub`).
 * - ScrollTrigger re-measures its start/end positions after a page change,
 *   after images load and once fonts are ready. Client-side navigation never
 *   fires the window `load` event, so without this the positions stay
 *   measured from a half-loaded page.
 */
function ScrollSync() {
    const lenis = useLenis();
    const pathname = usePathname();

    // 1. One clock for Lenis + GSAP
    useEffect(() => {
        if (!lenis) return;

        const offScroll = lenis.on("scroll", ScrollTrigger.update);
        const tick = (time: number) => lenis.raf(time * 1000);

        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);

        return () => {
            offScroll();
            gsap.ticker.remove(tick);
        };
    }, [lenis]);

    // 2. Re-measure when the layout settles
    useEffect(() => {
        let timer: ReturnType<typeof setTimeout> | null = null;
        const refreshSoon = () => {
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => ScrollTrigger.refresh(), 150);
        };

        // New page mounted: wait a frame so its sections exist
        const raf = requestAnimationFrame(refreshSoon);

        // Images (incl. lazy-loaded sections) change the page height
        const onLoad = (e: Event) => {
            if ((e.target as HTMLElement)?.tagName === "IMG") refreshSoon();
        };
        document.addEventListener("load", onLoad, true);

        // Web fonts change text height
        document.fonts?.ready.then(refreshSoon);

        return () => {
            cancelAnimationFrame(raf);
            if (timer) clearTimeout(timer);
            document.removeEventListener("load", onLoad, true);
        };
    }, [pathname]);

    return null;
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    return (
        <ReactLenis root options={{ autoRaf: false }}>
            <ScrollSync />
            {children}
        </ReactLenis>
    );
}
