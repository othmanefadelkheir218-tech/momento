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

interface Product {
    id: number;
    name: string;
    weight: string;
    price: string;
    image: string;
    isNew: boolean;
}

export default function HomePage() {
    const t = useTranslations("HomePage");


    const products: Product[] = [
        {
            id: 1,
            name: "Raspberry Cheesecake",
            weight: "80г",
            price: "140 UAH.",
            image: "/images/prod1.png",
            isNew: true,
        },
        {
            id: 2,
            name: "Speculoos Tiramisu",
            weight: "75г",
            price: "140 UAH.",
            image: "/images/prod2.png",
            isNew: true,
        },
        {
            id: 3,
            name: "Salted Caramel",
            weight: "80г",
            price: "140 UAH.",
            image: "/images/prod3.png",
            isNew: true,
        },
        {
            id: 4,
            name: "Red Velvet Tiramisu",
            weight: "75г",
            price: "140 UAH.",
            image: "/images/prod4.png",
            isNew: true,
        },
        {
            id: 5,
            name: "Lemon Cheesecake",
            weight: "80г",
            price: "140 UAH.",
            image: "/images/prod5.png",
            isNew: false,
        },
        {
            id: 6,
            name: "Classic Tiramisu",
            weight: "75г",
            price: "140 UAH.",
            image: "/images/prod6.png",
            isNew: false,
        },
        {
            id: 7,
            name: "Snickers Tiramisu",
            weight: "80г",
            price: "140 UAH.",
            image: "/images/prod7.png",
            isNew: false,
        },
        {
            id: 8,
            name: "Pistachio Cream",
            weight: "75г",
            price: "140 UAH.",
            image: "/images/prod8.png",
            isNew: false,
        },
        // continue to 18 plese 
        {
            id: 9,
            name: "Snickers Tiramisu",
            weight: "80г",
            price: "140 UAH.",
            image: "/images/prod9.png",
            isNew: true,
        },
        {
            id: 10,
            name: "Madagascar Vanilla",
            weight: "80г",
            price: "140 UAH.",
            image: "/images/prod10.png",
            isNew: true,
        },
        {
            id: 11,
            name: "Kinder Bueno",
            weight: "80г",
            price: "140 UAH.",
            image: "/images/prod11.png",
            isNew: true,
        },
        {
            id: 12,
            name: "Mango cheescake",
            weight: "80г",
            price: "140 UAH.",
            image: "/images/prod12.png",
            isNew: true,
        },
        {
            id: 13,
            name: "Chocolate Mousse",
            weight: "80г",
            price: "140 UAH.",
            image: "/images/prod13.png",
            isNew: true,
        },
        {
            id: 14,
            name: "Oreo Crumble",
            weight: "80г",
            price: "140 UAH.",
            image: "/images/prod14.png",
            isNew: true,
        },
        {
            id: 15,
            name: "Cheescake Citron",
            weight: "80г",
            price: "140 UAH.",
            image: "/images/prod15.png",
            isNew: true,
        },
        {
            id: 16,
            name: "Chocolate Blance Spéculoos.",
            weight: "80г",
            price: "140 UAH.",
            image: "/images/prod16.png",
            isNew: true,
        },
        {
            id: 17,
            name: "Supreme Chocolate & Brownie",
            weight: "80г",
            price: "140 UAH.",
            image: "/images/prod17.png",
            isNew: true,
        },
        {
            id: 18,
            name: "Tiramisu",
            weight: "80г",
            price: "140 UAH.",
            image: "/images/prod18.png",
            isNew: true,
        },
    ]




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
                products={products}
            />
            {/* <div className="h-[120vh] w-full bg-primary"></div> */}
            <FooterSection />
            <FooterSection2 />
        </>
    );
}
