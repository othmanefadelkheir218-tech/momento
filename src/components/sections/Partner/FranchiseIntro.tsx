import { useTranslations } from "next-intl";
import { accent } from "@/components/ui/Accent";
import Eyebrow from "@/components/ui/Eyebrow";
import FadeIn from "@/components/ui/FadeIn";
import Section from "@/components/ui/Section";
import { FRANCHISE_ID } from "./ids";

// The start of the second part of Become a Partner (franchise): a big centred title, like a new
// chapter of the same page — no band, no divider, just space.

export default function FranchiseIntro() {
    const t = useTranslations("Sections.partner.franchiseIntro");
    return (
        <Section id={FRANCHISE_ID} aria-label={t("eyebrow")} className="scroll-mt-20 pt-[clamp(96px,10vw,176px)]!">
            <FadeIn className="mx-auto max-w-[900px] text-center">
                <Eyebrow centered>{t("eyebrow")}</Eyebrow>
                <h2 className="mt-6 font-display font-medium text-burgundy leading-[1.02] tracking-[-0.015em] text-[clamp(46px,6vw,104px)]">
                    {t.rich("title", { accent })}
                </h2>
                <p className="mx-auto mt-6 max-w-[40ch] font-body text-[clamp(17px,1.25vw,23px)] leading-[1.6] text-chocolate">{t("text")}</p>
            </FadeIn>
        </Section>
    );
}
