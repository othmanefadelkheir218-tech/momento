import { DessertData } from "@/Data/Const";
import ProductDetail from "../Parts/ProductDetail";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string, productId: string }> }) {
    const { locale, productId } = await params;

    const products = DessertData();
    const product = products.find((p) => p.id === Number(productId));

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

export default async function ProductPage({ params }: { params: Promise<{ productId: string }> }) {
    const { productId } = await params;
    const products = DessertData();
    const product = products.find((p) => p.id === Number(productId));

    if (!product) {
        return notFound();
    }

    return <ProductDetail product={product} />;
}
