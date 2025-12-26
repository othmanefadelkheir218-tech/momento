"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface SplitImageSectionProps {
  imageUrl: string
  imageUrl2: string
}

export function SplitImageSection({ imageUrl, imageUrl2 }: SplitImageSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)


  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(sectionRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
        y: -80,
        ease: "none",
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section className="w-full min-h-[70vh] md:min-h-[80vh] bg-[#FBE8EA] py-8 md:py-12 lg:py-16 px-6 md:px-12 lg:px-20 xl:px-32 overflow-hidden">
      <div ref={sectionRef} className="max-w-7xl mx-auto relative h-full flex items-center justify-center">
        <div className="relative w-full aspect-16/10 md:aspect-21/9 rounded-3xl overflow-hidden shadow-2xl">
          <div className="absolute inset-0 flex">
            {/* Left Half */}
            <div  className="w-1/2 h-full relative overflow-hidden">
              <Image
                src={imageUrl || "/placeholder.svg"}
                alt="Product detail"
                fill
                className="object-cover object-right"
              />
            </div>

            {/* Right Half */}
            <div  className="w-1/2 h-full relative overflow-hidden">
              <Image
                src={imageUrl2 || "/placeholder.svg"}
                alt="Product detail"
                fill
                className="object-cover object-left"
              />
            </div>
          </div>

          {/* Center Divider Line */}
          <div className="absolute inset-y-0 left-1/2 w-1 bg-white/30 backdrop-blur-sm transform -translate-x-1/2" />
        </div>
      </div>
    </section>
  )
}
