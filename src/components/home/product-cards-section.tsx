"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { ShoppingBag } from "lucide-react"
import gsap from "gsap"
import BigWavyCircle from "../BigWavyCircle"
import CostumButton from "../CostumButton"
import { useTransitionRouter } from "@/hooks/useTransitionRouter"
import { DessertInterface } from "@/Data/Const"
import { slugify } from "@/lib/utils"



interface ProductCardsSectionProps {
    products: DessertInterface[]
    ShowTitle: boolean
    showAll: boolean
    bgcolor?: string
    title: string
}

export default function ProductCardsSection({ products, ShowTitle, showAll, bgcolor, title }: ProductCardsSectionProps) {
    const [hoveredProductId, setHoveredProductId] = useState<number | null>(null)
    const router = useTransitionRouter();

    const containerRef = useRef<HTMLElement>(null)
    const mousePos = useRef({ x: 0, y: 0 })

    const cursor = useRef<HTMLDivElement | null>(null)
    const cursorLabel = useRef<HTMLDivElement | null>(null)
    const xToCursor = useRef<gsap.QuickToFunc | null>(null)
    const yToCursor = useRef<gsap.QuickToFunc | null>(null)
    const xToLabel = useRef<gsap.QuickToFunc | null>(null)
    const yToLabel = useRef<gsap.QuickToFunc | null>(null)

    // 1. Setup GSAP with autoAlpha (Visibility + Opacity)
    useEffect(() => {
        if (cursor.current && cursorLabel.current) {
            // Initial state: Hide completely with autoAlpha: 0
            gsap.set([cursor.current, cursorLabel.current], {
                xPercent: -50,
                yPercent: -50,
                scale: 0,
                autoAlpha: 0 // <--- CRITICAL FIX: Ensures visibility: hidden
            })

            xToCursor.current = gsap.quickTo(cursor.current, "x", { duration: 0.5, ease: "power3" })
            yToCursor.current = gsap.quickTo(cursor.current, "y", { duration: 0.5, ease: "power3" })

            xToLabel.current = gsap.quickTo(cursorLabel.current, "x", { duration: 0.45, ease: "power3" })
            yToLabel.current = gsap.quickTo(cursorLabel.current, "y", { duration: 0.45, ease: "power3" })
        }
    }, [])

    // 2. Scroll Handler: Force hide if mouse is physically outside the section bounds
    useEffect(() => {
        const handleScroll = () => {
            if (hoveredProductId === null || !containerRef.current) return;

            const rect = containerRef.current.getBoundingClientRect();
            const { x, y } = mousePos.current;

            // Check if mouse is outside the section
            const isOutside =
                x < rect.left ||
                x > rect.right ||
                y < rect.top ||
                y > rect.bottom;

            if (isOutside) {
                setHoveredProductId(null);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [hoveredProductId]);

    // 3. Hover Animation: Use autoAlpha to toggle visibility cleanly
    useEffect(() => {
        if (hoveredProductId !== null) {
            // SHOW
            gsap.to([cursor.current, cursorLabel.current], {
                scale: 1,
                autoAlpha: 1, // Becomes visible
                duration: 0.4,
                ease: "back.out(1.7)",
                overwrite: "auto" // Prevents conflicts if mouse moves fast
            })
        } else {
            // HIDE
            gsap.to([cursor.current, cursorLabel.current], {
                scale: 0,
                autoAlpha: 0, // Becomes hidden (visibility: hidden) at end of tween
                duration: 0.3,
                ease: "power3.in",
                overwrite: "auto"
            })
        }
    }, [hoveredProductId])

    const handleMouseMove = (e: React.MouseEvent) => {
        mousePos.current = { x: e.clientX, y: e.clientY };

        if (xToCursor.current && yToCursor.current && xToLabel.current && yToLabel.current) {
            xToCursor.current(e.clientX)
            yToCursor.current(e.clientY)
            xToLabel.current(e.clientX)
            yToLabel.current(e.clientY)
        }
    }

    return (
        <section
            ref={containerRef}
            className={`relative w-full ${bgcolor ? bgcolor : "bg-[#FBE8EA]"} py-12 md:py-16 lg:py-20 px-4 md:px-8 lg:px-12 overflow-hidden`}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setHoveredProductId(null)}
        >
            {/* 
               Updated classes:
               1. Removed 'hidden lg:block' (GSAP handles visibility now)
               2. Ensure opacity-0 is set initially in CSS to prevent flash before JS loads
            */}
            <div
                ref={cursor}
                className="fixed top-0 left-0 pointer-events-none z-50 w-20 h-20 rounded-full bg-white shadow-lg opacity-0 invisible lg:visible"
            />
            <div
                ref={cursorLabel}
                className="fixed top-0 left-0 pointer-events-none z-50 flex items-center justify-center w-20 h-20 text-4xl opacity-0 invisible lg:visible"
            >
                <span>😋</span>
            </div>

            <div className="text-center mb-8 md:mb-12">
                {ShowTitle && <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary trispace-font uppercase">
                    {title}
                </h2>}
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full mx-auto">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        isHovered={hoveredProductId === product.id}
                        onMouseEnter={() => setHoveredProductId(product.id)}
                        onMouseLeave={() => setHoveredProductId(null)}
                        onClick={() => router.push(`/menu/${slugify(product.name)}`)}
                    />
                ))}
            </div>

            {!showAll && <div className="w-full flex justify-center lg:py-17 py-6">
                <BigWavyCircle
                    rotate={true}
                    rotateSpeed={5}
                    rotateDirection="counter-clockwise"
                    isButton={true}
                    hoverTextColor="white"
                    onClick={() => router.push("/menu")}
                    className="w-24 h-24 lg:w-45 lg:h-45 text-primary shrink-0"
                    fill="transparent"
                    stroke="#DB212F"
                    strokeWidth={2}
                >
                    <span className="text-xs xlmax:text-lg lg:text-sm font-bold trispace-font uppercase">
                        Menu
                    </span>
                </BigWavyCircle>
            </div>}
        </section>
    )
}

