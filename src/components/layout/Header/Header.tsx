"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Dot, Minus } from "lucide-react";
import { usePathname } from "@/i18n/navigation";
import useScroll from "@/hooks/useScroll";
import useScrollToTop from "@/hooks/useScrollToTop";
import useWidth from "@/hooks/Width";
import { NAV_TEXT } from "@/components/ui/navText";
import { ROUTES } from "@/Data/routes";
import { useTransitionRouter } from "@/hooks/useTransitionRouter";
import CostumButton from "../../CostumButton";
import Magnetic from "../../Magnetic";
import TransitionLink from "../../TransitionLink";
import Nav from "./Nav";

// The previous header (bigger sizes) is kept in ./v1/Header.tsx.

// Background: plain cream at the very top of the page, see-through cream + blur once scrolled.
const BG_AT_TOP = "bg-cream backdrop-blur-none shadow-none";
const BG_SCROLLED = "bg-cream/45 backdrop-blur-2xl backdrop-saturate-150 shadow-[0_8px_30px_-12px_rgb(74_44_33/0.25)]";

// Keyboard focus ring (design spec: 2px caramel outline, 3px offset)
const FOCUS_RING = "focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-caramel";

// Desktop sizes are fluid (clamp): full size from ~1900px wide, smaller on narrower screens
// (e.g. a 1920px screen at 150% Windows zoom is only 1280px wide for the page).
export default function Header() {
    useScrollToTop();
    const t = useTranslations("Navigation");
    const locale = useLocale();
    const pathname = usePathname();
    const router = useTransitionRouter();
    const width = useWidth();
    const isScrolled = useScroll(); // true while scrolling down

    const [isActive, setIsActive] = useState(false); // full-screen menu open
    const [atTop, setAtTop] = useState(true); // page at the very top

    const headerRef = useRef<HTMLElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const topLine = useRef<HTMLDivElement>(null);
    const bottomLine = useRef<HTMLDivElement>(null);

    // Close the menu when the page changes
    const [menuPath, setMenuPath] = useState(pathname);
    if (pathname !== menuPath) {
        setMenuPath(pathname);
        if (isActive) setIsActive(false);
    }

    useEffect(() => {
        const onScroll = () => setAtTop(window.scrollY <= 4);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Menu button: two lines ↔ a cross
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

    // Desktop: the header hides while scrolling down (the round menu button shows instead) and comes
    // back when scrolling up. Phones: the header and the round button are always shown.
    useGSAP(() => {
        // prefers-reduced-motion: show/hide instantly, no slide
        const m = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 1;
        // The width is 0 until the page has measured the screen (first frame after load).
        // Do nothing until then — otherwise the "phone" branch below briefly shows the round
        // menu button on desktop, and it pops up then hides again on every reload.
        if (width === 0) return;
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

    // The other pages are in the side menu (Nav.tsx) and the footer.
    const links = [
        { href: ROUTES.creations, label: t("creations") },
        { href: ROUTES.world, label: t("world") },
        { href: ROUTES.partner, label: t("partner") },
    ];

    const goToContact = () => router.push(ROUTES.contact);

    return (
        <>
            <header
                ref={headerRef}
                className={`fixed top-0 w-full z-20 py-1 transition-[background-color,box-shadow,backdrop-filter] duration-300 ease-out ${atTop ? BG_AT_TOP : BG_SCROLLED}`}
            >
                {/* Logo on the left; links + Contact on the right (desktop only) */}
                <div className="container mx-auto px-4 h-16 md:h-[clamp(52px,3.1vw,60px)] flex items-center justify-between md:justify-start">
                    <TransitionLink href="/" className={`rounded-sm ${FOCUS_RING}`}>
                        <Image
                            width={128}
                            height={31}
                            priority
                            src="/logo/momento-logo-burgundy.png"
                            className="w-32 md:w-[clamp(104px,7.3vw,140px)] h-auto"
                            alt="Momento"
                        />
                    </TransitionLink>

                    <nav className="hidden md:flex items-center gap-[clamp(14px,1.4vw,26px)] relative md:ml-auto">
                        {links.map((link) => {
                            const isCurrent = pathname === link.href || pathname.startsWith(`${link.href}/`);
                            return (
                                <Magnetic key={link.href}>
                                    <TransitionLink
                                        href={link.href}
                                        className={`text-burgundy hover:text-burgundy-dark flex items-center ${NAV_TEXT} group rounded-sm ${FOCUS_RING}`}
                                    >
                                        {/* Dot before the text: shown on the current page and on hover */}
                                        <span
                                            className={`flex justify-center transition-all duration-300 ease-in-out ${
                                                isCurrent ? "opacity-100 scale-100" : "opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100"
                                            }`}
                                        >
                                            <Dot className="w-6 h-6" />
                                        </span>
                                        <span>{link.label}</span>
                                    </TransitionLink>
                                </Magnetic>
                            );
                        })}
                    </nav>

                    {/* "Contact" button → contact page */}
                    <div className="hidden md:block md:ml-[clamp(14px,1.4vw,26px)]">
                        <CostumButton
                            role="link"
                            tabIndex={0}
                            onClick={goToContact}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    goToContact();
                                }
                            }}
                            backgroundColor="#751B32"
                            hoverTextColor="#F7EFE2"
                            className={`rounded-2xl! border-[1.5px]! border-burgundy bg-cream/60 text-burgundy px-[clamp(14px,1.05vw,20px)] py-[clamp(8px,0.55vw,11px)] ${FOCUS_RING}`}
                        >
                            <span className={`block ${NAV_TEXT} leading-none whitespace-nowrap`}>{t("contact")}</span>
                        </CostumButton>
                    </div>
                </div>
            </header>

            {/* Round menu button: always on phones; on desktop only while the header is hidden */}
            <div
                ref={buttonRef}
                className="fixed z-40 top-4 right-2 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full scale-0"
            >
                {/* Cream ring around the burgundy button, so it stays readable on any background */}
                <CostumButton
                    onClick={() => setIsActive(!isActive)}
                    backgroundColor="#5A1124"
                    className="w-full shadow-md h-full bg-burgundy border-2! border-cream text-cream"
                >
                    <div ref={containerRef} className="relative w-full h-full">
                        <div ref={topLine} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <Minus size={35} strokeWidth={2.5} />
                        </div>
                        <div ref={bottomLine} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <Minus size={35} strokeWidth={2.5} />
                        </div>
                    </div>
                </CostumButton>
            </div>

            <Nav isActive={isActive} setIsActive={setIsActive} />
        </>
    );
}
