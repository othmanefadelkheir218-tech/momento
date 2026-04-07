"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SuccessPopup } from "../../success-popup"
import CostumButton from "../../CostumButton"
import { useTranslations } from "next-intl"
import Magnetic from "../../Magnetic"

gsap.registerPlugin(ScrollTrigger)

const IceCreamDot = ({ className = "", delay = 0 }: { className?: string; delay?: number }) => (
  <div className={`absolute rounded-full bg-primary/10 ${className}`} style={{ animationDelay: `${delay}s` }} />
)

export default function FooterSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)
  const linksRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const decorRef = useRef<HTMLDivElement>(null)
  const [email, setEmail] = useState("")
  const [showPopup, setShowPopup] = useState(false)
  const t = useTranslations("Navigation")
  const t2 = useTranslations("Footer")

  const pages = [
    { name: t("home"), href: "/" },
    { name: t("menu"), href: "/menu" },
    { name: t("faq"), href: "/faq" },
    { name: t("contact"), href: "/contact" },
  ]



  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 20%",
          toggleActions: "play none none none",
          once: true,
        },
      })

      tl.from(logoRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out",
      })
        .from(
          textRef.current,
          {
            opacity: 0,
            y: 30,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.4",
        )
        .from(
          linksRef.current?.children || [],
          {
            opacity: 0,
            y: 20,
            stagger: 0.1,
            duration: 0.5,
            ease: "power3.out",
          },
          "-=0.3",
        )
        .from(
          formRef.current,
          {
            opacity: 0,
            y: 30,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.2",
        )
        .from(
          decorRef.current?.querySelectorAll(".decor-item") || [],
          {
            opacity: 0,
            scale: 0,
            stagger: 0.05,
            duration: 0.4,
            ease: "back.out(1.7)",
          },
          "-=0.5",
        )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) {
        throw new Error('Failed to subscribe')
      }

      console.log("Subscribed:", email)
      setShowPopup(true)
      setEmail("")
    } catch (error) {
      console.error('Error subscribing:', error)
      alert(t2("failed"))
    } finally {
      setIsSubmitting(false)
    }
  }

  const triggerSubmit = (e: React.MouseEvent) => {
    e.preventDefault()
    if (formRef.current) {
      formRef.current.requestSubmit()
    }
  }

  return (
    <>
      <div className="h-screen  bg-primaryLighter/20 flex flex-col items-center justify-between px-6 py-12 md:py-20 relative overflow-hidden">
        {/* Decorative background elements */}
        <div ref={decorRef} className="absolute inset-0 pointer-events-none">
          {/* Scattered dots pattern */}
          <IceCreamDot className="decor-item w-3 h-3 top-[10%] left-[5%]" delay={0} />
          <IceCreamDot className="decor-item w-5 h-5 top-[15%] left-[12%]" delay={0.1} />
          <IceCreamDot className="decor-item w-2 h-2 top-[8%] left-[20%]" delay={0.2} />
          <IceCreamDot className="decor-item w-4 h-4 top-[20%] right-[8%]" delay={0.15} />
          <IceCreamDot className="decor-item w-3 h-3 top-[12%] right-[15%]" delay={0.25} />
          <IceCreamDot className="decor-item w-6 h-6 top-[25%] right-[5%]" delay={0.1} />
          <IceCreamDot className="decor-item w-4 h-4 bottom-[30%] left-[8%]" delay={0.2} />
          <IceCreamDot className="decor-item w-2 h-2 bottom-[25%] left-[15%]" delay={0.3} />
          <IceCreamDot className="decor-item w-5 h-5 bottom-[35%] right-[10%]" delay={0.15} />
          <IceCreamDot className="decor-item w-3 h-3 bottom-[20%] right-[18%]" delay={0.25} />

          {/* Decorative curved lines */}
          <svg
            className="decor-item absolute top-[5%] left-[25%] w-32 h-32 text-primary/5"
            viewBox="0 0 100 100"
            fill="none"
          >
            <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2" strokeDasharray="10 5" />
          </svg>
          <svg
            className="decor-item absolute bottom-[15%] right-[20%] w-24 h-24 text-primary/5"
            viewBox="0 0 100 100"
            fill="none"
          >
            <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="2" strokeDasharray="8 4" />
          </svg>
        </div>

        {/* Top section - can add tagline or badge */}
        <div className="text-center">
          <span className="inline-block px-4 py-2 text-xs tracking-[0.3em] text-primary/60 uppercase trispace-font">
            {t2("joingMomento")}
          </span>
        </div>


        {/* Main content */}
        <div className="max-w-4xl w-full text-center space-y-8 md:space-y-10 relative z-10">
          {/* Logo */}
          <div ref={logoRef} className="w-full flex justify-center">
            <img src="/images/Logo.png" alt="Momento" className="h-16 md:h-auto" />
          </div>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-4">
            <span className="w-12 h-px bg-primary/20"></span>
            <span className="w-2 h-2 rounded-full bg-primary/30"></span>
            <span className="w-12 h-px bg-primary/20"></span>
          </div>

          {/* Simple Text */}
          <p
            ref={textRef}
            className="text-base md:text-xl text-primary/80 max-w-2xl mx-auto leading-relaxed"
          >
            {t2("textMomento")}
          </p>


          {/* Pages Links */}
          <div ref={linksRef} className="flex flex-wrap justify-center gap-4 md:gap-10">
            {pages.map((page) => (
              <Magnetic key={page.name}>
                <a
                  href={page.href}
                  className="text-primary hover:text-primaryLight transition-colors duration-300 text-base md:text-lg font-medium relative group"
                >
                  {page.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                </a>
              </Magnetic>
            ))}
          </div>

          {/* Subscription Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t2("placeholder")}
              className="flex-1 px-6 py-4 border-2 border-primary/30 bg-white/50 text-primary placeholder:text-primary/50 focus:outline-none focus:border-primary transition-colors duration-300"
              required
            />
            <CostumButton
              onClick={triggerSubmit}
              disabled={isSubmitting}
              backgroundColor="#DB212F"
              hoverTextColor="white"
              className={`w-[120px] h-[70px] rounded-none bg-white text-primary border-primary border ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              <p className="font-bold">{isSubmitting ? t2("sending") : t2("subscribe")}</p>
            </CostumButton>
          </form>
        </div>
      </div>

      <SuccessPopup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        title={t2("popup.title")}
        message={t2("popup.message")}
      />
    </>
  )
}
