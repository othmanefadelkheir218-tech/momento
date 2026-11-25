"use client";

import { ReactNode, useEffect, useRef } from "react";
import NextImage from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

// ── Frames (/public/heroSection/frame_000000.jpeg … frame_000360.jpeg) ──
const FRAME_COUNT = 361;
const frameSrc = (i: number) => `/heroSection/frame_${String(i).padStart(6, "0")}.jpeg`;

// Tiny (32×18) blurred copy of frame 0, inlined so the hero is never empty while loading.
const FRAME0_BLUR =
    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA0JCgsKCA0LCgsODg0PEyAVExISEyccHhcgLikxMC4pLSwzOko+MzZGNywtQFdBRkxOUlNSMj5aYVpQYEpRUk//2wBDAQ4ODhMREyYVFSZPNS01T09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0//wAARCAASACADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwA0RVe3AeTcqlggxtIOOuav20drFfSLJZhpCM72weDnoO/vWXp7SeUywXCBWxglSQTj9KlN1ercggRukMnDZGQPTHauWUtLI9KMNbs1EEM9yXJiYbcrIBg/TbWPqdraz2hkgU71bOeOmPSpEjvo5YvL2Iit8yeuamv7e5g05RK4XJO/K4B9ADUJ67jaVthdDUDTGwB99/5VNd/LNGy8E5yR3oookVEyZZZSTmRz16say3uJ2RkaaQqCcAscCiinEUj/2Q==";

// Horizontal focus when the frame is cropped to fill the screen (0 = left, 1 = right).
// Mobile leans right so the Spéculoos cup (the one that tips over) stays in view.
const FOCUS_X_DESKTOP = 0.5;
const FOCUS_X_MOBILE = 0.6;
const FOCUS_Y = 0.5;

// ── Camera move to hide the chefs' faces (frames 31 → 213) ──
// The camera zooms in and slides down onto the counter, holds, then eases back out.
// Frame numbers below are the file numbers (frame_000031.jpeg etc.).
type Cam = {
    inStart: number;
    inEnd: number;
    outStart: number;
    outEnd: number;
    zoom: number;
    focusX: number;
    focusY: number;
    /** Optional [frame, focusX] keyframes: the camera pans between them (overrides focusX). */
    panX?: [number, number][];
};

const CAM_DESKTOP: Cam = {
    inStart: 0, // start moving in right away, so the move is long and gentle
    inEnd: 31, // fully zoomed by the first "bad" face frame
    outStart: 200, // start easing back out…
    outEnd: 265, // …back to the full scene (the video's own camera has moved down by now)
    zoom: 1.4, // how far in: at 1.4 the top ~29% of the frame is off screen
    focusX: 0.6, // keep the tipping Spéculoos cup in the centre while zoomed
    focusY: 1, // anchor on the bottom of the frame (the counter)
};

// Phones show the full frame height, so 1.4 isn't enough to push the faces off the top.
// At 1.8 the top ~44% is cropped. The pan follows the slim chef + Spéculoos cup,
// then the spilling ice cream (from frame 100), then the falling cream stream.
const CAM_MOBILE: Cam = {
    ...CAM_DESKTOP,
    zoom: 1.8,
    panX: [
        [0, 0.66], // slim chef
        [31, 0.66],
        [100, 0.56], // slim chef's arm + the cup as it tips
        [200, 0.53], // the ice cream spilling over the counter
        [265, 0.47], // the falling cream stream, centred
    ],
};

// "Smootherstep": eases in and out more gently than a plain smoothstep.
const smooth = (t: number) => t * t * t * (t * (6 * t - 15) + 10);
const panXAt = (frame: number, keys: [number, number][]) => {
    if (frame <= keys[0][0]) return keys[0][1];
    for (let k = 1; k < keys.length; k++) {
        const [b, vb] = keys[k];
        if (frame <= b) {
            const [a, va] = keys[k - 1];
            return va + (vb - va) * smooth((frame - a) / (b - a));
        }
    }
    return keys[keys.length - 1][1];
};
const cameraAmount = (frame: number, CAM: Cam) => {
    if (frame <= CAM.inStart || frame >= CAM.outEnd) return 0;
    if (frame < CAM.inEnd) return smooth((frame - CAM.inStart) / (CAM.inEnd - CAM.inStart));
    if (frame <= CAM.outStart) return 1;
    return smooth(1 - (frame - CAM.outStart) / (CAM.outEnd - CAM.outStart));
};

