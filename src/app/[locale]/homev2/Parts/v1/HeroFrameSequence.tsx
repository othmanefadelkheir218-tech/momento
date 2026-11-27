"use client";

// ── Hero frame sequence, v1 phone camera (NOT USED — kept for reference) ──
// Same as the live ../HeroFrameSequence.tsx, except the phone camera: here it drops onto the
// counter, slides right a little, then slides left (the "_|" path), and the zoom grows from the
// pan point (so it drifts sideways while zooming in). The live version drops straight down onto
// the Spéculoos cup. To bring it back: in ../HomeV2Content.tsx import HeroFrameSequence from
// "./v1/HeroFrameSequence".

import { ReactNode, RefObject, useEffect, useRef } from "react";
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

// The source frames (1928px wide) have a dark strip ~40px wide on their right edge that looks
// like a border, especially once hero2 shrinks the picture into a frame. We never draw it.
const TRIM_RIGHT_PX = 44;
// Size of the source frames (all the same), used to place the frame-0 placeholder like the canvas.
const SRC_W = 1928;
const SRC_H = 1072;

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
    zoom: 1.6, // how far in: at 1.6 the top ~37% of the frame is off screen
    focusX: 0.6, // keep the tipping Spéculoos cup in the centre while zoomed
    focusY: 1, // anchor on the bottom of the frame (the counter)
};

// Phones show the full frame height, so 1.4 isn't enough to push the faces off the top.
// At 1.8 the top ~44% is cropped. The pan follows the slim chef + Spéculoos cup,
// then the spilling ice cream (from frame 100), then the falling cream stream.
// (focusX: higher = the picture slides LEFT, showing more of its right side)
// NOTE: if you widen this range, regenerate /public/heroSection-mobile (see MOBILE_STRIP below).
const CAM_MOBILE: Cam = {
    ...CAM_DESKTOP,
    zoom: 1.8,
    panX: [
        [0, 0.66], // slim chef
        [30, 0.7], // small slide to the left over the first 30 frames
        [100, 0.56], // slim chef's arm + the cup as it tips
        [200, 0.53], // the ice cream spilling over the counter
        [265, 0.47], // the falling cream stream, centred
    ],
};

// ── Lighter frames for phones (/public/heroSection-mobile) ──
// A phone only ever shows a vertical strip of the frame, so phones download a pre-cut copy:
//  • only that strip: x = 470 → 1590 of the full frame (covers every phone up to a 0.8 width/height
//    screen, over the whole CAM_MOBILE zoom + pan range: 0.47 → 0.70),
//  • scaled to 80% (896×858), JPEG q74,
//  • every 2nd frame only (frame_000000, 000002, …, 000360) — still ~4px of scroll per frame.
// 15 MB instead of 87 MB, and ~4× less to decode. Generated with PIL from /public/heroSection.
const MOBILE_STRIP = { x: 470, w: 1120 };
const MOBILE_STEP = 2;
const mobileFrameSrc = (i: number) => `/heroSection-mobile/frame_${String(i).padStart(6, "0")}.jpg`;

// Where the canvas centres frame 0 on phones (the first point of the mobile camera pan), so the
// frame-0 placeholder can be placed at exactly the same spot.
const FOCUS_X_FRAME0_MOBILE = CAM_MOBILE.panX ? CAM_MOBILE.panX[0][1] : FOCUS_X_MOBILE;

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
    /** Ref to the wrapper around the picture, so the page can animate it (e.g. shrink it into a frame). */
    stageRef?: RefObject<HTMLDivElement | null>;
};

/**
 * Full-screen hero driven by scroll: the section is 2.5 screens tall, the canvas stays pinned
 * for the first 1.5 screens of scroll and plays every frame across it.
 */
