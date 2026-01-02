"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Reveal } from "@/components/animation/Reveal"
import { useTranslations } from "next-intl"

gsap.registerPlugin(ScrollTrigger)




export default function FAQPage({ title }: { title: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<HTMLDivElement[]>([])
  const t = useTranslations("FAQPage")



  // Liste des clés correspondant aux sections dans votre fr.json
  const faqKeys = ["history", "partnership", "ingredients", "events", "locations"]

  // Transformation des clés en données utilisables
  const faqs = faqKeys.map((key) => ({
    question: t(`items.${key}.question`),
    answer: t.raw(`items.${key}.answer`) as string[], // Récupère le tableau de paragraphes
  }))

  useEffect(() => {
    const ctx = gsap.context(() => {

      // FAQ items staggered animation
      itemsRef.current.forEach((item, index) => {
        gsap.fromTo(
          item,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            delay: index * 0.1,
          },
        )
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <main ref={containerRef} className="min-h-screen bg-[#F7D6D9] text-primary">
      <div className="max-w-6xl mx-auto px-6 py-20 md:py-32">
        <Reveal
          rotate={false}
          delay={0.1}
        >
          <h1
            className="trispace-font  text-8xl md:text-9xl text-center mb-16 md:mb-24 tracking-tight"
          >
            {title}
          </h1>
        </Reveal>

        <div className="space-y-0">
          {faqs.map((faq, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) itemsRef.current[index] = el
              }}
              className="grid md:grid-cols-2 gap-6 md:gap-12 py-10 md:py-14 border-t  border-border/50 relative rounded-t-4xl"
            >
              {/* Decorative bracket */}

              <h2 className="font-semibold text-2xl md:text-3xl uppercase tracking-wide md:pl-8">
                {faq.question}
              </h2>

              <div className="space-y-4">
                {faq.answer.map((paragraph, pIndex) => (
                  <p key={pIndex} className="text-primary/75 leading-relaxed text-base md:text-lg">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
