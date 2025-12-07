"use client"
import React, { useEffect, useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { textAnim, curveAnim, translateAnim } from '@/lib/anim';
import { usePathname } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

interface CurveProps {
    children: React.ReactNode;
    backgroundColor: string;
    isExiting?: boolean; // Passed from _app.tsx
    FilColor: string;
}

export default function Curve({ children, backgroundColor, isExiting, FilColor }: CurveProps) {
    const t = useTranslations("Navigation");
    const pathname = usePathname();
    const [dimensions, setDimensions] = useState<{ width: number | null; height: number | null }>({
        width: null,
        height: null
    });

    const svgRef = useRef<SVGSVGElement>(null);
    const pathRef = useRef<SVGPathElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);



    const routes: Record<string, string> = {
        "/": t("home"),
        "/about": t("about"),
        "/contact": t("contact"),
        "/menu": t("menu"),
        "/faq": t("faq"),
    };


    useEffect(() => {
        function resize() {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight
            });
        }
        resize();
        window.addEventListener("resize", resize);
        return () => window.removeEventListener("resize", resize);
    }, []);

    // GSAP Animation Logic
    useGSAP(() => {
        if (!dimensions.width || !dimensions.height || !svgRef.current || !pathRef.current || !textRef.current) return;

        const pathStringInitial = `
        M0 300 
        Q${dimensions.width / 2} 0 ${dimensions.width} 300
        L${dimensions.width} ${dimensions.height + 300}
        Q${dimensions.width / 2} ${dimensions.height + 600} 0 ${dimensions.height + 300}
        L0 0
    `;

        const pathStringTarget = `
        M0 300
        Q${dimensions.width / 2} 0 ${dimensions.width} 300
        L${dimensions.width} ${dimensions.height}
        Q${dimensions.width / 2} ${dimensions.height} 0 ${dimensions.height}
        L0 0
    `;

        const text = textAnim(textRef.current);
        const curve = curveAnim(pathRef.current, pathStringInitial, pathStringTarget);
        const trans = translateAnim(svgRef.current);

        if (isExiting) {
            // Run Exit Animations
            text.exit();
            curve.exit();
            trans.exit();
        } else {
            // Run Enter Animations
            text.enter();
            curve.enter();
            trans.enter();
        }

    }, [dimensions, isExiting]); // Re-run when exiting state changes

    return (
        // Replaces .page .curve
        <div className='relative' style={{ backgroundColor }}>
            {/* Background Opacity layer */}
            <div
                className={`fixed inset-0 h-[calc(100vh+600px)] w-screen pointer-events-none z-20 transition-opacity duration-0 delay-100 linear ${dimensions.width == null ? 'opacity-100' : 'opacity-0'}`}
            />

            {/* Route Text */}
            <p
                ref={textRef}
                className='fixed left-1/2 top-[40%] text-white text-[46px] z-30 -translate-x-1/2 text-center pointer-events-none'
            >
                {routes[pathname]}
            </p>

            {/* SVG Overlay */}
            {dimensions.width != null && (
                <svg
                    ref={svgRef}
                    className="fixed h-[calc(100vh+600px)] w-screen pointer-events-none left-0 top-0 z-20"
                >
                    <path ref={pathRef} fill={FilColor} />
                </svg>
            )}

            {children}
        </div>
    );
}