"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { DessertInterface } from "@/Data/Const"

gsap.registerPlugin(ScrollTrigger)

interface HeroSectionProps {
  dessert: DessertInterface
}

export function HeroSection({ dessert }: HeroSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const badgeRef = useRef<HTMLSpanElement>(null)

  // Use image index 1 (second image from other_images)
  const heroImage = dessert.other_images[1] || dessert.main_image

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Badge animation
      gsap.from(badgeRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.6,
        delay: 0.2,
        ease: "power2.out",
      })

      // Title animation - split into words
      if (titleRef.current) {
        const words = dessert.name.split(" ")
        titleRef.current.innerHTML = words
          .map(
            (word) =>
              `<span class="inline-block overflow-hidden"><span class="title-word inline-block">${word}</span></span>`,
          )
          .join(" ")

        gsap.from(".title-word", {
          y: 100,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          delay: 0.4,
          ease: "power3.out",
        })
      }

      // Description animation
      gsap.from(descRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.8,
        ease: "power2.out",
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [dessert.name])

  return (
    <section ref={sectionRef} className="relative w-full h-screen min-h-[600px] flex items-end overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

      {/* Content */}
      <div className="relative z-10 w-full px-6 md:px-12 lg:px-20 pb-16 md:pb-24">
        <div className="max-w-4xl">
          {/* Badge */}
          {dessert.isNew && (
            <span
              ref={badgeRef}
              className="inline-block bg-[#DB212F] text-white text-xs font-bold tracking-wider px-4 py-2 rounded-full mb-6"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              NOUVEAU
            </span>
          )}

          {/* Title */}
          <h1
            ref={titleRef}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {dessert.name}
          </h1>

          {/* Description */}
          <p
            ref={descRef}
            className="text-white/90 text-lg md:text-xl max-w-2xl leading-relaxed italic"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {dessert.description}
          </p>
        </div>
      </div>
    </section>
  )
}
