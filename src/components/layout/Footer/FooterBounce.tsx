"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { useLocale } from "next-intl";
import { usePathname } from "@/i18n/navigation";

// The footer's top edge, like a rubber sheet: it hangs in a soft bowl while the footer is still
// below, then snaps flat and settles with a small wobble when the visitor arrives (a faster scroll
// rings a little more). The footer's content rides the same spring, a beat behind.
//
// It draws in the empty space the footer's top margin leaves (same heights: h-24 sm:h-32 lg:h-44),
// so the wobble never covers the section above. Fill = cream-dark (the footer surface), rim = a thin
// burgundy line, which is what makes the movement readable on such a soft colour.
// With prefers-reduced-motion the edge is simply flat.

// Filled shape + the same top edge as an open line (for the rim). Same commands in the same order,
// so MorphSVG moves them point by point.
const BOWED = "M0,120C0,120,464,620,1139,620S2278,120,2278,120V683H0V120z";
const FLAT = "M0,120C0,120,464,120,1139,120S2278,120,2278,120V683H0V120z";
const BOWED_RIM = "M0,120C0,120,464,620,1139,620S2278,120,2278,120";
const FLAT_RIM = "M0,120C0,120,464,120,1139,120S2278,120,2278,120";

const SNAP_DURATION = 2; // seconds to settle
const CONTENT_LIFT = 30; // px the content drops and springs back
const VELOCITY_SCALE = 10000; // scroll speed (px/s) that counts as one unit of variation
const MAX_VARIATION = 0.45; // keeps the elastic period above 0 (else the path disappears)
const BASE_AMPLITUDE = 1.05;
const BASE_PERIOD = 0.5;

export default function FooterBounce() {
    const bandRef = useRef<HTMLDivElement>(null);
    const fillRef = useRef<SVGPathElement>(null);
    const rimRef = useRef<SVGPathElement>(null);

    // The footer lives in the layout and survives page changes, so the trigger is rebuilt for
    // each page (and language): each one has its own height.
    const routeKey = `${useLocale()}|${usePathname()}`;

    useLayoutEffect(() => {
        const band = bandRef.current;
        const fill = fillRef.current;
        const rim = rimRef.current;
        if (!band || !fill || !rim) return;

        const content = band.parentElement?.querySelector<HTMLElement>("[data-footer-lift]");

        const setShape = (bowed: boolean) => {
            fill.setAttribute("d", bowed ? BOWED : FLAT);
            rim.setAttribute("d", bowed ? BOWED_RIM : FLAT_RIM);
            if (content) gsap.set(content, { y: 0 });
        };

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setShape(false);
            return;
        }

        gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin);

        // Already past the trigger (refresh at the bottom, back button…): no arrival to play.
        setShape(band.getBoundingClientRect().top >= window.innerHeight * 0.7);

        let snap: gsap.core.Timeline | null = null;

        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: band,
                // late on purpose: the visitor sees the slack bowl first, then sees it let go
                start: "top 70%",
                // measured after the page's own pinned sections, which move everything below them
                refreshPriority: -1,
                onRefresh: (self) => {
                    if (self.progress > 0 && !snap?.isActive()) setShape(false);
                },
                onEnter: (self) => {
                    const v = gsap.utils.clamp(-MAX_VARIATION, MAX_VARIATION, self.getVelocity() / VELOCITY_SCALE);
                    const ease = `elastic.out(${BASE_AMPLITUDE + v}, ${BASE_PERIOD - v * 0.2})`;

                    snap?.kill();
                    snap = gsap.timeline({ defaults: { duration: SNAP_DURATION, ease } });
                    snap.fromTo(fill, { morphSVG: BOWED }, { morphSVG: FLAT }, 0)
                        .fromTo(rim, { morphSVG: BOWED_RIM }, { morphSVG: FLAT_RIM }, 0);
                    if (content) snap.fromTo(content, { y: CONTENT_LIFT }, { y: 0 }, 0.08);
                },
            });
        }, band);

        // re-measure once images and fonts have changed the page height
        const refresh = () => ScrollTrigger.refresh();
        window.addEventListener("load", refresh);
        document.fonts?.ready.then(refresh);
        const frame = requestAnimationFrame(refresh);

        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener("load", refresh);
            snap?.kill();
            ctx.revert();
        };
    }, [routeKey]);

    return (
        <div
            ref={bandRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-full h-24 sm:h-32 lg:h-44 text-cream-dark"
        >
            {/* "none" stretches the shape to any screen width; the stroke stays 1.5px thanks to non-scaling-stroke */}
            <svg viewBox="0 0 2278 683" preserveAspectRatio="none" className="block h-full w-full overflow-visible">
                <path ref={fillRef} d={BOWED} fill="currentColor" />
                <path
                    ref={rimRef}
                    d={BOWED_RIM}
                    fill="none"
                    strokeWidth={1.5}
                    vectorEffect="non-scaling-stroke"
                    className="stroke-burgundy"
                />
            </svg>
        </div>
    );
}
