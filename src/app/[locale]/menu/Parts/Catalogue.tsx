"use client"
import { Reveal } from "@/components/animation/Reveal";
import ProductCardsSection from "@/components/home/product-cards-section";
import { DessertData, DessertInterface } from "@/Data/Const";




export default function Catalogue() {
    const products: DessertInterface[] = DessertData()

    return (
        <div className="w-full bg-[#F7D6D9] mx-auto px-4 py-26  ">
            <ProductCardsSection
                products={products.filter((product) => product.category === "Dubai Chocolat")}
                ShowTitle={true}
                showAll={true}
                bgcolor="bg-[#F7D6D9]"
                title="Dubai Chocolat"
            />

             <ProductCardsSection
                products={products.filter((product) => product.category === "Gamme Glace")}
                ShowTitle={true}
                showAll={true}
                bgcolor="bg-[#F7D6D9]"
                title="Gamme Glace"
            />

            <ProductCardsSection
                products={products.filter((product) => product.category === "La gamme verrine")}
                ShowTitle={true}
                showAll={true}
                bgcolor="bg-[#F7D6D9]"
                title="La gamme verrine"
            />
        </div>
    );
}
