"use client";

import { useTranslations } from "next-intl";
import BigWavyCircle from "../BigWavyCircle";
import { Reveal } from "../animation/Reveal";
import { useTransitionRouter } from "@/hooks/useTransitionRouter";

const HeroIntro = () => {
  const router = useTransitionRouter();
  const t = useTranslations("HomePage");

  return (
    <section className="min-h-screen w-full flex items-end justify-center px-6 md:px-12 lg:px-20 py-24 lg:py-28 overflow-hidden relative">

      {/* Main Content Container */}
      <div className="w-full max-w-7xl flex flex-col items-center justify-center relative">

        {/* Catalog Button - Positioned on the right */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10 hidden md:block lg:right-0 xl:right-8">
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
              {t("catalogueButton")}
            </span>
          </BigWavyCircle>
        </div>

        {/* Main Heading */}
        <div className="text-center w-full mb-8 lg:mb-12">
          <Reveal delay={0.2}>
            <h1 className="trispace-font font-black text-white text-[12vw] sm:text-[10vw] md:text-[9vw] lg:text-[8vw] xl:text-[7vw] leading-[0.95] tracking-tight uppercase">
              {t("MainHeading1")}
            </h1>
          </Reveal>
          <Reveal delay={0.3}>
            <h1 className="trispace-font font-black text-white text-[12vw] sm:text-[10vw] md:text-[9vw] lg:text-[8vw] xl:text-[7vw] leading-[0.95] tracking-tight uppercase -mt-2 md:-mt-4">
              {t("MainHeading2")}
            </h1>
          </Reveal>
        </div>

        {/* Description Paragraph */}
        <Reveal delay={0.4}>
          <div className="w-full max-w-3xl px-4 md:px-8 lg:px-12">
            <p className="text-white text-sm sm:text-base md:text-lg leading-relaxed text-center font-normal opacity-90">
              {t("MainDescription")}
            </p>
          </div>
        </Reveal>

        {/* Mobile Catalog Button */}
        <div className="mt-10 md:hidden">
          <Reveal delay={0.5}>
            <BigWavyCircle
              rotate={true}
              rotateSpeed={5}
              rotateDirection="counter-clockwise"
              isButton={true}
              hoverTextColor="black"
              onClick={() => {
                console.log("Catalogue clicked");
                router.push("/menu");
              }}
              className="w-24 h-24 text-white shrink-0"
              fill="transparent"
              stroke="white"
              strokeWidth={1.5}
            >
              <span className="text-xs font-bold trispace-font uppercase tracking-wider">
                Catalog
              </span>
            </BigWavyCircle>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default HeroIntro;