export default function HeroFrameSequenceV1({ children, backgroundColor, stageRef }: Props) {
    const sectionRef = useRef<HTMLElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const placeholderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const canvas = canvasRef.current;
        if (!section || !canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const state = { p: 0 };
        let lastDrawn = "";
        let disposed = false;

        // ── Two ways to keep the frames ──
        //  • "full": plain <img> elements of the full frames, drawn straight onto the canvas (desktop).
        //  • "strip" (phones): the <img> way made phones stutter (measured ~10 fps): the browser can't
        //    keep 361 decoded full-size frames, so it decoded the JPEGs again ON THE MAIN THREAD at
        //    almost every draw, and the 87 MB download was far from done when people scrolled (frames
        //    "missing" on an iPhone). Phones now download the light pre-cut frames (MOBILE_STRIP:
        //    15 MB) as blobs and decode only the ones around the scroll position into ImageBitmaps,
        //    off the main thread, ahead of the scroll; far-away ones are dropped.
        //  A narrow screen that is very wide for its height (a small phone held sideways) needs more
        //  than the strip, so it uses "full" — checked on every resize.
        const images: HTMLImageElement[] = [];
        const blobs: (Blob | undefined)[] = [];
        const bitmaps = new Map<number, ImageBitmap>();
        const decoding = new Set<number>();
        let wanted = 0; // frame the scroll asks for
        let direction = 1; // last scroll direction (+1 down, -1 up): decode further ahead that way
        const AHEAD = 16;
        const BEHIND = 6;
        const KEEP_MARGIN = 6; // bitmaps are only dropped once this much further out than the window
        const MAX_DECODING = 3;
        const FULL_W = SRC_W - TRIM_RIGHT_PX; // usable width of a full frame

        // Does the strip contain everything this screen can show, over the whole camera move?
        const stripFits = (W: number, H: number) => {
            const fxs = CAM_MOBILE.panX ? CAM_MOBILE.panX.map(([, v]) => v) : [FOCUS_X_MOBILE];
            const fxMin = Math.min(...fxs);
            const fxMax = Math.max(...fxs);
            for (const z of [1, CAM_MOBILE.zoom]) {
                const vw = Math.min(FULL_W, W / (Math.max(W / FULL_W, H / SRC_H) * z)); // visible width
                if ((FULL_W - vw) * fxMin < MOBILE_STRIP.x) return false;
                if ((FULL_W - vw) * fxMax + vw > MOBILE_STRIP.x + MOBILE_STRIP.w) return false;
            }
            return true;
        };
        const canStrip = typeof createImageBitmap === "function";
        let mode: "full" | "strip" = "full";

        // Load frame 0 first so the hero shows immediately, then the rest coarse-to-fine:
        // every 16th frame, then every 8th, 4th, 2nd, then all. Wherever the user scrolls to,
        // a frame close to it is ready early, instead of only the beginning of the sequence.
        const loadOrder = (step: number) => {
            const order: number[] = [0];
            const queued = new Set<number>([0]);
            for (const s of [16, 8, 4, 2, 1]) {
                if (s < step) break;
                for (let i = 0; i < FRAME_COUNT; i += s) {
                    if (!queued.has(i)) {
                        queued.add(i);
                        order.push(i);
                    }
                }
            }
            const last = Math.floor((FRAME_COUNT - 1) / step) * step;
            if (!queued.has(last)) order.splice(1, 0, last);
            return order;
        };

        const abort = new AbortController();
        let fullStarted = false;
        const startFull = () => {
            if (fullStarted) return;
            fullStarted = true;
            for (let i = 0; i < FRAME_COUNT; i++) {
                const im = new Image();
                im.decoding = "async";
                // redraws only if this frame is now the closest one to the current position
                im.onload = () => render();
                images[i] = im;
            }
            const [, ...rest] = loadOrder(1);
            images[0].onload = () => {
                render();
                for (const i of rest) images[i].src = frameSrc(i);
            };
            images[0].src = frameSrc(0);
        };

        let stripStarted = false;
        const startStrip = () => {
            if (stripStarted) return;
            stripStarted = true;
            // download a few at a time, in coarse-to-fine order; pump() decodes the ones near the scroll
            const queue = loadOrder(MOBILE_STEP);
            const fetchNext = async (): Promise<void> => {
                const i = queue.shift();
                if (i === undefined || disposed) return;
                try {
                    const res = await fetch(mobileFrameSrc(i), { signal: abort.signal });
                    if (res.ok) {
                        blobs[i] = await res.blob();
                        if (Math.abs(i - wanted) <= AHEAD + BEHIND) pump();
                    }
                } catch {
                    if (disposed) return;
                }
                return fetchNext();
            };
            for (let k = 0; k < 6; k++) fetchNext();
        };

        const dropAllBitmaps = () => {
            bitmaps.forEach((b) => b.close());
            bitmaps.clear();
        };

        const resize = () => {
            // Phones: 1.5× is enough — a phone shows only a ~500px-wide slice of the frame, enlarged,
            // so more canvas pixels add no detail, only cost.
            const W0 = canvas.clientWidth;
            const H0 = canvas.clientHeight;
            const nextMode = canStrip && window.innerWidth < 768 && stripFits(W0, H0) ? "strip" : "full";
            const dpr = Math.min(window.devicePixelRatio || 1, nextMode === "strip" ? 1.5 : 2);
            const W = Math.round(W0 * dpr);
            const H = Math.round(H0 * dpr);
            // Only touch the canvas size when it really changes: setting it (even to the same value)
            // WIPES the canvas. On iPhones, the address bar hiding on the first scroll fires "resize"
            // while ScrollTrigger is refreshing (no drawing allowed) → the hero went blank (cream).
            const sizeChanged = canvas.width !== W || canvas.height !== H;
            if (sizeChanged) {
                canvas.width = W;
                canvas.height = H;
            }
            if (nextMode !== mode) {
                mode = nextMode;
                if (mode === "full") dropAllBitmaps();
            }
            if (mode === "strip") startStrip();
            else startFull();
            pump();
            if (sizeChanged) lastDrawn = "";
            render();
        };

        // ── Phones: decode the frames that will be needed next ──
        // The animation trails the finger (scrub 0.5): the scroll position already tells which frame
        // it is heading to (`target`). When the user scrolls fast, decoding one frame after the other
        // from the current one falls behind for good (it keeps decoding frames already passed). So
        // frames are decoded spread out between the current frame and the target first — the
        // animation then always has a recent frame to show — and the gaps are filled after.
        const MAX_BITMAPS = 36; // ~3 MB each
        let target = 0;
        const snap = (i: number) => Math.floor(i / MOBILE_STEP) * MOBILE_STEP;
        const range = () => {
            const dir = target === wanted ? direction : Math.sign(target - wanted);
            const lo = Math.min(wanted, target) - (dir > 0 ? BEHIND : AHEAD);
            const hi = Math.max(wanted, target) + (dir > 0 ? AHEAD : BEHIND);
            return { dir, lo: lo - KEEP_MARGIN, hi: hi + KEEP_MARGIN };
        };
        const pump = () => {
            if (mode !== "strip" || disposed) return;
            const { dir, lo, hi } = range();
            // order of need: the frame at/before the current one → evenly spread up to the target →
            // the rest, nearest first (ahead of the scroll first)
            const raw: number[] = [snap(wanted)];
            const dist = Math.abs(target - wanted);
            if (dist > MOBILE_STEP) {
                const spacing = Math.max(MOBILE_STEP, snap(Math.ceil(dist / 6)));
                for (let d = spacing; d < dist; d += spacing) raw.push(snap(wanted + dir * d));
                raw.push(snap(target));
            }
            for (let d = MOBILE_STEP; d <= dist + AHEAD; d += MOBILE_STEP) {
                raw.push(snap(wanted) + d * dir);
                if (d <= BEHIND) raw.push(snap(wanted) - d * dir);
            }
            const order = [...new Set(raw)].filter((i) => i >= 0 && i < FRAME_COUNT).slice(0, MAX_BITMAPS);
            // free what is no longer needed (out of the range, or past the MAX_BITMAPS most needed)
            const needed = new Set(order);
            bitmaps.forEach((b, i) => {
                if (i < lo || i > hi || (bitmaps.size > MAX_BITMAPS - MAX_DECODING && !needed.has(i))) {
                    b.close();
                    bitmaps.delete(i);
                }
            });
            for (const i of order) {
                if (decoding.size >= MAX_DECODING) break;
                if (bitmaps.has(i) || decoding.has(i) || !blobs[i]) continue;
                decoding.add(i);
                createImageBitmap(blobs[i]!)
                    .then((bmp) => {
                        decoding.delete(i);
                        // too late (unmounted, switched to "full", or scrolled far away)
                        const r = range();
                        if (disposed || mode !== "strip" || i < r.lo || i > r.hi) {
                            bmp.close();
                        } else {
                            bitmaps.set(i, bmp);
                            render();
                        }
                        pump();
                    })
                    .catch(() => {
                        decoding.delete(i);
                    });
            }
        };

        // Closest ready frame AT OR BEFORE the wanted one — never a later frame, so frames
        // always appear in their order (looking ahead too made it jump forward, then back).
        // Thanks to the coarse-to-fine loading, the fallback is only a few frames behind,
        // not frame 0 (which used to flash in the middle of the animation).
        // x / w: the part of the full frame the picture covers (the strip, or all of it).
        type Source = { img: CanvasImageSource; id: string; iw: number; ih: number; x: number; w: number };
        const isReady = (im?: HTMLImageElement) => !!im && im.complete && im.naturalWidth > 0;
        const nearestSource = (idx: number): Source | null => {
            if (mode === "strip") {
                for (let i = idx; i >= 0; i--) {
                    const b = bitmaps.get(i);
                    if (b) return { img: b, id: `b${i}`, iw: b.width, ih: b.height, x: MOBILE_STRIP.x, w: MOBILE_STRIP.w };
                }
                return null; // keep whatever is on the canvas (or the frame-0 placeholder) meanwhile
            }
            for (let i = idx; i >= 0; i--) {
                const im = images[i];
                if (isReady(im)) {
                    // without its dark right-edge strip (see TRIM_RIGHT_PX)
                    return { img: im, id: `i${i}`, iw: FULL_W, ih: im.naturalHeight, x: 0, w: FULL_W };
                }
            }
            return null;
        };

        // Draw like `object-fit: cover`, plus the camera zoom/pan.
        let refreshing = false;
        // where the scroll position already is (the animation catches up to it): set once the
        // scroll tween exists, below
        let scrollProgress = () => state.p;
        const render = () => {
            if (refreshing) return; // see onRefreshInit / onRefresh below
            const exact = state.p * (FRAME_COUNT - 1);
            const idx = Math.round(exact);
            const tgt = Math.round(scrollProgress() * (FRAME_COUNT - 1));
            if (idx !== wanted || tgt !== target) {
                if (idx !== wanted) direction = idx > wanted ? 1 : -1;
                wanted = idx;
                target = tgt;
                pump();
            }
            const src = nearestSource(idx);
            if (!src) return;
            const isDesktop = window.innerWidth >= 768;
            const CAM = isDesktop ? CAM_DESKTOP : CAM_MOBILE;
            const cam = cameraAmount(exact, CAM);
            const key = `${src.id}|${cam.toFixed(4)}|${exact.toFixed(2)}|${isDesktop}|${canvas.width}x${canvas.height}`;
            if (key === lastDrawn) return;
            lastDrawn = key;

            const W = canvas.width;
            const H = canvas.height;
            const zoom = 1 + (CAM.zoom - 1) * cam;
            // all the maths is in full-frame coordinates (FULL_W × SRC_H)
            const s = Math.max(W / FULL_W, H / SRC_H) * zoom;
            const w = FULL_W * s;
            const h = SRC_H * s;
            const baseFx = isDesktop ? FOCUS_X_DESKTOP : FOCUS_X_MOBILE;
            const fx = CAM.panX ? panXAt(exact, CAM.panX) : baseFx + (CAM.focusX - baseFx) * cam;
            const fy = FOCUS_Y + (CAM.focusY - FOCUS_Y) * cam;
            ctx.clearRect(0, 0, W, H);
            // the picture (strip or full frame) is drawn over its own part of the full frame
            ctx.drawImage(src.img, 0, 0, src.iw, src.ih, (W - w) * fx + src.x * s, (H - h) * fy, src.w * s, h);
            // The canvas now covers everything: hide the placeholders underneath for good.
            const ph = placeholderRef.current;
            if (ph && ph.style.visibility !== "hidden") ph.style.visibility = "hidden";
        };

        // The section is 250vh (phones: 330vh) → the picture stays pinned for 1.5 (2.3) screens of scroll.
        //  • Frames play over the first FRAMES_SCREENS screens of it, then the last frame (the cream
        //    drip) HOLDS while the user keeps scrolling, and it is the one that slides away.
        //  • fromTo (not "to"): always frame 0 → last frame. A plain "to" with invalidateOnRefresh
        //    re-reads its start from the current frame on every refresh (resize, late layout…), which
        //    could make the sequence restart from the wrong frame.
        // Phones play the frames over more scroll (2 screens): over 1.2 the video felt too fast there.
        // The section is taller on phones by the same 0.8 screen (h-[330vh]), so the hold is the same.
        const framesScreens = () => (window.innerWidth < 768 ? 2 : 1.2);
        const tween = gsap.fromTo(
            state,
            { p: 0 },
            {
                p: 1,
                ease: "none",
                onUpdate: render,
                scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: () => `+=${window.innerHeight * framesScreens()}`,
                    scrub: 0.5, // smoothing between scroll and frames (was 1s: it lagged several frames behind)
                    invalidateOnRefresh: true,
                },
            },
        );
        scrollProgress = () => tween.scrollTrigger?.progress ?? state.p;

        // ScrollTrigger "refresh" (fired by SmoothScroll every time an image loads, e.g. the product
        // pictures below the hero) briefly rewinds every scroll animation to the top to measure the
        // page, then puts it back WITHOUT calling onUpdate. The rewind used to draw frame 0, and
        // nothing redrew afterwards → frame 0 stayed on screen while the hero slid away.
        // So: draw nothing during a refresh, then redraw the real current frame once it's done.
        const onRefreshInit = () => {
            refreshing = true;
        };
        const onRefresh = () => {
            refreshing = false;
            lastDrawn = "";
            render();
        };
        ScrollTrigger.addEventListener("refreshInit", onRefreshInit);
        ScrollTrigger.addEventListener("refresh", onRefresh);

        resize();
        window.addEventListener("resize", resize);
        return () => {
            window.removeEventListener("resize", resize);
            tween.scrollTrigger?.kill();
            tween.kill();
            ScrollTrigger.removeEventListener("refreshInit", onRefreshInit);
            ScrollTrigger.removeEventListener("refresh", onRefresh);
            images.forEach((im) => (im.onload = null));
            disposed = true;
            abort.abort();
            dropAllBitmaps();
        };
    }, []);

    return (
        <section ref={sectionRef} className="relative h-[330vh] md:h-[250vh] w-full" style={{ backgroundColor }}>
            <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
                {/* The "stage" holds the picture. The page can animate it (scale / clip / radius)
                    through `stageRef` without touching the canvas drawing. */}
                <div ref={stageRef} className="absolute inset-0 overflow-hidden will-change-transform">
                    {/* Placeholders shown only until the canvas draws its first frame, then hidden —
                        otherwise their darker edges bleed through as a thin outline when the stage
                        is scaled / rounded (hero2). */}
                    {/* They are placed EXACTLY where the canvas will draw frame 0 (same right-edge
                        trim, same "cover" size, same focus), in pure CSS so it is right from the first
                        paint — so the switch blur → frame 0 → canvas never moves or resizes the picture.
                        (Before, they used plain object-cover on the untrimmed frame: the canvas then
                        drew it ~1.2% bigger and shifted, and the picture visibly "settled" on reload.) */}
                    <div ref={placeholderRef} aria-hidden className="absolute inset-0 overflow-hidden [container-type:size]">
                        <div
                            className="hv2-frame0 absolute"
                            // 1) instant: tiny blurred preview of frame 0 (no download needed)
                            style={{ backgroundImage: `url(${FRAME0_BLUR})`, backgroundSize: "100% 100%" }}
                        >
                            {/* 2) the real frame 0, top priority. Unoptimised on purpose: same file and
                                pixels as the canvas draws (and the canvas reuses it from the cache). */}
                            <NextImage src={frameSrc(0)} alt="" aria-hidden fill priority unoptimized className="object-fill" />
                        </div>
                        <style>{`
                            .hv2-frame0 {
                                /* width of the visible (trimmed) part when it "covers" the stage */
                                --cw: max(100cqw, 100cqh * ${SRC_W - TRIM_RIGHT_PX} / ${SRC_H});
                                width: calc(var(--cw) * ${SRC_W} / ${SRC_W - TRIM_RIGHT_PX}); /* + the trimmed strip, pushed off the right */
                                height: calc(var(--cw) * ${SRC_H} / ${SRC_W - TRIM_RIGHT_PX});
                                left: calc((100cqw - var(--cw)) * ${FOCUS_X_FRAME0_MOBILE});
                                top: calc((100cqh - var(--cw) * ${SRC_H} / ${SRC_W - TRIM_RIGHT_PX}) * ${FOCUS_Y});
                            }
                            @media (min-width: 768px) {
                                .hv2-frame0 { left: calc((100cqw - var(--cw)) * ${FOCUS_X_DESKTOP}); }
                            }
                        `}</style>
                    </div>
                    {/* 3) the scroll-driven canvas on top — no fade, so there's no visible switch */}
                    <canvas ref={canvasRef} aria-hidden className="absolute inset-0 h-full w-full" />
                    {/* Phones only: cream cover over the top of the picture, fading out between the
                        --ts and --te vars the page animates (0% / 0% = invisible). Used instead of a
                        mask + clip-path, which phones mis-place while scrolling. */}
                    <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 md:hidden"
                        style={{
                            background: `linear-gradient(to bottom, ${backgroundColor ?? "#F7EFE2"} var(--ts, 0%), ${backgroundColor ?? "#F7EFE2"}00 var(--te, 0%))`,
                        }}
                    />
                </div>
                {children}
            </div>
        </section>
    );
}
