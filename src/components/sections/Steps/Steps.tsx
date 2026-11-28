import { useTranslations } from "next-intl";
import { accent } from "@/components/ui/Accent";
import FadeIn from "@/components/ui/FadeIn";
import { NUMBER, number } from "@/components/ui/Hairline";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";

// "How it works": the steps in order, on one thin line with a small dot for each step
// (desktop: side by side; phones: one under the other, the line on the left).
// Texts: <ns>.eyebrow / title / items (plain texts).

type Fade = "both" | "top" | "bottom" | "none";

export default function Steps({ ns, tone, fade }: { ns: string; tone?: "cream" | "warm"; fade?: Fade }) {
    const t = useTranslations(ns);
    const items = t.raw("items") as string[];

    return (
        <Section aria-label={t("eyebrow")} tone={tone} fade={fade}>
            <FadeIn>
                <SectionHeading eyebrow={t("eyebrow")} title={t.rich("title", { accent })} className="max-w-[760px]" />
            </FadeIn>
            <FadeIn className="mt-12 md:mt-16">
                {/* the grid has as many columns as steps (inline style: the count changes per page) */}
                <ol
                    className="relative grid gap-0 border-l border-burgundy/20 pl-7 md:grid-cols-[repeat(var(--steps),minmax(0,1fr))] md:gap-6 md:border-l-0 md:border-t md:pl-0"
                    style={{ ["--steps" as string]: items.length }}
                >
                    {items.map((item, i) => (
                        <li key={item} className="relative pb-9 md:pb-0 md:pt-9">
                            <span
                                aria-hidden
                                className="absolute -left-[33px] top-1.5 h-2.5 w-2.5 rounded-full bg-burgundy md:left-0 md:-top-[5px]"
                            />
                            <span className={`${NUMBER} block text-[clamp(30px,2.4vw,44px)]`}>{number(i)}</span>
                            <p className="mt-3 max-w-[24ch] font-display font-medium text-burgundy text-[clamp(20px,1.45vw,26px)] leading-snug">
                                {item}
                            </p>
                        </li>
                    ))}
                </ol>
            </FadeIn>
        </Section>
    );
}