type Props = {
    /** Extra content layered on top of the frames (e.g. hero text). */
    children?: ReactNode;
    backgroundColor?: string;
};

/**
 * Full-screen hero driven by scroll: the section is 2.5 screens tall, the canvas stays pinned
 * for the first 1.5 screens of scroll and plays every frame across it.
 */
export default function HeroFrameSequence({ children, backgroundColor }: Props) {
    const sectionRef = useRef<HTMLElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const canvas = canvasRef.current;
        if (!section || !canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const state = { p: 0 };
        const images: HTMLImageElement[] = [];
        let lastDrawn = "";

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = Math.round(canvas.clientWidth * dpr);
            canvas.height = Math.round(canvas.clientHeight * dpr);
            lastDrawn = "";
            render();
        };

        const nearestLoaded = (idx: number) => {
            for (let i = idx; i >= 0; i--) {
                const im = images[i];
                if (im && im.complete && im.naturalWidth) return im;
            }
            return null;
        };

        // Draw like `object-fit: cover`, plus the camera zoom/pan.
        const render = () => {
            const exact = state.p * (FRAME_COUNT - 1);
            const img = nearestLoaded(Math.round(exact));
            if (!img) return;
            const isDesktop = window.innerWidth >= 768;
            const CAM = isDesktop ? CAM_DESKTOP : CAM_MOBILE;
            const cam = cameraAmount(exact, CAM);
            const key = `${img.src}|${cam.toFixed(4)}|${exact.toFixed(2)}|${isDesktop}`;
            if (key === lastDrawn) return;
            lastDrawn = key;

            const W = canvas.width;
            const H = canvas.height;
            const zoom = 1 + (CAM.zoom - 1) * cam;
            const s = Math.max(W / img.naturalWidth, H / img.naturalHeight) * zoom;
            const w = img.naturalWidth * s;
            const h = img.naturalHeight * s;
            const baseFx = isDesktop ? FOCUS_X_DESKTOP : FOCUS_X_MOBILE;
            const fx = CAM.panX ? panXAt(exact, CAM.panX) : baseFx + (CAM.focusX - baseFx) * cam;
            const fy = FOCUS_Y + (CAM.focusY - FOCUS_Y) * cam;
            ctx.clearRect(0, 0, W, H);
            ctx.drawImage(img, (W - w) * fx, (H - h) * fy, w, h);
        };

        // Load frame 0 first so the hero shows immediately, then the rest in order.
        for (let i = 0; i < FRAME_COUNT; i++) {
            const im = new Image();
            im.decoding = "async";
            im.onload = () => {
                if (Math.round(state.p * (FRAME_COUNT - 1)) >= i) render();
            };
            images[i] = im;
        }
        images[0].onload = () => {
            render();
            for (let i = 1; i < FRAME_COUNT; i++) images[i].src = frameSrc(i);
        };
        images[0].src = frameSrc(0);

        const tween = gsap.to(state, {
            p: 1,
            ease: "none",
            onUpdate: render,
            scrollTrigger: {
                trigger: section,
                start: "top top",
                end: "bottom bottom", // section is 250vh → 1.5 screens of scroll to play every frame
                scrub: 1, // more catch-up smoothing between scroll and frames
                invalidateOnRefresh: true,
            },
        });

        resize();
        window.addEventListener("resize", resize);
        return () => {
            window.removeEventListener("resize", resize);
            tween.scrollTrigger?.kill();
            tween.kill();
            images.forEach((im) => (im.onload = null));
        };
    }, []);

    return (
        <section ref={sectionRef} className="relative h-[250vh] w-full" style={{ backgroundColor }}>
            <div
                className="sticky top-0 h-[100svh] w-full overflow-hidden bg-cover bg-[position:66%_50%] md:bg-center"
                // 1) instant: tiny blurred preview of frame 0 (no download needed)
                style={{ backgroundImage: `url(${FRAME0_BLUR})` }}
            >
                {/* 2) the real frame 0, loaded with top priority (Next optimises it). It stays underneath:
                       the canvas is transparent until it draws, then covers it with the same picture. */}
                <NextImage
                    src={frameSrc(0)}
                    alt=""
                    aria-hidden
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-[66%_50%] md:object-center"
                />
                {/* 3) the scroll-driven canvas on top — no fade, so there's no visible switch */}
                <canvas ref={canvasRef} aria-hidden className="absolute inset-0 h-full w-full" />
                {children}
            </div>
        </section>
    );
}
