"use client"
import React, { useRef, useTransition } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { Facebook, Instagram, Twitter, Linkedin, Globe } from "lucide-react"

import Curve from "./Curve"

import NavLink from "../../Link"
import { usePathname, useRouter } from "@/i18n/navigation"
import { useTranslations, useLocale } from "next-intl"
import { useLenis } from "lenis/react"
import Magnetic from "@/components/Magnetic"
import CostumButton from "@/components/CostumButton"
import { COMPANY_FACEBOOK, COMPANY_INSTAGRAM, COMPANY_LINKEDIN, COMPANY_TWITTER } from "@/Data/socialmedia"

interface NavProps {
    isActive: boolean
    setIsActive: (active: boolean) => void
}

const languages = [
    { code: "en", label: "EN", fullName: "English" },
    { code: "fr", label: "FR", fullName: "Français" },
    { code: "de", label: "DE", fullName: "Deutsch" },
]

export default function Nav({ isActive, setIsActive }: NavProps) {
    const t = useTranslations("Navigation")
    const t2 = useTranslations("Header")
    const locale = useLocale()
    const router = useRouter()
    const [_ , startTransition] = useTransition()
    const container = useRef<HTMLDivElement>(null)
    const backdrop = useRef<HTMLDivElement>(null)
    const pathname = usePathname()
    const lenis = useLenis()
    const [langMenuOpen, setLangMenuOpen] = React.useState(false)

    const tl = useRef<gsap.core.Timeline | null>(null)

    const navItems = [
        { title: t("home"), href: "/" },
        { title: t("menu"), href: "/menu" },
        { title: t("about"), href: "/about" },
        { title: t("faq"), href: "/faq" },
        { title: t("contact"), href: "/contact" },
    ]

    useGSAP(
        () => {
            tl.current = gsap.timeline({ paused: true })

            tl.current.to(
                backdrop.current,
                {
                    opacity: 1,
                    pointerEvents: "auto",
                    duration: 0.8,
                    ease: "power3.inOut",
                },
                0,
            )

            tl.current.to(
                container.current,
                {
                    x: "-50px",
                    duration: 0.8,
                    ease: "power3.inOut",
                },
                0,
            )

            tl.current.from(
                ".nav-link",
                {
                    x: 100,
                    opacity: 0,
                    duration: 0.4,
                    stagger: 0.1,
                    ease: "power3.out",
                },
                "-=0.3",
            )
        },
        { scope: container },
    )

    useGSAP(() => {
        if (isActive) {
            tl.current?.play()
        } else {
            tl.current?.reverse()
        }
    }, [isActive])

    React.useEffect(() => {
        if (isActive) {
            lenis?.stop()
            document.body.style.overflow = "hidden"
        } else {
            lenis?.start()
            document.body.style.overflow = ""
            setLangMenuOpen(false)
        }
        return () => {
            lenis?.start()
            document.body.style.overflow = ""
        }
    }, [isActive, lenis])

    const handleLanguageChange = (code: string) => {
        setLangMenuOpen(false)
        setIsActive(false)
        startTransition(() => {
            router.replace(pathname, { locale: code })
        })
    }

    return (
        <>
            <div
                ref={backdrop}
                onClick={() => setIsActive(false)}
                className="fixed top-0 left-0 z-25 w-full h-screen backdrop-blur-lg bg-white/50 opacity-0 pointer-events-none"
            />
            {langMenuOpen && <div
                // ref={backdrop}
                onClick={() => setLangMenuOpen(false)}
                className="fixed top-0 left-0 z-35 w-full h-screen backdrop-blur-lg bg-white/50 opacity-0 pointer-events-none"
            />}
            <div
                ref={container}
                className="fixed top-0 -right-56 md:-right-26 h-screen w-full md:w-[650px] bg-primary backdrop-blur-lg shadow-lg text-white z-30 translate-x-full"
            >
                {/* Inner Content - Redesigned */}
                <div className="h-full 
                w-[300px]  md:w-full
                px-10 md:px-20 py-16 flex flex-col justify-between box-border relative">
                    {/* Language Switcher - Top Right */}
                    {langMenuOpen && (
                        <div
                            onClick={() => setLangMenuOpen(false)}
                            className="fixed top-0 left-0 z-35 w-full h-screen bg-transparent cursor-default pointer-events-auto"
                        />
                    )}
                    <div className="absolute top-8 left-10 md:right-20 z-36">
                        <div className="relative">
                            <CostumButton
                                onClick={() => setLangMenuOpen(!langMenuOpen)}
                                backgroundColor="white"
                                hoverTextColor="#DB212F"
                                className="md:w-[120px] md:h-[50px] w-[100px] h-[50px] rounded-none bg-primary text-white border-white border"
                            >
                                <div className="flex space-x-3.5">
                                    <Globe size={18} className="opacity-70 group-hover:opacity-100 transition-opacity" />
                                    <span className="text-sm font-medium tracking-wider">
                                        {languages.find((l) => l.code === locale)?.label}
                                    </span>
                                </div>
                            </CostumButton>

                            {/* Dropdown */}
                            <div
                                className={`absolute top-full left-0 mt-2 bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 transition-all duration-300 ${langMenuOpen
                                    ? "opacity-100 translate-y-0 pointer-events-auto"
                                    : "opacity-0 -translate-y-2 pointer-events-none"
                                    }`}
                            >
                                {languages.map((lang) => (
                                    <button
                                        key={lang.code}
                                        onClick={() => handleLanguageChange(lang.code)}
                                        className={`w-full px-5 py-3 text-left text-sm trispace-font tracking-wide transition-all duration-200 hover:bg-white/10 flex items-center justify-between gap-4 ${locale === lang.code ? "bg-white/15" : ""
                                            }`}
                                    >
                                        <span className="font-medium">{lang.fullName}</span>
                                        <span className="text-xs opacity-60">{lang.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Navigation Links Container */}
                    <div className="flex flex-col gap-4 mt-24">
                        {/* Section Label */}
                        <div className="mb-8">
                            <p className="text-white/40 uppercase text-[10px] tracking-[0.3em] trispace-font">{t2("navigation")}</p>
                            <div className="w-12 h-px bg-linear-to-r from-white/60 to-transparent mt-3" />
                        </div>

                        {/* Nav Links */}
                        <nav className="flex flex-col gap-1">
                            {navItems.map((data, index) => (
                                <div key={index} className="nav-link overflow-hidden">
                                    <NavLink
                                        data={{ ...data, index }}
                                        isActive={pathname === data.href}
                                        onClick={() => setIsActive(false)}
                                    />
                                </div>
                            ))}
                        </nav>
                    </div>

                    {/* Footer Section */}
                    <div className="space-y-8">
                        {/* Decorative Line */}
                        <div className="w-full h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />

                        {/* Social Links */}
                        <div className="flex flex-col items-center gap-6">
                            <p className="text-white/40 uppercase text-[10px] tracking-[0.3em] trispace-font">{t2("followUs")}</p>
                            <div className="flex items-center gap-6">
                                {[
                                    { Icon: Facebook, href: COMPANY_FACEBOOK, label: "Facebook" },
                                    { Icon: Instagram, href: COMPANY_INSTAGRAM, label: "Instagram" },
                                    { Icon: Linkedin, href: COMPANY_LINKEDIN, label: "LinkedIn" },
                                    { Icon: Twitter, href: COMPANY_TWITTER, label: "Twitter" },
                                ].map(({ Icon, href, label }, index) => (
                                    <Magnetic key={index}>
                                        <a
                                            href={href}
                                            aria-label={label}
                                            className="group relative p-3 rounded-full border border-white/20 hover:border-white/50 hover:bg-white/10 transition-all duration-300"
                                        >
                                            <Icon
                                                size={20}
                                                strokeWidth={1.5}
                                                className="opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                                            />
                                        </a>
                                    </Magnetic>
                                ))}
                            </div>
                        </div>

                        {/* Copyright / Tagline */}
                        <p className="text-center text-white/30 text-[11px] tracking-wider trispace-font">
                            © {new Date().getFullYear()} — {t2("CopyRight")}
                        </p>
                    </div>
                </div>

                {/* SVG Curve Component */}
                <Curve isActive={isActive} />
            </div>
        </>
    )
}