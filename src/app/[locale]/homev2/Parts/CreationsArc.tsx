"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { MOMENTO_PRODUCT_SOURCES, images } from "@/Data/MomentoProducts";
import { useTransitionRouter } from "@/hooks/useTransitionRouter";
import { slugify } from "@/lib/utils";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

// ── "Nos créations": the products sit on an arc, the centre one right under the hero's falling crumbs ──
//
//  • The section overlaps the end of the hero, so the Spéculoos tiramisu (first product) appears under
//    the dripping cream; the other products then fan out from behind it along the arc.
//  • The products never move on their own. The arc loops, so it never runs out of products.
//  • The user moves them by dragging (mouse / finger), swiping sideways on a trackpad, or with the
//    ← → keys. Clicking a product opens its page (/menu/<slug>).
//  • Desktop: the products fan out while the section slides in, then the section holds the page
//    briefly (PIN_VH of scroll), during which the scroll also moves them by SCROLL_PRODUCTS.
//  • Phones (< 768px): the page scroll never moves the products and there is no scroll hold. They
//    fan out once when the section comes into view; only a sideways swipe moves them.
//  • When the section leaves the screen, everything resets: the Spéculoos is in the centre again.

const FIRST_KEY = "speculoosTiramisu"; // the product facing the hero's last frame
const PIN_VH = 30; // desktop: how long the section holds the page, in vh of scroll (short, on purpose)
const SCROLL_PRODUCTS = 3; // how many products the scroll moves during that hold
const OVERLAP_SVH = 16; // how far the section slides up under the end of the hero
const IMG_RATIO = 305 / 491; // height / width of the "3 ouvert trois quarts" pictures
const ACTIVE_SCALE = 1.22; // the centre product is a little bigger

type Geometry = { cardW: number; radius: number; step: number; visible: number; anchorY: number };

function measure(w: number, h: number): Geometry {
    const desktop = w >= 768;
    // Phones: one big product in the centre (~0.76 of the screen with ACTIVE_SCALE), its two
    // neighbours peeking in at the screen edges to show it can be swiped.
    const cardW = desktop ? Math.min(Math.max(w * 0.15, 150), 260) : Math.min(w * 0.62, 340);
    return {
        cardW,
        // radius of the circle the arc belongs to: bigger = flatter arc. The angle between two products
        // shrinks with it, so they keep the same spacing (~0.14 × screen width on desktop, ~0.7 on phones).
        radius: desktop ? w * 0.95 : w * 1.9,
        step: desktop ? 8.6 : 19, // degrees between two products
        visible: desktop ? 3.2 : 1.3, // how many products are visible on each side
        anchorY: h * 0.17 + (cardW * IMG_RATIO * ACTIVE_SCALE) / 2, // centre of the top product
    };
}

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

