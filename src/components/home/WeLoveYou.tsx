"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Reveal } from "../animation/Reveal";

gsap.registerPlugin(ScrollTrigger);

const WeLovePartnership = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const bgImageRef = useRef<HTMLDivElement>(null); // New ref for the background
    const titleRef = useRef<HTMLHeadingElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {

            // 1. Text Reveal Animation (Same as before)
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 75%",
                    toggleActions: "play none none reverse",
                },
            });

            tl.from(titleRef.current, {
                y: 100,
                opacity: 0,
                duration: 1,
                ease: "power4.out",
            }).from(
                textRef.current,
                {
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out",
                },
                "-=0.6"
            );

            // 2. Background Parallax Animation (The "Slow Fixed" Effect)
            gsap.fromTo(
                bgImageRef.current,
                {
                    yPercent: -15, // Start slightly moved up
                    scale: 1.1,    // Scale up slightly to avoid white edges during movement
                },
                {
                    yPercent: 15, // Move down slowly as we scroll
                    ease: "none", // Linear movement is best for parallax
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top bottom", // Start when section enters viewport
                        end: "bottom top",   // End when section leaves viewport
                        scrub: 1,            // scrub: 1 makes it smooth/laggy (1 second catch-up)
                    },
                }
            );

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="lg:mt-36 relative w-full h-screen flex items-end justify-center py-20 px-4 md:px-10 overflow-hidden"
        >
            {/* 
        SEPARATE BACKGROUND LAYER 
        We use a separate div for the background so we can move it independently.
      */}
            <div
                ref={bgImageRef}
                className="absolute inset-0 w-full h-[120%] -z-10" // h-[120%] gives us extra room to scroll
            >
                <div
                    className="w-full h-full"
                    style={{
                        backgroundImage: `url('/images/WeLoveYou.png')`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                    }}
                />
            </div>

            {/* Optional Gradient Overlay */}
            <div className="absolute inset-0 bg-black/40 pointer-events-none z-0" />

            {/* Content Container */}
            <div className="relative z-10 container mx-auto flex flex-col lg:flex-row items-start lg:items-end justify-between gap-10 lg:gap-20">

                {/* Left Side: Big Title */}
                <div className="w-full lg:w-1/2">
                    <Reveal
                        rotate={false}
                        delay={-0.5}
                    >
                        <h1
                            ref={titleRef}
                            className="text-6xl md:text-8xl lg:text-[7rem] leading-[0.9] font-bold text-white uppercase tracking-tight"
                        >
                            We Love
                        </h1>
                    </Reveal>

                    <Reveal
                        delay={0.05}
                        rotate={false}
                    >
                        <h1
                            className="text-6xl md:text-8xl lg:text-[7rem] leading-[0.9] font-bold text-white uppercase tracking-tight"
                        >
                            Partnership
                        </h1>
                    </Reveal>
                </div>

                {/* Right Side: Paragraph */}
                <div className="w-full lg:w-1/2 flex justify-start lg:justify-end pb-2">
                    <p
                        ref={textRef}
                        className="text-white text-base md:text-lg lg:text-xl font-medium leading-relaxed max-w-md"
                    >
                        Picture this: your venue — be it a city café, deli, or bar — already
                        has everything. Almost.
                        <br />
                        <br />
                        It’s possible that the one thing missing is mr.pops. And this can be
                        fixed.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default WeLovePartnership;