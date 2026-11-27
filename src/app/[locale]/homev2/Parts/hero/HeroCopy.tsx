import { RefObject } from "react";
import HeroTitle from "./HeroTitle";

// The hero texts of both versions. Their animations are in HomeHero.tsx.

type HeroCopyProps = { eyebrow: string; title: string };

/**
 * Hero v2 title row, in the cream space above the framed picture. Its height matches where the
 * frame's top edge lands (22.5svh desktop / 38svh mobile). Animated by HomeHero.
 */
export function HeroV2Title({ titleRef, eyebrow, title }: HeroCopyProps & { titleRef: RefObject<HTMLDivElement | null> }) {
    return (
        <div
            ref={titleRef}
            // desktop: the header has slid away by the time the title shows, so the row uses
            // the whole space above the frame (no 72px header gap at the top)
            className="invisible absolute inset-x-0 top-[72px] md:top-0 z-10 flex items-center md:items-end md:pb-[2.5svh] h-[calc(38svh-72px)] md:h-[22.5svh]"
        >
            <div className="mx-auto w-[92vw] md:w-[70vw] flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-8 text-center md:text-left">
                <div>
                    <p className="flex items-center justify-center md:justify-start gap-3 font-body font-semibold text-[11px] md:text-[12px] uppercase tracking-[.18em] text-burgundy whitespace-nowrap">
                        <span aria-hidden className="hv2r-rule h-px w-6 md:w-8 bg-burgundy/60 origin-right md:origin-left" />
                        <span className="hv2r-eyebrow">{eyebrow}</span>
                        <span aria-hidden className="hv2r-rule h-px w-6 bg-burgundy/60 origin-left md:hidden" />
                    </p>
                    <h1 className="mt-2 md:mt-3 font-display font-medium text-burgundy leading-[1.05] text-[40px] md:text-[clamp(30px,3.4vw,54px)]">
                        <HeroTitle raw={title} oneLineOnDesktop />
                    </h1>
                </div>
            </div>
        </div>
    );
}

/** Hero v1 copy: title on the left, over a soft cream haze on the picture. Animated by HomeHero. */
export function HeroV1Copy({
    copyRef,
    hazeRef,
    eyebrow,
    title,
}: HeroCopyProps & { copyRef: RefObject<HTMLDivElement | null>; hazeRef: RefObject<HTMLDivElement | null> }) {
    return (
        <>
            {/* Soft cream fade behind the title (centre on mobile, left side on desktop) */}
            <div
                ref={hazeRef}
                aria-hidden
                className="pointer-events-none absolute inset-0 z-10
                    bg-[radial-gradient(ellipse_80%_30%_at_50%_50%,rgb(247_239_226/.88)_0%,rgb(247_239_226/.65)_55%,transparent_100%)]
                    md:bg-[radial-gradient(ellipse_40%_46%_at_14%_50%,rgb(247_239_226/.8)_0%,rgb(247_239_226/.55)_45%,transparent_100%)]"
            />
            <div className="absolute inset-0 z-10 flex items-center pointer-events-none">
                <div ref={copyRef} className="container mx-auto px-4 pt-10 md:pt-0 text-center md:text-left">
                    {/* Small label: thin line + burgundy text, no background */}
                    <p className="flex items-center justify-center md:justify-start gap-3 font-body font-semibold text-[12px] md:text-[13px] uppercase tracking-[.18em] text-burgundy whitespace-nowrap">
                        <span aria-hidden className="hv2-rule h-px w-6 md:w-8 bg-burgundy/60 origin-right md:origin-left" />
                        <span className="hv2-eyebrow-text">{eyebrow}</span>
                        {/* second line only on mobile, where the label is centred */}
                        <span aria-hidden className="hv2-rule h-px w-6 bg-burgundy/60 origin-left md:hidden" />
                    </p>
                    <h1 className="mt-3 font-display font-medium text-burgundy leading-[1.05] text-[50px] md:text-[clamp(34px,4.2vw,56px)]">
                        <HeroTitle raw={title} />
                    </h1>
                </div>
            </div>
        </>
    );
}
