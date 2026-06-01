"use client";

import { usePathname } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import Magnetic from "../../Magnetic";
import { useState, useRef, useEffect } from "react";
import Nav from "./Nav";
import useScroll from "@/hooks/useScroll";
import { Dot, Minus } from "lucide-react";
import CostumButton from "../../CostumButton";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import useScrollToTop from "@/hooks/useScrollToTop";
import useWidth from "@/hooks/Width";
import TransitionLink from "../../TransitionLink";
import Image from "next/image";

export default function Header() {
    useScrollToTop();
    const [isActive, setIsActive] = useState<boolean>(false);
    const isScrolled = useScroll();
    const locale = useLocale();
    const width = useWidth();
    const t = useTranslations("Navigation");
    const pathname = usePathname();

    const containerRef = useRef<HTMLDivElement>(null);
    const topLine = useRef<HTMLDivElement>(null);
    const bottomLine = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.set([topLine.current, bottomLine.current], { yPercent: -50 });
    }, { scope: containerRef });

    useGSAP(() => {
        if (isActive) {
            gsap.to(topLine.current, { y: 0, rotation: 45, duration: 0.3, ease: "power2.inOut" });
            gsap.to(bottomLine.current, { y: 0, rotation: -45, duration: 0.3, ease: "power2.inOut" });
        } else {
            gsap.to(topLine.current, { y: -5, rotation: 0, duration: 0.3, ease: "power2.inOut" });
            gsap.to(bottomLine.current, { y: 5, rotation: 0, duration: 0.3, ease: "power2.inOut" });
        }
    }, { scope: containerRef, dependencies: [isActive, locale] });

    useGSAP(() => {
        if (width > 768) {
            if (isScrolled) {
                gsap.to(headerRef.current, { y: "-100%", duration: 0.08, ease: "power3.out" });
                gsap.to(buttonRef.current, { scale: 1, duration: 0.08, ease: "power3.out" });
            } else {
                gsap.to(headerRef.current, { y: 0, duration: 0.08, ease: "power3.out" });
                gsap.to(buttonRef.current, { scale: 0, duration: 0.08, ease: "power3.out" });
            }
        } else {
            gsap.set(headerRef.current, { y: 0 });
            gsap.set(buttonRef.current, { scale: 1 });
        }
    }, { dependencies: [isScrolled, width] });




    const Links = [
        { href: "/menu", label: t("menu") },
        { href: "/about", label: t("about") },
        // { href: "/contact", label: t("contact") },
        { href: "/become-a-client", label: t("becomeClient") },
    ];



    // Close menu when route changes
    useEffect(() => {
        if (isActive) setIsActive(false);
    }, [pathname]);

    const itsHome = (pathname === "/" || pathname.startsWith("/menu/"));

    return (
        <>
            {/* if its not home make the heeader backgroudn more dark  */}
            <header ref={headerRef} className={`fixed top-0 w-full z-20 py-1   backdrop-blur-lg shadow-lg ${itsHome ? "bg-black/20" : "bg-primary/50"}`}>
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <TransitionLink href="/" className="">
                        <Image
                            width={128}
                            height={128}
                            src="/images/LogoWhite.png" className="md:w-40 w-32" alt="Momento Logo" />
                    </TransitionLink>
                    <nav className="hidden md:flex items-center gap-8 relative">
                        {Links.map((link) => {
                            const isActiveLink = pathname === link.href;
                            return (
                                <Magnetic key={link.href}>
                                    <TransitionLink
                                        // label={link.label}
                                        href={link.href}
                                        className="text-white flex   items-center text-lg trispace-font group "
                                    >

                                        {/* Dot centered under the text */}
                                        <span
                                            className={`flex justify-center transition-all duration-300 ease-in-out 
                                                ${isActiveLink ? "opacity-100 scale-100" : "opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100"}
                                            `}
                                        >
                                            <Dot className="w-8 h-8 " />
                                        </span>

                                        <span>{link.label}</span>


                                    </TransitionLink>
                                </Magnetic>
                            );
                        })}
                    </nav>
                </div>
            </header>

            {/* nav button controller  */}
            <div ref={buttonRef}
                className="
                    fixed z-40 top-4 right-2
                    flex items-center justify-center
                    w-12 h-12        /* mobile */
                    sm:w-14 sm:h-14 /* small screens */
                    md:w-16 md:h-16 /* desktop */
                    rounded-full scale-0
                "
            >
                <CostumButton
                    onClick={() => setIsActive(!isActive)}
                    backgroundColor="#DB212F"
                    // hoverTextColor="#ffffff"
                    className="w-full shadow-md h-full bg-primaryLighter border-primaryLighter text-white hover:border-white">
                    <div ref={containerRef} className="relative w-full h-full">
                        <div ref={topLine} className="absolute top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2">
                            <Minus size={35} strokeWidth={1.5} />
                        </div>
                        <div ref={bottomLine} className="absolute top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2">
                            <Minus size={35} strokeWidth={1.5} />
                        </div>
                    </div>
                </CostumButton>
            </div>
            <Nav isActive={isActive} setIsActive={setIsActive} />


        </>
    );
}