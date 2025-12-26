import { getProductBySlug } from "@/lib/utils";
import ProductDetail from "../Parts/ProductDetail";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string, productName: string }> }) {
    const { locale, productName } = await params;

    // productName is already the slug from URL

    const product = getProductBySlug(productName);

    if (!product) {
        return {
            title: "Product Not Found",
        };
    }

    const t = await getTranslations({ locale, namespace: "MenuPage" });

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

export default async function ProductPage({ params }: { params: Promise<{ productName: string }> }) {
    const { productName } = await params;
    const product = getProductBySlug(productName);

    if (!product) {
        return notFound();
    }

    return <ProductDetail product={product} />;
}
