"use client"

import { Reveal } from "@/components/animation/Reveal"
import Image from "next/image"
import { useRef } from "react"

export default function InANutshell() {
  const textRef = useRef<SVGGElement>(null)

  // ==========================================
  // 🎛️ SHAPE CONTROLS
  // ==========================================
  const config = {
    width: 700, 
    height: 850, 
    gap: 25,    
    textOffset: -8,
    imageBorderRadius: 200, 
  }

  const outerRadius = config.imageBorderRadius + config.gap
  const w = config.width
  const h = config.height
  const r = outerRadius

  const roundedRectPath = `
    M ${w / 2}, 0
    L ${w - r}, 0
    A ${r}, ${r} 0 0 1 ${w}, ${r}
    L ${w}, ${h - r}
    A ${r}, ${r} 0 0 1 ${w - r}, ${h}
    L ${r}, ${h}
    A ${r}, ${r} 0 0 1 0, ${h - r}
    L 0, ${r}
    A ${r}, ${r} 0 0 1 ${r}, 0
    Z
  `

  return (
    <section className="w-full bg-[#FFF5F0] min-h-screen">
      
      {/* 
         FIX 1: THE RED SECTION
         - Removed 'md:h-[130vh]'. We don't want a fixed height limit.
         - Added 'min-h-[80vh]' just for base aesthetic.
         - Added 'pb-[400px] lg:pb-[500px]'. This creates the empty space at the bottom 
           specifically for the image to overlap into, regardless of how much text there is above it.
      */}
      <div className="w-full bg-[#B01228] text-white md:rounded-b-[100px] lg:rounded-b-[200px] min-h-[80vh] flex items-start pt-40 px-4 md:px-12 lg:px-20 relative pb-[200px] md:pb-[400px] lg:pb-[500px]">
        <div className="container mx-auto">
          {/* Text Content... */}
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
            <div className="w-full lg:w-1/2">
              {
                [
                  "Ice cream that will",
                  "appeal even to those",
                  "who thought they",
                  "were completely",
                  "indifferent to it.",
                ].map((line, index) => (
                  <Reveal
                    key={index}
                    rotate={false}
                    delay={index * 0.2}
                  >
                    <h1 className="text-2xl md:text-5xl lg:text-5xl font-black uppercase trispace-font">
                      {line}
                    </h1>
                  </Reveal>
                ))
              }
            </div>

            <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-6 text-base md:text-lg lg:text-xl font-medium opacity-90">
              <p>And in general - the business of people with absolutely &quot;unfrozen&quot; experience. To Mr.Pops.</p>
              <p>Now we feel like experimenters, actually, as in the beginning.</p>
              <p>
                We are like in a laboratory, where the result is tasted. If it suits us, it means it will definitely
                suit one of you!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 
         FIX 2: THE IMAGE CONTAINER
         - Used negative margin relative to the padding we added above.
         - Added 'transform scale-...' classes. 
           Since your JS config calculates width=700px, on a zoomed screen that might be too wide.
           The scale classes (scale-75 md:scale-90 xl:scale-100) ensure it shrinks gracefully without breaking your JS math.
      */}
      <div className="relative w-full flex justify-center -mt-[180px] md:-mt-[350px] lg:-mt-[450px] pointer-events-none">

        {/* Desktop version */}
        <div
          className="hidden md:flex relative items-center justify-center transform scale-[0.6] md:scale-[0.7] lg:scale-[0.85] xl:scale-100 origin-top pointer-events-auto"
          style={{ width: config.width, height: config.height }}
        >
          {/* 1. The Rotating Text Ring */}
          <svg
            viewBox={`0 0 ${config.width} ${config.height}`}
            className="absolute inset-0 w-full h-full overflow-visible z-10 pointer-events-none"
          >
            <defs>
              <path id="textCirclePath" d={roundedRectPath} />
            </defs>

            <g ref={textRef} className="origin-center">
              <text fill="white" fontSize="18" fontWeight="bold" letterSpacing="5px" dy={config.textOffset}>
                <textPath href="#textCirclePath" className="uppercase font-sans drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]" startOffset="0%">
                  • TRU ICE CREAM • TRU ICE CREAM • TRU ICE CREAM • TRU ICE CREAM • TRU ICE CREAM • TRU ICE CREAM • TRU ICE CREAM • TRU ICE CREAM • TRU ICE CREAM • TRU ICE CREAM • TRU ICE CREAM • TRU ICE CREAM •
                </textPath>
              </text>
            </g>
          </svg>

          {/* 2. The Central Rectangle Image */}
          <div
            className="relative overflow-hidden border-4 border-[#B01228] z-0 shadow-xl bg-white"
            style={{
              width: `${config.width - config.gap * 2}px`,
              height: `${config.height - config.gap * 2}px`,
              borderRadius: `${config.imageBorderRadius}px`,
            }}
          >
            <Image
              fill
              src="/images/maven.jpg"
              alt="Smiling woman eating ice cream"
              className="w-full h-full object-cover"
            />

            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-[#B01228]/80 border-2 border-white/30 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                <div className="w-16 h-16 rounded-full border border-dashed border-white/50 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-20" />
    </section>
  )
}