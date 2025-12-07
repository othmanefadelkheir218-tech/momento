import React, { useEffect, useRef, ReactElement, RefObject } from 'react';
import gsap from 'gsap';

interface MagneticProps {
    /** The single child element to wrap (must be a valid React Element, not text) */
    children: ReactElement;
    /** Optional external trigger element. If provided, mouse events are listened to here instead of the child. */
    trigger?: RefObject<HTMLElement | null>;
}

export default function Magnetic({ children, trigger }: MagneticProps) {
    // We use HTMLElement to be generic (works for divs, buttons, spans, etc.)
    const magnetic = useRef<HTMLElement | null>(null);

    useEffect(() => {
        // Determine which element listens for the mouse events
        const element = trigger && trigger.current ? trigger.current : magnetic.current;

        if (!magnetic.current || !element) return;

        // GSAP QuickTo for performant animation
        const xTo = gsap.quickTo(magnetic.current, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
        const yTo = gsap.quickTo(magnetic.current, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

        const mouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;

            // Safety check inside the event listener
            if (!magnetic.current) return;

            const { height, width, left, top } = magnetic.current.getBoundingClientRect();
            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);

            xTo(x * 0.35);
            yTo(y * 0.35);
        };

        const mouseLeave = () => {
            xTo(0);
            yTo(0);
        };

        element.addEventListener("mousemove", mouseMove);
        element.addEventListener("mouseleave", mouseLeave);

        return () => {
            element.removeEventListener("mousemove", mouseMove);
            element.removeEventListener("mouseleave", mouseLeave);
        };
    }, [trigger]); // Added trigger to dependency array

    // React.cloneElement is used to inject the ref into the child
    return React.cloneElement(children as ReactElement<any>, {
        ref: (node: HTMLElement | null) => {
            // 1. Assign the node to our local 'magnetic' ref
            magnetic.current = node;

            // 2. Handle the child's existing ref (if it has one)
            // We cast children to 'any' to safely access the 'ref' property 
            // without TypeScript complaining about accessing protected props.
            const { props } = children as any;
            const ref = props?.ref;

            if (typeof ref === 'function') {
                ref(node);
            } else if (ref) {
                ref.current = node;
            }
        }
    });
}