export default function CreationsArc() {
    const t = useTranslations("Desserts");
    const tHome = useTranslations("HomeV2");
    const router = useTransitionRouter();

    // Only the products that already have a page; the Spéculoos tiramisu goes first.
    const items = useMemo(() => {
        const list = MOMENTO_PRODUCT_SOURCES.filter((s) => s.legacyKey);
        const first = list.find((s) => s.key === FIRST_KEY);
        const ordered = first ? [first, ...list.filter((s) => s !== first)] : list;
        return ordered.map((s) => {
            const name = t(`Products.${s.legacyKey}.name`);
            return { key: s.key, name, image: images(s).card_image, href: `/menu/${slugify(name)}` };
        });
    }, [t]);
    const N = items.length;

    const sectionRef = useRef<HTMLElement>(null);
    const areaRef = useRef<HTMLDivElement>(null);
    const pivotRef = useRef<HTMLDivElement>(null);
    const copyRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const dragged = useRef(false);
    // scroll: products moved by the page scroll · drag: moved by the user
    // spread: 0 = stacked behind the centre product, 1 = on the arc
    const state = useRef({ scroll: 0, drag: 0, spread: 0 });
    const activeRef = useRef(0);
    const [active, setActive] = useState(0);

    useEffect(() => {
        const section = sectionRef.current;
        const area = areaRef.current;
        const pivot = pivotRef.current;
        const copy = copyRef.current;
        if (!section || !area || !pivot || !copy) return;
        const s = state.current;
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        let geo = measure(area.clientWidth, area.clientHeight);

        // slot of a product: 0 = centre, negative = left, positive = right (wrapped, so it loops)
        const wrap = (v: number) => {
            const m = ((v % N) + N) % N;
            return m >= N / 2 ? m - N : m;
        };

        const layout = () => {
            geo = measure(area.clientWidth, area.clientHeight);
            pivot.style.top = `${geo.anchorY}px`;
            cardRefs.current.forEach((el) => {
                if (el) el.style.width = `${geo.cardW}px`;
            });
            const cardH = geo.cardW * IMG_RATIO * ACTIVE_SCALE;
            copy.style.top = `${geo.anchorY + cardH / 2 + area.clientHeight * 0.05}px`;
        };

        let pointerId: number | null = null;
        let last = "";
        // Last values written to each card. Writing a style (even the same value) makes the browser
        // re-check that card, and a new z-index makes it re-order the layers: on phones this was most
        // of the scroll cost (measured). So only what actually changed is written, and hidden cards
        // are left alone.
        const written: { transform?: string; opacity?: string; z?: string; on?: boolean; hidden?: boolean }[] = [];
        const render = () => {
            const offset = s.scroll + s.drag;
            const key = `${offset.toFixed(4)}|${s.spread.toFixed(4)}|${geo.cardW}`;
            if (key === last) return;
            last = key;
            const { radius, step, visible, cardW } = geo;

            cardRefs.current.forEach((el, i) => {
                if (!el) return;
                const w = (written[i] ??= {});
                const slot = wrap(i + offset);
                const abs = Math.abs(slot);
                const fade = clamp01(visible + 1 - abs); // fades out past the visible products
                const opacity = abs < 0.5 ? fade : fade * s.spread;
                const hidden = opacity < 0.005;
                if (hidden !== w.hidden) {
                    el.style.visibility = hidden ? "hidden" : "";
                    w.hidden = hidden;
                }
                if (!hidden) {
                    const deg = slot * step * s.spread;
                    const rad = (deg * Math.PI) / 180;
                    const x = radius * Math.sin(rad);
                    const y = radius * (1 - Math.cos(rad));
                    // centre product: bigger; it also rises a little while the section comes in
                    const scale = (abs < 1 ? ACTIVE_SCALE - (ACTIVE_SCALE - 1) * abs : 1) * (0.92 + 0.08 * s.spread);
                    const rise = abs < 1 ? (1 - s.spread) * cardW * 0.35 : 0;
                    const transform = `translate(-50%, -50%) translate3d(${x.toFixed(1)}px, ${(y + rise).toFixed(1)}px, 0) rotate(${deg.toFixed(2)}deg) scale(${scale.toFixed(4)})`;
                    if (transform !== w.transform) el.style.transform = w.transform = transform;
                    const op = opacity.toFixed(3);
                    if (op !== w.opacity) el.style.opacity = w.opacity = op;
                }
                // the closer to the centre, the higher (only 3 levels: centre / neighbours / the rest)
                const z = String(100 - Math.min(2, Math.round(abs)));
                if (z !== w.z) el.style.zIndex = w.z = z;
                const on = opacity > 0.3;
                if (on !== w.on) {
                    el.style.pointerEvents = on ? "auto" : "none";
                    el.tabIndex = on ? 0 : -1;
                    w.on = on;
                }
            });
            copy.style.opacity = s.spread.toFixed(3);

            const a = ((-Math.round(offset) % N) + N) % N;
            if (a !== activeRef.current) {
                activeRef.current = a;
                setActive(a);
            }
        };

        layout();
        render();
        gsap.ticker.add(render);
        const onResize = () => {
            layout();
            last = "";
        };
        window.addEventListener("resize", onResize);

        // Desktop and phones behave differently with the page scroll (gsap.matchMedia also switches
        // cleanly when the window crosses 768px).
        const mm = gsap.matchMedia();

        // ── Desktop ──
        mm.add("(min-width: 768px)", () => {
            // 1) Entrance: while the section slides in under the hero, the products fan out on the arc.
            if (reduce) {
                s.spread = 1;
            } else {
                gsap.to(s, {
                    spread: 1,
                    ease: "power2.out",
                    scrollTrigger: { trigger: section, start: "top bottom", end: "top top", scrub: 0.6 },
                });
            }

            // 2) Short pinned part: the scroll moves SCROLL_PRODUCTS products, left → right.
            const scrollTween = gsap.to(s, {
                scroll: SCROLL_PRODUCTS,
                ease: "none",
                scrollTrigger: { trigger: section, start: "top top", end: "bottom bottom", scrub: reduce ? true : 0.6 },
            });

            // 3) User away from the showcase → back to the default: the Spéculoos in the centre.
            //    "Away" = the section is mostly off screen (its top below 75% of the screen, or its bottom
            //    above 25%) — not "fully off screen", which never happens at the bottom of the page.
            //    The drag cancels whatever the scroll has moved (0 when leaving above, SCROLL_PRODUCTS when
            //    leaving below), so it is centred when the user comes back from either direction.
            //    It glides back (instead of jumping), since part of the section can still be visible.
            ScrollTrigger.create({
                trigger: section,
                start: "top 75%",
                end: "bottom 25%",
                onToggle: (self) => {
                    if (self.isActive) return;
                    const scrolled = (scrollTween.scrollTrigger?.progress ?? 0) * SCROLL_PRODUCTS;
                    gsap.to(s, { drag: -scrolled, duration: reduce ? 0 : 0.8, ease: "power2.inOut", overwrite: "auto" });
                },
            });
        });

        // ── Phones: the page scroll never moves the products, only the finger does ──
        mm.add("(max-width: 767px)", () => {
            s.scroll = 0;
            if (reduce) s.spread = 1;
            // In view → the products fan out once (not tied to the scroll).
            // Out of view → back to the default: Spéculoos in the centre, products stacked again,
            // so they fan out again next time.
            ScrollTrigger.create({
                trigger: section,
                start: "top 70%",
                end: "bottom 30%",
                onToggle: (self) => {
                    if (self.isActive) {
                        gsap.to(s, { spread: 1, duration: reduce ? 0 : 0.9, ease: "power2.out", overwrite: "auto" });
                    } else {
                        gsap.killTweensOf(s, "drag");
                        gsap.to(s, { drag: 0, spread: reduce ? 1 : 0, duration: reduce ? 0 : 0.35, ease: "power2.inOut", overwrite: "auto" });
                    }
                },
            });
        });

        // ── Drag / swipe / keys move the arc (on top of the scroll, on desktop) ──
        const pxPerStep = () => geo.radius * Math.sin((geo.step * Math.PI) / 180);
        const settle = () => {
            // finish with a product centred
            const total = s.scroll + s.drag;
            gsap.to(s, { drag: s.drag + Math.round(total) - total, duration: reduce ? 0 : 0.5, ease: "power3.out", overwrite: "auto" });
        };
        const nudge = (dir: number) => {
            const total = s.scroll + s.drag;
            gsap.to(s, { drag: s.drag + Math.round(total) - total + dir, duration: reduce ? 0 : 0.6, ease: "power3.out", overwrite: "auto" });
        };

        // Each gesture is locked to ONE direction, decided by its first few pixels:
        //   sideways → it moves the products only (the page doesn't scroll);
        //   up/down  → it scrolls the page only (the products don't move).
        let startX = 0;
        let startY = 0;
        let startDrag = 0;
        let axis: "x" | "y" | null = null;
        const onDown = (e: PointerEvent) => {
            if (e.button !== 0) return;
            pointerId = e.pointerId;
            startX = e.clientX;
            startY = e.clientY;
            startDrag = s.drag;
            axis = null;
            dragged.current = false;
        };
        const onMove = (e: PointerEvent) => {
            if (pointerId !== e.pointerId) return;
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            if (axis === null) {
                if (Math.hypot(dx, dy) < 8) return;
                axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
                if (axis === "y") return; // page scroll: leave the products alone
                dragged.current = true;
                gsap.killTweensOf(s, "drag");
                startX = e.clientX; // no jump: start moving from here
                area.setPointerCapture(e.pointerId);
                return;
            }
            if (axis === "x") s.drag = startDrag + dx / pxPerStep(); // drag right → products move right
        };
        // While a sideways drag is on, the finger must not scroll the page too (iOS ignores
        // touch-action: pan-y now and then, and Android can start a diagonal scroll).
        const onTouchMove = (e: TouchEvent) => {
            if (axis === "x" && e.cancelable) e.preventDefault();
        };
        const onUp = (e: PointerEvent) => {
            if (pointerId !== e.pointerId) return;
            pointerId = null;
            axis = null;
            if (dragged.current) {
                settle();
                // the click that follows this drag is ignored; later clicks / Enter work again
                setTimeout(() => (dragged.current = false), 0);
            }
        };
        let wheelTimer: ReturnType<typeof setTimeout> | undefined;
        const onWheel = (e: WheelEvent) => {
            // only sideways swipes (trackpad / shift+wheel); the normal wheel keeps scrolling the page
            if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
            e.preventDefault();
            gsap.killTweensOf(s, "drag");
            s.drag -= e.deltaX / pxPerStep();
            clearTimeout(wheelTimer);
            wheelTimer = setTimeout(settle, 140);
        };
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") nudge(1);
            else if (e.key === "ArrowRight") nudge(-1);
            else return;
            e.preventDefault();
        };

        area.addEventListener("pointerdown", onDown);
        area.addEventListener("pointermove", onMove);
        area.addEventListener("pointerup", onUp);
        area.addEventListener("pointercancel", onUp);
        area.addEventListener("touchmove", onTouchMove, { passive: false });
        area.addEventListener("wheel", onWheel, { passive: false });
        area.addEventListener("keydown", onKey);

        return () => {
            gsap.ticker.remove(render);
            window.removeEventListener("resize", onResize);
            mm.revert();
            gsap.killTweensOf(s);
            clearTimeout(wheelTimer);
            area.removeEventListener("pointerdown", onDown);
            area.removeEventListener("pointermove", onMove);
            area.removeEventListener("pointerup", onUp);
            area.removeEventListener("pointercancel", onUp);
            area.removeEventListener("touchmove", onTouchMove);
            area.removeEventListener("wheel", onWheel);
            area.removeEventListener("keydown", onKey);
        };
    }, [N]);

    const current = items[active];

    return (
        <section
            id="hv2-creations"
            ref={sectionRef}
            aria-label={tHome("creationsTitle")}
            className="relative z-10 [--hv2-pin:0vh] md:[--hv2-pin:var(--hv2-pin-md)]"
            // phones: no scroll hold (the scroll doesn't move the products there)
            style={{ height: `calc(100svh + var(--hv2-pin))`, marginTop: `-${OVERLAP_SVH}svh`, ["--hv2-pin-md" as string]: `${PIN_VH}vh` }}
        >
            <div
                ref={areaRef}
                className="sticky top-0 h-[100svh] w-full overflow-hidden select-none touch-pan-y cursor-grab active:cursor-grabbing"
            >
                {/* All products hang from this point (centre of the top product) */}
                <div ref={pivotRef} className="absolute left-1/2 top-0 h-0 w-0">
                    {items.map((item, i) => (
                        <button
                            key={item.key}
                            ref={(el) => {
                                cardRefs.current[i] = el;
                            }}
                            type="button"
                            aria-label={item.name}
                            onClick={() => {
                                if (dragged.current) return; // it was a drag, not a click
                                router.push(item.href);
                            }}
                            onDragStart={(e) => e.preventDefault()}
                            className="absolute left-0 top-0 block opacity-0 will-change-transform rounded-[20px] focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-caramel"
                            style={{ aspectRatio: `${1 / IMG_RATIO}` }}
                        >
                            <Image
                                src={item.image}
                                alt=""
                                fill
                                draggable={false}
                                sizes="(max-width: 767px) 76vw, 260px"
                                className="object-contain drop-shadow-[0_18px_20px_rgb(74_44_33/0.18)] pointer-events-none"
                            />
                        </button>
                    ))}
                </div>

                {/* Name of the centre product + link to the full menu, inside the arc */}
                <div ref={copyRef} className="absolute inset-x-0 px-6 text-center opacity-0 pointer-events-none">
                    <p className="font-body font-semibold text-[12px] uppercase tracking-[.18em] text-caramel">
                        {tHome("creationsTitle")}
                    </p>
                    <h3
                        key={current?.key}
                        className="mt-2 font-display font-medium text-burgundy text-[clamp(22px,2.4vw,28px)] animate-[hv2-name-in_.45s_ease-out]"
                    >
                        {current?.name}
                    </h3>
                    <button
                        type="button"
                        onClick={() => router.push("/menu")}
                        className="group pointer-events-auto mt-5 inline-flex items-center gap-2 font-body font-semibold text-sm tracking-[.04em] text-burgundy underline-offset-8 hover:underline rounded-sm focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-caramel"
                    >
                        {tHome("seeAll")}
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                </div>
                <style>{`@keyframes hv2-name-in{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}`}</style>
            </div>
        </section>
    );
}
