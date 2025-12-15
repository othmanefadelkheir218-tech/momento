"use client"
import { Reveal } from "@/components/animation/Reveal";
import ProductCardsSection from "@/components/home/product-cards-section";
import { ProductData, ProductInterface } from "@/Data/Const";




export default function Catalogue() {
    const products: ProductInterface[] = ProductData()

    return (
        <div className="w-full bg-[#F7D6D9] mx-auto px-4 py-26  ">
            <Reveal
                rotate={false}
                delay={0}
            >
                <h1 className="lg:text-8xl lg:my:10 font-bold mb-6 uppercase text-center trispace-font text-primary ">
                    Catalogue
                </h1>
            </Reveal>
            <ProductCardsSection
                products={products}
                ShowTitle={false}
                showAll={true}
                bgcolor="bg-[#F7D6D9]"
            />
        </div>
    );
}
