"use client";

import { useTranslations } from "next-intl";
import Eyebrow from "@/components/ui/Eyebrow";
import FadeIn from "@/components/ui/FadeIn";
import Glow from "@/components/ui/Glow";
import MomentoButton from "@/components/ui/MomentoButton";
import { ROUTES } from "@/Data/routes";
import Section from "@/components/ui/Section";
import SoftImage from "@/components/ui/SoftImage";
import { STORY_IMAGE } from "./storyImage";

// Phones: "Notre histoire en une phrase" as before — the picture first (soft edges), the sentence under it.

type Props = { tone?: "cream" | "warm"; fade?: "both" | "top" | "bottom" | "none"; className?: string };

export default function StoryStacked({ tone = "cream", fade = "both", className = "" }: Props) {
    const t = useTranslations("Sections.storyQuote");

    return (
        <Section aria-label={t("eyebrow")} tone={tone} fade={fade} className={className}>
            <FadeIn className="relative isolate -mx-5">
                <Glow tone={tone === "warm" ? "light" : "warm"} className="-inset-[6%]" />
                {/* the two chefs are on the right of the picture: keep them in the frame */}
                <SoftImage src={STORY_IMAGE} alt={t("imageAlt")} sizes="100vw" quality={90} className="aspect-16/10" focus="78% 50%" feather={8} />
            </FadeIn>

            <FadeIn delay={0.15} className="mt-8">
                <Eyebrow>{t("eyebrow")}</Eyebrow>
                <blockquote className="mt-6 font-display font-medium text-burgundy text-[clamp(28px,2.7vw,50px)] leading-[1.2] text-balance">
                    {t("quote")}
                </blockquote>
                <MomentoButton href={ROUTES.story} variant="ghost" className="mt-10 w-fit">
                    {t("cta")}
                </MomentoButton>
            </FadeIn>
        </Section>
    );
}
