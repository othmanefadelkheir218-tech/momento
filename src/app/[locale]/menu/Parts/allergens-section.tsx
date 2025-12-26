"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface AllergensSectionProps {
  allergens: string
}

export function AllergensSection({ allergens }: AllergensSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
            },
          },
        )
      }

      // Content animation
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            delay: 0.2,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
            },
          },
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const allergensList = allergens.split(",").map((a) => a.trim())

  return (
    <section ref={sectionRef} className="w-full bg-white py-20 lg:py-32">
      <div className="mx-auto max-w-4xl px-6 lg:px-12">
        <h2 ref={titleRef} className="mb-8 font-serif text-3xl font-bold text-primary md:text-4xl">
          ALLERGÈNES
        </h2>
        <div ref={contentRef}>
          <div className="flex flex-wrap gap-2">
            {allergensList.map((allergen, index) => (
              <span
                key={index}
                className="rounded-full border border-primary/20 bg-primary/5 px-4 py-2 font-sans text-sm text-foreground/80"
              >
                {allergen}
              </span>
            ))}
          </div>
          <p className="mt-6 font-sans text-xs text-foreground/50">
            *Peut contenir des traces de contaminations croisées
          </p>
        </div>
      </div>
    </section>
  )
}
