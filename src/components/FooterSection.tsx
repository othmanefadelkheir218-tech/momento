"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SuccessPopup } from "./success-popup"
import CostumButton from "./CostumButton"
import { useTranslations } from "next-intl"
import Magnetic from "./Magnetic"

gsap.registerPlugin(ScrollTrigger)





export default function FooterSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)
  const linksRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const [email, setEmail] = useState("")
  const [showPopup, setShowPopup] = useState(false)
  const t = useTranslations("Navigation");


  const pages = [
    { name: t("home"), href: "/" },
    { name: t("menu"), href: "/menu" },
    { name: t("faq"), href: "/faq" },
    { name: t("contact"), href: "/contact" },
  ];


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
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Subscribed:", email)
    setShowPopup(true)
    setEmail("")
  }

  return (
    <>
      <div className='h-screen bg-primaryLighter/20 flex flex-col items-center justify-center px-6 py-20'>
        <div className="max-w-4xl w-full text-center space-y-12">
          {/* Logo */}
          <div ref={logoRef} className="w-full flex justify-center">
            <img src="/images/Logo.png" alt="" />
          </div>

          {/* Simple Text */}
          <p ref={textRef} className="text-lg md:text-xl text-primary/80 max-w-2xl mx-auto leading-relaxed">
            We are dedicated to providing exceptional experiences and building lasting relationships with our community.
            Join us on this adventure.
          </p>

          {/* Pages Links */}
          <div ref={linksRef} className="flex flex-wrap justify-center gap-6 md:gap-10">
            {pages.map((page) => (
              <Magnetic
                key={page.name}
              >
                <a
                  href={page.href}
                  className="text-primary hover:text-primaryLight transition-colors duration-300 text-lg font-medium relative group"
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
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 border-2 border-primary/30 bg-white/50 text-primary placeholder:text-primary/50 focus:outline-none focus:border-primary transition-colors duration-300"
              required
            />
            <CostumButton
              onClick={handleSubmit}
              backgroundColor="#DB212F"
              hoverTextColor="white"
              className="w-[120px] h-[70px] rounded-none bg-white text-primary border-primary border"
            >
              <p className="font-bold">
                Subscribe
              </p>
            </CostumButton>
          </form>
        </div>
      </div>
      <SuccessPopup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        title="THANK YOU FOR SUBSCRIBING!"
        message="You have successfully subscribed to our newsletter. Stay tuned for the latest updates and exclusive offers!"
      />
    </>
  )
}
