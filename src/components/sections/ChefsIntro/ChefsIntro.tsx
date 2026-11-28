"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import FadeIn from "@/components/ui/FadeIn";
import MomentoButton from "@/components/ui/MomentoButton";
import { ROUTES } from "@/Data/routes";
import RevealImage from "@/components/ui/RevealImage";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import SoftImage from "@/components/ui/SoftImage";
import WaveText from "@/components/ui/wave/WaveText";
import { useColorWave } from "@/components/ui/wave/useColorWave";

// "Deux chefs, une cuisine": Marcelo & Milo. Text on the left; on the right the two chefs, big,
// their picture melting into the cream like the hero.
// Desktop scroll animations: the title and text colour themselves letter by letter (useColorWave),
// and the picture opens from a mask (RevealImage). Phones: unchanged, no animation.

const BURGUNDY = "#751B32";
const CHOCOLATE = "#4A2C21";

export default function ChefsIntro({ className = "" }: { className?: string }) {
    const t = useTranslations("Sections.chefsIntro");
    const textRef = useRef<HTMLDivElement>(null);
    useColorWave(textRef);

    return (
        <Section aria-label={t("eyebrow")} className={className}>
            <div className="grid items-center gap-8 md:grid-cols-12 md:gap-6">
                <FadeIn className="md:col-span-5">
                    <div ref={textRef}>
                        <SectionHeading
                            eyebrow={t("eyebrow")}
                            title={<WaveText text={t.raw("title") as string} color={BURGUNDY} />}
                            text={<WaveText text={t("text")} color={CHOCOLATE} />}
                        />
                    </div>
                    <MomentoButton href={ROUTES.characters} className="mt-10 w-fit">
                        {t("cta")}
                    </MomentoButton>
                </FadeIn>

                <FadeIn delay={0.15} className="-mx-5 md:col-span-7 md:mx-0 md:-mr-16">
                    <RevealImage>
                        <SoftImage
                            src="/Back-to-Back-chf.png"
                            alt={t("imageAlt")}
                            sizes="(max-width: 767px) 100vw, 760px"
                            className="aspect-1680/1000"
                            focus="50% 40%"
                        />
                    </RevealImage>
                </FadeIn>
            </div>
        </Section>
    );
}
