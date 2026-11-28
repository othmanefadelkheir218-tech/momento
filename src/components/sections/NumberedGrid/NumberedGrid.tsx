import { useTranslations } from "next-intl";
import { accent } from "@/components/ui/Accent";
import FadeIn from "@/components/ui/FadeIn";
import { HAIRLINE, NUMBER, number } from "@/components/ui/Hairline";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";

// A heading, then numbered items in columns (01 · 02 · 03…), each under a thin hairline.
// Items (<ns>.items) are either plain texts or { title, text }.
// Texts: <ns>.eyebrow / title / items.

type Item = string | { title: string; text: string };
type Fade = "both" | "top" | "bottom" | "none";

type Props = { ns: string; columns?: 2 | 3; tone?: "cream" | "warm"; fade?: Fade };

const COLS = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-2 lg:grid-cols-3" };

export default function NumberedGrid({ ns, columns = 3, tone, fade }: Props) {
    const t = useTranslations(ns);
    const items = t.raw("items") as Item[];

    return (
        <Section aria-label={t("eyebrow")} tone={tone} fade={fade}>
            <FadeIn>
                <SectionHeading eyebrow={t("eyebrow")} title={t.rich("title", { accent })} className="max-w-[760px]" />
            </FadeIn>
            <FadeIn stagger={0.08} className={`mt-12 grid gap-x-10 gap-y-2 md:mt-14 ${COLS[columns]}`}>
                {items.map((item, i) => (
                    <div key={i} className={`border-t ${HAIRLINE} pt-6 pb-8`}>
                        <span className={`${NUMBER} block text-[clamp(30px,2.4vw,44px)]`}>{number(i)}</span>
                        {typeof item === "string" ? (
                            <p className="mt-4 max-w-[34ch] font-display font-medium text-burgundy text-[clamp(21px,1.6vw,28px)] leading-snug">
                                {item}
                            </p>
                        ) : (
                            <>
                                <h3 className="mt-4 font-display font-medium text-burgundy text-[clamp(24px,1.9vw,34px)] leading-tight">
                                    {item.title}
                                </h3>
                                <p className="mt-3 max-w-[36ch] font-body text-[clamp(16px,1.05vw,19px)] leading-[1.65] text-chocolate">
                                    {item.text}
                                </p>
                            </>
                        )}
                    </div>
                ))}
            </FadeIn>
        </Section>
    );
}
