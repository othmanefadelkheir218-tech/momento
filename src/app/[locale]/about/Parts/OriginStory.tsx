"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { MotionPathPlugin } from "gsap/MotionPathPlugin"
import DirectionSvg from "@/components/DirectionSvg"

// Register plugins
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin)

export default function OriginStory() {
  const containerRef = useRef<HTMLDivElement>(null)
  const followerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Initial state: Hidden
      gsap.set(followerRef.current, { autoAlpha: 0, scale: 0.5 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          // -----------------------------------------------------------
          // 1. SPEED & DURATION CONTROL
          // -----------------------------------------------------------
          // 'start': When top of container hits 80% of viewport height
          // 'end': When bottom of container hits 20% of viewport height
          start: "top 80%",
          end: "bottom 20%",

          // 'scrub': This controls the "Lag" or "Physics".
          // 1.5 = Slow/Floaty. 
          // 0.1 = Very Fast/Responsive. 
          // Change this number to control how fast it catches up to the scroll.
          scrub: 0.05,

          // -----------------------------------------------------------
          // 2. VISIBILITY CONTROL (Show only when in view)
          // -----------------------------------------------------------
          onEnter: () => gsap.to(followerRef.current, { autoAlpha: 1, scale: 1, duration: 0.5 }),
          onLeave: () => gsap.to(followerRef.current, { autoAlpha: 0, scale: 0.5, duration: 0.5 }),
          onEnterBack: () => gsap.to(followerRef.current, { autoAlpha: 1, scale: 1, duration: 0.5 }),
          onLeaveBack: () => gsap.to(followerRef.current, { autoAlpha: 0, scale: 0.5, duration: 0.5 }),
        },
      })

      // Animate the "M" logo along the path
      tl.to(followerRef.current, {
        motionPath: {
          path: "#my-custom-path",
          align: "#my-custom-path",
          alignOrigin: [0.5, 0.5],
          autoRotate: true,
          start: 0, // 0 = Beginning of SVG path
          end: 1,   // 1 = End of SVG path
        },
        ease: "none", // IMPORTANT: Keep 'none' for linear movement tied to scroll
      })

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef}
      // -----------------------------------------------------------
      // 3. PADDING CONTROL
      // -----------------------------------------------------------
      // Changed py-26 to py-48 (roughly 12rem/192px). 
      // Increase this if you want more empty space at start/end.
      className="relative z-20 w-full bg-[#FFF5F0] overflow-hidden py-48"
    >

      {/* SVG LAYER */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 mt-20">
        <DirectionSvg className="w-full h-[95%]" />
      </div>

      {/* THE FLOATING "M" FOLLOWER (Visibility controlled by GSAP now) */}
      <div
        ref={followerRef}
        className="hidden md:flex absolute top-0 left-0 z-10 w-20 h-20 lg:w-28 lg:h-28 rounded-full bg-gradient-to-br from-[#C41E3A] to-[#8B1428] items-center justify-center text-white shadow-2xl border-4 border-white/20 opacity-0"
        style={{ willChange: "transform, opacity" }}
      >
        <div className="relative h-full w-full flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-[#C41E3A] opacity-20 blur-xl"></div>
          <div className="absolute inset-3 border-2 border-white/40 rounded-full"></div>
          <span className="text-5xl lg:text-7xl font-bold font-serif text-white relative z-10" style={{ textShadow: "0 2px 10px rgba(0,0,0,0.3)" }}>
            M
          </span>
        </div>
      </div>

      {/* CONTENT SECTION */}
      <div className="relative z-15 container mx-auto px-6 md:px-10 lg:px-16 flex flex-col gap-40 md:gap-48">

        {/* SECTION 1 */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center h-[85vh]">
          <div className="w-full lg:w-1/2 relative h-[450px] md:h-[600px] lg:h-[750px] group">
            <div className="w-full h-full bg-gray-200 overflow-hidden relative rounded-2xl shadow-2xl group-hover:scale-[1.02] transition-transform duration-500">
              <img
                src="https://images.unsplash.com/photo-1550950158-d0d960dff51b?q=80&w=2680&auto=format&fit=crop"
                alt="Man holding popsicles"
                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          </div>
          <div className="w-full lg:w-1/2 lg:pl-8">
            <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold text-[#C41E3A] leading-[0.9] uppercase mb-10 tracking-tight">
              How <br /><span className="text-[#8B1428]">Originated</span><br /> Idea
            </h2>
            <p className="text-[#5A1A1F] text-lg md:text-xl leading-relaxed max-w-lg font-light">
              In America, there is such a product—popsicle. It is something like our popsicle on a stick, but on a fruit basis.
            </p>
          </div>
        </div>

        {/* SECTION 2 */}
        <div className="flex flex-col lg:flex-row-reverse gap-12 lg:gap-16 items-center min-h-[70vh]">
          <div className="w-full lg:w-1/2 group">
            <div className="relative w-full aspect-video bg-gray-200 rounded-2xl overflow-hidden shadow-2xl group-hover:scale-[1.02] transition-transform duration-500">
              <img
                src="https://images.unsplash.com/photo-1481391319719-62d2259a61ca?q=80&w=2680&auto=format&fit=crop"
                alt="Ingredients"
                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          </div>
          <div className="w-full lg:w-1/2 lg:pr-8">
            <h3 className="text-5xl md:text-6xl font-bold text-[#C41E3A] uppercase mb-8 tracking-tight leading-tight">
              Pure <span className="text-[#8B1428]">Fruits</span>
            </h3>
            <p className="text-[#5A1A1F] text-lg md:text-xl leading-relaxed max-w-lg font-light">
              We decided to forgo artificial flavorings entirely.
            </p>
          </div>
        </div>

        {/* SECTION 3 */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center min-h-[70vh] pb-20">
          <div className="w-full lg:w-1/2 group">
            <div className="relative w-full aspect-square bg-gray-200 rounded-2xl overflow-hidden shadow-2xl group-hover:scale-[1.02] transition-transform duration-500">
              <img
                src="https://images.unsplash.com/photo-1560008581-09826d1de69e?q=80&w=2544&auto=format&fit=crop"
                alt="Final Product"
                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          </div>
          <div className="w-full lg:w-1/2 lg:pl-8">
            <h3 className="text-5xl md:text-6xl font-bold text-[#C41E3A] uppercase mb-8 tracking-tight leading-tight">
              The <span className="text-[#8B1428]">Result</span>
            </h3>
            <p className="text-[#5A1A1F] text-lg md:text-xl leading-relaxed max-w-lg font-light">
              The result was a texture that is neither ice nor sorbet, but something creamy.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}