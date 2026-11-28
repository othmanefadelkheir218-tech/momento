"use client";

// ── Burgundy call-to-action band (NOT USED — kept for reference) ──
// Replaced by the "Devenir franchisé" section (src/components/sections/Franchise/v1).
// To show it again: import it in ../HomeV2Content.tsx and put <CtaBand /> back in the list.

import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/animation/Reveal";
import { useTransitionRouter } from "@/hooks/useTransitionRouter";

const BURGUNDY = "#751B32";
const CREAM = "#F7EFE2";
const titleFont = { fontFamily: "var(--font-hv2-serif)" };

export default function CtaBand() {
    const t = useTranslations("HomeV2");
    const router = useTransitionRouter();
    return (
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
    );
}
