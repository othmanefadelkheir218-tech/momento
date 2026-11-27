"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { EPISODES } from "@/Data/episodes";
import { COMPANY_INSTAGRAM, COMPANY_TIKTOK } from "@/Data/socialmedia";
import { accent } from "@/components/ui/Accent";
import FadeIn from "@/components/ui/FadeIn";
import MomentoButton from "@/components/ui/MomentoButton";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { useScrollParallax } from "@/components/ui/useScrollParallax";
import EpisodeCard from "./EpisodeCard";

// "Suivez les épisodes": the Marcelo & Milo mini-series (episodes in src/Data/episodes.ts).
// Heading on the left, Instagram / TikTok on the right; the episodes below, gently staggered.

export default function Episodes() {
    const t = useTranslations("Sections.episodes");
    const ref = useRef<HTMLDivElement>(null);
    useScrollParallax(ref);

    return (
        <Section aria-label={t("eyebrow")}>
            <div className="grid gap-8 md:grid-cols-12 md:items-end md:gap-6">
                <FadeIn className="md:col-span-8">
                    <SectionHeading eyebrow={t("eyebrow")} title={t.rich("title", { accent })} text={t("text")} />
                </FadeIn>
                <FadeIn delay={0.1} className="flex flex-wrap gap-3 md:col-span-4 md:justify-end">
                    <MomentoButton href={COMPANY_INSTAGRAM} variant="ghost" external>
                        {t("instagram")}
                    </MomentoButton>
                    <MomentoButton href={COMPANY_TIKTOK} variant="ghost" external>
                        {t("tiktok")}
                    </MomentoButton>
                </FadeIn>
            </div>

            <div ref={ref}>
                <FadeIn stagger={0.1} className="mt-14 grid grid-cols-2 gap-x-4 gap-y-10 md:mt-16 md:grid-cols-4 md:gap-x-7">
                    {EPISODES.map((episode, i) => (
                        <EpisodeCard
                            key={episode.key}
                            episode={episode}
                            label={t("episode", { number: String(i + 1).padStart(2, "0") })}
                            title={t(episode.key)}
                            className={i % 2 === 1 ? "md:mt-14" : ""}
                        />
                    ))}
                </FadeIn>
            </div>
        </Section>
    );
}
