import { useTranslations } from "next-intl";
import TransitionLink from "@/components/TransitionLink";
import { LABEL } from "@/components/ui/Hairline";
import { creationRoute } from "@/Data/routes";
import type { Creation } from "@/Data/creations";
import CreationImage from "./CreationImage";

// A creation in the list view: one line with a small pot, name + description, categories and
// "View product", hairlines between lines.

export default function CreationRow({ creation }: { creation: Creation }) {
    const t = useTranslations("Sections.creations");
    const name = t(`products.${creation.key}.name`);

    return (
        <TransitionLink
            href={creationRoute(creation.slug)}
            className="group grid w-full grid-cols-[72px_minmax(0,1fr)] items-center gap-5 border-b border-burgundy/15 py-4 text-left sm:grid-cols-[96px_minmax(0,1fr)_auto] sm:gap-8 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-caramel"
        >
            <CreationImage creation={creation} alt={t("card.imageAlt", { name })} sizes="96px" className="aspect-square" />
            <span className="block">
                <span className="block font-display font-medium text-burgundy text-[clamp(21px,1.7vw,28px)] leading-tight">{name}</span>
                <span className="mt-1 block font-body text-[15px] text-chocolate/85">{t(`products.${creation.key}.short`)}</span>
                <span className={`${LABEL} mt-2 block sm:hidden`}>{creation.categories.map((c) => t(`toolbar.categories.${c}`)).join(" · ")}</span>
            </span>
            <span className="hidden items-center gap-8 sm:flex">
                <span className={LABEL}>{creation.categories.map((c) => t(`toolbar.categories.${c}`)).join(" · ")}</span>
                <span className="inline-flex items-center gap-2 font-body text-[13px] font-semibold text-burgundy whitespace-nowrap">
                    {t("card.view")}
                    <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none">→</span>
                </span>
            </span>
        </TransitionLink>
    );
}
