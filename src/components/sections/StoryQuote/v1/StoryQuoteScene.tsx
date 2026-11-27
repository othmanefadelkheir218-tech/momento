// ── StoryQuote, full-width scene version (NOT USED — kept for reference) ──
// The picture ran edge to edge with the sentence on it; on big screens the text sat on the window and
// the scene was cut at the screen edge. Replaced by ../StoryQuote.tsx.

import Image from "next/image";
import { useTranslations } from "next-intl";
import Eyebrow from "@/components/ui/Eyebrow";
import FadeIn from "@/components/ui/FadeIn";
import MomentoButton from "@/components/ui/MomentoButton";

// "Notre histoire en une phrase", as a wide scene: the moment it all began (Marcelo and Milo writing
// "Momento" on the chalkboard) fills the right ¾ of the width and melts into the cream on its left,
// top and bottom (like the hero); the sentence sits on the cream on the left.
// Phones: the picture first (melting into the cream at the bottom), the sentence under it.

const FADE_TOP_BOTTOM = "linear-gradient(to bottom, transparent 0%, #000 11%, #000 87%, transparent 100%)";
const FADE_BOTTOM = "linear-gradient(to bottom, #000 62%, transparent 100%)";
const FADE_LEFT = "linear-gradient(to right, transparent 0%, #000 34%)";

export default function StoryQuoteScene() {
    const t = useTranslations("Sections.storyQuote");

    const words = (
        <>
            <span aria-hidden className="block font-display text-[26px] leading-none text-caramel opacity-75">
                ✦
            </span>
            <Eyebrow className="mt-5">{t("eyebrow")}</Eyebrow>
            <blockquote className="mt-6 font-display font-medium text-burgundy text-[clamp(28px,3vw,44px)] leading-[1.2] text-balance">
                {t("quote")}
            </blockquote>
            <MomentoButton href="/about" variant="ghost" className="mt-10 w-fit">
                {t("cta")}
            </MomentoButton>
        </>
    );

    return (
        // The scene's soft top and bottom edges slide over the sections around it (negative margins), so
    // there is no empty cream between them.
    <section aria-label={t("eyebrow")} className="relative z-10 md:-my-[clamp(40px,4vw,64px)]">
            {/* Desktop: the scene, with the sentence on it */}
            <div className="relative hidden h-[clamp(560px,46vw,720px)] md:block" style={{ maskImage: FADE_TOP_BOTTOM, WebkitMaskImage: FADE_TOP_BOTTOM }}>
                <div className="absolute inset-y-0 right-0 w-[76%]" style={{ maskImage: FADE_LEFT, WebkitMaskImage: FADE_LEFT }}>
                    <Image src="/bg_hero_2.png" alt={t("imageAlt")} fill sizes="76vw" className="object-cover" style={{ objectPosition: "70% 45%" }} />
                </div>
                <div className="absolute inset-0 flex items-center px-8">
                    <FadeIn className="mx-auto w-full max-w-[1180px]">
                        <div className="max-w-[420px]">{words}</div>
                    </FadeIn>
                </div>
            </div>

            {/* Phones: the scene, then the sentence */}
            <div className="md:hidden">
                <div className="relative h-[62svh] max-h-[520px]" style={{ maskImage: FADE_BOTTOM, WebkitMaskImage: FADE_BOTTOM }}>
                    <Image src="/bg_hero_2.png" alt={t("imageAlt")} fill sizes="100vw" className="object-cover" style={{ objectPosition: "72% 50%" }} />
                </div>
                <FadeIn className="-mt-10 px-5 pb-12">{words}</FadeIn>
            </div>
        </section>
    );
}
