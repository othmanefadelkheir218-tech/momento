// ── Franchise v1 (NOT USED — kept for reference) ──
// Burgundy rounded panel, Marcelo fading into the burgundy on the right. Replaced by the cream version
// in ../Franchise.tsx (the dark panel didn't match the rest of the page).
// To bring it back: import this file instead of ../Franchise in the page.

import Image from "next/image";
import { useTranslations } from "next-intl";
import { accent } from "@/components/ui/Accent";
import FadeIn from "@/components/ui/FadeIn";
import MomentoButton from "@/components/ui/MomentoButton";
import Panel from "@/components/ui/Panel";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";

// "Devenir franchisé": the one burgundy moment of the page. Text on the left; Marcelo fills the
// whole right half of the panel and fades into the burgundy (no frame inside the frame).

const FADE_INTO_BURGUNDY = "linear-gradient(to right, transparent, #000 32%)";
const FADE_INTO_BURGUNDY_MOBILE = "linear-gradient(to bottom, #000 70%, transparent)";

export default function FranchiseV1() {
    const t = useTranslations("Sections.franchise");

    return (
        <Section aria-label={t("eyebrow")}>
            <FadeIn>
                <Panel className="relative grid overflow-hidden md:min-h-[560px] md:grid-cols-2">
                    <div className="relative z-10 order-2 flex flex-col justify-center px-7 pb-12 md:order-1 md:px-16 md:py-16">
                        <SectionHeading tone="light" eyebrow={t("eyebrow")} title={t.rich("title", { accent })} text={t("text")} />
                        <MomentoButton href="/become-a-client" variant="light" className="mt-10 w-fit">
                            {t("cta")}
                        </MomentoButton>
                    </div>
                    <div className="relative order-1 h-[380px] md:order-2 md:h-auto">
                        <div
                            className="absolute inset-0 md:hidden"
                            style={{ maskImage: FADE_INTO_BURGUNDY_MOBILE, WebkitMaskImage: FADE_INTO_BURGUNDY_MOBILE }}
                        >
                            <Image src="/ChefCoocking.png" alt={t("imageAlt")} fill sizes="100vw" className="object-cover" style={{ objectPosition: "50% 25%" }} />
                        </div>
                        <div
                            className="absolute inset-0 hidden md:block"
                            style={{ maskImage: FADE_INTO_BURGUNDY, WebkitMaskImage: FADE_INTO_BURGUNDY }}
                        >
                            <Image src="/ChefCoocking.png" alt="" fill sizes="600px" className="object-cover" style={{ objectPosition: "50% 8%" }} />
                        </div>
                    </div>
                </Panel>
            </FadeIn>
        </Section>
    );
}
