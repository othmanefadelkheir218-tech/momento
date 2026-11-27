// ── WhyMomento v1 (NOT USED — kept for reference) ──
// Each reason shown by a cut-out product pot on a soft glow. Replaced by ../WhyMomento.tsx (moments
// of the Marcelo & Milo story, in arch frames). To bring it back: import this file in the page.

import { useTranslations } from "next-intl";
import { accent } from "@/components/ui/Accent";
import FadeIn from "@/components/ui/FadeIn";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import ReasonV1 from "./Reason";

// "Pourquoi Momento": three reasons, numbered 01 · 02 · 03, each shown by a real pot.
// On a warm (cream-dark) background that fades in and out.

const POT = "/momento_product";
const REASONS = [
    // homemade: the Spéculoos from above, the Lotus biscuit on top
    { key: "homemade", image: `${POT}/Tiramisu speculoos 115g/images_nobg/Tiramisu speculoos - 4 ouvert vue plongeante.png` },
    // one pot, one moment: a closed pot, ready to take along
    { key: "onePot", image: `${POT}/Tiramisu pistache 100g/images_nobg/Tiramisu pistache - 1 face avec etiquette.png` },
    // layers you can see: the Red Velvet without its label
    { key: "layers", image: `${POT}/Red velvet 110g/images_nobg/Red Velvet - 7 sans etiquette ouvert.png` },
] as const;

type Fade = "both" | "top" | "bottom" | "none";

/** `fade`: where the warm background melts into the cream (see Section). */
export default function WhyMomentoV1({ fade = "both" }: { fade?: Fade }) {
    const t = useTranslations("Sections.whyMomento");

    return (
        <Section aria-label={t("eyebrow")} tone="warm" fade={fade}>
            <FadeIn>
                <SectionHeading eyebrow={t("eyebrow")} title={t.rich("title", { accent })} className="max-w-[760px]" />
            </FadeIn>
            <FadeIn stagger={0.12} className="mt-12 grid gap-14 md:mt-14 md:grid-cols-3 md:gap-10">
                {REASONS.map(({ key, image }, i) => (
                    <ReasonV1
                        key={key}
                        number={String(i + 1).padStart(2, "0")}
                        title={t(`${key}.title`)}
                        text={t(`${key}.text`)}
                        image={image}
                    />
                ))}
            </FadeIn>
        </Section>
    );
}
