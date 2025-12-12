'use client';

import { useRef, useLayoutEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// 1. Define Types for your data
interface Project {
    color: string;
    src: string;
}

const slider1: Project[] = [
    { color: "#EE636E", src: "/images/c2.jpg" },
    { color: "#F7CCD0", src: "/images/decimal.jpg" },
    { color: "#EC8990", src: "/images/funny.jpg" },
    { color: "#F1D1D4", src: "/images/google.jpg" }
];

const slider2: Project[] = [
    { color: "#F1D1D4", src: "/images/maven.jpg" },
    { color: "#F7CCD0", src: "/images/panda.jpg" },
    { color: "#EC8990", src: "/images/powell.jpg" },
    { color: "#EE636E", src: "/images/wix.jpg" }
];

export default function SlidingImages() {
    // 2. Refs for GSAP targeting
    const containerRef = useRef<HTMLDivElement>(null);
    const slider1Ref = useRef<HTMLDivElement>(null);
    const slider2Ref = useRef<HTMLDivElement>(null);
    const circleContainerRef = useRef<HTMLDivElement>(null);

    // 3. GSAP Animation Logic
    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const context = gsap.context(() => {
            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top bottom", // Starts when top of container hits bottom of viewport
                    end: "bottom top",   // Ends when bottom of container hits top of viewport
                    scrub: 1,            // Smooth scrubbing (similar to Framer's immediate response)
                },
            });

            // Equivalent to: x1 = useTransform(scrollYProgress, [0, 1], [0, 150])
            timeline.to(slider1Ref.current, {
                x: 150,
                ease: "none",
            }, 0);

            // Equivalent to: x2 = useTransform(scrollYProgress, [0, 1], [0, -150])
            timeline.to(slider2Ref.current, {
                x: -150,
                ease: "none",
            }, 0);

            // Equivalent to: height = useTransform(scrollYProgress, [0, 0.9], [50, 0])
            // Note: We set the initial height in CSS/Tailwind (50px / 3.2rem), so we animate TO 0.
            timeline.to(circleContainerRef.current, {
                height: 0,
                ease: "none",
            }, 0);

        }, containerRef);

        // Cleanup
        return () => context.revert();
    }, []);

    return (
        <div
            ref={containerRef}
            className="flex flex-col gap-[3vw] relative   z-1 overflow-hidden my-10 "
        >
            {/* Slider 1 */}
            <div
                ref={slider1Ref}
                className="flex relative gap-[3vw] w-[120vw] -left-[10vw]"
            >
                {slider1.map((project, index) => (
                    <div
                        key={index}
                        className="lg:w-[25%] lg:h-[20vw] w-[500px] h-[300px] flex items-center justify-center"
                        style={{ backgroundColor: project.color }}
                    >
                        <div className="relative w-[90%] h-[90%]">
                            <Image
                                fill={true}
                                alt="image"
                                src={`${project.src}`}
                                className="object-cover"
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Slider 2 */}
            <div
                ref={slider2Ref}
                className="flex relative gap-[3vw] w-[120vw] -left-[10vw]"
            >
                {slider2.map((project, index) => (
                    <div
                        key={index}
                        className="lg:w-[25%] lg:h-[20vw] w-[500px] h-[300px] flex items-center justify-center"
                        style={{ backgroundColor: project.color }}
                    >
                        <div className="relative w-[90%] h-[90%]">
                            <Image
                                fill={true}
                                alt="image"
                                src={`${project.src}`}
                                className="object-cover"
                            />
                        </div>
                    </div>
                ))}
            </div>
        
        </div>
    );
}