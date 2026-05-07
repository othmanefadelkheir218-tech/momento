"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { DessertInterface } from "@/Data/Const"

gsap.registerPlugin(ScrollTrigger)

interface HeroSectionProps {
  dessert: DessertInterface
}

export function HeroSection({ dessert }: HeroSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const sharpImageWrapRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const badgeRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Slow parallax on the blurred background only
      gsap.to(bgRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
        y: 80,
        ease: "none",
      })

      // Sharp product image entrance
      gsap.from(sharpImageWrapRef.current, {
        opacity: 0,
        y: 50,
        scale: 0.92,
        duration: 1.2,
        delay: 0.3,
        ease: "power3.out",
      })

      // Badge
      if (badgeRef.current) {
        gsap.from(badgeRef.current, {
          opacity: 0,
          scale: 0.8,
          duration: 0.8,
          delay: 0.2,
          ease: "back.out(1.7)",
        })
      }

      // Title words
      if (titleRef.current) {
        const words = dessert.name.split(" ")
        titleRef.current.innerHTML = words
          .map(
            (word) =>
              `<span class="inline-block overflow-hidden mr-3"><span class="title-word inline-block">${word}</span></span>`,
          )
          .join("")

        gsap.from(".title-word", {
          y: "110%",
          opacity: 0,
          duration: 1,
          stagger: 0.12,
          delay: 0.9,
          ease: "power4.out",
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [dessert.name])

  return (
    <section ref={sectionRef} className="relative w-full h-screen overflow-hidden bg-black">

      {/* Blurred background — scaled up so blur edges don't show */}
      <div ref={bgRef} className="absolute inset-0 scale-110">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${dessert.main_image})`, filter: "blur(48px)" }}
        />
        <div className="absolute inset-0 bg-black/55" />
      </div>

      {/* Soft radial glow behind the product image */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        aria-hidden
      >
        <div className="w-[min(55vw,520px)] aspect-square rounded-full bg-white/8 blur-[90px]" />
      </div>

      {/* Sharp centered product image */}
      <div
        ref={sharpImageWrapRef}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="relative h-[55vh] w-auto max-w-[min(380px,70vw)] aspect-[3/4]">
          <Image
            src={dessert.main_image}
            alt={dessert.name}
            fill
            className="object-contain"
            style={{ filter: "drop-shadow(0 30px 70px rgba(0,0,0,0.85))" }}
            sizes="(max-width: 768px) 70vw, 380px"
            priority
          />
        </div>
      </div>

      {/* Badge — top left */}
      {dessert.isNew && (
        <div className="absolute top-8 left-8 md:top-12 md:left-16 z-10">
          <span
            ref={badgeRef}
            className="inline-block bg-primary text-white text-xs font-bold tracking-widest px-5 py-2.5 rounded-full shadow-lg"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            NOUVEAU
          </span>
        </div>
      )}

      {/* Product name — bottom left */}
      <div className="absolute bottom-0 left-0 right-0 z-10 px-6 md:px-12 lg:px-20 xl:px-32 pb-14 md:pb-20">
        {/* Subtle gradient so text is always readable */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/80 to-transparent -z-10" />
        <h1
          ref={titleRef}
          className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[1.05] tracking-tight"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {dessert.name}
        </h1>
      </div>

      {/* Scroll indicator — bottom right */}
      <div className="absolute bottom-8 right-8 md:right-16 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
        </div>
      </div>
    </section>
  )
}
