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
import HeroFrameSequence from "./HeroFrameSequence";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

// Brand colours
const BURGUNDY = "#751B32";
const CREAM = "#F7F0E5";
const CARAMEL = "#C68B4E";
const CHOCOLATE = "#4A2C21";

// Temporarily hidden — flip back to true to restore the hero text / features strip.
const SHOW_HERO_CONTENT = false;
const SHOW_FEATURES = false;

export default function HomeV2Content() {
    const t = useTranslations("HomeV2");
    const products = useDessertData();
    const router = useTransitionRouter();

    const rootRef = useRef<HTMLDivElement>(null);
    const heroCopyRef = useRef<HTMLDivElement>(null);
    const heroHazeRef = useRef<HTMLDivElement>(null);
    const universImgRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    const creations = products.filter((p: DessertInterface) => p.categoryKey === "verrineRange");

    // Hero copy: words rise in, the accent word "writes" itself in, then it all drifts away on scroll.
    useGSAP(() => {
        const copy = heroCopyRef.current;
        if (!copy) return;
        const mm = gsap.matchMedia();
        mm.add("(prefers-reduced-motion: no-preference)", () => {
            gsap.timeline({ delay: 0.15 })
                .from(".hv2-rule", { scaleX: 0, duration: 0.55, ease: "power3.out" })
                .from(".hv2-eyebrow-text", { opacity: 0, y: 10, duration: 0.5, ease: "power3.out" }, "<0.05")
                .from(".hv2-w", { yPercent: 115, duration: 0.7, stagger: 0.05, ease: "power4.out" }, "-=0.3")
                .fromTo(
                    ".hv2-accent",
                    { clipPath: "inset(-30% 100% -30% -10%)" },
                    { clipPath: "inset(-30% -10% -30% -10%)", duration: 0.75, ease: "power2.inOut" },
                    "-=0.35",
                )
                .from(".hv2-dot", { opacity: 0, scale: 0, duration: 0.3, ease: "back.out(3)" }, "-=0.1");

            const section = copy.closest("section");
            if (section) {
                const st = { trigger: section, start: "top top", end: "+=40%", scrub: true };
                gsap.to(copy, { y: -80, opacity: 0, ease: "none", scrollTrigger: st });
                gsap.to(heroHazeRef.current, { opacity: 0, ease: "none", scrollTrigger: { ...st, end: "+=55%" } });
            }
        });
        return () => mm.revert();
    }, { scope: rootRef });

    // Soft parallax on the big images; Lenis drives ScrollTrigger so it stays smooth.
    useGSAP(() => {
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
            className={`${serif.variable} ${sans.variable} overflow-x-clip`}
            style={{ backgroundColor: CREAM, color: CHOCOLATE, fontFamily: "var(--font-hv2-sans)" }}
        >
            {/* ───────── Hero: scroll-driven frame sequence (2.5 screens tall, pinned for 1.5 screens of scroll) ───────── */}
            <HeroFrameSequence backgroundColor={CREAM}>
                {/* Soft cream fade behind the title (centre on mobile, left side on desktop) */}
                <div
                    ref={heroHazeRef}
                    aria-hidden
                    className="pointer-events-none absolute inset-0 z-10
                        bg-[radial-gradient(ellipse_80%_30%_at_50%_50%,rgb(247_240_229/.88)_0%,rgb(247_240_229/.65)_55%,transparent_100%)]
                        md:bg-[radial-gradient(ellipse_40%_46%_at_14%_50%,rgb(247_240_229/.8)_0%,rgb(247_240_229/.55)_45%,transparent_100%)]"
                />
                {/* Hero copy: left side */}
                <div className="absolute inset-0 z-10 flex items-center pointer-events-none">
                    <div ref={heroCopyRef} className="container mx-auto px-4 pt-10 md:pt-0 text-center md:text-left">
                        {/* Small label: thin line + burgundy text, no background */}
                        <p className="flex items-center justify-center md:justify-start gap-3 font-body font-semibold text-[12px] md:text-[13px] uppercase tracking-[.18em] text-burgundy whitespace-nowrap">
                            <span aria-hidden className="hv2-rule h-px w-6 md:w-8 bg-burgundy/60 origin-right md:origin-left" />
                            <span className="hv2-eyebrow-text">{t("heroEyebrow")}</span>
                            {/* second line only on mobile, where the label is centred */}
                            <span aria-hidden className="hv2-rule h-px w-6 bg-burgundy/60 origin-left md:hidden" />
                        </p>
                        <h1 className="mt-3 font-display font-medium text-burgundy leading-[1.05] text-[50px] md:text-[clamp(34px,4.2vw,56px)]">
                            <HeroTitle raw={t.raw("heroTitle") as string} />
                        </h1>
                    </div>
                </div>
                {SHOW_HERO_CONTENT && (
                <div className="absolute inset-0 z-10 flex items-end md:items-center"><div className="w-full max-w-7xl mx-auto px-6 md:px-12 pt-40 pb-16 md:py-0">
                    <div className="max-w-lg drop-shadow-[0_2px_12px_rgba(74,44,33,0.35)]" style={{ color: CREAM }}>
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
                </div></div>
                )}
            </HeroFrameSequence>

            {/* ───────── Features strip (hidden for now) ───────── */}
            {SHOW_FEATURES && (
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
            )}

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

/**
 * Renders "Chaque instant|a sa|<accent>douceur</accent>." — "|" starts a new line. Each word rises
 * from a mask; the <accent> word is Playball (design spec: one accent per heading, in <em>, same
 * colour, ~1.14x) and gets a left-to-right "handwriting" wipe.
 */
function HeroTitle({ raw }: { raw: string }) {
    const words = (text: string, key: string) =>
        text.split(/(\s+)/).map((w, i) =>
            /^\s+$/.test(w) || !w ? (
                w
            ) : (
                <span key={`${key}-${i}`} className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em]">
                    <span className="hv2-w inline-block">{w}</span>
                </span>
            ),
        );

    return (
        <>
            {raw.split("|").map((line, li) => {
                const m = line.match(/^(.*?)<accent>(.*?)<\/accent>(.*)$/);
                return (
                    <span key={li} className="block">
                        <span className="inline-block">
                            {m ? (
                                <>
                                    {words(m[1], `b${li}`)}
                                    <em className="hv2-accent inline-block not-italic font-accent font-normal text-[1.14em] leading-[1.1] pr-[0.06em]">
                                        {m[2]}
                                    </em>
                                    {m[3] && <span className="hv2-dot inline-block">{m[3]}</span>}
                                </>
                            ) : (
                                words(line, `l${li}`)
                            )}
                        </span>
                    </span>
                );
            })}
        </>
    );
}
