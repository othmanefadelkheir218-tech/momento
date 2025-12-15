'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react'; // 1. Import useCallback
import { curveAnim, translateAnim, logoAnim } from '@/lib/anim';
import { TransitionProvider } from '@/Context/TransitionContext';
import { usePathname } from '@/i18n/navigation';

export default function TransitionWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [dimensions, setDimensions] = useState<{ width: number | null; height: number | null }>({ width: null, height: null });

    // References
    const svgRef = useRef<SVGSVGElement>(null);
    const pathRef = useRef<SVGPathElement>(null);
    const textRef = useRef<SVGPathElement>(null);

    const isFirstLoad = useRef(true);

    // Resize Logic
    useEffect(() => {
        const resize = () => setDimensions({ width: window.innerWidth, height: window.innerHeight });
        resize();
        window.addEventListener("resize", resize);
        return () => window.removeEventListener("resize", resize);
    }, []);

    // 2. Wrap getPaths in useCallback
    // This ensures the function is only recreated when dimensions change
    const getPaths = useCallback(() => {
        if (!dimensions.width || !dimensions.height) return { initial: "", target: "" };
        return {
            initial: `M0 300 Q${dimensions.width / 2} 0 ${dimensions.width} 300 L${dimensions.width} ${dimensions.height + 300} Q${dimensions.width / 2} ${dimensions.height + 600} 0 ${dimensions.height + 300} L0 0`,
            target: `M0 300 Q${dimensions.width / 2} 0 ${dimensions.width} 300 L${dimensions.width} ${dimensions.height} Q${dimensions.width / 2} ${dimensions.height} 0 ${dimensions.height} L0 0`
        };
    }, [dimensions]); 

    // --- The Main Logic ---

    // 1. Function to Trigger Exit.
    const triggerExitAnimation = async () => {
        if (!svgRef.current || !pathRef.current || !textRef.current || !dimensions.width) return;

        const { initial, target } = getPaths();
        const logo = logoAnim(textRef.current);
        const curve = curveAnim(pathRef.current, initial, target);
        const trans = translateAnim(svgRef.current);

        logo.exit();
        trans.exit();
        await curve.exit(); 
    };

    // 2. Trigger Enter
    useEffect(() => {
        if (!svgRef.current || !pathRef.current || !textRef.current || !dimensions.width) return;

        const { initial, target } = getPaths();
        const logo = logoAnim(textRef.current);
        const curve = curveAnim(pathRef.current, initial, target);
        const trans = translateAnim(svgRef.current);

        const playTransition = async () => {
            if (isFirstLoad.current) {
                await logo.exit();
                isFirstLoad.current = false;
            }
            logo.enter();
            curve.enter();
            trans.enter();
        };

        playTransition();

    }, [pathname, dimensions, getPaths]); // 3. Now safe to include getPaths

    return (
        <TransitionProvider triggerExitAnimation={triggerExitAnimation}>
            {children}
            <div className={`fixed top-0 left-0 w-full h-[calc(100vh+600px)] pointer-events-none z-50 transition-opacity duration-0 opacity-100`}>
                {dimensions.width === null && <div className="fixed inset-0 bg-primary z-40" />}
                <div className="fixed top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
                    <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            ref={textRef}
                            d="M40 160 C 50 100, 60 40, 70 40 C 80 40, 90 100, 100 160 C 110 100, 120 40, 130 40 C 140 40, 150 100, 160 160"
                            stroke="white"
                            strokeWidth="12"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                        />
                    </svg>
                </div>
                <svg ref={svgRef} className="fixed top-[-300px] left-0 w-full h-[calc(100vh+600px)] z-40">
                    <path ref={pathRef} d={dimensions.width ? getPaths().initial : ""} fill='#DB212F' />
                </svg>
                <div className={`absolute top-0 left-0 w-full h-full bg-primary -z-10`} style={{ opacity: 0 }} />
            </div>
        </TransitionProvider>
    );
}