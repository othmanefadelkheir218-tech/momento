"use client";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ZoomScrollAnimation from "@/components/ZoomScrollAnimation";
import HeroIntro from "@/components/home/HeroIntro";
import HeroMarquee from "@/components/home/HeroMarquee";
import ProductShowcase from "@/components/home/ProductShowcase";
import CostumButton from "@/components/CostumButton";
import OneTimeIntroduction from "@/components/OneTimeIntroduction";
import FooterSection from "@/components/FooterSection";
import FooterSection2 from "@/components/FooterSection2";
import ProductCardsSection from "@/components/product-cards-section";

export default function HomePage() {
    const t = useTranslations("HomePage");



    return (
        <>
            <OneTimeIntroduction />
            <ZoomScrollAnimation
                ImageSource="/images/HeroImage.png"
                ContentOne={<HeroIntro />}
                ContentTwo={<HeroMarquee />}
                ContentThree={<ProductShowcase />}
            />
            <ProductCardsSection />
            {/* <div className="h-[120vh] w-full bg-primary"></div> */}
            <FooterSection />
            <FooterSection2 />
        </>
    );
}
