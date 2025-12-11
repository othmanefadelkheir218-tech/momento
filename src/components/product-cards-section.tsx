"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { ShoppingBag } from "lucide-react"
import gsap from "gsap"
import BigWavyCircle from "./BigWavyCircle"
import CostumButton from "./CostumButton"
import { useTransitionRouter } from "@/hooks/useTransitionRouter"

interface Product {
    id: number
    name: string
    weight: string
    price: string
    image: string
    isNew?: boolean
}

interface ProductCardsSectionProps {
    products: Product[]
}

export default function ProductCardsSection({ products }: ProductCardsSectionProps) {
    const [hoveredProductId, setHoveredProductId] = useState<number | null>(null)
    const router = useTransitionRouter();

    // Fixed: Added | null and initialized with null
    const cursor = useRef<HTMLDivElement | null>(null)
    const cursorLabel = useRef<HTMLDivElement | null>(null)
    const xToCursor = useRef<gsap.QuickToFunc | null>(null)
    const yToCursor = useRef<gsap.QuickToFunc | null>(null)
    const xToLabel = useRef<gsap.QuickToFunc | null>(null)
    const yToLabel = useRef<gsap.QuickToFunc | null>(null)

    useEffect(() => {
        if (cursor.current && cursorLabel.current) {
            // Initial position
            gsap.set(cursor.current, { xPercent: -50, yPercent: -50, scale: 0 })
            gsap.set(cursorLabel.current, { xPercent: -50, yPercent: -50, scale: 0 })

            // Different durations create the "magnetic" / delayed separation effect
            xToCursor.current = gsap.quickTo(cursor.current, "x", { duration: 0.5, ease: "power3" })
            yToCursor.current = gsap.quickTo(cursor.current, "y", { duration: 0.5, ease: "power3" })

            xToLabel.current = gsap.quickTo(cursorLabel.current, "x", { duration: 0.45, ease: "power3" })
            yToLabel.current = gsap.quickTo(cursorLabel.current, "y", { duration: 0.45, ease: "power3" })
        }
    }, [])

    useEffect(() => {
        if (hoveredProductId !== null) {
            gsap.to(cursor.current, { scale: 1, duration: 0.4, ease: "back.out(1.7)" })
            gsap.to(cursorLabel.current, { scale: 1, duration: 0.4, ease: "back.out(1.7)" })
        } else {
            gsap.to(cursor.current, { scale: 0, duration: 0.3, ease: "power3.in" })
            gsap.to(cursorLabel.current, { scale: 0, duration: 0.3, ease: "power3.in" })
        }
    }, [hoveredProductId])

    const handleMouseMove = (e: React.MouseEvent) => {
        if (xToCursor.current && yToCursor.current && xToLabel.current && yToLabel.current) {
            xToCursor.current(e.clientX)
            yToCursor.current(e.clientY)
            xToLabel.current(e.clientX)
            yToLabel.current(e.clientY)
        }
    }

    return (
        <section
            className="relative w-full bg-[#FBE8EA] py-12 md:py-16 lg:py-20 px-4 md:px-8 lg:px-12 overflow-hidden"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setHoveredProductId(null)}
        >
            {/* 
                Cursor Follower
                - 'fixed' allows it to move relative to the window
                - 'pointer-events-none' ensures clicks pass through to the card
                - Removed '-translate-x-1/2' classes because GSAP handles centering now
            */}
            <div
                ref={cursor}
                className="fixed top-0 left-0 pointer-events-none z-50 hidden lg:block w-20 h-20 rounded-full bg-white shadow-lg"
            />
            <div
                ref={cursorLabel}
                className="fixed top-0 left-0 pointer-events-none z-50 hidden lg:flex items-center justify-center w-20 h-20 text-4xl"
            >
                <span>😋</span>
            </div>

            <div className="text-center mb-8 md:mb-12">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary trispace-font uppercase">
                    Our Products
                </h2>
            </div>

            <div className="grid grid-cols-2  lg:grid-cols-4 gap-4 md:gap-6 w-full mx-auto ">
                {products.slice(0, 8).map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        isHovered={hoveredProductId === product.id}
                        onMouseEnter={() => setHoveredProductId(product.id)}
                        onMouseLeave={() => setHoveredProductId(null)}
                    />
                ))}
            </div>

            <div className="w-full flex justify-center lg:py-17 py-6">
                <BigWavyCircle
                    rotate={true}
                    rotateSpeed={5}
                    rotateDirection="counter-clockwise"
                    isButton={true}
                    hoverTextColor="white"
                    onClick={() => {
                        console.log("Catalogue clicked");
                        router.push("/menu")
                    }}
                    // Made smaller on mobile (w-24), kept original size on desktop (lg:w-40)
                    className="w-24 h-24 lg:w-45 lg:h-45 text-primary shrink-0"
                    fill="transparent"
                    stroke="#DB212F"
                    strokeWidth={2}
                >
                    <span className="text-xs xlmax:text-lg lg:text-sm font-bold trispace-font uppercase">
                        Menu
                    </span>
                </BigWavyCircle>
            </div>
        </section>
    )
}

interface ProductCardProps {
    product: Product
    isHovered: boolean
    onMouseEnter: () => void
    onMouseLeave: () => void
}

function ProductCard({ product, isHovered, onMouseEnter, onMouseLeave }: ProductCardProps) {
    return (
        <div
            className="relative bg-[#FDF5F0] rounded-sm overflow-hidden cursor-pointer group transition-all duration-300 rounded-tl-4xl"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {product.isNew && (
                <div className="absolute top-3 right-3 md:top-4 md:right-4 z-10">
                    <BigWavyCircle
                        rotate={true}
                        rotateSpeed={3}
                        rotateDirection="clockwise"
                        className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16"
                        fill="transparent"
                        stroke="#C41E3A"
                        strokeWidth={1.5}
                    >
                        <span className="text-[10px] md:text-xs font-bold text-primary trispace-font uppercase">NEW</span>
                    </BigWavyCircle>
                </div>
            )}

            <div className="relative aspect-square p-4 md:p-6 lg:p-8 flex items-center justify-center">
                <div
                    className={`relative w-full h-full transition-transform duration-500 ${isHovered ? "scale-110" : "scale-100"
                        }`}
                >
                    <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-contain" />
                </div>
            </div>

            <div className="p-3 md:p-4 flex items-end justify-between border-t border-[#F0E0D0]">
                <div className="flex-1 pr-2">
                    <h3 className="text-xs md:text-sm lg:text-base font-bold text-gray-900 trispace-font uppercase leading-tight mb-1">
                        {product.name}
                    </h3>
                    <p className="text-[10px] md:text-xs text-gray-500 mb-1">Serving weight: {product.weight}</p>
                    <p className="text-sm md:text-base lg:text-lg font-bold text-primary trispace-font">{product.price}</p>
                </div>

                <div className={`shrink-0 transition-all duration-300 ${isHovered ? "scale-110" : "scale-100"}`}>
                    <CostumButton
                        backgroundColor="#DB212F"
                        className="w-10 h-10 md:w-12 md:h-12 lg:w-20 lg:h-20 bg-primaryLighter border-primaryLighter text-white hover:border-white">
                        <ShoppingBag
                            className={`w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 ${isHovered ? "scale-110" : "scale-100"
                                }`}
                        />
                    </CostumButton>
                </div>
            </div>

        </div>
    )
}