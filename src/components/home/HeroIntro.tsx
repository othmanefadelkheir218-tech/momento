"use client";

import { CornerRightDown } from "lucide-react";
import BigWavyCircle from "../BigWavyCircle"; // Adjust path as needed
import { Reveal } from "../animation/Reveal";
import { useTransitionRouter } from "@/hooks/useTransitionRouter";


const HeroIntro = () => {
  const router = useTransitionRouter();

  return (
    // Changed h-screen to min-h-screen to prevent content cutoff on small mobile screens
    <section className="min-h-screen pt-16 lg:pt-0 w-full flex items-center justify-center p-6 lg:p-12 overflow-hidden  relative">
      {/* Added bg color just for visibility in example, remove if you have a background image */}

      {/* Main Content Wrapper */}
      <div className="xlmax:container w-full flex flex-col items-center lg:items-start justify-center gap-4 lg:gap-0">

        {/* --- Top Section: Header & Paragraph --- */}
        {/* Mobile: Flex Column (stack), Desktop: Flex Row (side by side) */}
        <div className="flex flex-col lg:flex-row w-full h-full items-center lg:items-start">

          {/* --- LEFT SIDE: "TAKE YOUR SWEET" --- */}
          <div className="w-full lg:w-[80%] xlmax:w-[60%] relative flex flex-col items-center lg:block overflow-hidden">
            {/* Header Text: TAKE YOUR */}

            <Reveal delay={0.2}>
              <h1 className="trispace-font font-bold text-white text-[13vw] xlmax:text-[10em] lg:text-[9vw] leading-[1.2] text-center lg:text-end z-10 tracking-tight ">
                TAKE YOUR
              </h1>
            </Reveal>
            {/* Row: SWEET + Button */}
            {/* Mobile: Justify Center, Desktop: Justify End */}
            <div className="flex items-center justify-center lg:justify-end w-full gap-4 lg:gap-0">

              <Reveal delay={0.3}>
                <h1 className="trispace-font font-bold text-white text-[13vw] xlmax:text-[10em] lg:text-[9vw] leading-[1.2] text-center lg:text-left tracking-tight">
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
                // Made smaller on mobile (w-24), kept original size on desktop (lg:w-40)
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
              <h1 className="sriracha-regular lg:hidden block font-bold text-white text-[16vw]  xlmax:text-[13em] leading-[1.2] text-center lg:text-left tracking-tight">
                MOMENT
              </h1>
            </Reveal>
          </div>

          {/* --- RIGHT SIDE: Paragraph --- */}
          {/* Mobile: width full & centered, Desktop: width 40% & left aligned */}
          <div className="w-full lg:w-[40%] mt-6 lg:mt-2 lg:ml-10 flex items-center justify-center lg:justify-start pt-4 lg:pt-8">
            <p className="w-full max-w-[440px] lg:w-[440px] text-white text-sm md:text-lg
            sriracha-regular 
            italic leading-normal text-center lg:text-left font-handwriting opacity-90">
              Honestly, forget the messy stuff we used to eat... Momemto is on a
              whole other level. You can literally taste how clean and
              professional the process is no shortcuts here. Wait, is that the
              mixed berry? The color is so vibrant! And that one must be the
              tropical blend? It tastes like actual fruit, not just syrup. I
              love how careful they are with every single scoop. It's just...
              perfect. Seriously, grab me a spoon, I need to try that flavor too
            </p>
          </div>
        </div>

        {/* --- BOTTOM SECTION: "MOMENT" + Arrow --- */}
        <div className="w-full flex items-center justify-center relative mt-4 lg:mt-0">
          {/* Header Text */}
          <Reveal delay={0.3} className="pr-4">
            <h1 className="sriracha-regular hidden lg:block font-bold text-white text-[16vw]  xlmax:text-[13em] leading-[1.2] text-center lg:text-left tracking-tight">
              MOMENT
            </h1>
          </Reveal>

          {/* Arrow Icon - Kept hidden on mobile as per original logic, change 'hidden' to 'block' if you want it on mobile */}
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