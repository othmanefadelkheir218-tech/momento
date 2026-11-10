'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { EASES } from '@/lib/anim';

interface CurveProps {
    isActive: boolean;
}

const curvePath = (h: number, open: boolean) =>
    `M100 0 L100 ${h} Q${open ? 100 : -100} ${h / 2} 100 0`;

/**
 * Curved edge of the side menu.
 *
 * Animated with GSAP rather than a CSS `transition: d`, because Safari
 * (iPhone, iPad, Mac) can't animate `d` in CSS and just snapped the shape.
 * Same shape, same timing (1000ms open / 800ms close), same
 * cubic-bezier(0.76, 0, 0.24, 1) curve as before.
 *
 * The height lives in a ref, not state, so a resize / zoom never re-renders
 * the path and resets it mid-animation.
 */
export default function Curve({ isActive }: CurveProps) {
    const pathRef = useRef<SVGPathElement>(null);
    const heightRef = useRef(0);
    const isActiveRef = useRef(isActive);
    const tweenRef = useRef<gsap.core.Tween | null>(null);

    // Size: set on mount, then snap to the current state on resize
    useEffect(() => {
        let raf = 0;
        const measure = () => {
            const h = window.innerHeight;
            if (h === heightRef.current) return;
            heightRef.current = h;
            if (pathRef.current && !tweenRef.current?.isActive()) {
                gsap.set(pathRef.current, { attr: { d: curvePath(h, isActiveRef.current) } });
            }
        };
        const onResize = () => {
            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(measure);
        };

        measure();
        window.addEventListener('resize', onResize);
        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('resize', onResize);
        };
    }, []);

    // Open / close
    useEffect(() => {
        const path = pathRef.current;
        if (isActiveRef.current === isActive || !path) {
            isActiveRef.current = isActive;
            return;
        }
        isActiveRef.current = isActive;

        tweenRef.current?.kill();
        tweenRef.current = gsap.to(path, {
            attr: { d: curvePath(heightRef.current, isActive) },
            duration: isActive ? 1 : 0.8,
            ease: EASES.intended,
            onComplete: () => {
                // Land on the right shape if the viewport changed meanwhile
                gsap.set(path, { attr: { d: curvePath(heightRef.current, isActiveRef.current) } });
            },
        });
    }, [isActive]);

    useEffect(() => () => { tweenRef.current?.kill(); }, []);

    return (
        <svg className="absolute top-0 -left-[99px] w-[100px] h-full fill-primary stroke-none">
            <path ref={pathRef} />
        </svg>
    );
}
