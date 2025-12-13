"use client"

import {  useRef } from "react"

export default function InANutshell() {
  const textRef = useRef<SVGGElement>(null)

  // ==========================================
  // 🎛️ SHAPE CONTROLS
  // ==========================================
  const config = {
    width: 700, // Fixed calculations (400 * 1.5)
    height: 850, // Fixed calculations (500 * 1.5)
    gap: 25,     // Space between image and text
    textOffset: -8,
    imageBorderRadius: 200, // The radius of the image
  }

  // 1. Calculate the Radius for the Text Path
  // To keep curves parallel, outer radius = inner radius + gap
  const outerRadius = config.imageBorderRadius + config.gap

  // 2. Create a Rounded Rectangle Path Data String
  // This draws: Top-Line -> Right-Arc -> Right-Line -> Bottom-Arc -> Bottom-Line -> Left-Arc -> Left-Line -> Top-Arc
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
      {/* Red Section */}
      <div className="w-full bg-[#B01228] text-white rounded-b-[50vh] h-screen flex items-start pt-40 px-4 md:px-12 lg:px-20 relative">
        <div className="container mx-auto">
          {/* Text Content... */}
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 mb-24 lg:mb-40">
            <div className="w-full lg:w-1/2">
              <h2 className="text-5xl md:text-7xl lg:text-5xl font-black uppercase leading-[0.9] tracking-tighter font-sans">
                In a nutshell -<br />
                Ice cream that will
                <br />
                appeal even to those
                <br />
                who thought they
                <br />
                were completely
                <br />
                indifferent to it.
              </h2>
            </div>
            <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-6 text-base md:text-lg lg:text-xl font-medium opacity-90">
              <p>And in general - the business of people with absolutely "unfrozen" experience. To Mr.Pops.</p>
              <p>Now we feel like experimenters, actually, as in the beginning.</p>
              <p>
                We are like in a laboratory, where the result is tasted. If it suits us, it means it will definitely
                suit one of you!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Image container */}
      <div className="relative w-full flex justify-center" style={{ marginTop: "-280px" }}>

        {/* Desktop version */}
        <div
          className="hidden md:flex relative items-center justify-center"
          style={{ width: config.width, height: config.height }}
        >
          {/* 1. The Rotating Text Ring */}
          <svg
            viewBox={`0 0 ${config.width} ${config.height}`}
            className="absolute inset-0 w-full h-full overflow-visible z-10 pointer-events-none"
          >
            <defs>
              {/* CHANGED: From Ellipse to Rounded Rectangle Path */}
              <path id="textCirclePath" d={roundedRectPath} />
            </defs>

            {/* Added animate-spin class for rotation effect */}
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
            className="relative overflow-hidden border-4 border-[#B01228] z-0 shadow-xl"
            style={{
              width: `${config.width - config.gap * 2}px`,
              height: `${config.height - config.gap * 2}px`,
              borderRadius: `${config.imageBorderRadius}px`, // Matches the path geometry
            }}
          >
            <img
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

      <div className="h-10" />
    </section>
  )
}