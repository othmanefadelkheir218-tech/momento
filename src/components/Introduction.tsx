'use client';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { useLenis } from "lenis/react";

const words = ["Hello", "Bonjour", "Ciao", "Olà", "やあ", "Hallå", "Guten tag", "Hallo"];

interface Dimension {
    width: number;
    height: number;
}

export default function Introduction() {
    const [index, setIndex] = useState<number>(0);
    const [dimension, setDimension] = useState<Dimension>({ width: 0, height: 0 });
    const [isVisible, setIsVisible] = useState<boolean>(true);

    const containerRef = useRef<HTMLDivElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);
    
    // We use this Ref to access dimensions inside animateExit 
    // without adding 'dimension' as a dependency (which would break the logic on resize)
    const dimensionRef = useRef<Dimension>({ width: 0, height: 0 });
    
    const lenis = useLenis();

    // 1. Wrap animateExit in useCallback so it's stable
    const animateExit = useCallback(() => {
        // Read dimensions from Ref (always current, doesn't trigger re-creation of function)
        const { width, height } = dimensionRef.current;

        // Animate container sliding up
        if (containerRef.current) {
            gsap.to(containerRef.current, {
                y: '-100vh',
                duration: 0.8,
                ease: "power2.inOut",
                delay: 0.2
            });
        }

        // Animate SVG curve
        if (svgRef.current && width > 0) {
            const initialPath = `M0 0 L${width} 0 L${width} ${height} Q${width / 2} ${height + 300} 0 ${height} L0 0`;
            const targetPath = `M0 0 L${width} 0 L${width} ${height} Q${width / 2} ${height} 0 ${height} L0 0`;

            const path = svgRef.current.querySelector('path');
            if (path) {
                path.setAttribute('d', initialPath);
                gsap.to(path, {
                    attr: { d: targetPath },
                    duration: 0.7,
                    ease: "power2.inOut",
                    delay: 0.3
                });
            }
        }

        setTimeout(() => {
            setIsVisible(false);
        }, 1500);
    }, []); // No dependencies needed thanks to Refs

    useEffect(() => {
        // Handle resize
        const handleResize = () => {
            const newDim = { width: window.innerWidth, height: window.innerHeight };
            
            // Update State (for DOM rendering)
            setDimension(newDim);
            // Update Ref (for Animation logic)
            dimensionRef.current = newDim;
        };

        // 2. Fix "Synchronous setState" error
        // Using requestAnimationFrame pushes the update to the next frame, 
        // preventing the "cascading render" warning.
        requestAnimationFrame(() => {
            handleResize();
        });

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        // Word animation
        if (index === words.length - 1) {
            // Start exit animation after last word
            const timeout = setTimeout(() => {
                animateExit();
            }, 1000);
            return () => clearTimeout(timeout);
        }

        const timeout = setTimeout(() => {
            setIndex(index + 1);
        }, index === 0 ? 1000 : 150);

        return () => clearTimeout(timeout);
    }, [index, animateExit]); // 3. animateExit is now a safe dependency

    useEffect(() => {
        // Initial text fade in
        if (textRef.current && dimension.width > 0) {
            gsap.fromTo(textRef.current,
                { opacity: 0 },
                { opacity: 0.75, duration: 1, delay: 0.2 }
            );
        }
    }, [dimension.width]);

    // Lock Body Scroll (Lenis + Native)
    useEffect(() => {
        if (isVisible) {
            lenis?.stop();
            document.body.style.overflow = "hidden";
        } else {
            lenis?.start();
            document.body.style.overflow = "";
        }
        return () => {
            lenis?.start();
            document.body.style.overflow = "";
        };
    }, [isVisible, lenis]);

    if (!isVisible) return null;

    // Use state for rendering the initial SVG path (needs to be reactive)
    const initialPath = dimension.width > 0
        ? `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height} L0 0`
        : '';

    return (
        <div
            ref={containerRef}
            className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-55 bg-primary"
        >
            {dimension.width > 0 && (
                <>
                    <p
                        ref={textRef}
                        className="flex items-center absolute z-10 text-white text-4xl md:text-5xl lg:text-6xl opacity-0"
                    >
                        <span className="block w-2.5 h-2.5 md:w-3 md:h-3 bg-white rounded-full mr-2 md:mr-3"></span>
                        {words[index]}
                    </p>

                    <svg
                        ref={svgRef}
                        className="absolute top-0 w-full h-[calc(100%+300px)]"
                    >
                        <path d={initialPath} fill="#DB212F" />
                    </svg>
                </>
            )}
        </div>
    );
}