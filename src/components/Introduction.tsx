'use client';
import React, { useEffect, useState, useRef } from 'react';
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
    const lenis = useLenis();

    useEffect(() => {
        // Set initial dimension
        setDimension({ width: window.innerWidth, height: window.innerHeight });

        // Handle resize
        const handleResize = () => {
            setDimension({ width: window.innerWidth, height: window.innerHeight });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        // Word animation
        if (index === words.length - 1) {
            // Start exit animation after last word
            setTimeout(() => {
                animateExit();
            }, 1000);
            return;
        }

        const timeout = setTimeout(() => {
            setIndex(index + 1);
        }, index === 0 ? 1000 : 150);

        return () => clearTimeout(timeout);
    }, [index]);

    useEffect(() => {
        // Initial text fade in
        if (textRef.current && dimension.width > 0) {
            gsap.fromTo(textRef.current,
                { opacity: 0 },
                { opacity: 0.75, duration: 1, delay: 0.2 }
            );
        }
    }, [dimension.width]);

    const animateExit = () => {
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
        if (svgRef.current && dimension.width > 0) {
            const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height} L0 0`;
            const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height} L0 0`;

            const path = svgRef.current.querySelector('path');
            if (path) {
                // Set initial state
                path.setAttribute('d', initialPath);

                // Animate to target
                gsap.to(path, {
                    attr: { d: targetPath },
                    duration: 0.7,
                    ease: "power2.inOut",
                    delay: 0.3
                });
            }
        }

        // Hide component after animation
        setTimeout(() => {
            setIsVisible(false);
        }, 1500);
    };


    // Lock Body Scroll (Lenis + Native)
    React.useEffect(() => {
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

    const initialPath = dimension.width > 0
        ? `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height} L0 0`
        : '';

    return (
        <div
            ref={containerRef}
            className="
        fixed 
        top-0 
        left-0 
        w-screen 
        h-screen 
        flex 
        items-center 
        justify-center 
        z-55 
        bg-primary
      "
        >
            {dimension.width > 0 && (
                <>
                    <p
                        ref={textRef}
                        className="
              flex 
              items-center 
              absolute 
              z-10 
              text-white 
              text-4xl 
              md:text-5xl 
              lg:text-6xl
              opacity-0
            "
                    >
                        <span className="
              block 
              w-2.5 
              h-2.5 
              md:w-3 
              md:h-3 
              bg-white 
              rounded-full 
              mr-2 
              md:mr-3
            "></span>
                        {words[index]}
                    </p>

                    <svg
                        ref={svgRef}
                        className="
              absolute 
              top-0 
              w-full 
              h-[calc(100%+300px)]
            "
                    >
                        <path
                            d={initialPath}
                            fill="#DB212F"
                        />
                    </svg>
                </>
            )}
        </div>
    );
}