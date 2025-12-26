"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface AllergensSectionProps {
  allergens: string
}

export function AllergensSection({ allergens }: AllergensSectionProps) {
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (titleRef.current) {
        const text = "ALLERGÈNES"
        const chars = text.split("")
        titleRef.current.innerHTML = chars
          .map((char) => `<span class="allergen-char inline-block">${char === " " ? "&nbsp;" : char}</span>`)
          .join("")

        gsap.from(".allergen-char", {
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
          },
          opacity: 0,
          y: 30,
          rotateX: 90,
          duration: 0.6,
          stagger: 0.03,
          ease: "back.out(1.7)",
        })
      }
    })

    return () => ctx.revert()
  }, [])

  const allergensList = allergens.split(",").map((a) => a.trim())

  return (
    <section className="w-full bg-white py-8 md:py-12 lg:py-16 px-6 md:px-12 lg:px-20 xl:px-32">
      <div className="max-w-5xl mx-auto">
        <h2
          ref={titleRef}
          className="text-3xl md:text-5xl lg:text-6xl font-bold text-primary mb-10 md:mb-16 text-center"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          ALLERGÈNES
        </h2>

        <div className="allergen-content bg-[#FBE8EA] border-4 border-primary rounded-3xl p-8 md:p-12 lg:p-16">
          <div className="flex flex-wrap gap-3 md:gap-4 justify-center">
            {allergensList.map((allergen, idx) => (
              <span
                key={idx}
                className="bg-white text-primary px-6 md:px-8 py-3 md:py-4 rounded-full font-bold text-sm md:text-base border-2 border-primary hover:bg-primary hover:text-white transition-all duration-300 cursor-default shadow-md hover:shadow-xl hover:scale-105"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {allergen}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
