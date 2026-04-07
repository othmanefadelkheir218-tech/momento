"use client";
import ZoomScrollAnimation from "@/components/ZoomScrollAnimation";
import HeroIntro from "@/components/home/HeroIntro";
import HeroMarquee from "@/components/home/HeroMarquee";
import { useTranslations } from "next-intl";
import ProductShowcase from "@/components/home/ProductShowcase";
import OneTimeIntroduction from "@/components/OneTimeIntroduction";
import SlidingImages from "@/components/home/SlidingImages";
import RotatingModelSection from "@/components/home/RotatingModel";
import WeLoveYou from "@/components/home/WeLoveYou";
import { DessertData, DessertInterface } from "@/Data/Const";
import ProductCardsSection from "@/components/home/product-cards-section";




export default function HomePage() {
    const t = useTranslations("HomePage.ProductCards");
    const products: DessertInterface[] = DessertData()

    return (
        <>
            <OneTimeIntroduction />
            <ZoomScrollAnimation
                ImageSource="/images/HeroImage.png"
                ContentOne={<HeroIntro />}
                ContentTwo={<HeroMarquee />}
                ContentThree={<ProductShowcase />}
            />

            <ProductCardsSection
                products={products.slice(0, 8).filter((product) => product.category === "Gamme Glace")}
                ShowTitle={true}
                showAll={true}
                title={t("iceCreamRange")}
                
            />
            
            <ProductCardsSection
                products={products.slice(0, 8).filter((product) => product.category === "Dubai Chocolat")}
                ShowTitle={true}
                showAll={false}
                title={t("dubaiChocolate")}
            />
            <SlidingImages />
            <WeLoveYou />
            <RotatingModelSection />
        </>
    );
}
