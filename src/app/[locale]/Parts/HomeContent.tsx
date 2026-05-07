"use client";

import dynamic from "next/dynamic";
import ZoomScrollAnimation from "@/components/ZoomScrollAnimation";
import HeroIntro from "@/components/home/HeroIntro";
import HeroMarquee from "@/components/home/HeroMarquee";
import { useTranslations } from "next-intl";
import ProductShowcase from "@/components/home/ProductShowcase";
import OneTimeIntroduction from "@/components/OneTimeIntroduction";
import { DessertInterface } from "@/Data/Const";
import { useDessertData } from "@/hooks/useDessertData";
import ProductCardsSection from "@/components/home/product-cards-section";

// Lazy-load below-the-fold & heavy components so they don't block the initial bundle
const SlidingImages = dynamic(() => import("@/components/home/SlidingImages"), { ssr: false });
const WeLoveYou = dynamic(() => import("@/components/home/WeLoveYou"), { ssr: false });
const RotatingModelSection = dynamic(() => import("@/components/home/RotatingModel"), { ssr: false });

export default function HomeContent() {
    const t = useTranslations("HomePage.ProductCards");
    const products = useDessertData();

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
                products={products.filter((product: DessertInterface) => product.categoryKey === "gammeGlace").slice(0, 8)}
                ShowTitle={true}
                showAll={true}
                title={t("iceCreamRange")}
            />

            <ProductCardsSection
                products={products.filter((product: DessertInterface) => product.categoryKey === "dubaiChocolat").slice(0, 8)}
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
