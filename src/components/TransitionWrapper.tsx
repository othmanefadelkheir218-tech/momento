'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { logoAnim, curtainPaths, curtainY, CURTAIN_BULGE, DURATION, TRANSITION_EASE } from '@/lib/anim';
import { TransitionProvider } from '@/Context/TransitionContext';
import { usePathname } from '@/i18n/navigation';

type CurtainState = 'covered' | 'revealed';

export default function TransitionWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [isReady, setIsReady] = useState(false);

    // References
    const svgRef = useRef<SVGSVGElement>(null);
    const pathRef = useRef<SVGPathElement>(null);
    const textRef = useRef<SVGPathElement>(null);
    const logoBoxRef = useRef<HTMLDivElement>(null);

    const isFirstLoad = useRef(true);

    // The curtain is driven by GSAP only. Size lives in a ref (not state) so a
    // resize never re-renders the <path> and wipes out what GSAP has drawn —
    // that was what left the red screen stuck after an iOS address-bar
    // change, a browser zoom, or a window resize.
    const size = useRef({ w: 0, h: 0 });
    const curtainState = useRef<CurtainState>('covered');
    const curtainTl = useRef<gsap.core.Timeline | null>(null);
    const pendingResolve = useRef<(() => void) | null>(null);

    /** Snap the curtain to its current state at the current viewport size. */
    const syncCurtain = useCallback(() => {
        const svg = svgRef.current;
        const path = pathRef.current;
        const { w, h } = size.current;
        if (!svg || !path || !w || !h) return;

        const paths = curtainPaths(w, h);
        gsap.set(svg, { height: h + 2 * CURTAIN_BULGE, y: curtainY(curtainState.current, h) });
        gsap.set(path, { attr: { d: paths[curtainState.current] } });
    }, []);

    /** Animate the curtain to a state; resolves when it lands. */
    const animateCurtain = useCallback((to: CurtainState) => {
        const svg = svgRef.current;
        const path = pathRef.current;
        const { w, h } = size.current;
        if (!svg || !path || !w || !h) return Promise.resolve();

        // Stop whatever was running (e.g. a tap during the reveal) and let
        // anyone waiting on it carry on, instead of two tweens fighting.
        curtainTl.current?.kill();
        pendingResolve.current?.();
        curtainState.current = to;

        const paths = curtainPaths(w, h);

        return new Promise<void>((resolve) => {
            pendingResolve.current = resolve;
            curtainTl.current = gsap.timeline({
                defaults: { duration: DURATION, ease: TRANSITION_EASE },
                onComplete: () => {
                    curtainTl.current = null;
                    pendingResolve.current = null;
                    // The viewport may have changed mid-animation: land on the
                    // right shape for the size we have now.
                    syncCurtain();
                    resolve();
                },
            })
                .to(path, { attr: { d: paths[to] } }, 0)
                // transform instead of `top`: same movement, GPU-composited
                .to(svg, { y: curtainY(to, h) }, 0);
        });
    }, [syncCurtain]);

    // Resize / zoom / orientation / iOS address bar
    useEffect(() => {
        let raf = 0;

        const measure = () => {
            const w = window.innerWidth;
            const h = window.innerHeight;
            if (w === size.current.w && h === size.current.h) return;
            size.current = { w, h };
            // While animating, the tween's onComplete re-syncs at the new size,
            // so a resize never interrupts or jerks the transition.
            if (!curtainTl.current) syncCurtain();
        };

        const onResize = () => {
            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(measure);
        };

        // First measure on the next frame (the screen stays covered by the
        // bg-primary fallback until then), then start the intro.
        raf = requestAnimationFrame(() => {
            measure();
            setIsReady(true);
        });

        window.addEventListener('resize', onResize);
        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('resize', onResize);
        };
    }, [syncCurtain]);

    // --- The Main Logic ---

    // 1. Exit: cover the screen (and draw the logo) before navigating
    const triggerExitAnimation = useCallback(async () => {
        if (textRef.current) logoAnim(textRef.current, logoBoxRef.current).exit();
        await animateCurtain('covered');
    }, [animateCurtain]);

    // Reveal without a route change (safety fallback from the context)
    const triggerEnterAnimation = useCallback(() => {
        if (textRef.current) logoAnim(textRef.current, logoBoxRef.current).enter();
        animateCurtain('revealed');
    }, [animateCurtain]);

    // 2. Enter: reveal the new page
    useEffect(() => {
        if (!isReady || !textRef.current) return;

        const logo = logoAnim(textRef.current, logoBoxRef.current);

        let cancelled = false;
        let claimedIntro = false;
        let finishedIntro = false;

        const playTransition = async () => {
            if (isFirstLoad.current) {
                // Claim it up front so a re-run can't skip straight to the
                // shrink while the draw is still going.
                isFirstLoad.current = false;
                claimedIntro = true;
                await logo.exit();
                if (cancelled) return;
                finishedIntro = true;
            }
            logo.enter();
            animateCurtain('revealed');
        };

        playTransition();

        return () => {
            cancelled = true;
            // Interrupted before the intro finished (StrictMode's double mount):
            // hand the intro back so the next run still draws the logo.
            if (claimedIntro && !finishedIntro) isFirstLoad.current = true;
        };

    }, [pathname, isReady, animateCurtain]);

    return (
        <TransitionProvider
            triggerExitAnimation={triggerExitAnimation}
            triggerEnterAnimation={triggerEnterAnimation}
        >
            {children}
            <div className="fixed inset-0 pointer-events-none z-50">
                {!isReady && <div className="fixed inset-0 bg-primary z-40" />}
                <div ref={logoBoxRef} className="fixed inset-0 z-50">
                    <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <svg width="220" height="225" viewBox="0 0 329.78 336.99" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            ref={textRef}
                            d="M219.14,129.97c-5.19,8.6-10.65,17.05-15.52,25.83c-14.23,25.66-28.32,51.41-42.25,77.24
                                c-3.46,6.42-6.11,13.29-9.06,19.99c-3.28,7.44-8.38,9.72-18.98,8.38c-5.08-0.64-8.76-5.39-9.9-12.13
                                c-3.44-20.4-2.83-40.77-0.11-61.2c2.11-15.85,3.8-31.75,5.69-47.8c-1.63,2.53-3.42,5.15-5.06,7.87
                                c-16.18,26.79-31.96,53.83-48.66,80.29c-7.91,12.54-17.15,24.32-26.63,35.75c-3.18,3.84-8.74,6.16-13.66,7.91
                                c-2.36,0.84-5.76-1.27-8.69-2.04c0.86-2.08,1.33-4.46,2.65-6.19c18.85-24.8,35.49-51.02,51.04-77.98
                                c16.4-28.44,33.26-56.62,49.68-85.05c5.77-9.98,11.05-20.26,16.16-30.59c5-10.13,17.17-14.12,26.62-7.76
                                c2.03,1.37,3.56,4.97,3.57,7.55c0.01,6.13-0.77,12.3-1.68,18.39c-2.86,19.13-5.87,38.23-8.93,57.32
                                c-1.17,7.29-2.73,14.51-3.91,21.79c-1.95,11.99-3.76,24-5.55,36.02c-0.25,1.69-0.03,3.46-0.03,6.68
                                c7.9-14.07,14.99-26.94,22.33-39.67c10.22-17.74,20.8-35.27,30.89-53.08c7.23-12.76,14.27-25.64,20.69-38.82
                                c4.66-9.57,16.36-14.79,25.95-9.67c2.54,1.36,5.02,5.51,5.04,8.4c0.06,8.06-0.62,16.24-2.02,24.19
                                c-3.2,18.15-7.25,36.16-10.5,54.3c-2.48,13.83-4.82,27.73-6.16,41.7c-0.99,10.29-0.38,20.75-0.28,31.13
                                c0.16,15.66,10.91,24.03,22.2,32.12c6.36,4.55,13.26,3.72,20.2,2.73c3.9-0.56,8.92-1.67,10.34,2.2c1.67,4.54-3.32,6.96-6.92,8.42
                                c-12.91,5.24-25.81,4.14-38.43-1.25c-13.42-5.73-23.84-15.3-32.26-26.91c-8.47-11.69-10.28-25.48-8.98-39.34
                                c1.68-18.05,4.36-36.02,7-53.96c1.11-7.54,3.25-14.93,4.92-22.39C219.65,130.2,219.39,130.08,219.14,129.97z"
                            stroke="white"
                            fill="white"
                            strokeWidth="6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    </div>
                </div>
                <svg
                    ref={svgRef}
                    className="fixed top-0 left-0 w-full z-40"
                    style={{ willChange: 'transform' }}
                >
                    <path ref={pathRef} fill='#DB212F' />
                </svg>
            </div>
        </TransitionProvider>
    );
}
