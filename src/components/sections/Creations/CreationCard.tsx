import { useTranslations } from "next-intl";
import TransitionLink from "@/components/TransitionLink";
import { LABEL } from "@/components/ui/Hairline";
import { creationRoute } from "@/Data/routes";
import type { Creation } from "@/Data/creations";
import CreationImage from "./CreationImage";

// A creation in the grid: the pot, then (under it, never on it) its categories, name, one-line
// description and "View product". The whole card opens the product page.

export default function CreationCard({ creation }: { creation: Creation }) {
    const t = useTranslations("Sections.creations");
    const name = t(`products.${creation.key}.name`);

    return (
        <TransitionLink
            href={creationRoute(creation.slug)}
            className="group block w-full text-left rounded-[20px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-caramel"
        >
            <CreationImage creation={creation} alt={t("card.imageAlt", { name })} sizes="(max-width: 639px) 46vw, (max-width: 1279px) 30vw, 300px" className="aspect-square" />
            <span className="mt-4 block border-t border-burgundy/15 pt-4">
                <span className={`${LABEL} block`}>{creation.categories.map((c) => t(`toolbar.categories.${c}`)).join(" · ")}</span>
                <span className="mt-2 block font-display font-medium text-burgundy text-[clamp(21px,1.7vw,28px)] leading-tight">{name}</span>
                <span className="mt-1.5 block font-body text-[15px] leading-relaxed text-chocolate/85">{t(`products.${creation.key}.short`)}</span>
                <span className="mt-3 inline-flex items-center gap-2 font-body text-[13px] font-semibold text-burgundy">
                    <span className="border-b border-burgundy/30 pb-0.5 transition-colors group-hover:border-burgundy">{t("card.view")}</span>
                    <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none">→</span>
                </span>
            </span>
        </TransitionLink>
    );
}
