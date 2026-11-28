import { useTranslations } from "next-intl";
import { accent } from "@/components/ui/Accent";
import FadeIn from "@/components/ui/FadeIn";
import { HAIRLINE, LABEL } from "@/components/ui/Hairline";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";

// Practical details as a quiet table: the label on the left, the value on the right, hairlines
// between rows (heading on the left on desktop).
// Texts: <ns>.eyebrow / title / rows [{ label, value }].

type Fade = "both" | "top" | "bottom" | "none";

export default function DetailRows({ ns, tone, fade }: { ns: string; tone?: "cream" | "warm"; fade?: Fade }) {
    const t = useTranslations(ns);
    const rows = t.raw("rows") as { label: string; value: string }[];

    return (
        <Section aria-label={t("eyebrow")} tone={tone} fade={fade}>
            <div className="grid gap-10 md:grid-cols-12 md:gap-8">
                <FadeIn className="md:col-span-5">
                    <SectionHeading eyebrow={t("eyebrow")} title={t.rich("title", { accent })} />
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
