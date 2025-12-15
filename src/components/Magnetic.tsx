import React, { useEffect, useRef, ReactElement, RefObject, MutableRefObject } from 'react';
import gsap from 'gsap';

interface MagneticProps {
    children: ReactElement<any>;
    trigger?: RefObject<HTMLElement | null>;
}

export default function Magnetic({ children, trigger }: MagneticProps) {
    const magnetic = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const element = trigger && trigger.current ? trigger.current : magnetic.current;

        if (!magnetic.current || !element) return;

        const xTo = gsap.quickTo(magnetic.current, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
        const yTo = gsap.quickTo(magnetic.current, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

        const mouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
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
    }, [trigger]);

    // FIX APPLIED HERE
    return React.cloneElement(children, {
        ref: (node: HTMLElement | null) => {
            // 1. Assign to our internal ref
            magnetic.current = node;

            // 2. Handle the child's original ref (if it exists)
            // In React 19 types, we must look at .props.ref, not .ref
            const childProps = children.props as { ref?: React.Ref<HTMLElement> };
            const existingRef = childProps.ref;

            if (typeof existingRef === 'function') {
                existingRef(node);
            } else if (existingRef) {
                // Cast to MutableRefObject to allow assignment
                (existingRef as MutableRefObject<HTMLElement | null>).current = node;
            }
        }
    });
}