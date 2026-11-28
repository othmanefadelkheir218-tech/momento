import { useTranslations } from "next-intl";
import FadeIn from "@/components/ui/FadeIn";
import Section from "@/components/ui/Section";

// "Important notice": the safety text, set apart by a caramel rule on the left (no box).

export default function AllergenNotice() {
    const t = useTranslations("Sections.allergens.notice");
    return (
        <Section aria-label={t("title")} className="pt-0!">
            <FadeIn className="max-w-[860px] border-l-2 border-caramel pl-6 md:pl-10">
                <h2 className="font-display font-medium text-burgundy text-[clamp(26px,2.2vw,38px)] leading-tight">{t("title")}</h2>
                <p className="mt-4 font-body text-[clamp(17px,1.15vw,21px)] leading-[1.7] text-ink">{t("text")}</p>
            </FadeIn>
        </Section>
    );
}
