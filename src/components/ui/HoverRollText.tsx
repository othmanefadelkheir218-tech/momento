"use client";

import { forwardRef, useImperativeHandle, useMemo, useRef } from "react";
import gsap from "gsap";

// A label whose letters roll up one after another (a second copy rises from below).
// The parent calls play() on hover/focus and reset() when it ends — see RollLink.
// The markup is aria-hidden: the parent gives the readable text (sr-only).

export type HoverRollTextHandle = { play: () => void; reset: () => void };

const STAGGER = 0.03; // seconds between two letters
const DURATION = 0.45;
// One row, in em. Above 1 so accents (é, ü…) are never clipped. Keep in sync with h-[1.35em] below.
const ROW_SHIFT = "-1.35em";

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const HoverRollText = forwardRef<HoverRollTextHandle, { text: string }>(function HoverRollText({ text }, ref) {
    const letters = useMemo(() => Array.from(text), [text]);
    const rows = useRef<Array<HTMLSpanElement | null>>([]);

    const move = (y: string | number, reverse: boolean) => {
        const list = rows.current.filter(Boolean) as HTMLSpanElement[];
        list.forEach((row, i) => {
            if (reducedMotion()) return gsap.set(row, { y });
            // on the way back, the last letter to rise is the first to come down
            const order = reverse ? list.length - 1 - i : i;
            gsap.to(row, { y, duration: DURATION, delay: order * STAGGER, ease: "power3.out", overwrite: true });
        });
    };

    useImperativeHandle(ref, () => ({
        play: () => move(ROW_SHIFT, false),
        reset: () => move(0, true),
    }));

    let rowIndex = 0;

    return (
        <span className="inline-flex flex-wrap items-end" aria-hidden="true">
            {letters.map((letter, i) => {
                if (letter === " ") return <span key={i} className="inline-block h-[1.35em] w-[0.3em]" />;
                const index = rowIndex++;
                return (
                    <span key={i} className="inline-block h-[1.35em] overflow-hidden align-bottom">
                        <span
                            ref={(el) => {
                                rows.current[index] = el;
                            }}
                            className="flex flex-col will-change-transform"
                        >
                            <span className="block h-[1.35em] leading-[1.35em] whitespace-nowrap">{letter}</span>
                            <span className="block h-[1.35em] leading-[1.35em] whitespace-nowrap">{letter}</span>
                        </span>
                    </span>
                );
            })}
        </span>
    );
});
