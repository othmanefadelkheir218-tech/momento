import { useRef, ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface Props {
    children: ReactNode;
    width?: "fit-content" | "100%";
    className?: string;
    delay?: number;
    rotate?: boolean;
}

export const Reveal = ({ children, className = "", delay = 0, rotate = true }: Props) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (contentRef.current) {
            gsap.fromTo(contentRef.current,
                {
                    // opacity: 0, 
                    y: 400,
                    rotation: rotate ? 15 : 0,

                },
                {
                    // opacity: 1,
                    y: 0,
                    rotation: 0,
                    duration: 1.2,
                    delay: delay,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top bottom-=20%", // Trigger when top of element hits 80% of viewport height
                        toggleActions: "play none none none", // Play once
                    }
                }
            );
        }
    }, { scope: containerRef });

    return (
        <div
            ref={containerRef}
            className={`${className}`}
            style={{ position: "relative", overflow: "hidden" }}
        >
            <div ref={contentRef}>
                {children}
            </div>
        </div>
    );
};