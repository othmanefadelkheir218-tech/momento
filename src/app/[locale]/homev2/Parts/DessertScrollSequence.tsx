"use client";

import { RefObject, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

// ── Frames ──────────────────────────────────────────────
const FRAME_COUNT = 300;
const FRAME_W = 720;
const FRAME_H = 1280;
const frameSrc = (i: number) => `/dessert_frames/ezgif-frame-${String(i + 1).padStart(3, "0")}.png`;

// Where the cup sits inside a frame (measured on frame 1, in frame pixels).
const CUP_IN_FRAME = { cx: 355, bottom: 920, width: 540 };

// ── Hero image ──────────────────────────────────────────
// Natural size of /Cozy_Bakery_Kitchen_with_Dessert_Cups.png
const HERO_W = 1679;
const HERO_H = 937;
// The empty spot on the counter between "Nutella Crousti" and "Snickers" (hero image pixels).
// Tweak these three numbers to fine-tune the placement.
const SPOT = { cx: 1005, bottom: 815, cupWidth: 168 };

// At the end of the scroll the cup fills this share of the next section's height.
const END_HEIGHT_RATIO = 0.9;

type Rect = { x: number; y: number; w: number; h: number };

type Props = {
    /** Wraps the hero + the next section; the canvas is positioned inside it. */
    wrapperRef: RefObject<HTMLDivElement | null>;
    heroRef: RefObject<HTMLElement | null>;
    nextRef: RefObject<HTMLElement | null>;
};

export default function DessertScrollSequence({ wrapperRef, heroRef, nextRef }: Props) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const wrapper = wrapperRef.current;
        const hero = heroRef.current;
        const next = nextRef.current;
        if (!canvas || !wrapper || !hero || !next) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        canvas.width = FRAME_W;
        canvas.height = FRAME_H;

        const state = { p: 0 };
        const ease = gsap.parseEase("power2.inOut");
        const images: HTMLImageElement[] = [];

        // Start rect: the cup sitting on the counter, matched to the object-cover hero image.
        const startRect = (): Rect => {
            const W = hero.clientWidth;
            const H = hero.clientHeight;
            const s = Math.max(W / HERO_W, H / HERO_H);
            const iw = HERO_W * s;
            const ih = HERO_H * s;

            // Read the real object-position from the <img> so desktop/mobile crops stay in sync.
            const img = hero.querySelector("img");
            const [px, py] = (img ? getComputedStyle(img).objectPosition : "50% 100%")
                .split(" ")
                .map((v) => parseFloat(v) / 100);
            const offX = (W - iw) * (isNaN(px) ? 0.5 : px);
            const offY = (H - ih) * (isNaN(py) ? 1 : py);

            const k = (s * SPOT.cupWidth) / CUP_IN_FRAME.width; // frame px → screen px
            return {
                x: offX + s * SPOT.cx - CUP_IN_FRAME.cx * k,
                y: offY + s * SPOT.bottom - CUP_IN_FRAME.bottom * k,
                w: FRAME_W * k,
                h: FRAME_H * k,
            };
        };

        // End rect: centred in the next (empty) section.
        const endRect = (): Rect => {
            const h = next.clientHeight * END_HEIGHT_RATIO;
            const w = (h * FRAME_W) / FRAME_H;
            return {
                x: (wrapper.clientWidth - w) / 2,
                y: next.offsetTop + (next.clientHeight - h) / 2,
                w,
                h,
            };
        };

        const nearestLoaded = (idx: number) => {
            for (let i = idx; i >= 0; i--) {
                const im = images[i];
                if (im && im.complete && im.naturalWidth) return im;
            }
            return null;
        };

        const render = () => {
            const p = state.p;
            const e = ease(p);
            const a = startRect();
            const b = endRect();
            const x = a.x + (b.x - a.x) * e;
            const y = a.y + (b.y - a.y) * e;
            const w = a.w + (b.w - a.w) * e;
            const h = a.h + (b.h - a.h) * e;
            canvas.style.width = `${w}px`;
            canvas.style.height = `${h}px`;
            canvas.style.transform = `translate3d(${x}px, ${y}px, 0)`;

            const img = nearestLoaded(Math.round(p * (FRAME_COUNT - 1)));
            if (!img) return;
            // While the cup sits on the counter, hide the studio reflection under it.
            const cut = CUP_IN_FRAME.bottom + 12;
            const clipH = cut + (FRAME_H - cut) * Math.min(1, p / 0.3);
            ctx.clearRect(0, 0, FRAME_W, FRAME_H);
            ctx.drawImage(img, 0, 0, FRAME_W, clipH, 0, 0, FRAME_W, clipH);
        };

        // Load frame 1 first so the cup shows immediately, then the rest in order.
        for (let i = 0; i < FRAME_COUNT; i++) {
            const im = new Image();
            im.decoding = "async";
            im.onload = () => {
                if (Math.round(state.p * (FRAME_COUNT - 1)) >= i) render();
            };
            images[i] = im;
        }
        images[0].src = frameSrc(0);
        images[0].onload = () => {
            render();
            for (let i = 1; i < FRAME_COUNT; i++) images[i].src = frameSrc(i);
        };

        const tween = gsap.to(state, {
            p: 1,
            ease: "none",
            onUpdate: render,
            scrollTrigger: {
                trigger: wrapper,
                start: "top top",
                end: () => `+=${hero.offsetHeight}`,
                scrub: 0.4,
                invalidateOnRefresh: true,
            },
        });

        render();
        window.addEventListener("resize", render);
        return () => {
            window.removeEventListener("resize", render);
            tween.scrollTrigger?.kill();
            tween.kill();
            images.forEach((im) => (im.onload = null));
        };
    }, [wrapperRef, heroRef, nextRef]);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden
            className="absolute top-0 left-0 z-[2] pointer-events-none will-change-transform"
        />
    );
}
