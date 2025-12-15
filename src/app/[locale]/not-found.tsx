"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import CostumButton from "@/components/CostumButton"
import { useTransitionRouter } from "@/hooks/useTransitionRouter"

export default function NotFound() {
    const router = useTransitionRouter()
    const containerRef = useRef<HTMLDivElement>(null)
    const numberRef = useRef<HTMLHeadingElement>(null)
    const textRef = useRef<HTMLDivElement>(null)
    const linkRef = useRef<HTMLAnchorElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

            // Animate the 404 number with a bounce
            tl.fromTo(
                numberRef.current,
                { scale: 0, opacity: 0, rotate: -10 },
                {
                    scale: 1,
                    opacity: 1,
                    rotate: 0,
                    duration: 1,
                    ease: "elastic.out(1, 0.5)",
                },
            )
                .fromTo(textRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.3")
                .fromTo(linkRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "-=0.2")

            // Subtle floating animation on the number
            gsap.to(numberRef.current, {
                y: -10,
                duration: 2,
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true,
                delay: 1,
            })
        }, containerRef)

        return () => ctx.revert()
    }, [])

    return (
        <main ref={containerRef} className="min-h-screen bg-[#F7D6D9] text-primary flex items-center justify-center">
            <div className="text-center px-6">
                <h1
                    ref={numberRef}
                    className=" text-[10rem] md:text-[16rem] lg:text-[20rem] leading-none tracking-tighter"
                >
                    404
                </h1>

                <div ref={textRef} className="mt-4 md:mt-8 space-y-2">
                    <p className=" text-2xl md:text-4xl uppercase tracking-wide">
                        Oops! Page Not Found
                    </p>
                    <p className="text-base md:text-lg max-w-md mx-auto">
                        Looks like this flavor doesn&apos;t exist. Let&apos;s get you back to the sweet stuff.
                    </p>
                </div>

               

                <div className="mt-10 md:mt-14 w-full flex justify-center">
                    <CostumButton
                        onClick={() => router.push("/")}
                        backgroundColor="white"
                        hoverTextColor="#DB212F"
                        className="w-[250px] h-[50px] rounded-none bg-primary text-white border-white border"
                    >
                        <p className="font-bold">
                            Home
                        </p>
                    </CostumButton>
                </div>
            </div>
        </main>
    )
}
