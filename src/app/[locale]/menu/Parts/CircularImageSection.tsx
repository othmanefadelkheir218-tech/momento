"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface CircularImageSectionProps {
  imageUrl: string
}

export function CircularImageSection({ imageUrl }: CircularImageSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const circleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(circleRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
        scale: 0,
        rotation: 180,
        duration: 1.8,
        ease: "elastic.out(1, 0.5)",
      })

      gsap.to(circleRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
        y: 60,
        rotation: 15,
        ease: "none",
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="w-full min-h-[80vh] md:min-h-screen bg-white flex items-center justify-center py-12 md:py-16 px-6 md:px-12"
    >
      <div 
        ref={circleRef} 
        // I kept the container size balanced as discussed before
        className="relative w-[60vw] md:w-[45vw] lg:w-[40vw] xl:w-[50vw] aspect-square max-w-2xl bg-white rounded-full shadow-2xl"
      >
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt="Product showcase"
          fill
          // CHANGE HERE: 
          // 1. changed 'object-cover' to 'object-contain'
          // 2. added 'p-8 md:p-12' to give it breathing room inside the circle
          className="object-contain p-8 md:p-12 drop-shadow-xl transition-transform duration-500"
        />
        
        {/* Border Overlay */}
        <div className="absolute inset-0 rounded-full border-[6px] border-primary/20 pointer-events-none" />
        
        {/* Optional: subtle inner gradient */}
        <div className="absolute inset-0 rounded-full bg-linear-to-br from-black/5 via-transparent to-black/5 pointer-events-none" />
      </div>
    </section>
  )
}