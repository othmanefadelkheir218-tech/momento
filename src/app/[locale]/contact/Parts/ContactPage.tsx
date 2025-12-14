"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Reveal } from "@/components/animation/Reveal"

export default function ContactPage({ title }: { title: string }) {
    const containerRef = useRef<HTMLDivElement>(null)
    const titleRef = useRef<HTMLHeadingElement>(null)
    const phoneRef = useRef<HTMLAnchorElement>(null)
    const emailRef = useRef<HTMLAnchorElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

            tl.fromTo(titleRef.current, { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1 })
                .fromTo(phoneRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.5")
                .fromTo(emailRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.5")
        }, containerRef)

        return () => ctx.revert()
    }, [])

    return (
        <main ref={containerRef} className="min-h-screen  flex items-center justify-center bg-[#F7D6D9] text-primary">
            <div className="text-center px-6">
                <Reveal
                    rotate={false}
                    delay={0.1}
                >
                    <h1
                        className="trispace-font  text-8xl md:text-9xl text-center mb-16 md:mb-24 tracking-tight"
                    >
                        {title}
                    </h1>
                </Reveal>

                <div className="space-y-4 md:space-y-6">
                    <a
                        ref={phoneRef}
                        href="tel:+380970422400"
                        className="block  text-2xl md:text-4xl lg:text-5xl tracking-wider hover:opacity-70 transition-opacity"
                    >
                        +38 097 042 24 00
                    </a>

                    <a
                        ref={emailRef}
                        href="mailto:mrpopsua@gmail.com"
                        className="block  text-xl md:text-3xl lg:text-4xl tracking-wider uppercase hover:opacity-70 transition-opacity"
                    >
                        mrpopsua@gmail.com
                    </a>
                </div>
            </div>
        </main>
    )
}
