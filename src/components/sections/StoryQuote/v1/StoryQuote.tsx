// ── StoryQuote v1 (NOT USED — kept for reference) ──
// Picture on the left (soft edges), the sentence on the right. Replaced by the full-width scene in
// ../StoryQuote.tsx. To bring it back: import this file instead of ../StoryQuote in the page.

import { useTranslations } from "next-intl";
import Eyebrow from "@/components/ui/Eyebrow";
import FadeIn from "@/components/ui/FadeIn";
import Glow from "@/components/ui/Glow";
import MomentoButton from "@/components/ui/MomentoButton";
import Section from "@/components/ui/Section";
import SoftImage from "@/components/ui/SoftImage";

// "Notre histoire en une phrase": the moment it all began — Marcelo and Milo writing "Momento" on
// the chalkboard — next to the story told in one sentence.

export default function StoryQuoteV1() {
    const t = useTranslations("Sections.storyQuote");

    return (
        <Section aria-label={t("eyebrow")}>
            <div className="grid items-center gap-8 md:grid-cols-12 md:gap-6">
                <FadeIn className="relative isolate -mx-5 md:col-span-7 md:mx-0 md:-ml-16">
                    <Glow className="-inset-[8%]" />
                    <SoftImage
                        src="/bg_hero_2.png"
                        alt={t("imageAlt")}
                        sizes="(max-width: 767px) 100vw, 760px"
                        className="aspect-4/3"
                        focus="74% 50%"
                    />
                </FadeIn>

                <FadeIn delay={0.15} className="md:col-span-5">
                    <span aria-hidden className="block font-display text-[26px] leading-none text-caramel opacity-75">
                        ✦
                    </span>
                    <Eyebrow className="mt-5">{t("eyebrow")}</Eyebrow>
                    <blockquote className="mt-6 font-display font-medium text-burgundy text-[clamp(28px,3vw,42px)] leading-[1.2] text-balance">
                        {t("quote")}
                    </blockquote>
                    <MomentoButton href="/about" variant="ghost" className="mt-10 w-fit">
                        {t("cta")}
                    </MomentoButton>
                </FadeIn>
            </div>
        </Section>
    );
}
