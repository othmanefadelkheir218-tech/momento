"use client";

// ── Old hero text (NOT SHOWN — kept for reference) ──
// Eyebrow, two-line title, text and "see the menu" button over the hero picture. It was hidden
// (SHOW_HERO_CONTENT = false). To show it again, set SHOW_HERO_CONTENT to true in ../hero/HomeHero.tsx.

import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/animation/Reveal";
import { useTransitionRouter } from "@/hooks/useTransitionRouter";

const BURGUNDY = "#751B32";
const CREAM = "#F7EFE2";
const CARAMEL = "#C68B4E";
const titleFont = { fontFamily: "var(--font-hv2-serif)" };

export default function HeroPromoCopy() {
    const t = useTranslations("HomeV2");
    const router = useTransitionRouter();
    return (
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
    );
}
