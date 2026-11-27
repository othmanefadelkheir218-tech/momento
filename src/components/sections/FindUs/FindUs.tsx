"use client";

import { useTranslations } from "next-intl";
import { accent } from "@/components/ui/Accent";
import FadeIn from "@/components/ui/FadeIn";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import PartnerTeaserForm from "./PartnerTeaserForm";
import PotDisplay from "./PotDisplay";

// "Où nous trouver" → a call to businesses to become a Momento partner. On the left: the heading,
// the pitch and the start of the partner form (any click opens the partner page). On the right: the
// display of Momento pots. (Phones: the pots first.) On a warm background that fades in and out.
// Previous version (countries + shops list): ./v1/FindUs.tsx

type Fade = "both" | "top" | "bottom" | "none";

/** `fade`: where the warm background melts into the cream (see Section). */
export default function FindUs({ fade = "both" }: { fade?: Fade }) {
    const t = useTranslations("Sections.findUs");

    return (
        <Section aria-label={t("eyebrow")} tone="warm" fade={fade}>
            <div className="grid items-center gap-10 md:grid-cols-12 md:gap-6">
                <FadeIn className="md:order-2 md:col-span-6">
                    <PotDisplay />
                </FadeIn>

                <FadeIn delay={0.15} className="md:order-1 md:col-span-6 md:pr-8">
                    <SectionHeading eyebrow={t("eyebrow")} title={t.rich("title", { accent })} text={t("text")} />
                    <p className="mt-4 max-w-[48ch] font-body text-[clamp(16px,1.05vw,19px)] leading-[1.65] text-chocolate/85">{t("pitch")}</p>
                    <div className="mt-10 border-t border-burgundy/15 pt-9">
                        <PartnerTeaserForm />
                    </div>
                </FadeIn>
            </div>
        </Section>
    );
}
