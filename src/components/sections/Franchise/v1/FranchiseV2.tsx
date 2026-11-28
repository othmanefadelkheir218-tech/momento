// ── Franchise v2 (NOT USED — kept for reference) ──
// The last "Become a franchisee" section of the home page. Removed because it said the same thing
// as FindUs (../../FindUs), which took over its title and picture.
// To bring it back: import this file in the page.

import { useTranslations } from "next-intl";
import { accent } from "@/components/ui/Accent";
import FadeIn from "@/components/ui/FadeIn";
import Glow from "@/components/ui/Glow";
import MomentoButton from "@/components/ui/MomentoButton";
import RevealImage from "@/components/ui/RevealImage";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import SoftImage from "@/components/ui/SoftImage";

// "Devenir franchisé": Marcelo at work on the left, his picture melting into the cream like every
// other picture of the page; the invitation on the right.
// Desktop: the picture opens from a mask while scrolling (RevealImage).
// Version before this one (burgundy panel): ./Franchise.tsx

export default function FranchiseV2() {
    const t = useTranslations("Sections.franchise");

    return (
        <Section aria-label={t("eyebrow")}>
            <div className="grid items-center gap-8 md:grid-cols-12 md:gap-6">
                <FadeIn className="relative isolate md:col-span-6">
                    <Glow className="-inset-[10%]" />
                    <RevealImage>
                        <SoftImage
                            src="/ChefCoocking.png"
                            alt={t("imageAlt")}
                            sizes="(max-width: 767px) 90vw, 640px"
                            className="mx-auto aspect-[5/5.6] w-full max-w-[640px]"
                            focus="50% 30%"
                            feather={10}
                        />
                    </RevealImage>
                </FadeIn>

                <FadeIn delay={0.15} className="md:col-span-5 md:col-start-8">
                    <SectionHeading eyebrow={t("eyebrow")} title={t.rich("title", { accent })} text={t("text")} />
                    <MomentoButton href="/become-a-client" className="mt-10 w-fit">
                        {t("cta")}
                    </MomentoButton>
                </FadeIn>
            </div>
        </Section>
    );
}
