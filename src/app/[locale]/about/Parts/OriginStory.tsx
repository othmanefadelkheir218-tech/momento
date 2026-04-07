"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { MotionPathPlugin } from "gsap/MotionPathPlugin"
import DirectionSvg from "@/components/DirectionSvg"
import CostumButton from "@/components/CostumButton"
import { useTransitionRouter } from "@/hooks/useTransitionRouter"
import Image from "next/image"
import { useTranslations } from "next-intl"

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin)

export default function OriginStory() {
  const containerRef = useRef<HTMLDivElement>(null)
  const followerRef = useRef<HTMLDivElement>(null)
  const router = useTransitionRouter()
  const t = useTranslations("AboutPage")
  // Section refs for animations
  const section1Ref = useRef<HTMLDivElement>(null)
  const section2Ref = useRef<HTMLDivElement>(null)
  const section3Ref = useRef<HTMLDivElement>(null)
  const section4Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial state: Hidden
      gsap.set(followerRef.current, { autoAlpha: 0, scale: 0.5 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 120%",
          scrub: 0.01,
          onEnter: () => gsap.to(followerRef.current, { autoAlpha: 1, scale: 1, duration: 0.3 }),
          onLeave: () => gsap.to(followerRef.current, { autoAlpha: 0, scale: 0.5, duration: 0.3 }),
          onEnterBack: () => gsap.to(followerRef.current, { autoAlpha: 1, scale: 1, duration: 0.3 }),
          onLeaveBack: () => gsap.to(followerRef.current, { autoAlpha: 0, scale: 0.5, duration: 0.3 }),
        },
      })

      tl.to(followerRef.current, {
        motionPath: {
          path: "#my-custom-path",
          align: "#my-custom-path",
          alignOrigin: [0.5, 0.5],
          autoRotate: true,
          start: 0,
          end: 1,
        },
        ease: "none",
      })

      // SECTION 1: Staggered reveal with parallax
      const section1 = section1Ref.current
      if (section1) {
        const image = section1.querySelector(".section-image")
        const badge = section1.querySelector(".section-badge")
        const title = section1.querySelector(".section-title")
        const subtitle = section1.querySelector(".section-subtitle")
        const text = section1.querySelector(".section-text")
        const decorLine = section1.querySelector(".decor-line")

        gsap.set([badge, title, subtitle, text, decorLine], {
          autoAlpha: 0,
          y: 60,
        })
        gsap.set(image, {
          autoAlpha: 0,
          scale: 1.1,
          clipPath: "inset(100% 0% 0% 0%)",
        })

        const tl1 = gsap.timeline({
          scrollTrigger: {
            trigger: section1,
            start: "top 75%",
            end: "top 25%",
            toggleActions: "play none none reverse",
          },
        })

        tl1
          .to(image, {
            autoAlpha: 1,
            scale: 1,
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.8,
            ease: "power3.out",
          })
          .to(badge, { autoAlpha: 1, y: 0, duration: 0.4, ease: "back.out(1.7)" }, "-=0.4")
          .to(title, { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.3")
          .to(decorLine, { autoAlpha: 1, y: 0, scaleX: 1, duration: 0.3, ease: "power2.out" }, "-=0.3")
          .to(subtitle, { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" }, "-=0.2")
          .to(text, { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" }, "-=0.2")

        // Parallax on image
        gsap.to(image, {
          yPercent: -15,
          ease: "none",
          scrollTrigger: {
            trigger: section1,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        })
      }

      // SECTION 2: Horizontal slide in with counter animation
      const section2 = section2Ref.current
      if (section2) {
        const image = section2.querySelector(".section-image")
        const content = section2.querySelector(".section-content")
        const stats = section2.querySelectorAll(".stat-item")

        gsap.set(image, { autoAlpha: 0, x: 100, rotateY: 15 })
        gsap.set(content, { autoAlpha: 0, x: -60 })
        gsap.set(stats, { autoAlpha: 0, y: 40, scale: 0.8 })

        const tl2 = gsap.timeline({
          scrollTrigger: {
            trigger: section2,
            start: "top 70%",
            end: "top 20%",
            toggleActions: "play none none reverse",
          },
        })

        tl2
          .to(content, { autoAlpha: 1, x: 0, duration: 0.7, ease: "power3.out" })
          .to(image, { autoAlpha: 1, x: 0, rotateY: 0, duration: 0.8, ease: "power3.out" }, "-=0.5")
          .to(
            stats,
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.4,
              stagger: 0.15,
              ease: "back.out(1.7)",
            },
            "-=0.6",
          )
      }

      // SECTION 3: Scale and fade with floating elements
      const section3 = section3Ref.current
      if (section3) {
        const images = section3.querySelectorAll(".gallery-image")
        const content = section3.querySelector(".section-content")
        const floatingElements = section3.querySelectorAll(".floating-element")

        gsap.set(images, { autoAlpha: 0, scale: 0.8, y: 50 })
        gsap.set(content, { autoAlpha: 0, y: 80 })
        gsap.set(floatingElements, { autoAlpha: 0, scale: 0 })

        const tl3 = gsap.timeline({
          scrollTrigger: {
            trigger: section3,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        })

        tl3
          .to(images, {
            autoAlpha: 1,
            scale: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: "power3.out",
          })
          .to(content, { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.3")
          .to(
            floatingElements,
            {
              autoAlpha: 1,
              scale: 1,
              duration: 0.4,
              stagger: 0.1,
              ease: "elastic.out(1, 0.5)",
            },
            "-=0.4",
          )

        // Continuous floating animation
        floatingElements.forEach((el, i) => {
          gsap.to(el, {
            y: "random(-20, 20)",
            x: "random(-10, 10)",
            rotation: "random(-10, 10)",
            duration: "random(2, 4)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: i * 0.1,
          })
        })
      }

      // SECTION 4: Grand finale with split reveal
      const section4 = section4Ref.current
      if (section4) {
        const leftPanel = section4.querySelector(".left-panel")
        const rightPanel = section4.querySelector(".right-panel")
        const centerContent = section4.querySelector(".center-content")
        const cta = section4.querySelector(".cta-button")

        gsap.set(leftPanel, { xPercent: -100, autoAlpha: 0 })
        gsap.set(rightPanel, { xPercent: 100, autoAlpha: 0 })
        gsap.set(centerContent, { autoAlpha: 0, y: 60, scale: 0.9 })
        gsap.set(cta, { autoAlpha: 0, y: 30 })

        const tl4 = gsap.timeline({
          scrollTrigger: {
            trigger: section4,
            start: "top 65%",
            toggleActions: "play none none reverse",
          },
        })

        tl4
          .to([leftPanel, rightPanel], {
            xPercent: 0,
            autoAlpha: 1,
            duration: 0.7,
            ease: "power4.out",
          })
          .to(
            centerContent,
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.6,
              ease: "power3.out",
            },
            "-=0.4",
          )
          .to(
            cta,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.4,
              ease: "back.out(1.7)",
            },
            "-=0.3",
          )
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="relative z-20 w-full bg-[#FFF5F0] overflow-hidden py-32 md:py-48">
      {/* SVG LAYER */}
      <div className="absolute inset-0 w-full h-[95.2%] pointer-events-none z-0">
        <DirectionSvg className="w-full h-full" />
      </div>

      {/* THE FLOATING "M" FOLLOWER */}
      <div
        ref={followerRef}
        className="hidden md:flex absolute top-0 left-0 z-10 w-20 h-20 lg:w-28 lg:h-28 rounded-full bg-[#C41E3A] items-center justify-center text-white shadow-2xl border-4 border-white/20 opacity-0"
        style={{ willChange: "transform, opacity" }}
      >
        <div className="relative h-full w-full flex items-center justify-center ">
          <div className="absolute inset-0 rounded-full bg-[#C41E3A] opacity-20 blur-xl"></div>
          <div className="absolute inset-3 border-2 border-white/40 rounded-full"></div>
          <span
            className="text-5xl lg:text-7xl font-bold font-serif text-white relative z-10"
            style={{ textShadow: "0 2px 10px rgba(0,0,0,0.3)" }}
          >
            M
          </span>
        </div>
      </div>

      {/* ========== CONTENT SECTIONS ========== */}
      <div className="relative z-15 container mx-auto px-6 md:px-10 lg:px-16 flex flex-col  gap-16 md:gap-24 lg:gap-32">
        {/* SECTION 1: THE BEGINNING */}
        <section ref={section1Ref} className="min-h-screen flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          {/* Image Side */}
          <div className="w-full lg:w-1/2 relative">
            <div className="section-image relative h-[500px] md:h-[650px] lg:h-[750px] rounded-3xl overflow-hidden shadow-[0_25px_80px_-20px_rgba(196,30,58,0.3)]">
              <Image
                fill
                src="https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=2127&auto=format&fit=crop"
                alt={t("section1.imageAlt")}
                className="object-cover w-full h-full"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-linear-to-t from-[#8B1428]/40 via-transparent to-transparent" />
            </div>
            {/* Decorative badge */}
            <div className="section-badge absolute -bottom-6 -right-4 md:right-8 bg-white rounded-2xl p-5 shadow-xl">
              <span className="text-[#C41E3A] font-bold text-4xl md:text-5xl">2019</span>
              <p className="text-[#5A1A1F]/70 text-sm">{t("section1.est")}</p>
            </div>
          </div>

          {/* Text Side */}
          <div className="w-full lg:w-1/2 lg:pl-8">
            <div className="section-badge inline-block mb-6 px-4 py-2 bg-[#C41E3A]/10 rounded-full">
              <span className="text-[#C41E3A] font-semibold text-sm tracking-wider uppercase">
                {t("section1.badge")}
              </span>
            </div>

            <h2 className="section-title text-5xl md:text-6xl lg:text-6xl font-bold text-[#1A0A0C] leading-[0.95] mb-6">
              {t.rich("section1.title", {
                instants: (chunks) => <span className="text-[#C41E3A]">{chunks}</span>
              })}
            </h2>

            <div className="decor-line w-24 h-1.5 bg-linear-to-r from-[#C41E3A] to-[#FF6B6B] rounded-full mb-8 origin-left" />

            <p className="section-subtitle text-xl md:text-2xl text-[#5A1A1F] font-medium mb-6">
              {t("section1.subtitle")}
            </p>

            <p className="section-text text-[#5A1A1F]/80 text-lg leading-relaxed max-w-xl">
              {t("section1.text")}
            </p>
          </div>

        </section>

        {/* SECTION 2: OUR PHILOSOPHY */}
        <section
          ref={section2Ref}
          className="min-h-[80vh] flex flex-col lg:flex-row-reverse gap-12 lg:gap-20 items-center"
        >
          {/* Image Side */}
          <div className="section-image w-full lg:w-1/2 relative perspective-1000">
            <div className="relative aspect-4/3 rounded-3xl overflow-hidden shadow-2xl">
              <Image
                fill
                src="https://images.unsplash.com/photo-1501443762994-82bd5dace89a?q=80&w=2070&auto=format&fit=crop"
                alt={t("philosophy.imageAlt")}
                className="object-cover w-full h-full"
              />
            </div>
            {/* Floating ingredient cards */}
            <div className="absolute -top-8 -left-4 md:left-4 bg-white rounded-xl p-4 shadow-lg -rotate-6">
              <span className="text-3xl">🍓</span>
            </div>
            <div className="absolute -bottom-4 right-8 bg-white rounded-xl p-4 shadow-lg rotate-[8deg]">
              <span className="text-3xl">🫐</span>
            </div>
          </div>

          {/* Text Side */}
          <div className="section-content w-full lg:w-1/2">
            <div className="inline-block mb-6 px-4 py-2 bg-[#C41E3A]/10 rounded-full">
              <span className="text-[#C41E3A] font-semibold text-sm tracking-wider uppercase">
                {t("philosophy.badge")}
              </span>
            </div>

            <h3 className="section-title text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A0A0C] leading-tight mb-8">
              {t.rich("philosophy.title", {
                authentiques: (chunks) => <span className="text-[#C41E3A]">{chunks}</span>
              })}
            </h3>

            <p className="section-text text-[#5A1A1F]/80 text-lg leading-relaxed mb-10 max-w-lg">
              {t("philosophy.text")}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { val: t("philosophy.stats.artisanal"), sub: t("philosophy.stats.artisanalSub") },
                { val: t("philosophy.stats.quality"), sub: t("philosophy.stats.qualitySub") },
                { val: t("philosophy.stats.creativity"), sub: t("philosophy.stats.creativitySub") }
              ].map((stat, i) => (
                <div key={i} className="stat-item">
                  <span className="block text-4xl font-semibold text-primary uppercase tracking-tighter">{stat.val}</span>
                  <span className="text-[#5A1A1F]/60 text-lg font-bold">{stat.sub}</span>
                </div>
              ))}
            </div>
          </div>

        </section>

        {/* SECTION 3: THE CRAFT */}
        <section ref={section3Ref} className="min-h-[90vh] flex flex-col items-center">
          {/* Section header */}
          <div className="section-content text-center mb-16 max-w-3xl">
            <div className="inline-block mb-6 px-4 py-2 bg-[#C41E3A]/10 rounded-full">
              <span className="text-[#C41E3A] font-semibold text-sm tracking-wider uppercase">
                {t("craft.badge")}
              </span>
            </div>

            <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A0A0C] leading-tight mb-6">
              {t.rich("craft.title", {
                artisanales: (chunks) => <span className="text-[#C41E3A]">{chunks}</span>
              })}
            </h3>

            <p className="text-[#5A1A1F]/80 text-lg md:text-xl leading-relaxed">
              {t("craft.text")}
            </p>
          </div>

          {/* Image Gallery */}
          <div className="w-full mt-10 grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { img: "https://images.unsplash.com/photo-1570197788417-0e82375c9371", label: t("craft.gallery.step1") },
              { img: "https://images.unsplash.com/photo-1560008581-09826d1de69e", label: t("craft.gallery.step2") },
              { img: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f", label: t("craft.gallery.step3") }
            ].map((item, i) => (
              <div key={i} className={`gallery-image relative aspect-3/4 rounded-[3rem] overflow-hidden shadow-2xl group ${i === 1 ? 'md:-mt-20' : ''}`}>
                <Image fill src={item.img} alt={item.label} className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-linear-to-t from-[#C41E3A] via-transparent to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-500 flex items-end p-12">
                  <span className="text-white font-black text-4xl uppercase tracking-widest">{item.label}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: THE PROMISE */}
        <section ref={section4Ref} className="min-h-[70vh] relative flex items-center justify-center py-20">
          {/* Split background panels */}
          <div className="left-panel absolute left-0 top-0 w-1/2 h-full bg-linear-to-r from-[#C41E3A] to-[#E84A5F] rounded-r-[3rem] z-0" />
          <div className="right-panel absolute right-0 top-0 w-1/2 h-full bg-linear-to-l from-[#8B1428] to-[#C41E3A] rounded-l-[3rem] z-0" />

          {/* Center content */}
          <div className="center-content relative z-10 text-center px-8 py-16 max-w-3xl">
            <div className="inline-block mb-6 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full">
              <span className="text-white font-semibold text-sm tracking-wider uppercase">
                {t("promise.badge")}
              </span>
            </div>

            <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-8 text-balance">
              {t.rich("promise.title", {
                moment: (chunks) => <span className="text-[#FFD4D4]">{chunks}</span>
              })}
            </h3>

            <p className="text-white/90 text-lg md:text-xl leading-relaxed mb-6 max-w-xl mx-auto">
              {t("promise.text")}
            </p>

            {/* Why Choose Us List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 max-w-2xl mx-auto text-left">
              {(t.raw("promise.items") as string[]).map((item, i) => (
                <div key={i} className="flex items-center space-x-3 text-white/90">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                    <span className="text-white text-sm">✔</span>
                  </div>
                  <span className="text-lg font-medium">{item}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-center w-full">
              <CostumButton
                onClick={() => router.push("/menu")}
                backgroundColor="#DB212F"
                hoverTextColor="white"
                className="w-[250px] h-[70px] rounded-none bg-white text-primary border-primary border"
              >
                <p className="font-bold">  {t("promise.button")}</p>
              </CostumButton>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
