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
    { color: "#e3e5e7", src: "c2.jpg" },
    { color: "#d6d7dc", src: "decimal.jpg" },
    { color: "#e3e3e3", src: "funny.jpg" },
    { color: "#21242b", src: "google.jpg" }
];

const slider2: Project[] = [
    { color: "#d4e3ec", src: "maven.jpg" },
    { color: "#e5e0e1", src: "panda.jpg" },
    { color: "#d7d4cf", src: "powell.jpg" },
    { color: "#e1dad6", src: "wix.jpg" }
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
            className="flex flex-col gap-[3vw] relative   z-1 overflow-hidden "
        >
            {/* Slider 1 */}
            <div
                ref={slider1Ref}
                className="flex relative gap-[3vw] w-[120vw] -left-[10vw]"
            >
                {slider1.map((project, index) => (
                    <div
                        key={index}
                        className="w-[25%] h-[20vw] flex items-center justify-center"
                        style={{ backgroundColor: project.color }}
                    >
                        <div className="relative w-[4/5] h-[4/5]">
                            <Image
                                fill={true}
                                alt="image"
                                src={`/images/${project.src}`}
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
                        className="w-[25%] h-[20vw] flex items-center justify-center"
                        style={{ backgroundColor: project.color }}
                    >
                        <div className="relative w-[80%] h-[80%]">
                            <Image
                                fill={true}
                                alt="image"
                                src={`/images/${project.src}`}
                                className="object-cover"
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Circle Container */}
            {/* Starting height set to 50px via inline style or arbitrary class to match Framer start value */}
            <div
                ref={circleContainerRef}
                className="relative mt-[100px] bg-red-500" // bg-red-500 kept for debugging/visualization based on your original code
                style={{ height: '50px' }}
            >
                <div
                    className="h-[1550%] w-[120%] -left-[10%] rounded-b-[50%] bg-[#FBE8EA] z-1 absolute shadow-[0_60px_50px_rgba(0,0,0,0.748)]"
                ></div>
            </div>
        </div>
    );
}