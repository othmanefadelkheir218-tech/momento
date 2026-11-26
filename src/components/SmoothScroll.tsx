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
    //    Never while the page is moving: a refresh in the middle of a (touch / momentum) scroll
    //    makes the page jump up or down on iPhones. So it waits until the scroll has been still
    //    for a moment. Image loads only count when they really changed the page height (most
    //    images have a fixed size, e.g. the product pictures, which load right as the user
    //    scrolls into the products section).
    useEffect(() => {
        let timer: ReturnType<typeof setTimeout> | null = null;
        let lastScroll = 0;
        let lastHeight = document.documentElement.scrollHeight;
        const IDLE_MS = 250;

        const refreshSoon = () => {
            if (timer) clearTimeout(timer);
            timer = setTimeout(function run() {
                const still = performance.now() - lastScroll;
                if (still < IDLE_MS) {
                    timer = setTimeout(run, IDLE_MS - still + 20);
                    return;
                }
                timer = null;
                lastHeight = document.documentElement.scrollHeight;
                ScrollTrigger.refresh();
            }, 150);
        };
        const onScroll = () => {
            lastScroll = performance.now();
        };
        window.addEventListener("scroll", onScroll, { passive: true });

        // New page mounted: wait a frame so its sections exist
        const raf = requestAnimationFrame(refreshSoon);

        // Images (incl. lazy-loaded sections) can change the page height
        const onLoad = (e: Event) => {
            if ((e.target as HTMLElement)?.tagName !== "IMG") return;
            if (document.documentElement.scrollHeight === lastHeight) return; // nothing moved
            refreshSoon();
        };
        document.addEventListener("load", onLoad, true);

        // Web fonts change text height
        document.fonts?.ready.then(refreshSoon);

        return () => {
            cancelAnimationFrame(raf);
            if (timer) clearTimeout(timer);
            window.removeEventListener("scroll", onScroll);
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
