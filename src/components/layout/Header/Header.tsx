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
import { useTransitionRouter } from "@/hooks/useTransitionRouter";

export default function Header() {
    useScrollToTop();
    const [isActive, setIsActive] = useState<boolean>(false);
    const isScrolled = useScroll();
    const locale = useLocale();
    const width = useWidth();
    const t = useTranslations("Navigation");
    const pathname = usePathname();
    const router = useTransitionRouter();

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
        // prefers-reduced-motion: show/hide instantly, no slide
        const m = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 1;
        if (width > 768) {
            if (isScrolled) {
                // Hide slowly, after a short pause
                gsap.to(headerRef.current, { y: "-100%", duration: 0.6 * m, delay: 0.25 * m, ease: "power2.inOut", overwrite: true });
                gsap.to(buttonRef.current, { scale: 1, duration: 0.4 * m, delay: 0.45 * m, ease: "back.out(1.6)", overwrite: true });
            } else {
                gsap.to(headerRef.current, { y: 0, duration: 0.4 * m, ease: "power3.out", overwrite: true });
                gsap.to(buttonRef.current, { scale: 0, duration: 0.2 * m, ease: "power3.out", overwrite: true });
            }
        } else {
            gsap.set(headerRef.current, { y: 0 });
            gsap.set(buttonRef.current, { scale: 1 });
        }
    }, { dependencies: [isScrolled, width] });




    const Links = [
        { href: "/menu", label: t("creations") },
        { href: "/about", label: t("universe") },
        // { href: "/contact", label: t("contact") },
        { href: "/become-a-client", label: t("franchise") },
    ];



    // Close menu when route changes
    useEffect(() => {
        if (isActive) setIsActive(false);
    }, [pathname]);


    return (
        <>
            <header ref={headerRef} className="fixed top-0 w-full z-20 py-1 bg-cream/45 backdrop-blur-2xl backdrop-saturate-150 shadow-[0_8px_30px_-12px_rgb(74_44_33/0.25)]">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <TransitionLink href="/" className="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-caramel">
                        <Image
                            width={128}
                            height={31}
                            priority
                            src="/logo/momento-logo-burgundy.png" className="md:w-40 w-32 h-auto" alt="Momento" />
                    </TransitionLink>
                    <nav className="hidden md:flex items-center gap-8 relative">
                        {Links.map((link) => {
                            const isActiveLink = pathname === link.href;
                            return (
                                <Magnetic key={link.href}>
                                    <TransitionLink
                                        // label={link.label}
                                        href={link.href}
                                        className="text-burgundy hover:text-burgundy-dark flex items-center font-body font-semibold text-[13px] uppercase tracking-[.08em] group rounded-sm focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-caramel"
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

                        {/* "Contact" button → contact page */}
                        <CostumButton
                            role="link"
                            tabIndex={0}
                            onClick={() => router.push("/contact")}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    router.push("/contact");
                                }
                            }}
                            backgroundColor="#751B32"
                            hoverTextColor="#F7F0E5"
                            className="rounded-2xl! border-[1.5px]! border-burgundy bg-cream/60 text-burgundy px-6 py-3 focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-caramel"
                        >
                            <span className="block font-body font-bold text-sm tracking-[.04em] whitespace-nowrap">
                                {t("contact")}
                            </span>
                        </CostumButton>
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
                {/* Soft blurred cream glow behind the round button (fades out, no hard edge) */}
                <span
                    aria-hidden
                    className="pointer-events-none absolute -inset-7 -z-10 rounded-full backdrop-blur-lg bg-[radial-gradient(closest-side,rgb(247_240_229/.9)_50%,rgb(247_240_229/.55)_75%,transparent)] [mask-image:radial-gradient(closest-side,#000_60%,transparent)]"
                />
                <CostumButton
                    onClick={() => setIsActive(!isActive)}
                    backgroundColor="#5A1124"
                    // hoverTextColor="#ffffff"
                    className="w-full shadow-md h-full bg-burgundy border-burgundy text-cream hover:border-cream">
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