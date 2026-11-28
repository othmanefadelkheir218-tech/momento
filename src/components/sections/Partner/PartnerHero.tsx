"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import MomentoButton from "@/components/ui/MomentoButton";
import { scrollToId } from "@/components/ui/scrollToId";
import { PAGE_IMAGES } from "@/Data/pageImages";
import PageHero from "../PageHero/PageHero";
import { CLIENT_ID, FRANCHISE_ID } from "./ids";

// The top of Become a Partner: the page has two parts (become a client, open a franchise);
// the two buttons scroll to each part. Arriving with an anchor (e.g. /become-a-partner#client-form
// from the home page), the page scrolls there once the page transition is over.

export default function PartnerHero() {
    const t = useTranslations("Sections.partner.hero");

    useEffect(() => {
        const id = window.location.hash.slice(1);
        if (!id) return;
        const timer = setTimeout(() => scrollToId(id), 1200);
        return () => clearTimeout(timer);
    }, []);

    return (
        <PageHero ns="Sections.partner.hero" image={PAGE_IMAGES.partnerHero} aspect="aspect-[4/5] md:aspect-[5/6]" focus="50% 40%">
            <MomentoButton onClick={() => scrollToId(CLIENT_ID)}>{t("ctaClient")}</MomentoButton>
            <MomentoButton onClick={() => scrollToId(FRANCHISE_ID)} variant="ghost">
                {t("ctaFranchise")}
            </MomentoButton>
        </PageHero>
    );
}
