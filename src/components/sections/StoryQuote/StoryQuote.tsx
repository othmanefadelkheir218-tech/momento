"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import Eyebrow from "@/components/ui/Eyebrow";
import FadeIn from "@/components/ui/FadeIn";
import Glow from "@/components/ui/Glow";
import MomentoButton from "@/components/ui/MomentoButton";
import RevealImage from "@/components/ui/RevealImage";
import Section from "@/components/ui/Section";
import SoftImage from "@/components/ui/SoftImage";
import WaveText from "@/components/ui/wave/WaveText";
import { useColorWave } from "@/components/ui/wave/useColorWave";

// "Notre histoire en une phrase": the sentence on the left, on a clean background; on the right, big,
// the moment it all began (Marcelo and Milo writing "Momento" on the chalkboard), its edges melting
// into the page. Phones: the picture first, the sentence under it.
// Desktop animations: the sentence colours itself letter by letter while scrolling (useColorWave),
// and the picture opens from a mask (RevealImage).
// `tone` / `fade`: see Section (on the home page it sits in the middle of the warm area).
// Older versions: ./v1/ (side by side with the picture on the left; full-width scene).

type Props = { tone?: "cream" | "warm"; fade?: "both" | "top" | "bottom" | "none" };

const BURGUNDY = "#751B32";

export default function StoryQuote({ tone = "cream", fade = "both" }: Props) {
    const t = useTranslations("Sections.storyQuote");
    const quoteRef = useRef<HTMLQuoteElement>(null);
    useColorWave(quoteRef);

    return (
        <Section aria-label={t("eyebrow")} tone={tone} fade={fade}>
            <div className="grid items-center gap-8 md:grid-cols-12 md:gap-6">
                <FadeIn className="relative isolate -mx-5 md:order-2 md:col-span-8 md:col-start-5 md:mx-0">
                    <Glow tone={tone === "warm" ? "light" : "warm"} className="-inset-[6%]" />
                    <RevealImage>
                        <SoftImage
                            src="/bg_hero_2.png"
                            alt={t("imageAlt")}
                            sizes="(max-width: 767px) 100vw, 60vw"
                            className="aspect-16/10"
                            focus="74% 50%"
                            feather={8}
                        />
                    </RevealImage>
                </FadeIn>

                <FadeIn delay={0.15} className="md:order-1 md:col-span-4">
                    <Eyebrow>{t("eyebrow")}</Eyebrow>
                    <blockquote
                        ref={quoteRef}
                        className="mt-6 font-display font-medium text-burgundy text-[clamp(28px,2.7vw,50px)] leading-[1.2] text-balance"
                    >
                        <WaveText text={t("quote")} color={BURGUNDY} />
                    </blockquote>
                    <MomentoButton href="/about" variant="ghost" className="mt-10 w-fit">
                        {t("cta")}
                    </MomentoButton>
                </FadeIn>
            </div>
        </Section>
    );
}
