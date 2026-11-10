"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useTranslations } from "next-intl"

gsap.registerPlugin(ScrollTrigger)

interface ProductGalleryProps {
    images: string[]
    alt: string
}

// Tile shapes for 1, 2 or 3 images: one big + two stacked on desktop
const LAYOUTS: Record<number, string[]> = {
    1: ["col-span-2 lg:col-span-12 aspect-[16/9]"],
    2: [
        "col-span-2 sm:col-span-1 lg:col-span-6 aspect-4/3",
        "col-span-2 sm:col-span-1 lg:col-span-6 aspect-4/3",
    ],
    3: [
        "col-span-2 lg:col-span-7 lg:row-span-2 aspect-4/3 lg:aspect-auto",
        "col-span-1 lg:col-span-5 aspect-square lg:aspect-[4/3]",
        "col-span-1 lg:col-span-5 aspect-square lg:aspect-[4/3]",
    ],
}

export function ProductGallery({ images, alt }: ProductGalleryProps) {
    const t = useTranslations("ProductPage")
    const sectionRef = useRef<HTMLElement>(null)
    const shown = images.filter(Boolean).slice(0, 3)
    const layout = LAYOUTS[shown.length]

    useEffect(() => {
        if (!layout) return
        const ctx = gsap.context(() => {
            gsap.utils.toArray<HTMLElement>(".gallery-tile").forEach((tile, i) => {
                // Reveal
                gsap.fromTo(
                    tile,
                    { clipPath: "inset(100% 0% 0% 0%)" },
                    {
                        clipPath: "inset(0% 0% 0% 0%)",
                        duration: 1.2,
                        delay: i * 0.12,
                        ease: "power4.out",
                        scrollTrigger: { trigger: tile, start: "top 85%" },
                    },
                )

                // Parallax: the layer overhangs the tile by 6% top and bottom;
                // ±4% of its 112% height (~4.5%) stays inside that margin.
                gsap.fromTo(
                    tile.querySelector(".gallery-parallax"),
                    { yPercent: -4 },
                    {
                        yPercent: 4,
                        ease: "none",
                        scrollTrigger: {
                            trigger: tile,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: 1,
                            invalidateOnRefresh: true,
                        },
                    },
                )
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [layout])

    if (!layout) return null

    return (
        <section ref={sectionRef} className="w-full bg-white px-6 py-16 md:px-12 md:py-24 lg:px-20 xl:px-32">
            <div className="mx-auto max-w-7xl">
                <h2 className="trispace-font mb-8 text-xs uppercase tracking-[0.25em] text-primary/70 md:mb-10 md:text-sm">
                    {t("galleryTitle")}
                </h2>

                <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-12">
                    {shown.map((src, i) => (
                        <div
                            key={src}
                            className={`gallery-tile relative overflow-hidden rounded-3xl bg-[#FBE8EA] ${layout[i]}`}
                        >
                            <div className="gallery-parallax absolute inset-x-0 -top-[6%] h-[112%]">
                                <Image
                                    src={src}
                                    alt={alt}
                                    fill
                                    sizes={i === 0 && shown.length === 3 ? "(max-width: 1024px) 100vw, 58vw" : "(max-width: 1024px) 50vw, 40vw"}
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
