"use client";

import { useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ChefHat, ChevronLeft, ChevronRight, Gift, Heart, Leaf } from "lucide-react";
import { Reveal } from "@/components/animation/Reveal";
import { DessertInterface } from "@/Data/Const";
import { useDessertData } from "@/hooks/useDessertData";
import { useTransitionRouter } from "@/hooks/useTransitionRouter";
import { slugify } from "@/lib/utils";
import { serif, sans } from "./fonts";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

// Brand colours
const BURGUNDY = "#751B32";
const CREAM = "#F7F0E5";
const CARAMEL = "#C68B4E";
const CHOCOLATE = "#4A2C21";

export default function HomeV2Content() {
    const t = useTranslations("HomeV2");
    const products = useDessertData();
    const router = useTransitionRouter();

    const rootRef = useRef<HTMLDivElement>(null);
    const heroImgRef = useRef<HTMLDivElement>(null);
    const universImgRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    const creations = products.filter((p: DessertInterface) => p.categoryKey === "verrineRange");

    // Soft parallax on the big images; Lenis drives ScrollTrigger so it stays smooth.
    useGSAP(() => {
        if (heroImgRef.current) {
            gsap.to(heroImgRef.current, {
                yPercent: 12,
                ease: "none",
                scrollTrigger: { trigger: heroImgRef.current.parentElement, start: "top top", end: "bottom top", scrub: true },
            });
        }
        if (universImgRef.current) {
            gsap.fromTo(universImgRef.current, { yPercent: -8 }, {
                yPercent: 8,
                ease: "none",
                scrollTrigger: { trigger: universImgRef.current.parentElement, start: "top bottom", end: "bottom top", scrub: true },
            });
        }
        gsap.from(".hv2-card", {
            y: 60,
            opacity: 0,
            duration: 0.8,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: trackRef.current, start: "top bottom-=15%" },
        });
    }, { scope: rootRef });

    const scrollTrack = (dir: 1 | -1) => {
        const el = trackRef.current;
        if (!el) return;
        const card = el.querySelector<HTMLElement>(".hv2-card");
        const step = card ? card.offsetWidth + 20 : el.clientWidth * 0.8;
        el.scrollBy({ left: dir * step, behavior: "smooth" });
    };

    const features = [
        { icon: ChefHat, label: t("f1") },
        { icon: Leaf, label: t("f2") },
        { icon: Heart, label: t("f3") },
        { icon: Gift, label: t("f4") },
    ];

    const titleFont = { fontFamily: "var(--font-hv2-serif)" };

    return (
        <div
            ref={rootRef}
            className={`${serif.variable} ${sans.variable} overflow-hidden`}
            style={{ backgroundColor: CREAM, color: CHOCOLATE, fontFamily: "var(--font-hv2-sans)" }}
        >
            {/* ───────── Hero ───────── */}
            <section className="relative min-h-[100svh] w-full flex items-center overflow-hidden">
                <div ref={heroImgRef} className="absolute inset-0 -top-[6%] h-[112%] -z-0">
                    <Image src="/bg_hero_2.png" alt={t("heroAlt")} fill priority sizes="100vw" className="object-cover hidden md:block" />
                    <Image src="/bg_hero_2_mobile.jpeg" alt={t("heroAlt")} fill priority sizes="100vw" className="object-cover md:hidden" />
                </div>
                {/* Burgundy-to-transparent wash so the text reads well */}
                <div
                    className="absolute inset-0 hidden md:block"
                    style={{ background: `linear-gradient(90deg, ${BURGUNDY}E6 0%, ${BURGUNDY}99 32%, transparent 62%)` }}
                />
                <div
                    className="absolute inset-0 md:hidden"
                    style={{ background: `linear-gradient(180deg, transparent 30%, ${BURGUNDY}CC 75%, ${BURGUNDY} 100%)` }}
                />

                <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pt-40 pb-16 md:py-0 self-end md:self-center">
                    <div className="max-w-xl" style={{ color: CREAM }}>
                        <Reveal delay={0.15} rotate={false}>
                            <p className="uppercase tracking-[0.4em] text-xs md:text-sm" style={{ color: CARAMEL }}>
                                {t("eyebrow")}
                            </p>
                        </Reveal>
                        <Reveal delay={0.25}>
                            <h1 className="italic leading-[1.05] text-5xl md:text-7xl mt-4" style={titleFont}>
                                {t("heroTitle1")}
                            </h1>
                        </Reveal>
                        <Reveal delay={0.35}>
                            <h1 className="italic leading-[1.05] text-5xl md:text-7xl" style={titleFont}>
                                {t("heroTitle2")}
                            </h1>
                        </Reveal>
                        <Reveal delay={0.45} rotate={false}>
                            <p className="mt-6 text-base md:text-lg opacity-90 max-w-md">{t("heroText")}</p>
                        </Reveal>
                        <Reveal delay={0.55} rotate={false}>
                            <button
                                onClick={() => router.push("/menu")}
                                className="group mt-8 inline-flex items-center gap-3 rounded-full px-7 py-3 text-sm md:text-base transition-all duration-300 hover:gap-4"
                                style={{ backgroundColor: CREAM, color: BURGUNDY }}
                            >
                                {t("heroCta")}
                                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </button>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* ───────── Features strip ───────── */}
            <section className="border-b" style={{ backgroundColor: CREAM, borderColor: `${CARAMEL}40` }}>
                <div className="max-w-6xl mx-auto px-6 md:px-12 py-8 grid grid-cols-2 md:grid-cols-4 gap-y-6">
                    {features.map(({ icon: Icon, label }, i) => (
                        <Reveal key={label} delay={i * 0.08} rotate={false}>
                            <div
                                className={`flex items-center justify-center gap-3 md:px-4 ${i > 0 ? "md:border-l" : ""}`}
                                style={{ borderColor: `${CARAMEL}55` }}
                            >
                                <Icon className="w-7 h-7 shrink-0" strokeWidth={1.4} style={{ color: BURGUNDY }} />
                                <span className="text-sm md:text-[15px] leading-tight max-w-[9rem]">{label}</span>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* ───────── Nos créations ───────── */}
            <section className="py-20 md:py-28">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="text-center">
                        <Reveal>
                            <div className="flex items-center justify-center gap-5">
                                <span className="hidden sm:block h-px w-20" style={{ backgroundColor: BURGUNDY }} />
                                <h2 className="italic text-4xl md:text-6xl" style={{ ...titleFont, color: BURGUNDY }}>
                                    {t("creationsTitle")}
                                </h2>
                                <span className="hidden sm:block h-px w-20" style={{ backgroundColor: BURGUNDY }} />
                            </div>
                        </Reveal>
                        <Reveal delay={0.1} rotate={false}>
                            <p className="mt-4 text-base md:text-lg opacity-80">{t("creationsText")}</p>
                        </Reveal>
                    </div>

                    <div className="relative mt-12">
                        <button
                            aria-label={t("prev")}
                            onClick={() => scrollTrack(-1)}
                            className="hidden md:flex absolute -left-5 top-[40%] -translate-y-1/2 z-10 w-11 h-11 items-center justify-center rounded-full shadow-md transition-transform hover:scale-110"
                            style={{ backgroundColor: CREAM, color: BURGUNDY }}
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                            aria-label={t("next")}
                            onClick={() => scrollTrack(1)}
                            className="hidden md:flex absolute -right-5 top-[40%] -translate-y-1/2 z-10 w-11 h-11 items-center justify-center rounded-full shadow-md transition-transform hover:scale-110"
                            style={{ backgroundColor: CREAM, color: BURGUNDY }}
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>

                        <div
                            ref={trackRef}
                            className="hv2-track flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 -mx-6 px-6 md:mx-0 md:px-0"
                        >
                            {creations.map((product) => (
                                <button
                                    key={product.id}
                                    onClick={() => router.push(`/menu/${slugify(product.name)}`)}
                                    className="hv2-card group snap-start shrink-0 w-[70%] sm:w-[45%] md:w-[calc(25%-15px)] text-left"
                                >
                                    <div
                                        className="relative aspect-[4/3] rounded-2xl overflow-hidden"
                                        style={{ background: `radial-gradient(circle at 50% 60%, ${CARAMEL}55 0%, ${CHOCOLATE} 120%)` }}
                                    >
                                        <Image
                                            src={product.main_image}
                                            alt={product.name}
                                            fill
                                            sizes="(max-width: 768px) 70vw, 25vw"
                                            className="object-contain p-5 transition-transform duration-700 ease-out group-hover:scale-110 group-hover:-rotate-2"
                                        />
                                        {product.isNew && (
                                            <span
                                                className="absolute top-3 left-3 text-[11px] uppercase tracking-wider px-2.5 py-1 rounded-full"
                                                style={{ backgroundColor: BURGUNDY, color: CREAM }}
                                            >
                                                New
                                            </span>
                                        )}
                                    </div>
                                    <p className="mt-3 text-center text-base md:text-lg transition-colors duration-300 group-hover:text-[#751B32]">
                                        {product.name}
                                    </p>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mt-10 text-center">
                        <button
                            onClick={() => router.push("/menu")}
                            className="group inline-flex items-center gap-2 text-sm md:text-base underline-offset-8 hover:underline"
                            style={{ color: BURGUNDY }}
                        >
                            {t("seeAll")}
                            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </button>
                    </div>
                </div>
            </section>

            {/* ───────── Notre univers ───────── */}
            <section className="relative grid md:grid-cols-2 min-h-[560px]" style={{ backgroundColor: `${CARAMEL}1F` }}>
                <div className="flex items-center px-6 md:px-12 lg:px-20 py-20 order-2 md:order-1">
                    <div className="max-w-lg">
                        <Reveal rotate={false}>
                            <p className="uppercase tracking-[0.4em] text-xs md:text-sm" style={{ color: CARAMEL }}>
                                {t("universEyebrow")}
                            </p>
                        </Reveal>
                        <Reveal delay={0.1}>
                            <h2 className="italic text-4xl md:text-5xl leading-tight mt-4" style={{ ...titleFont, color: BURGUNDY }}>
                                {t("universTitle1")}
                            </h2>
                        </Reveal>
                        <Reveal delay={0.18}>
                            <h2 className="italic text-4xl md:text-5xl leading-tight" style={{ ...titleFont, color: BURGUNDY }}>
                                {t("universTitle2")}
                            </h2>
                        </Reveal>
                        <Reveal delay={0.26} rotate={false}>
                            <p className="mt-6 text-base md:text-lg opacity-85">{t("universText")}</p>
                        </Reveal>
                        <Reveal delay={0.34} rotate={false}>
                            <button
                                onClick={() => router.push("/about")}
                                className="group mt-8 inline-flex items-center gap-3 rounded-full px-7 py-3 text-sm md:text-base transition-all duration-300 hover:gap-4 hover:brightness-110"
                                style={{ backgroundColor: BURGUNDY, color: CREAM }}
                            >
                                {t("universCta")}
                                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </button>
                        </Reveal>
                    </div>
                </div>

                <div className="relative min-h-[320px] md:min-h-0 overflow-hidden order-1 md:order-2">
                    <div ref={universImgRef} className="absolute inset-0 -top-[10%] h-[120%]">
                        <Image src="/new_heroImage.jpeg" alt={t("universAlt")} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
                    </div>
                    {/* Fade the image into the section colour */}
                    <div
                        className="absolute inset-0 hidden md:block"
                        style={{ background: `linear-gradient(90deg, ${CREAM} 0%, ${CREAM}00 30%)` }}
                    />
                </div>
            </section>

            {/* ───────── CTA band ───────── */}
            <section className="relative" style={{ backgroundColor: BURGUNDY, color: CREAM }}>
                {/* Soft wave on top */}
                <svg className="absolute -top-px left-0 w-full h-10 md:h-16" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden>
                    <path d="M0,0 H1440 V30 C1100,80 760,0 420,40 C240,62 100,50 0,30 Z" fill={CREAM} />
                </svg>
                <div className="max-w-6xl mx-auto px-6 md:px-12 pt-24 pb-16 md:pt-28 md:pb-20 flex flex-col md:flex-row items-center gap-8 md:gap-12 text-center md:text-left">
                    <Reveal>
                        <h2 className="italic text-4xl md:text-6xl whitespace-nowrap" style={titleFont}>
                            {t("ctaTitle")}
                        </h2>
                    </Reveal>
                    <span className="hidden md:block w-px h-16" style={{ backgroundColor: `${CREAM}55` }} />
                    <Reveal delay={0.1} rotate={false} className="flex-1">
                        <p className="italic text-lg md:text-xl opacity-90" style={titleFont}>{t("ctaText")}</p>
                    </Reveal>
                    <Reveal delay={0.2} rotate={false}>
                        <button
                            onClick={() => router.push("/become-a-client")}
                            className="group inline-flex items-center gap-3 rounded-full px-7 py-3 text-sm md:text-base transition-all duration-300 hover:gap-4"
                            style={{ backgroundColor: CREAM, color: BURGUNDY }}
                        >
                            {t("ctaButton")}
                            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </button>
                    </Reveal>
                </div>
            </section>

            <style>{`
                .hv2-track { scrollbar-width: none; }
                .hv2-track::-webkit-scrollbar { display: none; }
            `}</style>
        </div>
    );
}
