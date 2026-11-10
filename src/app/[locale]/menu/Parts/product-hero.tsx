"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useTranslations } from "next-intl"
import { ArrowLeft } from "lucide-react"
import TransitionLink from "@/components/TransitionLink"
import { DessertInterface } from "@/Data/Const"
import { parseAllergens } from "./product-utils"

gsap.registerPlugin(ScrollTrigger)

interface ProductHeroProps {
    dessert: DessertInterface
}

/**
 * Split hero: everything you need to know about the dessert on the first
 * screen (name, range, weight, description, allergens), next to a large
 * photo with the small packshot floating on it.
 *
 * The large photo is the first of `other_images` (all ~1000px); the main
 * packshot is only 247px on most products, so it is shown small.
 */
export function ProductHero({ dessert }: ProductHeroProps) {
    const t = useTranslations("ProductPage")
    const sectionRef = useRef<HTMLElement>(null)
    const frameRef = useRef<HTMLDivElement>(null)
    const packshotRef = useRef<HTMLDivElement>(null)

    const allergens = parseAllergens(dessert.allergens)
    const heroImage = dessert.other_images.find(Boolean) || dessert.main_image
    const showPackshot = Boolean(dessert.main_image) && heroImage !== dessert.main_image
    const words = dessert.name.split(" ")

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Plays while the page-transition curtain lifts
            const tl = gsap.timeline({ delay: 0.5 })

            tl.fromTo(
                frameRef.current,
                { clipPath: "inset(100% 0% 0% 0%)" },
                { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: "power4.out" },
                0,
            )
                .from(".hero-photo", { scale: 1.15, duration: 1.6, ease: "power3.out" }, 0)
                .from(".title-word", { yPercent: 110, duration: 1, stagger: 0.08, ease: "power4.out" }, 0.15)
                .from(".hero-reveal", { y: 30, autoAlpha: 0, duration: 0.8, stagger: 0.08, ease: "power3.out" }, 0.35)

            if (packshotRef.current) {
                tl.from(packshotRef.current, { scale: 0, rotation: -20, duration: 0.9, ease: "back.out(1.7)" }, 0.8)
            }

            // Subtle parallax inside the frame. The photo layer overhangs the
            // frame by 8% top and bottom; 6% of its 116% height (~7%) stays
            // inside that margin, so no edge can ever show.
            gsap.to(".hero-parallax", {
                yPercent: 6,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1,
                    invalidateOnRefresh: true,
                },
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [dessert.name])

    return (
        <section
            ref={sectionRef}
            className="relative w-full overflow-hidden bg-[#FBE8EA] px-6 pb-16 pt-28 md:px-12 md:pb-24 md:pt-32 lg:px-20 xl:px-32"
        >
            <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-12 lg:gap-16">
                {/* Text */}
                <div className="order-2 lg:order-1 lg:col-span-6">
                    <TransitionLink
                        href="/menu"
                        className="hero-reveal mb-8 inline-flex items-center gap-2 text-sm font-medium text-primary/70 transition-colors hover:text-primary"
                    >
                        <ArrowLeft size={16} />
                        {t("backToMenu")}
                    </TransitionLink>

                    <p className="hero-reveal trispace-font mb-4 text-xs uppercase tracking-[0.25em] text-primary/70 md:text-sm">
                        {dessert.category}
                    </p>

                    <h1 className="text-4xl font-bold leading-[1.05] tracking-tight text-primary md:text-6xl xl:text-7xl">
                        {words.map((word, i) => (
                            <span key={i} className="mr-[0.25em] inline-block overflow-hidden pb-[0.08em] align-bottom">
                                <span className="title-word inline-block">{word}</span>
                            </span>
                        ))}
                    </h1>

                    {dessert.weight && (
                        <p className="hero-reveal mt-5 inline-flex items-center rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-primary shadow-sm">
                            {dessert.weight}
                        </p>
                    )}

                    <p className="hero-reveal mt-6 max-w-xl text-lg leading-relaxed text-gray-700 md:text-xl">
                        {dessert.description}
                    </p>

                    {allergens.length > 0 && (
                        <div className="hero-reveal mt-8 border-t border-primary/15 pt-6">
                            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary/70">
                                {t("allergens")}
                            </p>
                            <ul className="flex flex-wrap gap-2">
                                {allergens.map((allergen) => (
                                    <li
                                        key={allergen}
                                        className="rounded-full border border-primary/25 bg-white/70 px-3 py-1 text-sm text-primary"
                                    >
                                        {allergen}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Image */}
                <div className="relative order-1 lg:order-2 lg:col-span-6">
                    <div
                        ref={frameRef}
                        className="relative mx-auto aspect-4/5 w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl shadow-primary/10 lg:aspect-auto lg:h-[min(75vh,680px)] lg:max-w-none"
                    >
                        <div className="hero-parallax absolute inset-x-0 -top-[8%] h-[116%]">
                            <Image
                                src={heroImage}
                                alt={dessert.name}
                                fill
                                priority
                                sizes="(max-width: 1024px) 90vw, 45vw"
                                className="hero-photo object-cover"
                            />
                        </div>
                    </div>

                    {showPackshot && (
                        <div
                            ref={packshotRef}
                            className="absolute -bottom-6 left-2 h-28 w-28 rounded-full bg-white p-3 shadow-xl md:-left-6 md:h-36 md:w-36 md:p-4"
                        >
                            <div className="relative h-full w-full">
                                <Image src={dessert.main_image} alt="" fill sizes="144px" className="object-contain" />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
