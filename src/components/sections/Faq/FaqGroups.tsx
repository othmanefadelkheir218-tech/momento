import { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { accent } from "@/components/ui/Accent";
import FadeIn from "@/components/ui/FadeIn";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import FaqItem from "./FaqItem";

// Groups of questions: the group name on the left, its questions on the right (phones: stacked).
// The questions all live in Sections.questions.groups.<group> (title + items [{ q, a[] }]), so the
// same answers appear on the Questions page and on the Become a Partner page.
// `headingNs`: optional heading above (eyebrow / title). `children`: under the groups (a button…).

type Props = { groups: string[]; headingNs?: string; children?: ReactNode };

export default function FaqGroups({ groups, headingNs, children }: Props) {
    const t = useTranslations("Sections.questions.groups");
    const heading = useTranslations(headingNs ?? "Sections.questions.hero");

    return (
        <Section aria-label={headingNs ? heading("eyebrow") : undefined}>
            {headingNs && (
                <FadeIn className="mb-12 md:mb-16">
                    <SectionHeading eyebrow={heading("eyebrow")} title={heading.rich("title", { accent })} />
                </FadeIn>
            )}
            <div className="space-y-14 md:space-y-20">
                {groups.map((group) => (
                    <FadeIn key={group} className="grid gap-4 md:grid-cols-12 md:gap-8">
                        <h2 className="font-display font-medium text-burgundy text-[clamp(26px,2.2vw,40px)] leading-tight md:col-span-4 md:pt-5">
                            {t(`${group}.title`)}
                        </h2>
                        <div className="border-t border-burgundy/15 md:col-span-8">
                            {(t.raw(`${group}.items`) as { q: string; a: string[] }[]).map((item) => (
                                <FaqItem key={item.q} question={item.q} answer={item.a} />
                            ))}
                        </div>
                    </FadeIn>
                ))}
            </div>
            {children && <div className="mt-12 md:ml-[33.33%] md:pl-8">{children}</div>}
        </Section>
    );
}
