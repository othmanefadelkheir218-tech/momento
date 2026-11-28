"use client";

import { useTranslations } from "next-intl";
import MomentoButton from "@/components/ui/MomentoButton";
import { scrollToId } from "@/components/ui/scrollToId";
import TextSplit from "../TextSplit/TextSplit";
import { CATALOGUE_ID } from "./CreationsCatalogue";
import { setFilters } from "./useCatalogueFilters";

// "Seasonal specials": a short text and a button that shows only the seasonal creations in the
// catalogue above (sets the filter, then scrolls back up to the list).

export default function SeasonalCallout() {
    const t = useTranslations("Sections.creations.seasonal");
    const show = () => {
        setFilters({ type: "seasonal", category: "all", q: "" });
        scrollToId(CATALOGUE_ID);
    };
    return (
        <TextSplit ns="Sections.creations.seasonal">
            <MomentoButton onClick={show} variant="ghost" className="w-fit">
                {t("cta")}
            </MomentoButton>
        </TextSplit>
    );
}
