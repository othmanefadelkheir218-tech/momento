"use client";

// ── FindUs v1 (NOT USED — kept for reference) ──
// Countries (Belgique / Maroc) and their shops list next to the pots. Replaced by ../FindUs.tsx
// (call to become a partner, with a short form). To bring it back: import this file in the page.

import { useState } from "react";
import { useTranslations } from "next-intl";
import { COUNTRIES, SHOPS, type Country } from "@/Data/shops";
import { accent } from "@/components/ui/Accent";
import FadeIn from "@/components/ui/FadeIn";
import MomentoButton from "@/components/ui/MomentoButton";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import CountryTabs from "../CountryTabs";
import PotDisplay from "./PotDisplay";
import ShopCard, { Placeholder } from "../ShopCard";

// "Où nous trouver": the text, the countries and their shops (src/Data/shops.ts) on the left; a
// small display of Momento pots on the right. (Phones: the pots first.)
// On a warm (cream-dark) background that fades in and out.

type Fade = "both" | "top" | "bottom" | "none";

/** `fade`: where the warm background melts into the cream (see Section). */
export default function FindUsV1({ fade = "both" }: { fade?: Fade }) {
    const t = useTranslations("Sections.findUs");
    const [country, setCountry] = useState<Country>(COUNTRIES[0]);

    return (
        <Section aria-label={t("eyebrow")} tone="warm" fade={fade}>
            <div className="grid items-center gap-10 md:grid-cols-12 md:gap-6">
                <FadeIn className="md:order-2 md:col-span-6">
                    <PotDisplay />
                </FadeIn>

                <FadeIn delay={0.15} className="md:order-1 md:col-span-6 md:pr-8">
                    <SectionHeading eyebrow={t("eyebrow")} title={t.rich("title", { accent })} text={t("text")} />
                    <Placeholder>{t("listPlaceholder")}</Placeholder>

                    <div className="mt-10">
                        <CountryTabs countries={COUNTRIES} active={country} onChange={setCountry} />
                        <ul key={country} role="tabpanel" className="mt-5 border-t border-burgundy/15 animate-[sections-fade_.5s_ease-out]">
                            {SHOPS[country].map((shop) => (
                                <ShopCard key={shop.id} shop={shop} />
                            ))}
                        </ul>
                    </div>

                    <MomentoButton href="/contact" className="mt-10 w-fit">
                        {t("cta")}
                    </MomentoButton>
                </FadeIn>
            </div>
            <style>{`@keyframes sections-fade{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}`}</style>
        </Section>
    );
}
