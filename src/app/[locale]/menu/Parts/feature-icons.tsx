"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Thermometer, Package, Sparkles, Fish, ShieldCheck, Zap, Refrigerator } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

interface FeaturesSectionProps {
  storageConditions: string[]
}

const featureIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  réfrigérateur: Refrigerator,
  pots: Package,
  colorants: Sparkles,
  gélatine: Fish,
  halal: ShieldCheck,
  rapide: Zap,
  stockage: Thermometer,
}

function getIconForCondition(condition: string) {
  const lowerCondition = condition.toLowerCase()
  for (const [key, Icon] of Object.entries(featureIcons)) {
    if (lowerCondition.includes(key)) {
      return Icon
    }
  }
  return ShieldCheck
}

export function FeaturesSection({ storageConditions }: FeaturesSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const itemsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
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

      itemsRef.current.forEach((item, index) => {
        if (item) {
          gsap.fromTo(
            item,
            { x: 30, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.6,
              ease: "power2.out",
              delay: index * 0.1,
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 70%",
              },
            },
          )
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="w-full bg-white py-20 lg:py-32">
      <div className="mx-auto max-w-4xl px-6 lg:px-12">
        <h2 ref={titleRef} className="mb-10 font-serif text-3xl font-bold text-primary md:text-4xl">
          Caractéristiques
        </h2>

        <div className="space-y-4">
          {storageConditions.map((condition, index) => {
            const Icon = getIconForCondition(condition)
            return (
              <div
                key={index}
                ref={(el) => {
                  itemsRef.current[index] = el
                }}
                className="flex items-center gap-4 rounded-xl border border-primary/10 bg-white p-4 transition-colors hover:bg-[#FBE8EA]/30"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <span className="font-sans text-sm text-foreground/80">{condition}</span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
