"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useTranslations } from "next-intl"
import { Ban, BadgeCheck, Clock, Info, Leaf, Package, Snowflake, Zap, type LucideIcon } from "lucide-react"
import { NutritionalValues } from "@/Data/Const"
import { formatNutritionValue } from "./product-utils"

gsap.registerPlugin(ScrollTrigger)

interface ProductDetailsProps {
    nutritionalValues?: NutritionalValues
    storageConditions: string[]
}

// Order of the nutrition table; "sub" rows are the "of which ..." lines
const NUTRIENTS: { key: keyof NutritionalValues; sub?: boolean }[] = [
    { key: "energy" },
    { key: "fat" },
    { key: "saturated_fat", sub: true },
    { key: "carbohydrates" },
    { key: "sugars", sub: true },
    { key: "fiber" },
    { key: "protein" },
    { key: "salt" },
]

// Icons per storage condition, keyed by its translation key so it works in
// every language (the old version matched French words only)
const CONDITION_ICONS: Record<string, LucideIcon> = {
    defrosting: Clock,
    potsPerBox: Package,
    noColorants: Leaf,
    fishGelatin: Ban,
    halal: BadgeCheck,
    quickService: Zap,
    longStorage: Snowflake,
}

export function ProductDetails({ nutritionalValues, storageConditions }: ProductDetailsProps) {
    const t = useTranslations("ProductPage")
    const common = useTranslations("Desserts.Common")
    const sectionRef = useRef<HTMLElement>(null)

    const iconFor = (condition: string): LucideIcon => {
        const key = Object.keys(CONDITION_ICONS).find((k) => common(k) === condition)
        return key ? CONDITION_ICONS[key] : Info
    }

    const rows = nutritionalValues ? NUTRIENTS.filter(({ key }) => nutritionalValues[key]) : []

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".details-card", {
                y: 50,
                autoAlpha: 0,
                duration: 0.9,
                stagger: 0.15,
                ease: "power3.out",
                scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
            })
            gsap.from(".details-row", {
                x: -20,
                autoAlpha: 0,
                duration: 0.5,
                stagger: 0.05,
                ease: "power2.out",
                scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    if (rows.length === 0 && storageConditions.length === 0) return null

    return (
        <section ref={sectionRef} className="w-full bg-white px-6 pb-16 md:px-12 md:pb-24 lg:px-20 xl:px-32">
            <div className="mx-auto grid max-w-7xl gap-6 md:gap-8 lg:grid-cols-2">
                {/* Nutrition */}
                {rows.length > 0 && (
                    <div className="details-card rounded-3xl bg-[#FBE8EA] p-6 md:p-10">
                        <h2 className="mb-6 text-2xl font-bold text-primary md:text-3xl">{t("nutritionTitle")}</h2>
                        <dl>
                            {rows.map(({ key, sub }) => (
                                <div
                                    key={key}
                                    className="details-row flex items-baseline justify-between gap-4 border-b border-primary/10 py-3 last:border-0"
                                >
                                    <dt className={sub ? "pl-4 text-sm text-gray-500" : "font-medium text-gray-700"}>
                                        {t(`nutrients.${key}`)}
                                    </dt>
                                    <dd className={`text-right font-semibold tabular-nums ${sub ? "text-sm text-primary/70" : "text-primary"}`}>
                                        {formatNutritionValue(nutritionalValues![key])}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                )}

                {/* Storage & service */}
                {storageConditions.length > 0 && (
                    <div className="details-card rounded-3xl border border-primary/10 p-6 md:p-10">
                        <h2 className="mb-6 text-2xl font-bold text-primary md:text-3xl">{common("storageTitle")}</h2>
                        <ul className="grid gap-3 sm:grid-cols-2">
                            {storageConditions.map((condition) => {
                                const Icon = iconFor(condition)
                                return (
                                    <li
                                        key={condition}
                                        className="details-row flex items-start gap-3 rounded-2xl bg-[#FBE8EA]/50 p-4"
                                    >
                                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-primary">
                                            <Icon size={20} strokeWidth={1.75} />
                                        </span>
                                        <span className="pt-2 text-sm leading-snug text-gray-700">{condition}</span>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                )}
            </div>
        </section>
    )
}
