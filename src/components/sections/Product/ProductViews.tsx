import Image from "next/image";
import { useTranslations } from "next-intl";
import FadeIn from "@/components/ui/FadeIn";
import Section from "@/components/ui/Section";
import SoftImage from "@/components/ui/SoftImage";
import type { Creation } from "@/Data/creations";

// Three more views of the pot, side by side on a soft light, no frames (from the old product page's
// gallery, calmer). Cut-out pictures float; photos (Cookies) melt into the cream.

export default function ProductViews({ creation }: { creation: Creation }) {
    const t = useTranslations("Sections.creations");
    const alt = t("card.imageAlt", { name: t(`products.${creation.key}.name`) });

    return (
        <Section tone="warm" fade="both">
            <FadeIn stagger={0.1} className="grid grid-cols-3 gap-3 md:gap-10">
                {creation.gallery.map((src) => (
                    <div key={src} className="relative aspect-square">
                        {creation.cutOut ? (
                            <Image src={src} alt={alt} fill sizes="(max-width: 767px) 32vw, 420px" className="object-contain p-[6%]" />
                        ) : (
                            <SoftImage src={src} alt={alt} sizes="(max-width: 767px) 32vw, 420px" className="h-full w-full" feather={14} />
                        )}
                    </div>
                ))}
            </FadeIn>
        </Section>
    );
}
