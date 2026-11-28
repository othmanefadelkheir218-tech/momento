import { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { accent } from "@/components/ui/Accent";
import FadeIn from "@/components/ui/FadeIn";
import RevealImage from "@/components/ui/RevealImage";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import SoftImage from "@/components/ui/SoftImage";
import PointList from "./PointList";

// A story block: heading + text on one side, a picture melting into the page on the other.
// `reverse` puts the picture on the left. `points` adds the list <ns>.points under the text.
// Without `image`, the text sits alone (narrower). `children`: buttons under the text.
// Texts: <ns>.eyebrow / title / text / imageAlt (/ points).

type Fade = "both" | "top" | "bottom" | "none";

type Props = {
    ns: string;
    image?: string;
    focus?: string;
    aspect?: string;
    reverse?: boolean;
    points?: boolean;
    tone?: "cream" | "warm";
    fade?: Fade;
    id?: string;
    children?: ReactNode;
};

export default function TextSplit({ ns, image, focus, aspect = "aspect-[4/3]", reverse, points, tone, fade, id, children }: Props) {
    const t = useTranslations(ns);

    const text = (
        <>
            <SectionHeading eyebrow={t("eyebrow")} title={t.rich("title", { accent })} text={t("text")} />
            {points && <PointList items={t.raw("points") as string[]} className="mt-10" />}
            {children && <div className="mt-10 flex flex-wrap gap-3">{children}</div>}
        </>
    );

    if (!image) {
        return (
            <Section id={id} aria-label={t("eyebrow")} tone={tone} fade={fade}>
                <FadeIn className="max-w-[820px]">{text}</FadeIn>
            </Section>
        );
    }

    return (
        <Section id={id} aria-label={t("eyebrow")} tone={tone} fade={fade}>
            <div className="grid items-center gap-10 md:grid-cols-12 md:gap-8">
                <FadeIn className={`md:col-span-5 ${reverse ? "md:order-2 md:col-start-8" : ""}`}>{text}</FadeIn>
                <FadeIn
                    delay={0.15}
                    className={`-mx-5 md:mx-0 md:col-span-7 ${reverse ? "md:order-1 md:-ml-12" : "md:col-start-6 md:-mr-12"}`}
                >
                    <RevealImage>
                        <SoftImage src={image} alt={t("imageAlt")} sizes="(max-width: 767px) 100vw, 760px" className={aspect} focus={focus} />
                    </RevealImage>
                </FadeIn>
            </div>
        </Section>
    );
}
