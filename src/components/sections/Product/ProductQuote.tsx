import Image from "next/image";
import { useTranslations } from "next-intl";
import Eyebrow from "@/components/ui/Eyebrow";
import FadeIn from "@/components/ui/FadeIn";
import { LABEL } from "@/components/ui/Hairline";
import Section from "@/components/ui/Section";
import { PAGE_IMAGES } from "@/Data/pageImages";
import type { Creation } from "@/Data/creations";

// "Marcelo & Milo say": one chef's word about this creation — a big serif quote, and under it a
// small round portrait with his name and role.

const PORTRAITS = { marcelo: PAGE_IMAGES.portraitMarcelo, milo: PAGE_IMAGES.portraitMilo };

export default function ProductQuote({ creation }: { creation: Creation }) {
    const t = useTranslations("Sections.creations");
    const who = creation.voice;

    return (
        <Section aria-label={t("product.sayEyebrow")}>
            <FadeIn className="mx-auto max-w-[920px] text-center">
                <Eyebrow centered>{t("product.sayEyebrow")}</Eyebrow>
                <blockquote className="mt-8">
                    <p className="font-display font-medium text-burgundy text-[clamp(30px,3.4vw,58px)] leading-[1.15] text-balance">
                        “{t(`products.${creation.key}.quote`)}”
                    </p>
                    <footer className="mt-10 flex items-center justify-center gap-4">
                        <span className="relative h-14 w-14 overflow-hidden rounded-full">
                            <Image src={PORTRAITS[who]} alt="" fill sizes="56px" className="object-cover object-top" />
                        </span>
                        <span className="text-left">
                            <cite className="block font-display not-italic font-medium text-[22px] text-burgundy leading-tight">
                                {t(`product.names.${who}`)}
                            </cite>
                            <span className={`${LABEL} block mt-1`}>{t(`product.roles.${who}`)}</span>
                        </span>
                    </footer>
                </blockquote>
            </FadeIn>
        </Section>
    );
}
