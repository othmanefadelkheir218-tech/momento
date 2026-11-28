import { useTranslations } from "next-intl";
import Glow from "@/components/ui/Glow";
import RevealImage from "@/components/ui/RevealImage";
import SoftImage from "@/components/ui/SoftImage";

// The picture of the partner section: Marcelo piping a Momento pot, melting into the warm background.
// Desktop: it opens from a mask while scrolling (RevealImage).

export default function PartnerPicture() {
    const t = useTranslations("Sections.findUs");

    return (
        <div className="relative isolate">
            <Glow tone="light" className="-inset-[10%]" />
            <RevealImage>
                <SoftImage
                    src="/ChefCoocking.png"
                    alt={t("imageAlt")}
                    sizes="(max-width: 767px) 90vw, 540px"
                    quality={90}
                    className="mx-auto aspect-[2/3] w-full max-w-[540px]"
                    focus="50% 40%"
                    feather={10}
                />
            </RevealImage>
        </div>
    );
}