interface ProductCardProps {
    product: DessertInterface
    isHovered: boolean
    onMouseEnter: () => void
    onMouseLeave: () => void
    onClick: () => void
}

function ProductCard({ product, isHovered, onMouseEnter, onMouseLeave, onClick }: ProductCardProps) {
    return (
        <div
            className="relative bg-[#FDF5F0] rounded-sm overflow-hidden cursor-pointer group transition-all duration-300 rounded-tl-4xl"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={onClick}
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
                    className={`relative w-full h-full transition-transform duration-500 ${isHovered ? "scale-110" : "scale-100"}`}
                >
                    <Image src={product.main_image || "/placeholder.svg"} alt={product.name} fill className="object-contain" />
                </div>
            </div>

            <div className="p-3 md:p-4 flex items-end justify-between border-t border-[#F0E0D0]">
                <div className="flex-1 pr-2">
                    <h3 className="text-xs md:text-sm lg:text-base font-bold text-gray-900 trispace-font uppercase leading-tight mb-1">
                        {product.name}
                    </h3>
                    <p className="text-[10px] md:text-xs text-gray-500 mb-1">Serving weight: {product.weight}</p>
                    {/* <p className="text-sm md:text-base lg:text-lg font-bold text-primary trispace-font">{product.category}</p> */}
                </div>

                <div className={`shrink-0 transition-all duration-300 ${isHovered ? "scale-110" : "scale-100"}`}>
                    <CostumButton
                        backgroundColor="#DB212F"
                        className="w-10 h-10 md:w-12 md:h-12 lg:w-20 lg:h-20 bg-primaryLighter border-primaryLighter text-white hover:border-white">
                        <ShoppingBag
                            className={`w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 ${isHovered ? "scale-110" : "scale-100"}`}
                        />
                    </CostumButton>
                </div>
            </div>
        </div>
    )
} 