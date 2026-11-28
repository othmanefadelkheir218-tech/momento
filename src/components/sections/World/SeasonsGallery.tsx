import { useTranslations } from "next-intl";
import { accent } from "@/components/ui/Accent";
import FadeIn from "@/components/ui/FadeIn";
import { LABEL } from "@/components/ui/Hairline";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import SoftImage from "@/components/ui/SoftImage";
import { PAGE_IMAGES } from "@/Data/pageImages";

// "The kitchen changes with the seasons": the same kitchen, dressed for each season — pictures in
// a row with the season's name under each. The pictures appear once all four exist (PAGE_IMAGES).

const SEASONS = ["winter", "spring", "summer", "autumn"] as const;

export default function SeasonsGallery() {
    const t = useTranslations("Sections.world.seasons");
    const ready = SEASONS.every((s) => PAGE_IMAGES.worldSeasons[s]);

    return (
        <Section aria-label={t("eyebrow")} tone="warm" fade="both">
            <FadeIn>
                <SectionHeading eyebrow={t("eyebrow")} title={t.rich("title", { accent })} text={t("text")} className="max-w-[820px]" />
            </FadeIn>
            {ready && (
                <FadeIn stagger={0.1} className="mt-12 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4 md:gap-x-8">
                    {SEASONS.map((s) => (
                        <figure key={s}>
                            <SoftImage
                                src={PAGE_IMAGES.worldSeasons[s] as string}
                                alt={t("imageAlt", { season: t(`items.${s}`) })}
                                sizes="(max-width: 767px) 46vw, 320px"
                                className="aspect-[3/4]"
                                feather={8}
                            />
                            <figcaption className={`${LABEL} mt-4`}>{t(`items.${s}`)}</figcaption>
                        </figure>
                    ))}
                </FadeIn>
            )}
        </Section>
    );
}
