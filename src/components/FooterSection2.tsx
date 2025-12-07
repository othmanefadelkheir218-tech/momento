"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SuccessPopup } from "./success-popup"
import { Facebook, Instagram, Twitter, Youtube, Linkedin } from "lucide-react"
import CostumButton from "./CostumButton"
import Magnetic from "./Magnetic"

gsap.registerPlugin(ScrollTrigger)

const cooperationOptions = [
    "Cooperation for retail partners or distributors",
    "Business inquiry",
    "Partnership opportunity",
    "General question",
]

const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Youtube, href: "#", label: "Youtube" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
]

function Content() {
    return (
        <div className="bg-primary py-4 md:py-8 px-4 md:px-12 h-full w-full flex justify-center items-center">
            <div className="w-full">
                <Section1 />
                <Section2 />
            </div>
        </div>
    )
}

const Section1 = () => {
    return (
        <div>
            <Forms />
        </div>
    )
}

const Section2 = () => {
    return (
        <div className="flex w-full md:justify-between flex-col md:flex-row  items-center  gap-2 text-center text-white/60 text-sm pb-4 md:mt-10 mt-5">
            <p>©{new Date().getFullYear()} Momemt. All rights reserved.</p>
            <div className="flex gap-6">
                {
                    socialLinks.map((link) => (
                        <Magnetic key={link.label} >
                            <a href={link.href} target="_blank" rel="noopener noreferrer">
                                <link.icon className="w-6 h-6" />
                            </a>
                        </Magnetic>
                    ))
                }
            </div>
            <p>
                Made by{" "}
                <a
                    href="https://zakariyazouazou.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-white/80 underline underline-offset-2 transition-colors duration-300"
                >
                    Zakariya Zouazou
                </a>
            </p>
        </div>
    )
}

const Forms = () => {
    const sectionRef = useRef<HTMLElement>(null)
    const headingRef = useRef<HTMLHeadingElement>(null)
    const formRef = useRef<HTMLFormElement>(null)
    const socialRef = useRef<HTMLDivElement>(null)
    const [showPopup, setShowPopup] = useState(false)
    const [formData, setFormData] = useState({
        cooperation: cooperationOptions[0],
        city: "",
        name: "",
        phone: "",
        email: "",
        message: "",
    })

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

            tl.from(headingRef.current, {
                opacity: 0,
                y: 60,
                duration: 0.8,
                ease: "power3.out",
            }).from(
                formRef.current,
                {
                    opacity: 0,
                    y: 40,
                    duration: 0.7,
                    ease: "power3.out",
                },
                "-=0.4",
            )

            const fields = formRef.current?.querySelectorAll(".form-field")
            if (fields) {
                tl.from(
                    fields,
                    {
                        opacity: 0,
                        y: 20,
                        stagger: 0.1,
                        duration: 0.5,
                        ease: "power3.out",
                    },
                    "-=0.3",
                )
            }

            tl.from(
                socialRef.current?.children || [],
                {
                    opacity: 0,
                    y: 20,
                    stagger: 0.08,
                    duration: 0.4,
                    ease: "power3.out",
                },
                "-=0.2",
            )
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Form submitted:", formData)
        setShowPopup(true)
    }

    return (
        <>
            <section
                ref={sectionRef}
                className="bg-primary flex flex-col items-center justify-start px-2 md:px-6 py-6 md:py-6"
            >
                <div className="max-w-6xl w-full">
                    {/* Heading */}
                    <h2
                        ref={headingRef}
                        className="text-xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-6 md:mb-16 tracking-tight"
                    >
                        HAVE A QUESTION? THEN THERE IS AN ANSWER!
                    </h2>

                    {/* Form */}
                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 md:space-y-8 ">
                        {/* Row 1: Cooperation type - full width on mobile */}
                        <div className="form-field">
                            <label className="block text-white/70 text-xs md:text-sm mb-1 md:mb-2">Cooperation type</label>
                            <select
                                name="cooperation"
                                value={formData.cooperation}
                                onChange={handleChange}
                                className="w-full bg-transparent text-white text-sm md:text-base border-b-2 border-white/50 py-2 md:py-3 focus:outline-none focus:border-white transition-colors duration-300 appearance-none cursor-pointer"
                                style={{
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "right 0 center",
                                    backgroundSize: "20px",
                                }}
                            >
                                {cooperationOptions.map((option) => (
                                    <option key={option} value={option} className="text-primary">
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Row 2: City + Name - side by side on mobile */}
                        <div className="grid grid-cols-2 gap-4 md:gap-8">
                            <div className="form-field">
                                <label className="block text-white/70 text-xs md:text-sm mb-1 md:mb-2">City</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    className="w-full bg-transparent text-white text-sm md:text-base border-b-2 border-white/50 py-2 md:py-3 focus:outline-none focus:border-white transition-colors duration-300 placeholder:text-white/30"
                                    placeholder="Your city"
                                    required
                                />
                            </div>

                            <div className="form-field">
                                <label className="block text-white/70 text-xs md:text-sm mb-1 md:mb-2">Your name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full bg-transparent text-white text-sm md:text-base border-b-2 border-white/50 py-2 md:py-3 focus:outline-none focus:border-white transition-colors duration-300 placeholder:text-white/30"
                                    placeholder="Enter your name"
                                    required
                                />
                            </div>
                        </div>

                        {/* Row 3: Phone + Email - side by side */}
                        <div className="grid grid-cols-2 gap-4 md:gap-8">
                            <div className="form-field">
                                <label className="block text-white/70 text-xs md:text-sm mb-1 md:mb-2">Phone</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full bg-transparent text-white text-sm md:text-base border-b-2 border-white/50 py-2 md:py-3 focus:outline-none focus:border-white transition-colors duration-300 placeholder:text-white/30"
                                    placeholder="+380 99 999 9999"
                                    required
                                />
                            </div>

                            <div className="form-field">
                                <label className="block text-white/70 text-xs md:text-sm mb-1 md:mb-2">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full bg-transparent text-white text-sm md:text-base border-b-2 border-white/50 py-2 md:py-3 focus:outline-none focus:border-white transition-colors duration-300 placeholder:text-white/30"
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>
                        </div>

                        {/* Row 4: Message */}
                        <div className="form-field">
                            <label className="block text-white/70 text-xs md:text-sm mb-1 md:mb-2">Message</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows={1}
                                className="w-full bg-transparent text-white text-sm md:text-base border-b-2 border-white/50 py-2 md:py-3 focus:outline-none focus:border-white transition-colors duration-300 placeholder:text-white/30 resize-none"
                                placeholder="Your message..."
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="form-field pt-2 md:pt-4">
                            <CostumButton
                                onClick={handleSubmit}
                                backgroundColor="white"
                                hoverTextColor="#DB212F"
                                className="w-[100px] h-[50px] rounded-none bg-primary text-white border-white border"
                            >
                                <p className="font-bold">
                                    Send
                                </p>
                            </CostumButton>
                        </div>
                    </form>
                </div>
            </section>

            <SuccessPopup isOpen={showPopup} onClose={() => setShowPopup(false)} />
        </>
    )
}

export default function Footer() {
    return (
        <div className="relative h-[900px] bg-black" style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}>
            <div className="relative h-[calc(100vh+900px)] -top-[calc(100vh)]">
                <div className="h-[900px] sticky top-[calc(100vh-900px)]">
                    <Content />
                </div>
            </div>
        </div>
    )
}
