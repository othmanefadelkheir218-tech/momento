"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowRight } from "lucide-react"
import { Reveal } from "../animation/Reveal"
import BigWavyCircle from "../BigWavyCircle"
import { useTransitionRouter } from "@/hooks/useTransitionRouter"
import { useTranslations } from "next-intl"


gsap.registerPlugin(ScrollTrigger)

const ProductShowcase = () => {
  const router = useTransitionRouter();
  const sectionRef = useRef<HTMLElement>(null)
  const mainImageRef = useRef<HTMLImageElement>(null)
  const mainImageContainerRef = useRef<HTMLDivElement>(null)
  const leftImageRef = useRef<HTMLImageElement>(null)
  const rightImageRef = useRef<HTMLImageElement>(null)
  const rightImageContainerRef = useRef<HTMLDivElement>(null)
  const t = useTranslations("HomePage.BannerSection");
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const checkViewport = () => {
      setIsDesktop(window.innerWidth >= 1024) // lg breakpoint
    }

    checkViewport()
    window.addEventListener("resize", checkViewport)
    return () => window.removeEventListener("resize", checkViewport)
  }, [])

  useEffect(() => {
    if (!isDesktop) return

    const ctx = gsap.context(() => {
      // Main image zoom effect on scroll
      if (mainImageRef.current && mainImageContainerRef.current) {
        gsap.fromTo(
          mainImageRef.current,
          { scale: 1 },
          {
            scale: 1.6,
            ease: "none",
            scrollTrigger: {
              trigger: mainImageContainerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          },
        )
      }

      // Left image parallax translateY
      if (leftImageRef.current) {
        gsap.fromTo(
          leftImageRef.current,
          { y: 50 },
          {
            y: -50,
            ease: "none",
            scrollTrigger: {
              trigger: leftImageRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          },
        )
      }

      // Right image parallax translateY
      if (rightImageContainerRef.current) {
        gsap.fromTo(
          rightImageContainerRef.current,
          { y: 100 },
          {
            y: -100,
            ease: "none",
            scrollTrigger: {
              trigger: rightImageContainerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          },
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [isDesktop]) // Re-run when isDesktop changes

  return (
    <section className="w-full flex items-center justify-center">
      <section
        ref={sectionRef}
        className="w-full bg-primary text-primary-foreground py-12 md:py-20 px-4 md:px-8 lg:px-4 overflow-hidden"
      >

        {/* Header */}
        <div className="relative z-10 text-white trispace-font text-center text-xl sm:text-2xl md:text-3xl lg:text-6xl font-bold uppercase leading-[0.9] mx-auto">
          <Reveal rotate={false} delay={0}>
            <h1>{t("line1")}</h1>
          </Reveal>

          <Reveal rotate={false} delay={0}>
            <h1>{t("line2")}</h1>
          </Reveal>

          <Reveal rotate={false} delay={0}>
            <h1>{t("line3")}</h1>
          </Reveal>
        </div>


        {/* Image Container */}
        <div className="z-0 w-full flex items-center justify-center -mt-8 sm:-mt-16 md:-mt-24">
          <div
            ref={mainImageContainerRef}
            className="relative overflow-hidden w-full rounded-t-full max-w-[280px] sm:max-w-sm md:max-w-md lg:max-w-lg mb-4 md:mb-8"
          >
            <img
              ref={mainImageRef}
              src="/images/image-1.jpg"
              alt={t("imageAlt1")}
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-black/20" />
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="w-full">
          <div className="flex flex-col lg:flex-row lg:justify-between items-center lg:items-start gap-8 lg:gap-0 space-x-2.5">
            {/* Left Image - Hidden on mobile, shown on desktop */}
            <div
              ref={rightImageRef}
              className="hidden lg:flex lg:order-1 lg:flex-1 justify-center lg:justify-end lg:mt-16">
              <div className="overflow-hidden w-full max-w-[400px] lg:max-w-full rounded-tl-[100px]" ref={leftImageRef}>
                <img src="/images/secondSection2.png" alt={t("imageAlt2")} className="w-full h-auto object-cover" />
              </div>
            </div>

            {/* Center Content */}
            <div className="order-1 lg:order-2 flex flex-col items-center text-white w-full lg:w-auto">
              {/* Text Content */}
              <div className="max-w-2xl text-center px-4 lg:px-0 mx-auto">
                {/* Titre plus grand */}
                <h2 className="trispace-font text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold uppercase mb-8 leading-tight">
                  {t("titleLine1")}
                  <br />
                  {t("titleLine2")}
                </h2>

                {/* Paragraphes plus lisibles */}
                <p className="trispace-font text-xs sm:text-sm md:text-base lg:text-lg uppercase mb-6 leading-relaxed opacity-90">
                  {t("description1")}
                </p>

                <p className="trispace-font text-xs sm:text-sm md:text-base lg:text-lg uppercase leading-relaxed opacity-90">
                  {t("description2")}
                </p>
              </div>


              {/* Button Section */}
              <div className="flex items-center gap-4 mt-8 md:mt-12 lg:mt-16">
                <BigWavyCircle
                  rotate={true}
                  rotateSpeed={5}
                  rotateDirection="counter-clockwise"
                  isButton={true}
                  hoverTextColor="black"
                  onClick={() => {
                    router.push("/about")
                  }}
                  className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 text-white shrink-0"
                  fill="transparent"
                  stroke="white"
                  strokeWidth={2}
                >
                  <span className="flex flex-col items-center gap-1">
                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                  </span>
                </BigWavyCircle>
                <span className="trispace-font text-xs md:text-sm uppercase tracking-wider font-bold">{t("about_us_button")}</span>
              </div>
            </div>

            {/* Right Image - Hidden on mobile, shown on desktop */}
            <div
              ref={rightImageContainerRef}
              className="hidden lg:flex lg:order-3 lg:flex-1 justify-center lg:justify-start lg:-mt-40"
            >
              <div className="overflow-hidden w-full max-w-[400px] lg:max-w-full rounded-tr-[100px]">
                <img src="/images/secondSection1.jpg" alt={t("imageAlt3")} className="w-full h-auto object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  )
}

export default ProductShowcase
