"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";


import Curve from "./Curve";
import Footer from "./Footer";
import NavLink from "./Link";
import { usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useLenis } from "lenis/react";


interface NavProps {
    isActive: boolean;
    setIsActive: (active: boolean) => void;
}

export default function Nav({ isActive, setIsActive }: NavProps) {
    const t = useTranslations("Navigation");
    const container = useRef<HTMLDivElement>(null);
    const backdrop = useRef<HTMLDivElement>(null);
    const pathname = usePathname();
    const lenis = useLenis();

    // Create a timeline reference so we can play/reverse it
    const tl = useRef<gsap.core.Timeline | null>(null);


    const navItems = [
        { title: t("home"), href: "/" },
        { title: t("menu"), href: "/menu" },
        { title: t("faq"), href: "/faq" },
        { title: t("contact"), href: "/contact" },
    ];


    useGSAP(
        () => {
            // Initialize the timeline (PAUSED initially)
            tl.current = gsap.timeline({ paused: true });

            // 0. Fade Backdrop In
            tl.current.to(backdrop.current, {
                opacity: 1,
                pointerEvents: "auto",
                duration: 0.8,
                ease: "power3.inOut",
            }, 0);

            // 1. Slide Menu In (from Right)
            tl.current.to(container.current, {
                x: "-50px",
                duration: 0.8,
                ease: "power3.inOut",
            }, 0); // Run concurrently with backdrop

            // 2. Animate Links (Staggered) - Optional, adds polish
            // Assuming NavLink has a class '.nav-link'
            tl.current.from(".nav-link", {
                x: 100,
                opacity: 0,
                duration: 0.4,
                stagger: 0.1,
                ease: "power3.out"
            }, "-=0.3");
        },
        { scope: container }
    );

    // Watch 'isActive' prop to trigger animations
    useGSAP(() => {
        if (isActive) {
            tl.current?.play();
        } else {
            tl.current?.reverse();
        }
    }, [isActive]);

    // Lock Body Scroll
    React.useEffect(() => {
        if (isActive) {
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
    }, [isActive, lenis]);

    return (
        // Tailwind: fixed, right-0, off-screen by default (translate-x-full)
        <>
            <div
                ref={backdrop}
                onClick={() => setIsActive(false)}
                className="fixed top-0 left-0 z-25 w-full h-screen backdrop-blur-lg bg-white/50 opacity-0 pointer-events-none"
            />
            <div
                ref={container}
                className="fixed top-0 -right-56 md:-right-26 h-screen w-full md:w-[650px] bg-primary backdrop-blur-lg shadow-lg text-white z-30 translate-x-full"
            >
                <div className="h-full p-12 md:p-24 flex flex-col justify-between box-border ">

                    {/* Navigation Links Container */}
                    <div className="flex flex-col gap-3 mt-20 ">
                        <div className="text-white border-b border-white uppercase text-xs mb-10 pb-2">
                            <p>Navigation</p>
                        </div>

                        <div className="flex flex-col text-5xl md:text-6xl ">
                            {navItems.map((data, index) => (
                                <NavLink
                                    key={index}
                                    data={{ ...data, index }}
                                    isActive={pathname === data.href}
                                    // Optional: Close menu when link clicked
                                    onClick={() => setIsActive(false)}
                                />
                            ))}
                        </div>
                    </div>

                    <Footer />
                </div>

                {/* SVG Curve Component */}
                <Curve isActive={isActive} />
            </div>
        </>
    );
}