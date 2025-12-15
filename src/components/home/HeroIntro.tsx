"use client";

import { CornerRightDown } from "lucide-react";
import BigWavyCircle from "../BigWavyCircle"; // Adjust path as needed
import { Reveal } from "../animation/Reveal";
import { useTransitionRouter } from "@/hooks/useTransitionRouter";

const HeroIntro = () => {
  const router = useTransitionRouter();

  return (
    // FIX APPLIED HERE:
    // 1. Removed 'lg:pt-0'. We need padding even on desktop to handle the 150% zoom overflow.
    // 2. Changed 'p-6' to 'px-6' and handled vertical padding via 'py-'.
    // 3. Added 'lg:py-20'. This ensures that if the screen is zoomed in and height shrinks, the text has breathing room at the top.
    <section className="min-h-screen w-full flex items-center justify-center px-6 py-24 lg:py-28 overflow-hidden relative">
      
      {/* Main Content Wrapper */}
      <div className="w-full flex flex-col items-center lg:items-start justify-center gap-4 lg:gap-0">

        {/* --- Top Section: Header & Paragraph --- */}
        <div className="flex flex-col lg:flex-row w-full h-full items-center lg:items-start">

          {/* --- LEFT SIDE: "TAKE YOUR SWEET" --- */}
          <div className="w-full lg:w-[80%] xlmax:w-[60%] relative flex flex-col items-center lg:block overflow-hidden">
            
            {/* Header Text: TAKE YOUR */}
            <Reveal delay={0.2}>
              {/* Added 'lg:leading-tight' to prevent line-height overlap on zoom */}
              <h1 className="trispace-font font-bold text-white text-[13vw] xlmax:text-[10em] lg:text-[9vw] leading-[1.2] lg:leading-tight text-center lg:text-end z-10 tracking-tight">
                TAKE YOUR
              </h1>
            </Reveal>

            {/* Row: SWEET + Button */}
            <div className="flex items-center justify-center lg:justify-end w-full gap-4 lg:gap-0">
              <Reveal delay={0.3}>
                <h1 className="trispace-font font-bold text-white text-[13vw] xlmax:text-[10em] lg:text-[9vw] leading-[1.2] lg:leading-tight text-center lg:text-left tracking-tight">
                  SWEET
                </h1>
              </Reveal>

              <BigWavyCircle
                rotate={true}
                rotateSpeed={5}
                rotateDirection="counter-clockwise"
                isButton={true}
                hoverTextColor="black"
                onClick={() => {
                  console.log("Catalogue clicked");
                  router.push("/menu")
                }}
                className="w-24 h-24 xlmax:w-40 xlmax:h-40 lg:w-32 lg:h-32 text-white shrink-0"
                fill="transparent"
                stroke="white"
                strokeWidth={2}
              >
                <span className="text-xs xlmax:text-lg lg:text-sm font-bold trispace-font uppercase">
                  Catalogue
                </span>
              </BigWavyCircle>
            </div>

            <Reveal delay={0.3}>
              <h1 className="sriracha-regular lg:hidden block font-bold text-white text-[16vw] xlmax:text-[13em] leading-[1.2] text-center lg:text-left tracking-tight">
                MOMENT
              </h1>
            </Reveal>
          </div>

          {/* --- RIGHT SIDE: Paragraph --- */}
          <div className="w-full lg:w-[40%] mt-6 lg:mt-2 lg:ml-10 flex items-center justify-center lg:justify-start pt-4 lg:pt-8">
            <p className="w-full max-w-[440px] lg:w-[440px] text-white text-sm md:text-lg
            sriracha-regular 
            italic leading-normal text-center lg:text-left font-handwriting opacity-90">
              Honestly, forget the messy stuff we used to eat... Momemto is on a
              whole other level. You can literally taste how clean and
              professional the process is no shortcuts here. Wait, is that the
              mixed berry? The color is so vibrant! And that one must be the
              tropical blend? It tastes like actual fruit, not just syrup. I
              love how careful they are with every single scoop. It&apos;s just...
              perfect. Seriously, grab me a spoon, I need to try that flavor too
            </p>
          </div>
        </div>

        {/* --- BOTTOM SECTION: "MOMENT" + Arrow --- */}
        <div className="w-full flex items-center justify-center relative mt-4 lg:mt-0">
          <Reveal delay={0.3} className="pr-4">
            <h1 className="sriracha-regular hidden lg:block font-bold text-white text-[16vw] xlmax:text-[13em] leading-[1.2] lg:leading-tight text-center lg:text-left tracking-tight">
              MOMENT
            </h1>
          </Reveal>

          {/* Arrow Icon */}
          <div className="hidden lg:block lg:mt-4 lg:ml-28 text-white">
            <CornerRightDown
              size={170}
              strokeWidth={0.7}
              className="opacity-90"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroIntro;