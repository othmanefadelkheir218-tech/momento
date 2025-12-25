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
    const timeline = useRef<gsap.core.Timeline | null>(null);

    // Use a Ref for the timeout ID so it persists across re-renders
    const timeoutId = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        timeline.current = gsap.timeline({ paused: true });

        // Safety check for ref.current
        if (circle.current && timeline.current) {
            timeline.current
                .to(circle.current, { top: "-25%", width: "150%", duration: 0.4, ease: "power3.in" }, "enter")
                .to(circle.current, { top: "-150%", width: "125%", duration: 0.25 }, "exit");
        }

        // Cleanup on unmount to prevent memory leaks
        return () => {
            if (timeoutId.current) clearTimeout(timeoutId.current);
            if (timeline.current) timeline.current.kill();
        }
    }, []);

    const manageMouseEnter = () => {
        if (disabled) return;
        if (timeoutId.current) clearTimeout(timeoutId.current);
        timeline.current?.tweenFromTo('enter', 'exit');

        if (hoverTextColor && textRef.current) {
            gsap.to(textRef.current, { color: hoverTextColor, duration: 0.5 });
        }
    };

    const manageMouseLeave = () => {
        timeoutId.current = setTimeout(() => {
            timeline.current?.play();
        }, 300);

        if (hoverTextColor && textRef.current) {
            timeoutId.current = setTimeout(() => {
                gsap.to(textRef.current, { color: "inherit", duration: 0.7 });
            }, 300);

        }
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
                    className="w-full h-[150%] absolute rounded-[50%] top-full"
                ></div>
            </div>
        </Magnetic>
    );
}