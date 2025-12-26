"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { NutritionalValues } from "@/Data/Const"
import {
    Clock,
    Package,
    Leaf,
    Fish,
    BadgeCheck,
    Zap,
    Snowflake,
    Info,
    Archive
} from "lucide-react";




// 1. Helper function to pick the right icon based on the text content
const getIconForCondition = (text: string) => {
    const lowerText = text.toLowerCase();

    if (lowerText.includes("dégivrage") || lowerText.includes("temps")) return Clock;
    if (lowerText.includes("boite") || lowerText.includes("pots")) return Package;
    if (lowerText.includes("sans colorants") || lowerText.includes("naturel")) return Leaf;
    if (lowerText.includes("poisson")) return Fish;
    if (lowerText.includes("halal")) return BadgeCheck;
    if (lowerText.includes("rapide")) return Zap;
    if (lowerText.includes("stockage") || lowerText.includes("réfrigérateur")) return Snowflake;

    return Info; // Default icon if no keyword matches
};



gsap.registerPlugin(ScrollTrigger)

interface NutritionGridSectionProps {
    nutritionalValues: NutritionalValues
    storageConditions: string[]
}

export function NutritionGridSection({ nutritionalValues, storageConditions }: NutritionGridSectionProps) {
    const titleRef = useRef<HTMLHeadingElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (titleRef.current) {
                const text = "Valeur nutritionnelle"
                const chars = text.split("")
                titleRef.current.innerHTML = chars
                    .map((char) => `<span class="nutrition-char inline-block">${char === " " ? "&nbsp;" : char}</span>`)
                    .join("")

                gsap.from(".nutrition-char", {
                    scrollTrigger: {
                        trigger: titleRef.current,
                        start: "top 85%",
                    },
                    opacity: 0,
                    y: 20,
                    duration: 0.5,
                    stagger: 0.02,
                    ease: "power2.out",
                })
            }


            gsap.from(".storage-item", {
                scrollTrigger: {
                    trigger: ".storage-grid",
                    start: "top 80%",
                },
                opacity: 0,
                scale: 0.9,
                y: 30,
                duration: 0.7,
                stagger: 0.1,
                ease: "back.out(1.7)",
            })
        })

        return () => ctx.revert()
    }, [])

    return (
        <section className="w-full bg-[#FBE8EA] py-12 md:py-16 lg:py-20 px-6 md:px-12 lg:px-20 xl:px-32">
            <div className="max-w-7xl mx-auto">
                {/* Nutritional Values */}
                <div className="mb-16 md:mb-24">
                    <h2
                        ref={titleRef}
                        className="text-3xl md:text-5xl lg:text-6xl font-bold text-primary mb-12 md:mb-16 text-center"
                        style={{ fontFamily: "var(--font-sans)" }}
                    >
                        Valeur nutritionnelle
                    </h2>

                    <div className="bg-white rounded-2xl md:rounded-3xl border-2 md:border-4 border-primary overflow-hidden max-w-4xl mx-auto shadow-xl hover:shadow-2xl transition-shadow duration-300">
                        <div className="divide-y-2 divide-primary">
                            <NutritionRow label="Energie (kj)" value={nutritionalValues.energy} />
                            <NutritionRow label="Energie (kcal)" value={nutritionalValues.energy} />
                            <NutritionRow label="Matières grasses(gramme)" value={nutritionalValues.fat} />
                            <NutritionRow label="Dont acides gras saturé(gramme)" value={nutritionalValues.saturated_fat} />
                            <NutritionRow label="Glucides (gramme)" value={nutritionalValues.carbohydrates} />
                            <NutritionRow label="Dont sucres(gramme)" value={nutritionalValues.sugars} />
                            <NutritionRow label="Fibres(grammes)" value={nutritionalValues.fiber} />
                            <NutritionRow label="Protéines(gramme)" value={nutritionalValues.protein} />
                            <NutritionRow label="Sel (gramme)" value={nutritionalValues.salt} />
                        </div>
                    </div>
                </div>
                {storageConditions.length > 0 && (
                    <div className="mt-8">
                        <h3 className="text-xl text-primary font-semibold mb-6 text-center md:text-left">
                            Conditions & Conservation
                        </h3>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {storageConditions.map((condition, idx) => {
                                const Icon = getIconForCondition(condition);

                                return (
                                    <div
                                        key={idx}
                                        className="group flex flex-col items-center justify-center p-4 bg-white/50 border border-gray-200 rounded-2xl text-center hover:shadow-lg hover:border-primary/50 transition-all duration-300"
                                    >
                                        {/* Icon Container */}
                                        <div className="mb-3 p-3 bg-primary/10 rounded-full text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                            <Icon size={24} strokeWidth={1.5} />
                                        </div>

                                        {/* Text */}
                                        <p className="text-sm text-gray-600 font-medium leading-tight">
                                            {condition}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

            </div>
        </section>
    )
}

function NutritionRow({ label, value }: { label: string; value: string }) {
    if (!value) return null

    return (
        <div className="nutrition-card flex justify-between items-center px-6 md:px-8 py-4 md:py-5 hover:bg-[#FBE8EA] transition-colors duration-200">
            <span className="text-gray-700 font-medium text-sm md:text-base">{label}</span>
            <span className="text-primary font-bold text-base md:text-lg">{value}</span>
        </div>
    )
}
