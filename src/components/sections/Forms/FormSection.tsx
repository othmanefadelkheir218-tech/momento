import { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { accent } from "@/components/ui/Accent";
import FadeIn from "@/components/ui/FadeIn";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";

// A form with its heading: heading and short text on the left, the form on the right (phones:
// stacked). On a warm background that fades in and out. `id`: so buttons can scroll to it.
// Texts: <ns>.eyebrow / title / text.

export default function FormSection({ ns, id, children }: { ns: string; id?: string; children: ReactNode }) {
    const t = useTranslations(ns);
    return (
        <Section id={id} aria-label={t("eyebrow")} tone="warm" fade="both" className="scroll-mt-20">
            <div className="grid gap-10 md:grid-cols-12 md:gap-8">
                <FadeIn className="md:col-span-5">
                    <SectionHeading eyebrow={t("eyebrow")} title={t.rich("title", { accent })} text={t("text")} />
                </FadeIn>
                <FadeIn delay={0.1} className="md:col-span-7">
                    {children}
                </FadeIn>
            </div>
        </Section>
    );
}
