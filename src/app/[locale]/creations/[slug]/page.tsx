import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { pageMetadata } from "@/lib/pageMetadata";
import PageShell from "@/components/ui/PageShell";
import ProductHeader from "@/components/sections/Product/ProductHeader";
import ProductViews from "@/components/sections/Product/ProductViews";
import ProductFacts from "@/components/sections/Product/ProductFacts";
import ProductQuote from "@/components/sections/Product/ProductQuote";
import RelatedCreations from "@/components/sections/Product/RelatedCreations";
import { CREATIONS, findCreation } from "@/Data/creations";

// One creation (/creations/<slug>). The previous product page is kept in ../../_v1/menu/[productName]/.

type Params = { params: Promise<{ locale: string; slug: string }> };

export const generateStaticParams = () => CREATIONS.map((c) => ({ slug: c.slug }));

export async function generateMetadata({ params }: Params) {
    const { locale, slug } = await params;
    const creation = findCreation(slug);
    if (!creation) return {};
    const t = await getTranslations({ locale, namespace: `Sections.creations.products.${creation.key}` });
    return pageMetadata(params, "creation", { name: t("name"), short: t("short") });
}

export default async function CreationPage({ params }: Params) {
    const creation = findCreation((await params).slug);
    if (!creation) notFound();

    return (
        <PageShell>
            <ProductHeader creation={creation} />
            <ProductViews creation={creation} />
            <ProductFacts creation={creation} />
            <ProductQuote creation={creation} />
            <RelatedCreations creation={creation} />
        </PageShell>
    );
}
