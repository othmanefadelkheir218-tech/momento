"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// 1. Register GSAP Plugins
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface ZoomParallaxProps {
    ImageSource: string;
    ContentOne?: React.ReactNode;
    ContentTwo?: React.ReactNode;
    ContentThree?: React.ReactNode;
}

export default function ZoomParallax(props: ZoomParallaxProps) {
    const container = useRef(null);
    const stickyImage = useRef(null);

    // 2. The GSAP Logic (Your preferred scale logic)
    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container.current,
                    start: "top top",
                    end: "center center",
                    scrub: 2,
                },
            });

            // This now animates the wrapper (Image + Overlay together)
            tl.fromTo(
                stickyImage.current,
                {
                    marginTop: 0,
                    scale: 2,
                    transformOrigin: "center center"
                },
                {
                    marginTop: "40px",
                    scale: 0.5,
                    ease: "none"
                }
            );
        },
        { scope: container }
    );

    return (
        <main className="w-full bg-primaryLighter/20">
            <div className="absolute top-0 left-0 w-full z-1">
                <div ref={container} className="relative h-[300vh] w-full">
                    {/* 1. STICKY BACKGROUND */}
                    <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center ">
                        <div
                            ref={stickyImage}
                            className="relative scale-200 w-auto h-auto shadow-2xl"
                        >
                            <img
                                src={props.ImageSource}
                                alt="Parallax Background"
                                className="h-auto w-auto object-cover block"
                            />
                            {/* Overlay is locked to the wrapper */}
                            <div className="absolute inset-0 bg-black/60" />
                        </div>
                    </div>

                    {/* 2. FLOATING CONTENT */}
                    <div className="absolute top-0 left-0 w-full z-10">
                        {/* Page One */}
                        <section className="h-[300vh] w-full flex items-center justify-center" />
                    </div>
                </div>
            </div>

            <section className="min-h-screen w-full z-2 relative">
                <div className="flex items-center justify-center w-full h-full ">
                    {props.ContentOne}
                </div>
            </section>
            <section className="min-h-screen w-full z-0 relative">
                <div className="flex items-center justify-center w-full h-full">
                    {props.ContentTwo}
                </div>
            </section>

            <section className="relative z-10  w-full bg-[#F7D6D9] flex items-center justify-center pt-10">
                <div className="flex items-center justify-center w-full">
                    {props.ContentThree}
                </div>
            </section>
        </main>
    );
}
