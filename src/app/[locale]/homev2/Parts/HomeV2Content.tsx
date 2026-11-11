"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/animation/Reveal";
import ProductCardsSection from "@/components/home/product-cards-section";
import { DessertInterface } from "@/Data/Const";
import { useDessertData } from "@/hooks/useDessertData";
import { useTransitionRouter } from "@/hooks/useTransitionRouter";

export default function HomeV2Content() {
    const t = useTranslations("HomePage");
    const nav = useTranslations("Navigation");
    const menu = useTranslations("Desserts.Categories");
    const products = useDessertData();
    const router = useTransitionRouter();

    return (
        <>
            {/* Hero */}
            <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden px-6 md:px-12">
                <Image
                    src="/images/HeroImage.png"
                    alt=""
                    fill
                    priority
                    className="object-cover -z-20"
                />
                <div className="absolute inset-0 bg-black/40 -z-10" />

                <div className="max-w-5xl text-center text-white">
                    <Reveal delay={0.2}>
                        <h1 className="font-black uppercase tracking-tight leading-none text-[12vw] md:text-[8vw] lg:text-[6vw]">
                            {t("MainHeading1")}
                        </h1>
                    </Reveal>
                    <Reveal delay={0.3}>
                        <h1 className="font-black uppercase tracking-tight leading-none text-[12vw] md:text-[8vw] lg:text-[6vw] text-primaryLighter">
                            {t("MainHeading2")}
                        </h1>
                    </Reveal>
                    <Reveal delay={0.4}>
                        <p className="mt-8 mx-auto max-w-2xl text-base md:text-xl opacity-90">
                            {t("MainDescription")}
                        </p>
                    </Reveal>
                    <Reveal delay={0.5}>
                        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                            <button
                                onClick={() => router.push("/menu")}
                                className="px-8 py-3 rounded-full bg-primary text-white font-bold uppercase trispace-font hover:bg-primaryLight transition-colors"
                            >
                                {t("catalogueButton")}
                            </button>
                            <button
                                onClick={() => router.push("/contact")}
                                className="px-8 py-3 rounded-full border-2 border-white text-white font-bold uppercase trispace-font hover:bg-white hover:text-black transition-colors"
                            >
                                {nav("contact")}
                            </button>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* Products */}
            <ProductCardsSection
                products={products.filter((p: DessertInterface) => p.categoryKey === "verrineRange").slice(0, 4)}
                ShowTitle={true}
                showAll={true}
                title={menu("verrineRange")}
            />

            {/* About / CTA */}
            <section className="bg-[#F7D6D9] px-6 md:px-12 py-24">
                <div className="max-w-4xl mx-auto text-center">
                    <Reveal>
                        <h2 className="font-black uppercase text-3xl md:text-5xl text-primary leading-tight">
                            {t("BannerSection.titleLine1")}
                            <br />
                            {t("BannerSection.titleLine2")}
                        </h2>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <p className="mt-6 text-base md:text-lg text-black/80">
                            {t("BannerSection.description1")}
                        </p>
                    </Reveal>
                    <Reveal delay={0.2}>
                        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                            <button
                                onClick={() => router.push("/about")}
                                className="px-8 py-3 rounded-full bg-primary text-white font-bold uppercase trispace-font hover:bg-primaryLight transition-colors"
                            >
                                {t("BannerSection.about_us_button")}
                            </button>
                            <button
                                onClick={() => router.push("/become-a-client")}
                                className="px-8 py-3 rounded-full border-2 border-primary text-primary font-bold uppercase trispace-font hover:bg-primary hover:text-white transition-colors"
                            >
                                {nav("becomeClient")}
                            </button>
                        </div>
                    </Reveal>
                </div>
            </section>
        </>
    );
}
