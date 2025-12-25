"use client"
import Image from "next/image"
import { DessertInterface } from "@/Data/Const"
import { Reveal } from "@/components/animation/Reveal"
import CostumButton from "@/components/CostumButton"
import { ChevronLeft } from "lucide-react"
import { useTransitionRouter } from "@/hooks/useTransitionRouter"

interface ProductDetailProps {
    product: DessertInterface
}

export default function ProductDetail({ product }: ProductDetailProps) {
    const router = useTransitionRouter()

    return (
        <div className="min-h-screen bg-[#FDF5F0] pt-24 pb-12 px-4 md:px-8 lg:px-16">
            <div className="max-w-7xl mx-auto">
                {/* Back Button */}
                <div className="mb-8">
                    <CostumButton
                        onClick={() => router.push("/menu")}
                        className="w-12 h-12 bg-white text-primary border-primary hover:bg-primary hover:text-white transition-colors"
                    >
                        <ChevronLeft />
                    </CostumButton>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Image Section */}
                    <Reveal>
                        <div className="relative aspect-square w-full max-w-[600px] mx-auto bg-white rounded-full p-8 shadow-xl">
                            <div className="relative w-full h-full">
                                <Image
                                    src={product.main_image}
                                    alt={product.name}
                                    fill
                                    className="object-contain hover:scale-105 transition-transform duration-500"
                                    priority
                                />
                            </div>
                            {product.isNew && (
                                <div className="absolute top-0 right-0 bg-primary text-white text-sm font-bold px-4 py-2 rounded-full trispace-font transform translate-x-1/4 -translate-y-1/4">
                                    NEW
                                </div>
                            )}
                        </div>
                    </Reveal>

                    {/* Details Section */}
                    <div className="space-y-8">
                        <Reveal delay={0.1}>
                            <div>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary trispace-font uppercase mb-4 leading-tight">
                                    {product.name}
                                </h1>
                                <div className="flex items-center gap-4 text-gray-500 trispace-font">
                                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-bold">
                                        {product.category}
                                    </span>
                                    {product.weight && (
                                        <span className="text-sm font-medium">
                                            {product.weight}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </Reveal>

                        <Reveal delay={0.2}>
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#F0E0D0]">
                                <h3 className="text-xl font-bold text-gray-900 mb-3 trispace-font">Description</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {product.description}
                                </p>
                            </div>
                        </Reveal>

                        {/* Nutritional Values Grid */}
                        <Reveal delay={0.3}>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <NutritionalCard label="Energy" value={product.nutritional_values.energy} />
                                <NutritionalCard label="Protein" value={product.nutritional_values.protein} />
                                <NutritionalCard label="Fat" value={product.nutritional_values.fat} />
                                <NutritionalCard label="Carbs" value={product.nutritional_values.carbohydrates} />
                            </div>
                        </Reveal>

                        {/* Allergens & Storage */}
                        <Reveal delay={0.4}>
                            <div className="space-y-6 text-sm text-gray-600">
                                {product.allergens && (
                                    <div>
                                        <span className="font-bold text-primary">Allergens: </span>
                                        {product.allergens}
                                    </div>
                                )}
                                {product.storage_conditions.length > 0 && (
                                    <div>
                                        <span className="font-bold text-primary">Storage: </span>
                                        <ul className="list-disc list-inside mt-2 space-y-1 pl-2">
                                            {product.storage_conditions.map((condition, idx) => (
                                                <li key={idx}>{condition}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </Reveal>
                    </div>
                </div>
            </div>
        </div>
    )
}

function NutritionalCard({ label, value }: { label: string; value: string }) {
    if (!value) return null
    return (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-[#F0E0D0] text-center">
            <div className="text-xs text-gray-500 uppercase mb-1 font-medium">{label}</div>
            <div className="text-sm md:text-base font-bold text-primary">{value}</div>
        </div>
    )
}
