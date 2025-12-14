"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Reveal } from "@/components/animation/Reveal"

gsap.registerPlugin(ScrollTrigger)

const faqs = [
  {
    question: "About How It All Started",
    answer: [
      "As in stories: they conceived, took and did it. There was no idea how it should be done. But they had a good idea of how tasty it was.",
      "We started with trade on the embankment in Dnipro with a homemade bicycle rickshaw. At night they made ice cream, during the day they went to the waterfront and sold it. In the evening, they used the money to buy new products on the market.",
      "Thanks to the street food festivals, they became popular in their city and the next season they went to Kyiv with the product.",
    ],
  },
  {
    question: "About Approaches to Cooperation",
    answer: [
      "The product is craft, the production volume is not unlimited. Therefore, we carefully select partners, paying attention to the concept, accuracy, attitude to details and the client. One of the main conditions is compliance with a single retail price.",
      "We cannot satisfy everyone who sent applications, called or wrote in social networks about the desire to cooperate. If we look at the application and see potential, we send conditions with prices, assortment and the ability to provide equipment.",
    ],
  },
  {
    question: "About Our Ingredients",
    answer: [
      "We use only natural ingredients sourced from local farms whenever possible. Our milk comes from grass-fed cows, and we never use artificial colors or preservatives.",
      "Every flavor is crafted in small batches to ensure the highest quality and freshest taste. We believe in transparency and are happy to share our ingredient lists with any customer who asks.",
    ],
  },
  {
    question: "About Custom Orders",
    answer: [
      "Yes, we accept custom orders for special events, weddings, and corporate gatherings. Please contact us at least 2 weeks in advance for large orders.",
      "We can create custom flavors for your event or provide our signature selections. Delivery is available within the city limits for orders above a minimum quantity.",
    ],
  },
  {
    question: "About Our Locations",
    answer: [
      "You can find our ice cream at our flagship store in the city center, as well as at select partner cafes and restaurants throughout the region.",
      "We also participate in local farmers markets and food festivals during the warmer months. Follow our social media for the latest updates on where to find us.",
    ],
  },
]

export default function FAQPage({ title }: { title: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {

      // FAQ items staggered animation
      itemsRef.current.forEach((item, index) => {
        gsap.fromTo(
          item,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            delay: index * 0.1,
          },
        )
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <main ref={containerRef} className="min-h-screen bg-[#F7D6D9] text-primary">
      <div className="max-w-6xl mx-auto px-6 py-20 md:py-32">
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

        <div className="space-y-0">
          {faqs.map((faq, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) itemsRef.current[index] = el
              }}
              className="grid md:grid-cols-2 gap-6 md:gap-12 py-10 md:py-14 border-t  border-border/50 relative rounded-t-4xl"
            >
              {/* Decorative bracket */}

              <h2 className="font-semibold text-2xl md:text-3xl uppercase tracking-wide md:pl-8">
                {faq.question}
              </h2>

              <div className="space-y-4">
                {faq.answer.map((paragraph, pIndex) => (
                  <p key={pIndex} className="text-primary/75 leading-relaxed text-base md:text-lg">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
