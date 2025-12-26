"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { DessertInterface } from "@/Data/Const"

interface IntroSectionProps {
  dessert: DessertInterface
}

export function IntroSection({ dessert }: IntroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLSpanElement>(null)
  const weightRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Badge animation
      if (badgeRef.current) {
        gsap.fromTo(
          badgeRef.current,
          { y: -20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", delay: 0.2 },
        )
      }

      // Title letter animation
      if (titleRef.current) {
        const chars = titleRef.current.innerText.split("")
        titleRef.current.innerHTML = chars
          .map((char) => `<span class="inline-block">${char === " " ? "&nbsp;" : char}</span>`)
          .join("")

        gsap.fromTo(
          titleRef.current.querySelectorAll("span"),
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, stagger: 0.02, ease: "power3.out", delay: 0.3 },
        )
      }

      // Description animation
      if (descRef.current) {
        gsap.fromTo(
          descRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.7 },
        )
      }

      // Weight animation
      if (weightRef.current) {
        gsap.fromTo(
          weightRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", delay: 0.9 },
        )
      }

      // Image animation
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { scale: 0.9, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1, ease: "power2.out", delay: 0.4 },
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative min-h-screen w-full overflow-hidden bg-white">
      {/* Decorative curved line */}
      <svg
        className="absolute right-0 top-0 h-full w-1/3 opacity-10"
        viewBox="0 0 200 800"
        fill="none"
        preserveAspectRatio="none"
      >
        <path d="M200 0C100 200 150 400 50 600C0 700 100 800 200 800" stroke="#DB212F" strokeWidth="2" fill="none" />
      </svg>

      <div className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center gap-8 px-6 py-20 lg:flex-row lg:gap-16 lg:px-12">
        {/* Left: Text Content */}
        <div className="flex-1 text-center lg:text-left">
          {dessert.isNew && (
            <span
              ref={badgeRef}
              className="mb-4 inline-block rounded-full bg-primary px-4 py-1.5 font-sans text-xs font-semibold uppercase tracking-wider text-white"
            >
              Nouveau
            </span>
          )}
          <h1
            ref={titleRef}
            className="mb-6 font-serif text-4xl font-bold leading-tight text-primary md:text-5xl lg:text-6xl"
          >
            {dessert.name}
          </h1>
          <p ref={descRef} className="mb-4 max-w-lg font-sans text-base leading-relaxed text-foreground/70 lg:text-lg">
            {dessert.description}
          </p>
          <span ref={weightRef} className="inline-block font-sans text-sm font-medium text-foreground/50">
            {dessert.weight}
          </span>
        </div>

        {/* Right: Product Image */}
        <div ref={imageRef} className="relative flex-1">
          <div className="relative mx-auto aspect-square max-w-md lg:max-w-lg">
            <img
              src={dessert.main_image || "/placeholder.svg?height=600&width=600&query=luxury dessert"}
              alt={dessert.name}
              className="h-full w-full rounded-3xl object-cover shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
