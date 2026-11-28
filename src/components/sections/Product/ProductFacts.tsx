import { useTranslations } from "next-intl";
import TransitionLink from "@/components/TransitionLink";
import { accent } from "@/components/ui/Accent";
import FadeIn from "@/components/ui/FadeIn";
import { HAIRLINE, LABEL } from "@/components/ui/Hairline";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { ROUTES } from "@/Data/routes";
import type { Creation } from "@/Data/creations";

// "Key information": format, availability, allergens (link to the allergen table) and storage,
// as a quiet table with hairlines.

export default function ProductFacts({ creation }: { creation: Creation }) {
    const t = useTranslations("Sections.creations.product");

    const format = creation.weight
        ? t("formatWeight", { weight: creation.weight.replace(/(\d)\s*g$/, "$1 g") })
        : t("formatTbc");

    const rows = [
        { label: t("format"), value: format },
        { label: t("availability"), value: t(`availabilityValues.${creation.type}`) },
        {
            label: t("allergens"),
            value: (
                <TransitionLink
                    href={ROUTES.allergens}
                    className="border-b border-burgundy/30 pb-0.5 text-left text-burgundy transition-colors hover:border-burgundy"
                >
                    {t("allergensValue")}
                </TransitionLink>
            ),
        },
        { label: t("storage"), value: t("storageValue") },
    ];

    return (
        <Section aria-label={t("infoEyebrow")}>
            <div className="grid gap-10 md:grid-cols-12 md:gap-8">
                <FadeIn className="md:col-span-5">
                    <SectionHeading eyebrow={t("infoEyebrow")} title={t.rich("infoTitle", { accent })} />
                </FadeIn>
                <FadeIn delay={0.1} className="md:col-span-7">
                    <dl className={`border-t ${HAIRLINE}`}>
                        {rows.map((row) => (
                            <div key={row.label} className={`grid gap-2 border-b ${HAIRLINE} py-6 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] sm:gap-6`}>
                                <dt className={`${LABEL} pt-1`}>{row.label}</dt>
                                <dd className="font-body text-[clamp(16px,1.05vw,19px)] leading-[1.6] text-ink">{row.value}</dd>
                            </div>
                        ))}
                    </dl>
                </FadeIn>
            </div>
        </Section>
    );
}
