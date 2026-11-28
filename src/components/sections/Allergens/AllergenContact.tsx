import { useTranslations } from "next-intl";
import FadeIn from "@/components/ui/FadeIn";
import MomentoButton from "@/components/ui/MomentoButton";
import Section from "@/components/ui/Section";
import { ROUTES } from "@/Data/routes";

// The end of the allergens page: who to ask, a button to the contact page, the last update date.

export default function AllergenContact() {
    const t = useTranslations("Sections.allergens.contact");
    const legal = useTranslations("Sections.legal");
    return (
        <Section>
            <FadeIn className="flex flex-col gap-6 border-t border-burgundy/15 pt-10 md:flex-row md:items-center md:justify-between">
                <div>
                    <p className="font-display font-medium text-burgundy text-[clamp(24px,2vw,34px)] leading-snug">{t("text")}</p>
                    <p className="mt-3 font-body text-[14px] text-chocolate/70">{legal("updated", { date: legal("date") })}</p>
                </div>
                <MomentoButton href={ROUTES.contact} variant="ghost" className="w-fit shrink-0">
                    {t("button")}
                </MomentoButton>
            </FadeIn>
        </Section>
    );
}
