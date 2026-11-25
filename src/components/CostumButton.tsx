import React, { useEffect, useRef, ReactElement } from 'react';
import gsap from 'gsap';
import Magnetic from './Magnetic'; // Assuming this is the path to the TS Magnetic component

// Extend HTMLAttributes to allow onClick, className, id, etc. to be passed in via ...attributes
interface RoundedButtonProps extends React.HTMLAttributes<HTMLDivElement> {
    /** The content inside the button. Must be a valid React Element (not just text) for Magnetic to work. */
    children: ReactElement;
    backgroundColor?: string;
    className?: string;
    hoverTextColor?: string;
    disabled?: boolean;
}

export default function CostumButton({
    children,
    backgroundColor = "#455CE9",
    className = "",
    hoverTextColor,
    disabled,
    ...attributes
}: RoundedButtonProps) {

    const circle = useRef<HTMLDivElement>(null);
    const overflow = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    // Copy of the text in the hover colour, living inside the fill circle:
    // only the part of the text the fill has reached turns to the hover colour.
    const copyRef = useRef<HTMLDivElement>(null);
    const syncing = useRef(false);
    const timeline = useRef<gsap.core.Timeline | null>(null);

    // Separate refs for timeline and text timeouts to prevent overwriting
    const timelineTimeoutId = useRef<NodeJS.Timeout | null>(null);
    const textTimeoutId = useRef<NodeJS.Timeout | null>(null);
    // Track hover state to handle rapid interactions
    const isHovered = useRef<boolean>(false);

    // Keep the copy exactly on top of the real text (follows the fill and the magnetic move)
    const syncCopy = () => {
        const text = textRef.current, copy = copyRef.current, c = circle.current;
        if (!text || !copy || !c) return;
        const t = text.getBoundingClientRect();
        const r = c.getBoundingClientRect();
        copy.style.width = `${text.offsetWidth}px`;
        copy.style.transform = `translate(${t.left - r.left}px, ${t.top - r.top}px)`;
    };
    const startSync = () => {
        if (!hoverTextColor || syncing.current) return;
        syncing.current = true;
        syncCopy();
        gsap.ticker.add(syncCopy);
    };
    const stopSync = () => {
        if (!syncing.current) return;
        syncing.current = false;
        gsap.ticker.remove(syncCopy);
    };

    useEffect(() => {
        timeline.current = gsap.timeline({
            paused: true,
            // Fill has left the button: stop following the text
            onComplete: () => { if (!isHovered.current) stopSync(); },
        });

        // Safety check for ref.current
        if (circle.current && timeline.current) {
            timeline.current
                .to(circle.current, { top: "-25%", width: "150%", duration: 0.4, ease: "power3.in" }, "enter")
                .to(circle.current, { top: "-150%", width: "125%", duration: 0.25 }, "exit");
        }

        // Cleanup on unmount to prevent memory leaks
        return () => {
            if (timelineTimeoutId.current) clearTimeout(timelineTimeoutId.current);
            if (textTimeoutId.current) clearTimeout(textTimeoutId.current);
            if (timeline.current) timeline.current.kill();
            stopSync();
        }
    }, []);

    const manageMouseEnter = () => {
        if (disabled) return;
        isHovered.current = true;

        // Clear any pending leave timeouts
        if (timelineTimeoutId.current) {
            clearTimeout(timelineTimeoutId.current);
            timelineTimeoutId.current = null;
        }
        if (textTimeoutId.current) {
            clearTimeout(textTimeoutId.current);
            textTimeoutId.current = null;
        }

        // Kill any ongoing text animations and restart timeline from beginning
        if (textRef.current) {
            gsap.killTweensOf(textRef.current);
        }

        startSync();
        timeline.current?.tweenFromTo('enter', 'exit');
    };

    const manageMouseLeave = () => {
        if (disabled) return;
        isHovered.current = false;

        timelineTimeoutId.current = setTimeout(() => {
            // Only play if still not hovered
            if (!isHovered.current) {
                timeline.current?.play();
            }
        }, 300);
    };

    return (
        <Magnetic>
            <div
                ref={overflow}
                className={`rounded-full ${className}  border  cursor-pointer relative flex items-center justify-center `}
                style={{
                    overflow: "hidden",
                    // borderColor: backgroundColor,

                }}
                onMouseEnter={manageMouseEnter}
                onMouseLeave={manageMouseLeave}
                {...attributes}
                onClick={(e) => {
                    if (disabled) return;
                    attributes.onClick?.(e);
                }}
            >
                {/* 
            The Inner Magnetic uses the 'overflow' div as its trigger area,
            but animates the 'children' text inside.
        */}
                <Magnetic trigger={overflow}>
                    <div ref={textRef} className="relative z-10">
                        {children}
                    </div>
                </Magnetic>

                <div
                    ref={circle}
                    style={{ backgroundColor }}
                    // With a hover colour the fill sits above the text and carries the recoloured copy;
                    // without one it stays behind the content (icons, lines…) so they stay visible.
                    className={`w-full h-[150%] absolute rounded-[50%] top-full overflow-hidden pointer-events-none ${hoverTextColor ? "z-20" : ""}`}
                >
                    {hoverTextColor && (
                        <div
                            ref={copyRef}
                            aria-hidden
                            className="absolute top-0 left-0"
                            style={{ color: hoverTextColor }}
                        >
                            {children}
                        </div>
                    )}
                </div>
            </div>
        </Magnetic>
    );
}