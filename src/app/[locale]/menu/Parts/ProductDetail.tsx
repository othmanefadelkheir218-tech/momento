"use client"
import Image from "next/image"
import { DessertInterface } from "@/Data/Const"
import { Reveal } from "@/components/animation/Reveal"
import CostumButton from "@/components/CostumButton"
import { ChevronLeft, Snowflake, Package, Ban, Truck, Clock, ShieldCheck, Thermometer } from "lucide-react"
import { useTransitionRouter } from "@/hooks/useTransitionRouter"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface ProductDetailProps {
    product: DessertInterface
}

export default function ProductDetail({ product }: ProductDetailProps) {
    const router = useTransitionRouter()
    const [selectedImage, setSelectedImage] = useState(product.main_image)

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

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                    {/* LEFT COLUMN - Image Gallery */}
                    <div className="lg:col-span-6 space-y-6">
                        <Reveal>
                            <div className="relative aspect-square w-full bg-white rounded-[3rem] p-8 shadow-xl overflow-hidden border border-[#F0E0D0]">
                                <Image
                                    src={selectedImage}
                                    alt={product.name}
                                    fill
                                    className="object-contain p-4 hover:scale-105 transition-transform duration-700 ease-out"
                                    priority
                                />
                                {product.isNew && (
                                    <div className="absolute top-6 right-6 bg-primary text-white text-sm font-bold px-4 py-2 rounded-full trispace-font shadow-lg">
                                        NEW
                                    </div>
                                )}
                            </div>
                        </Reveal>

                        {/* Thumbnails */}
                        {product.other_images.length > 0 && (
                            <Reveal delay={0.1}>
                                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                                    <button
                                        onClick={() => setSelectedImage(product.main_image)}
                                        className={cn(
                                            "relative flex-shrink-0 w-24 h-24 bg-white rounded-2xl border-2 transition-all p-2",
                                            selectedImage === product.main_image ? "border-primary shadow-md scale-105" : "border-transparent hover:border-primary/50"
                                        )}
                                    >
                                        <Image src={product.main_image} alt="Main view" fill className="object-contain p-1" />
                                    </button>
                                    {product.other_images.map((img, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setSelectedImage(img)}
                                            className={cn(
                                                "relative flex-shrink-0 w-24 h-24 bg-white rounded-2xl border-2 transition-all p-2",
                                                selectedImage === img ? "border-primary shadow-md scale-105" : "border-transparent hover:border-primary/50"
                                            )}
                                        >
                                            <Image src={img} alt={`View ${idx + 1}`} fill className="object-contain p-1" />
                                        </button>
                                    ))}
                                </div>
                            </Reveal>
                        )}
                    </div>

                    {/* RIGHT COLUMN - Product Info */}
                    <div className="lg:col-span-6 space-y-10">

                        {/* Title & Description */}
                        <Reveal delay={0.2}>
                            <div>
                                <h1 className="text-4xl md:text-5xl font-bold text-primary trispace-font uppercase mb-4 leading-[1.1]">
                                    {product.name}
                                </h1>
                                <div className="flex flex-wrap items-center gap-4 mb-6">
                                    <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold trispace-font tracking-wide">
                                        {product.category}
                                    </span>
                                    {product.weight && (
                                        <span className="text-gray-500 font-medium bg-white px-4 py-2 rounded-full border border-[#F0E0D0]">
                                            {product.weight}
                                        </span>
                                    )}
                                </div>
                                <p className="text-lg text-gray-600 leading-relaxed font-light">
                                    {product.description}
                                </p>
                            </div>
                        </Reveal>

                        {/* Allergens */}
                        <Reveal delay={0.3}>
                            <div className="bg-white/50 p-6 rounded-2xl border border-[#F0E0D0]">
                                <h3 className="text-lg font-bold text-primary trispace-font mb-2 uppercase">Allergénes</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {product.allergens || "Aucun allergène signalé."}
                                </p>
                            </div>
                        </Reveal>

                        {/* Nutritional Table */}
                        <Reveal delay={0.4}>
                            <div className="">
                                <h3 className="text-2xl font-bold text-primary trispace-font mb-6">Valeur nutritionnelle</h3>
                                <div className="bg-white rounded-3xl shadow-sm border border-[#F0E0D0] overflow-hidden">
                                    <div className="divide-y divide-[#F0E0D0]">
                                        <NutritionRow label="Energie (kj/kcal)" value={product.nutritional_values.energy} isMain />
                                        <NutritionRow label="Matiéres grasses" value={product.nutritional_values.fat} isMain />
                                        <NutritionRow label="Dont acides gras saturés" value={product.nutritional_values.saturated_fat} isSub />
                                        <NutritionRow label="Glucides" value={product.nutritional_values.carbohydrates} isMain />
                                        <NutritionRow label="Dont sucres" value={product.nutritional_values.sugars} isSub />
                                        <NutritionRow label="Fibres" value={product.nutritional_values.fiber} isMain />
                                        <NutritionRow label="Protéines" value={product.nutritional_values.protein} isMain />
                                        <NutritionRow label="Sel" value={product.nutritional_values.salt} isMain isLast />
                                    </div>
                                </div>
                            </div>
                        </Reveal>

                        {/* Storage & Specs */}
                        <Reveal delay={0.5}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {product.storage_conditions.map((condition, idx) => (
                                    <div key={idx} className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-[#F0E0D0] shadow-sm hover:shadow-md transition-shadow">
                                        <div className="text-primary mt-1">
                                            <IconForCondition condition={condition} />
                                        </div>
                                        <span className="text-sm text-gray-600 font-medium leading-tight">{condition}</span>
                                    </div>
                                ))}
                            </div>
                        </Reveal>
                    </div>
                </div>
            </div>
        </div>
    )
}

function NutritionRow({ label, value, isMain = false, isSub = false, isLast = false }: { label: string, value: string, isMain?: boolean, isSub?: boolean, isLast?: boolean }) {
    if (!value) return null
    return (
        <div className={cn(
            "flex justify-between items-center p-4 hover:bg-[#FDF5F0]/50 transition-colors",
            isSub && "pl-8 text-sm text-gray-500 bg-gray-50/50",
            !isSub && "text-gray-900"
        )}>
            <span className={cn("font-medium", isMain && "font-bold text-primary")}>{label}</span>
            <span className="font-bold text-gray-700">{value}</span>
        </div>
    )
}

function IconForCondition({ condition }: { condition: string }) {
    const text = condition.toLowerCase()
    if (text.includes("dégivrage") || text.includes("réfrigérateur") || text.includes("stockage")) return <Snowflake size={20} />
    if (text.includes("boite") || text.includes("pots")) return <Package size={20} />
    if (text.includes("colorants")) return <Ban size={20} />
    if (text.includes("halal")) return <ShieldCheck size={20} />
    if (text.includes("rapide") || text.includes("service")) return <Clock size={20} />
    if (text.includes("gelatine")) return <Thermometer size={20} /> // Abstract approximation
    return <Truck size={20} /> // Default fallback
}
