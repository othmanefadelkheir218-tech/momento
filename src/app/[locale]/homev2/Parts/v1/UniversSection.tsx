"use client";

// ── "Notre univers" section (NOT USED — kept for reference) ──
// Replaced by the "Deux chefs, une cuisine" section (src/components/sections/ChefsIntro).
// To show it again: import it in ../HomeV2Content.tsx and put <UniversSection /> back in the list.

import { useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/animation/Reveal";
import { useTransitionRouter } from "@/hooks/useTransitionRouter";

const BURGUNDY = "#751B32";
const CREAM = "#F7EFE2";
const CARAMEL = "#C68B4E";
const titleFont = { fontFamily: "var(--font-hv2-serif)" };

export default function UniversSection() {
    const t = useTranslations("HomeV2");
    const router = useTransitionRouter();
    const universImgRef = useRef<HTMLDivElement>(null);

    // Soft parallax on the "Notre univers" image; Lenis drives ScrollTrigger so it stays smooth.
    useGSAP(() => {
        if (universImgRef.current) {
            gsap.fromTo(universImgRef.current, { yPercent: -8 }, {
                yPercent: 8,
                ease: "none",
                scrollTrigger: { trigger: universImgRef.current.parentElement, start: "top bottom", end: "bottom top", scrub: true },
            });
        }
    });

    return (
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
    );
}
