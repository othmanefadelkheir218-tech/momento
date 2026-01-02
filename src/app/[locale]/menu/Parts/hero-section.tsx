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
  const imageRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const badgeRef = useRef<HTMLSpanElement>(null)

  const heroImage = dessert.other_images[1] || dessert.main_image

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(imageRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
        y: 150,
        scale: 1.1,
        ease: "none",
      })

      gsap.from(badgeRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.8,
        delay: 0.3,
        ease: "back.out(1.7)",
      })

      if (titleRef.current) {
        const words = dessert.name.split(" ")
        titleRef.current.innerHTML = words
          .map(
            (word) =>
              `<span class="inline-block overflow-hidden mr-3 md:mr-6"><span class="title-word inline-block">${word}</span></span>`,
          )
          .join(" ")

        gsap.from(".title-word", {
          y: "120%",
          opacity: 0,
          duration: 1,
          stagger: 0.15,
          delay: 0.5,
          ease: "power4.out",
        })
      }

      gsap.from(descRef.current, {
        opacity: 0,
        y: 40,
        duration: 1,
        delay: 1.2,
        ease: "power3.out",
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [dessert.name])

  return (
    <section ref={sectionRef} className="relative w-full h-[90vh]  overflow-hidden">
      <div ref={imageRef} className="absolute inset-0 -top-[10%] h-[110%]">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat "
          style={{ backgroundImage: `url(${heroImage})` }}
        />
      </div>

      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/60 to-transparent" />

      {/* Content */}
      <div className="relative z-10 w-full h-full flex items-end px-6 md:px-12 lg:px-20 xl:px-32 pb-16 md:pb-24 lg:pb-32">
        <div className="max-w-5xl">
          {/* Badge */}
          {dessert.isNew && (
            <span
              ref={badgeRef}
              className="inline-block bg-primary text-white text-xs md:text-sm font-bold tracking-widest px-5 md:px-6 py-2.5 md:py-3 rounded-full mb-6 md:mb-8 shadow-lg hover:bg-[#c01d2a] transition-colors cursor-default"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              NOUVEAU
            </span>
          )}

          <h1
            ref={titleRef}
            className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white mb-6 md:mb-8 leading-[1.1] tracking-tight"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {dessert.name}
          </h1>

          {/* <p
            ref={descRef}
            className="text-white/95 text-lg md:text-xl lg:text-2xl max-w-3xl leading-relaxed md:leading-relaxed italic"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {dessert.description}
          </p> */}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-1.5 bg-white/70 rounded-full" />
        </div>
      </div>
    </section>
  )
}
