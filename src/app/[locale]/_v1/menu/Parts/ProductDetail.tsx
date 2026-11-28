"use client"

import { useTranslations } from "next-intl"
import { DessertInterface } from "@/Data/Const"
import { useDessertData } from "@/hooks/useDessertData"
import ProductCardsSection from "@/components/home/product-cards-section"
import { ProductHero } from "./product-hero"
import { ProductGallery } from "./product-gallery"
import { ProductDetails } from "./product-details"
import { FooterSection } from "./footer-section-product"

const RELATED_COUNT = 4

interface ProductShowcaseProps {
    dessert: DessertInterface
}

export function ProductShowcase({ dessert }: ProductShowcaseProps) {
    const t = useTranslations("ProductPage")
    const allProducts = useDessertData()

    // Each image is shown once: the first large photo is in the hero,
    // the rest go to the gallery.
    const photos = dessert.other_images.filter(Boolean)
    const galleryImages = photos.slice(1)

    // Same range first; small ranges are topped up with other products
    const others = allProducts.filter((p) => p.id !== dessert.id)
    const sameRange = others.filter((p) => p.categoryKey === dessert.categoryKey)
    const related = [...sameRange, ...others.filter((p) => p.categoryKey !== dessert.categoryKey)].slice(0, RELATED_COUNT)
    const relatedTitle = sameRange.length >= RELATED_COUNT ? t("moreFromRange") : t("youMayLike")

    return (
        <main className="w-full bg-white">
            {/* 1. Name, range, weight, description, allergens + main photo */}
            <ProductHero dessert={dessert} />

            {/* 2. Remaining photos */}
            <ProductGallery images={galleryImages} alt={dessert.name} />

            {/* 3. Nutrition + storage */}
            <ProductDetails
                nutritionalValues={dessert.nutritional_values}
                storageConditions={dessert.storage_conditions}
            />

            {/* 4. More desserts (the round button leads back to the menu) */}
            {related.length > 0 && (
                <ProductCardsSection products={related} ShowTitle={true} showAll={false} title={relatedTitle} />
            )}

            {/* 5. Closing band */}
            <FooterSection />
        </main>
    )
}
