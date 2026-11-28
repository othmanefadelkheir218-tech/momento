import { useTranslations } from "next-intl";
import { accent } from "@/components/ui/Accent";
import Eyebrow from "@/components/ui/Eyebrow";
import FadeIn from "@/components/ui/FadeIn";

// The top of "Our Creations": a short, quiet intro so the desserts show in the first screen.
// Desktop: eyebrow + title on the left, the short text on the right, on the title's baseline.
// Phones: one under the other. Texts: Sections.creations.hero (eyebrow / title / text).
// (Other pages use the larger PageHero.)

export default function CreationsIntro() {
    const t = useTranslations("Sections.creations.hero");

    return (
        <section className="px-5 md:px-8 pt-[clamp(96px,8.5vw,148px)] pb-[clamp(24px,2.4vw,40px)]">
            <FadeIn className="mx-auto grid w-full max-w-[clamp(1180px,78vw,1480px)] gap-5 lg:grid-cols-12 lg:items-end lg:gap-8">
                <div className="lg:col-span-7">
                    <Eyebrow>{t("eyebrow")}</Eyebrow>
                    <h1 className="mt-4 font-display font-medium text-burgundy leading-[1.02] tracking-[-0.015em] text-[clamp(42px,4.6vw,80px)] text-balance">
                        {t.rich("title", { accent })}
                    </h1>
                </div>
                <p className="max-w-[44ch] font-body text-[clamp(15px,1.05vw,18px)] leading-[1.6] text-chocolate lg:col-span-5 lg:pb-2">
                    {t("text")}
                </p>
            </FadeIn>
        </section>
    );
}
