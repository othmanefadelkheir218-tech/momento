"use client"
import ProductCardsSection from "@/components/home/product-cards-section";
import { useTranslations } from "next-intl";
import { DessertInterface } from "@/Data/Const";
import { useDessertData } from "@/hooks/useDessertData";

export default function Catalogue() {
    const products = useDessertData();
    const t = useTranslations("Desserts.Categories");

    return (
        <div className="w-full bg-[#F7D6D9] mx-auto px-4 py-26  ">
            <ProductCardsSection
                products={products.filter((product: DessertInterface) => product.categoryKey === "dubaiChocolat")}
                ShowTitle={true}
                showAll={true}
                bgcolor="bg-[#F7D6D9]"
                title={t("dubaiChocolat")}
            />

             <ProductCardsSection
                products={products.filter((product: DessertInterface) => product.categoryKey === "gammeGlace")}
                ShowTitle={true}
                showAll={true}
                bgcolor="bg-[#F7D6D9]"
                title={t("gammeGlace")}
            />

            <ProductCardsSection
                products={products.filter((product: DessertInterface) => product.categoryKey === "verrineRange")}
                ShowTitle={true}
                showAll={true}
                bgcolor="bg-[#F7D6D9]"
                title={t("verrineRange")}
            />
        </div>
    );
}
