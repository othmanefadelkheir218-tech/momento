import { useTranslations } from "next-intl";
import TransitionLink from "@/components/TransitionLink";
import { accent } from "@/components/ui/Accent";
import FadeIn from "@/components/ui/FadeIn";
import { LABEL } from "@/components/ui/Hairline";
import { H1 } from "../PageHero/PageHero";
import CreationImage from "../Creations/CreationImage";
import { ROUTES } from "@/Data/routes";
import type { Creation } from "@/Data/creations";

// The top of a product page: a back link, then the pot, big, on the left; on the right its
// categories, name, one-line description, "Handmade · Ready to take away" and its description.

export default function ProductHeader({ creation }: { creation: Creation }) {
    const t = useTranslations("Sections.creations");
    const p = (field: string) => t(`products.${creation.key}.${field}`);

    return (
        <section className="px-5 md:px-8 pt-[clamp(112px,10vw,168px)] pb-[clamp(40px,5vw,80px)]">
            <div className="mx-auto w-full max-w-[clamp(1180px,78vw,1480px)]">
                <TransitionLink
                    href={ROUTES.creations}
                    className="group inline-flex items-center gap-2 font-body text-[14px] font-medium text-burgundy rounded-sm focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-caramel"
                >
                    <span aria-hidden className="transition-transform duration-300 group-hover:-translate-x-1 motion-reduce:transition-none">←</span>
                    {t("product.back")}
                </TransitionLink>

                <div className="mt-8 grid items-center gap-8 md:grid-cols-12 md:gap-10">
                    <FadeIn className="md:col-span-6">
                        <CreationImage
                            creation={creation}
                            alt={t("card.imageAlt", { name: p("name") })}
                            sizes="(max-width: 767px) 90vw, 620px"
                            className="mx-auto aspect-square w-full max-w-[620px]"
                            priority
                        />
                    </FadeIn>

                    <FadeIn delay={0.12} className="md:col-span-6">
                        <p className={LABEL}>{creation.categories.map((c) => t(`toolbar.categories.${c}`)).join(" · ")}</p>
                        <h1 className={`${H1} mt-4!`}>{t.rich(`products.${creation.key}.name`, { accent })}</h1>
                        <p className="mt-4 font-display text-[clamp(22px,1.9vw,32px)] leading-snug text-chocolate">{p("short")}</p>
                        <p className="mt-8 flex items-center gap-3 font-body text-[13px] font-semibold uppercase tracking-[.14em] text-burgundy">
                            <span>{t("product.badges.handmade")}</span>
                            <span aria-hidden className="h-px w-6 bg-caramel" />
                            <span>{t("product.badges.takeaway")}</span>
                        </p>
                        <p className="mt-8 max-w-[46ch] border-t border-burgundy/15 pt-8 font-body text-[clamp(17px,1.15vw,21px)] leading-[1.7] text-chocolate">
                            {p("description")}
                        </p>
                    </FadeIn>
                </div>
            </div>
        </section>
    );
}
