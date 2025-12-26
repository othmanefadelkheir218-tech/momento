"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { DessertInterface } from "@/Data/Const"

gsap.registerPlugin(ScrollTrigger)

interface ProductInfoSectionProps {
    dessert: DessertInterface
}

export function ProductInfoSection({ dessert }: ProductInfoSectionProps) {
    const sectionRef = useRef<HTMLDivElement>(null)
    const imageRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const titleRef = useRef<HTMLHeadingElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(imageRef.current, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                },
                opacity: 0,
                scale: 0.8,
                rotation: -5,
                duration: 1.2,
                ease: "power3.out",
            })

            gsap.to(imageRef.current, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1,
                },
                y: -50,
                ease: "none",
            })

            if (titleRef.current) {
                const text = dessert.name
                const chars = text.split("")
                titleRef.current.innerHTML = chars
                    .map((char) => `<span class="title-char inline-block">${char === " " ? "&nbsp;" : char}</span>`)
                    .join("")

                gsap.from(".title-char", {
                    scrollTrigger: {
                        trigger: titleRef.current,
                        start: "top 80%",
                    },
                    opacity: 0,
                    y: 30,
                    rotation: 10,
                    duration: 0.6,
                    stagger: 0.03,
                    ease: "back.out(1.7)",
                })
            }
            if (!contentRef.current) return

            gsap.from(contentRef.current.children, {
                scrollTrigger: {
                    trigger: contentRef.current,
                    start: "top 75%",
                },
                opacity: 0,
                y: 40,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out",
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [dessert.name])

    return (
        <section
            ref={sectionRef}
            className="w-full min-h-screen flex items-center bg-white py-12  px-6 md:px-12 lg:px-20 xl:px-32"
        >
            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 lg:gap-24 items-center">
                {/* Left - Image */}
                <div ref={imageRef} className="relative aspect-square w-full group">
                    <div className="absolute inset-0 bg-[#FBE8EA] rounded-3xl transform group-hover:scale-105 transition-transform duration-500" />
                    <Image
                        src={dessert.main_image || "/placeholder.svg"}
                        alt={dessert.name}
                        fill
                        className="object-contain p-8 md:p-12 relative z-10"
                        priority
                    />
                </div>

                {/* Right - Content */}
                <div ref={contentRef} className="space-y-6 md:space-y-8">
                    <h2
                        ref={titleRef}
                        className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary leading-[1.1]"
                        style={{ fontFamily: "var(--font-sans)" }}
                    >
                        {dessert.name}
                    </h2>

                    <div className="flex items-center gap-4">
                        <span className="text-gray-500 text-base md:text-lg font-medium">{dessert.weight}</span>
                    </div>

                    <p
                        className="text-gray-700 text-base md:text-lg lg:text-xl leading-relaxed"
                        style={{ fontFamily: "var(--font-serif)" }}
                    >
                        {dessert.description}
                    </p>

                    <div className="pt-6 md:pt-8 border-t-2 border-gray-100">
                        <h3
                            className="text-xl md:text-2xl font-bold text-primary mb-4"
                            style={{ fontFamily: "var(--font-sans)" }}
                        >
                            ALLERGÈNES
                        </h3>
                        <p className="text-gray-600 text-sm md:text-base leading-relaxed">{dessert.allergens}</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
