import { getProductBySlug, slugify } from "@/lib/utils";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { ProductShowcase } from "../Parts/ProductDetail";
import { getDessertData } from "@/Data/Const";
import { routing } from "@/i18n/routing";

export async function generateMetadata({ params }: { params: Promise<{ locale: string, productName: string }> }) {
    const { locale, productName } = await params;

    // 1. Try to find the product in ANY of the supported locales
    let matchedProductId: number | null = null;
    for (const l of routing.locales) {
        const t = await getTranslations({ locale: l, namespace: "Desserts" });
        const productsList = getDessertData(t);
        const product = productsList.find(p => slugify(p.name) === productName);
        if (product) {
            matchedProductId = product.id;
            break;
        }
    }

    if (!matchedProductId) {
        return {
            title: "Product Not Found",
        };
    }

    // 2. Fetch the final product data for the CURRENT target locale
    const tCurrent = await getTranslations({ locale, namespace: "Desserts" });
    const currentProducts = getDessertData(tCurrent);
    const product = currentProducts.find(p => p.id === matchedProductId);

    if (!product) {
        return { title: "Product Not Found" };
    }

    return {
        title: `${product.name} | Momento`,
        description: product.description.slice(0, 150) + "...",
        openGraph: {
            images: [product.main_image],
        },
        twitter: {
            card: "summary_large_image",
            images: [product.main_image],
        },
    };
}

export default async function ProductPage({ params }: { params: Promise<{ locale: string, productName: string }> }) {
    const { locale, productName } = await params;

    // 1. Try to find the product in ANY of the supported locales
    let matchedProductId: number | null = null;
    for (const l of routing.locales) {
        const t = await getTranslations({ locale: l, namespace: "Desserts" });
        const productsList = getDessertData(t);
        const product = productsList.find(p => slugify(p.name) === productName);
        if (product) {
            matchedProductId = product.id;
            break;
        }
    }

    if (!matchedProductId) {
        return notFound();
    }

    // 2. Fetch the final product data for the CURRENT target locale
    const tCurrent = await getTranslations({ locale, namespace: "Desserts" });
    const currentProducts = getDessertData(tCurrent);
    const product = currentProducts.find(p => p.id === matchedProductId);

    if (!product) {
        return notFound();
    }

    return <ProductShowcase
        dessert={product}
    />;
}
