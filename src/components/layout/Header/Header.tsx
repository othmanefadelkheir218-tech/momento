"use client";

import { usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import ThemeToggle from "../../ThemeToggle";
import LangSwitcher from "../../LangSwitcher";
import Magnetic from "../../Magnetic";
import { useState, useRef } from "react";
import Nav from "./Nav";
import useScroll from "@/hooks/useScroll";
import { Dot, Minus } from "lucide-react";
import CostumButton from "../../CostumButton";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import useScrollToTop from "@/hooks/useScrollToTop";
import useWidth from "@/hooks/Width";
import TransitionLink from "../../TransitionLink";

export default function Header() {
    useScrollToTop();
    const [isActive, setIsActive] = useState(false);
    const isScrolled = useScroll();
    const width = useWidth();
    const t = useTranslations("Navigation");
    const pathname = usePathname();

    const containerRef = useRef<HTMLDivElement>(null);
    const topLine = useRef<HTMLDivElement>(null);
    const bottomLine = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.set([topLine.current, bottomLine.current], { xPercent: -50, yPercent: -50 });
    }, { scope: containerRef });

    useGSAP(() => {
        if (isActive) {
            gsap.to(topLine.current, { y: 0, rotation: 45, duration: 0.3, ease: "power2.inOut" });
            gsap.to(bottomLine.current, { y: 0, rotation: -45, duration: 0.3, ease: "power2.inOut" });
        } else {
            gsap.to(topLine.current, { y: -5, rotation: 0, duration: 0.3, ease: "power2.inOut" });
            gsap.to(bottomLine.current, { y: 5, rotation: 0, duration: 0.3, ease: "power2.inOut" });
        }
    }, { scope: containerRef, dependencies: [isActive] });

    useGSAP(() => {
        if (width > 768) {
            if (isScrolled) {
                gsap.to(headerRef.current, { y: "-100%", duration: 0.25, ease: "power1.out" });
                gsap.to(buttonRef.current, { scale: 1, duration: 0.25, ease: "power1.out" });
            } else {
                gsap.to(headerRef.current, { y: 0, duration: 0.25, ease: "power1.out" });
                gsap.to(buttonRef.current, { scale: 0, duration: 0.25, ease: "power1.out" });
            }
        } else {
            gsap.set(headerRef.current, { y: 0 });
            gsap.set(buttonRef.current, { scale: 1 });
        }
    }, { dependencies: [isScrolled, width] });

    const Links = [
        { href: "/", label: t("home") },
        { href: "/menu", label: t("menu") },
        { href: "/faq", label: t("faq") },
        { href: "/about", label: t("about") },
        { href: "/contact", label: t("contact") },
    ];

    return (
        <>
            <header ref={headerRef} className="fixed top-0 w-full z-20 py-2 bg-black/10 backdrop-blur-lg shadow-lg transition-transform duration-300">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <TransitionLink href="/" className="">
                        <img src="/images/LogoWhite.png" className="md:w-48 w-32" alt="Momento Logo" />
                    </TransitionLink>
                    <nav className="hidden md:flex items-center gap-8">
                        {Links.map((link) => {
                            const isActiveLink = pathname === link.href;
                            return (
                                <Magnetic key={link.href}>
                                    <TransitionLink
                                        // label={link.label}
                                        href={link.href}
                                        className="text-white flex flex-col items-center text-lg trispace-font group"
                                    >
                                        <span>{link.label}</span>

                                        {/* Dot centered under the text */}
                                        <span
                                            className={`flex justify-center transition-all duration-300 ease-in-out 
                                                ${isActiveLink ? "opacity-100 scale-100" : "opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100"}
                                            `}
                                        >
                                            <Dot className="w-8 h-8 -mt-3" />
                                        </span>
                                    </TransitionLink>
                                </Magnetic>
                            );
                        })}
                    </nav>
                </div>
            </header>

            {/* nav button controller  */}
            <div ref={buttonRef} className="fixed z-40 top-4 right-2 flex items-center justify-center w-16 h-16 rounded-full scale-0">
                <CostumButton
                    onClick={() => setIsActive(!isActive)}
                    backgroundColor="#DB212F"
                    // hoverTextColor="#ffffff"
                    className="w-full shadow-md h-full bg-primaryLighter border-primaryLighter text-white hover:border-white">
                    <div ref={containerRef} className="relative w-full h-full">
                        <div ref={topLine} className="absolute top-1/2 left-1/2">
                            <Minus size={35} strokeWidth={1.5} />
                        </div>
                        <div ref={bottomLine} className="absolute top-1/2 left-1/2">
                            <Minus size={35} strokeWidth={1.5} />
                        </div>
                    </div>
                </CostumButton>
            </div>
            <Nav isActive={isActive} setIsActive={setIsActive} />


        </>
    );
}