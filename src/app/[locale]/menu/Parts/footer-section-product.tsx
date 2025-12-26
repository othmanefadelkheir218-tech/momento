"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function FooterSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (textRef.current) {
        const text = "Bonne petite"
        const chars = text.split("")
        textRef.current.innerHTML = chars
          .map((char) => `<span class="footer-char inline-block">${char === " " ? "&nbsp;" : char}</span>`)
          .join("")

        gsap.from(".footer-char", {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
          opacity: 0,
          y: 100,
          rotation: 20,
          scale: 0.5,
          duration: 0.8,
          stagger: 0.04,
          ease: "elastic.out(1, 0.5)",
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="w-full min-h-[50vh] md:min-h-[60vh] flex items-center justify-center bg-primary mt-10  px-6 py-12 md:py-16"
    >
      <h2
        ref={textRef}
        className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-white text-center leading-tight"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        Bonne petite
      </h2>
    </section>
  )
}
