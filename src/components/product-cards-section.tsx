"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { ShoppingBag } from "lucide-react"
import BigWavyCircle from "./BigWavyCircle"
import Magnetic from "./Magnetic"
import CostumButton from "./CostumButton"

interface Product {
    id: number
    name: string
    weight: string
    price: string
    image: string
    isNew?: boolean
}

const products: Product[] = [
    {
        id: 1,
        name: "RASPBERRY MOCHI",
        weight: "80г",
        price: "140 UAH.",
        image: "/raspberry-mochi-ice-cream-pink-red-cut-in-half.jpg",
        isNew: true,
    },
    {
        id: 2,
        name: "MANGO - PASSION FRUIT MOCHI",
        weight: "75г",
        price: "140 UAH.",
        image: "/mango-passion-fruit-mochi-ice-cream-yellow-orange-.jpg",
        isNew: true,
    },
    {
        id: 3,
        name: "PISTACHIO-RASPBERRY MOCHI",
        weight: "80г",
        price: "140 UAH.",
        image: "/pistachio-raspberry-mochi-ice-cream-green-pink-cut.jpg",
        isNew: true,
    },
    {
        id: 4,
        name: "CHOCOLATE MOCHI",
        weight: "75г",
        price: "140 UAH.",
        image: "/chocolate-mochi-ice-cream-brown-stacked.jpg",
        isNew: true,
    },
    {
        id: 5,
        name: "MATCHA MOCHI",
        weight: "80г",
        price: "140 UAH.",
        image: "/matcha-green-tea-mochi-ice-cream.jpg",
        isNew: false,
    },
    {
        id: 6,
        name: "STRAWBERRY MOCHI",
        weight: "75г",
        price: "140 UAH.",
        image: "/strawberry-mochi-ice-cream-pink.jpg",
        isNew: false,
    },
    {
        id: 7,
        name: "VANILLA MOCHI",
        weight: "80г",
        price: "140 UAH.",
        image: "/vanilla-mochi-ice-cream-white-cream.jpg",
        isNew: false,
    },
    {
        id: 8,
        name: "CARAMEL MOCHI",
        weight: "75г",
        price: "140 UAH.",
        image: "/caramel-mochi-ice-cream-brown-golden.jpg",
        isNew: false,
    },
]

export default function ProductCardsSection() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const [hoveredProductId, setHoveredProductId] = useState<number | null>(null)
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
    const [isInSection, setIsInSection] = useState(false)

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (sectionRef.current) {
                const rect = sectionRef.current.getBoundingClientRect()
                setCursorPosition({
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top,
                })
            }
        }

        const section = sectionRef.current
        if (section) {
            section.addEventListener("mousemove", handleMouseMove)
        }

        return () => {
            if (section) {
                section.removeEventListener("mousemove", handleMouseMove)
            }
        }
    }, [])

    return (
        <section
            ref={sectionRef}
            className="relative w-full bg-[#FAE8D8] py-12 md:py-16 lg:py-20 px-4 md:px-8 lg:px-12 overflow-hidden"
            onMouseEnter={() => setIsInSection(true)}
            onMouseLeave={() => {
                setIsInSection(false)
                setHoveredProductId(null)
            }}
        >
            {/* Cursor follower - only visible when hovering a product */}
            <div
                className="fixed pointer-events-none z-50 transition-opacity duration-200 hidden lg:flex items-center justify-center"
                style={{
                    left: cursorPosition.x,
                    top: cursorPosition.y,
                    transform: "translate(-50%, -50%)",
                    opacity: isInSection && hoveredProductId !== null ? 1 : 0,
                    position: "absolute",
                }}
            >
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white shadow-lg flex items-center justify-center text-3xl md:text-4xl transition-transform duration-150 ease-out">
                    <span>
                        😋
                    </span>
                </div>
            </div>

            {/* Section Title */}
            <div className="text-center mb-8 md:mb-12">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary trispace-font uppercase">
                    Our Products
                </h2>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full mx-auto ">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        isHovered={hoveredProductId === product.id}
                        onMouseEnter={() => setHoveredProductId(product.id)}
                        onMouseLeave={() => setHoveredProductId(null)}
                    />
                ))}
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
            {/* NEW Badge */}
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

            {/* Product Image Container */}
            <div className="relative aspect-square p-4 md:p-6 lg:p-8 flex items-center justify-center">
                <div
                    className={`relative w-full h-full transition-transform duration-500 ${isHovered ? "scale-110" : "scale-100"
                        }`}
                >
                    <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-contain" />
                </div>
            </div>

            {/* Product Info */}
            <div className="p-3 md:p-4 flex items-end justify-between border-t border-[#F0E0D0]">
                <div className="flex-1 pr-2">
                    <h3 className="text-xs md:text-sm lg:text-base font-bold text-gray-900 trispace-font uppercase leading-tight mb-1">
                        {product.name}
                    </h3>
                    <p className="text-[10px] md:text-xs text-gray-500 mb-1">Serving weight: {product.weight}</p>
                    <p className="text-sm md:text-base lg:text-lg font-bold text-primary trispace-font">{product.price}</p>
                </div>

                {/* Add to Cart Button */}
                <div className={`shrink-0 transition-all duration-300 ${isHovered ? "scale-110" : "scale-100"}`}>
                    <CostumButton
                        backgroundColor="#DB212F"
                        // hoverTextColor="#ffffff"
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
