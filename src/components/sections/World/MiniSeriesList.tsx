import { useTranslations } from "next-intl";
import { accent } from "@/components/ui/Accent";
import FadeIn from "@/components/ui/FadeIn";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { MINI_SERIES } from "@/Data/miniSeries";
import { COMPANY_INSTAGRAM } from "@/Data/socialmedia";
import SeriesRow from "./SeriesRow";

// "Watch the story unfold": the mini-series, one per season (src/Data/miniSeries.ts), as a list
// with hairlines. Each links to its Reels (or to Instagram until they are online).

export default function MiniSeriesList() {
    const t = useTranslations("Sections.world.series");
    const instagram: string = COMPANY_INSTAGRAM;
    const fallback = instagram !== "#" ? instagram : null;

    return (
        <Section aria-label={t("eyebrow")}>
            <FadeIn>
                <SectionHeading eyebrow={t("eyebrow")} title={t.rich("title", { accent })} text={t("text")} className="max-w-[820px]" />
            </FadeIn>
            <FadeIn>
                <ol className="mt-12 border-t border-burgundy/15">
                    {MINI_SERIES.map((series, i) => (
                        <SeriesRow
                            key={series.key}
                            index={i}
                            series={series}
                            season={t(`items.${series.key}.season`)}
                            title={t(`items.${series.key}.title`)}
                            text={t(`items.${series.key}.text`)}
                            watchLabel={t("watch")}
                            soonLabel={t("soon")}
                            fallbackHref={fallback}
                        />
                    ))}
                </ol>
            </FadeIn>
        </Section>
    );
}
