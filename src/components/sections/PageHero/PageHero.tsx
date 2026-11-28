import { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { accent } from "@/components/ui/Accent";
import Eyebrow from "@/components/ui/Eyebrow";
import FadeIn from "@/components/ui/FadeIn";
import Glow from "@/components/ui/Glow";
import SoftImage from "@/components/ui/SoftImage";

// The top of a page: eyebrow, the page title (h1, one accent word), a short text, optional buttons.
// With `image`: the text on the left and the picture on the right, melting into the cream
// (phones: the picture under the text). Without: the text alone, wide.
// Texts: <ns>.eyebrow / title / text / imageAlt.

type Props = {
    ns: string;
    image?: string;
    /** CSS object-position of the picture */
    focus?: string;
    /** frame shape of the picture, e.g. "aspect-[4/3]" */
    aspect?: string;
    children?: ReactNode;
};

export const H1 =
    "mt-6 font-display font-medium text-burgundy leading-[1.02] tracking-[-0.015em] text-[clamp(46px,6vw,104px)] text-balance";

export default function PageHero({ ns, image, focus, aspect = "aspect-[4/3]", children }: Props) {
    const t = useTranslations(ns);

    return (
        <section className="px-5 md:px-8 pt-[clamp(128px,12vw,200px)] pb-[clamp(40px,5vw,88px)]">
            <div className="mx-auto grid w-full max-w-[clamp(1180px,78vw,1480px)] items-center gap-10 md:grid-cols-12 md:gap-8">
                <FadeIn className={image ? "md:col-span-6" : "md:col-span-10"}>
                    <Eyebrow>{t("eyebrow")}</Eyebrow>
                    <h1 className={H1}>{t.rich("title", { accent })}</h1>
                    <p className="mt-7 max-w-[46ch] font-body text-[clamp(17px,1.25vw,23px)] leading-[1.6] text-chocolate">
                        {t("text")}
                    </p>
                    {children && <div className="mt-10 flex flex-wrap gap-3">{children}</div>}
                </FadeIn>

                {image && (
                    <FadeIn delay={0.15} className="relative isolate -mx-5 md:col-span-6 md:mx-0 md:-mr-12">
                        <Glow className="-inset-[8%]" />
                        <SoftImage
                            src={image}
                            alt={t("imageAlt")}
                            sizes="(max-width: 767px) 100vw, 720px"
                            quality={90}
                            className={aspect}
                            focus={focus}
                            feather={10}
                        />
                    </FadeIn>
                )}
            </div>
        </section>
    );
}
