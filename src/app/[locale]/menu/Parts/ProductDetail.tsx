"use client"

import { DessertInterface } from "@/Data/Const"
import { HeroSection } from "./hero-section"
import { ProductInfoSection } from "./product-info-section"
import { FullImageSection } from "./Full-image-section"
import { AllergensSection } from "./allergens-section"
import { NutritionGridSection } from "./nutrition-section"
import { SplitImageSection } from "./split-image-section"
import { CircularImageSection } from "./CircularImageSection"
import { FooterSection } from "./footer-section-product"


interface ProductShowcaseProps {
    dessert: DessertInterface
}

export function ProductShowcase({ dessert }: ProductShowcaseProps) {
    return (
        <main className="w-full bg-white">
            {/* 1. Hero - uses other_images[1] */}
            <HeroSection dessert={dessert} />

            {/* 2. Product Info - uses main_image */}
            <ProductInfoSection dessert={dessert} />

            {/* 3. Full-Width Image - uses other_images[0] */}
            {/* {dessert.other_images[0] && <FullImageSection imageUrl={dessert.other_images[0]} />} */}

            {/* 4. Allergens Section - NEW */}
            {
                dessert.allergens && <AllergensSection allergens={dessert.allergens} />
            }

            {/* 5. Nutritional + Storage Grid */}
            {
                dessert.nutritional_values && (
                    // We check: if NO allergens (!dessert.allergens), add top margin
                    <div className={!dessert.allergens ? "mt-20 md:mt-32" : ""}>
                        <NutritionGridSection
                            nutritionalValues={dessert.nutritional_values}
                            storageConditions={dessert.storage_conditions}
                        />
                    </div>
                )
            }

            {/* 6. Split Image Section - uses other_images[2] */}
            {dessert.other_images[2] && dessert.other_images[3] !== "" && <SplitImageSection
                imageUrl={dessert.other_images[2]}
                imageUrl2={dessert.other_images[3]}
            />}

            {/* 7. Circular Image Section - uses other_images[3] */}
            {dessert.main_image && <CircularImageSection imageUrl={dessert.main_image} />}

            {/* 8. Footer */}
            <FooterSection />
        </main>
    )
}
