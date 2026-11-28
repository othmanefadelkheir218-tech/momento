import { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { accent } from "@/components/ui/Accent";
import FadeIn from "@/components/ui/FadeIn";
import Panel from "@/components/ui/Panel";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";

// The closing moment of a page: a rounded burgundy panel inside the cream page (never a full-width
// band), with a centred heading, a short text and the buttons (`children`, use variant "light").
// Texts: <ns>.eyebrow / title / text (text optional).

export default function ClosingPanel({ ns, children }: { ns: string; children?: ReactNode }) {
    const t = useTranslations(ns);

    return (
        <Section aria-label={t("eyebrow")}>
            <FadeIn>
                <Panel className="px-6 py-[clamp(56px,6vw,104px)] md:px-12">
                    <SectionHeading
                        eyebrow={t("eyebrow")}
                        title={t.rich("title", { accent })}
                        text={t.has("text") ? t("text") : undefined}
                        tone="light"
                        align="center"
                        className="max-w-[820px]"
                    />
                    {children && <div className="mt-10 flex flex-wrap justify-center gap-3">{children}</div>}
                </Panel>
            </FadeIn>
        </Section>
    );
}
