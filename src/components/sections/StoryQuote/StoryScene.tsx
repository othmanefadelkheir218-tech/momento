"use client";

import { useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Eyebrow from "@/components/ui/Eyebrow";
import MomentoButton from "@/components/ui/MomentoButton";
import { STORY_IMAGE } from "./storyImage";
import { useStoryScene } from "./useStoryScene";

// Desktop: "Notre histoire en une phrase" as a full-width scene (inspired by the old "We love
// partnerships" section). The picture fills the whole width; the sentence sits on the calm wall on the
// left. No dark veil, and clean top and bottom edges (no fade).
// Animations (parallax + words rising in): useStoryScene.ts.

const WARM = "#EDE1CF"; // the warm area this section sits in (Why Momento → here → Where to find us)
// a little cream light behind the words, so they read well on the wall
const TEXT_LIGHT = "linear-gradient(to right, rgb(247 239 226 / 0.6) 0%, rgb(247 239 226 / 0.3) 30%, transparent 48%)";

export default function StoryScene({ className = "" }: { className?: string }) {
    const t = useTranslations("Sections.storyQuote");
    const ref = useRef<HTMLElement>(null);
    useStoryScene(ref);

    return (
        <section ref={ref} aria-label={t("eyebrow")} className={`relative overflow-hidden ${className}`} style={{ backgroundColor: WARM }}>
            {/* as tall as the picture at full width (its ratio is 2.13), so the sides are barely cropped */}
            {/* rounded top corners */}
            <div className="relative h-[clamp(560px,48vw,980px)] overflow-hidden rounded-t-[clamp(28px,3vw,56px)]">
                {/* picture layer: taller than the section, so the parallax never shows its edges */}
                <div data-story-bg className="absolute inset-x-0 -top-[4%] h-[108%] will-change-transform">
                    <Image
                        src={STORY_IMAGE}
                        alt={t("imageAlt")}
                        fill
                        sizes="100vw"
                        quality={90}
                        className="object-cover"
                        style={{ objectPosition: "72% 0%" }}
                    />
                </div>
                <div aria-hidden className="absolute inset-0" style={{ background: TEXT_LIGHT }} />

                <div className="absolute inset-0 flex items-center px-8">
                    <div className="mx-auto w-full max-w-[clamp(1180px,78vw,1480px)]">
                        <div className="max-w-[clamp(360px,30vw,560px)]">
                            <div data-story-rise>
                                <Eyebrow>{t("eyebrow")}</Eyebrow>
                            </div>
                            <blockquote
                                data-story-rise
                                className="mt-6 font-display font-medium text-burgundy text-[clamp(30px,2.8vw,54px)] leading-[1.18] text-balance"
                            >
                                {t("quote")}
                            </blockquote>
                            <div data-story-rise className="mt-10">
                                <MomentoButton href="/about" variant="ghost" className="w-fit">
                                    {t("cta")}
                                </MomentoButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
