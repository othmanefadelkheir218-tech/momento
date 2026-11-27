"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { accent } from "@/components/ui/Accent";
import FadeIn from "@/components/ui/FadeIn";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Reason from "./Reason";
import { useReasonsReveal } from "./useReasonsReveal";

// "Pourquoi Momento": three reasons, numbered 01 · 02 · 03, each shown by a moment of the
// Marcelo & Milo story (generated pictures, cropped to portrait, in public/sections/why-momento; originals in public/0x *.png).
// On a warm (cream-dark) background that fades in and out.
// Animations: useReasonsReveal.ts. Previous version (cut-out product pots): ./v1/WhyMomento.tsx

const IMG = "/sections/why-momento";
const REASONS = [
    { key: "homemade", image: `${IMG}/homemade-marcelo.jpg` }, // Marcelo adding speculoos crumbs to a pot
    { key: "onePot", image: `${IMG}/one-moment-milo.jpg` }, // Milo tasting with his spoon
    { key: "layers", image: `${IMG}/layers-pots.jpg` }, // three pots up close, layers showing
] as const;

type Fade = "both" | "top" | "bottom" | "none";

/** `fade`: where the warm background melts into the cream (see Section). */
export default function WhyMomento({ fade = "both" }: { fade?: Fade }) {
    const t = useTranslations("Sections.whyMomento");
    const gridRef = useRef<HTMLDivElement>(null);
    useReasonsReveal(gridRef);

    return (
        <Section aria-label={t("eyebrow")} tone="warm" fade={fade}>
            <FadeIn>
                <SectionHeading eyebrow={t("eyebrow")} title={t.rich("title", { accent })} className="max-w-[760px]" />
            </FadeIn>
            <div ref={gridRef} className="mt-12 grid gap-14 md:mt-14 md:grid-cols-3 md:gap-10">
                {REASONS.map(({ key, image }, i) => (
                    <Reason
                        key={key}
                        number={String(i + 1).padStart(2, "0")}
                        title={t(`${key}.title`)}
                        text={t(`${key}.text`)}
                        image={image}
                    />
                ))}
            </div>
        </Section>
    );
}
