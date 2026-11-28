import { useTranslations } from "next-intl";
import { accent } from "@/components/ui/Accent";
import FadeIn from "@/components/ui/FadeIn";
import MomentoButton from "@/components/ui/MomentoButton";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { ROUTES } from "@/Data/routes";
import { relatedCreations, type Creation } from "@/Data/creations";
import CreationCard from "../Creations/CreationCard";

// "You may also like": three other creations (same category first), and a link to all of them.

export default function RelatedCreations({ creation }: { creation: Creation }) {
    const t = useTranslations("Sections.creations.product");
    const related = relatedCreations(creation);

    return (
        <Section aria-label={t("relatedEyebrow")}>
            <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
                <FadeIn>
                    <SectionHeading eyebrow={t("relatedEyebrow")} title={t.rich("relatedTitle", { accent })} />
                </FadeIn>
                <FadeIn delay={0.1}>
                    <MomentoButton href={ROUTES.creations} variant="ghost" className="w-fit">
                        {t("seeAll")}
                    </MomentoButton>
                </FadeIn>
            </div>
            <FadeIn stagger={0.1} className="mt-12 grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3 md:gap-x-8">
                {related.map((c) => (
                    <div key={c.key} className={c === related[2] ? "hidden md:block" : ""}>
                        <CreationCard creation={c} />
                    </div>
                ))}
            </FadeIn>
        </Section>
    );
}
