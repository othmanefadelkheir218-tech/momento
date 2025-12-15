"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface MarqueProps {
  PartOne: string;
  PartTwo: string;
  Direction?: number;
  speed?: number
}

export default function Marque({ PartOne, PartTwo, Direction = 1, speed = 0.1 }: MarqueProps) {
  const firstBlock = useRef(null);
  const secondBlock = useRef(null);
  const slider = useRef(null);


  const animation = () => {
    // 4. Wrap logic handles both directions automatically
    if (xPercent.current <= -100) {
      xPercent.current = 0;
    }
    if (xPercent.current > 0) {
      xPercent.current = -100;
    }

    gsap.set(firstBlock.current, { xPercent: xPercent.current });
    gsap.set(secondBlock.current, { xPercent: xPercent.current });

    // Speed constant (0.1)
    xPercent.current += speed * direction.current;
    requestAnimationFrame(animation);
  };



  // 1. Initialize direction based on prop. 
  // If Direction is 1, we start moving left (-1). If -1, we start moving right (1).
  const xPercent = useRef(0);
  const direction = useRef(Direction * -1);

  useGSAP(
    () => {
      requestAnimationFrame(animation);

      gsap.to(slider.current, {
        scrollTrigger: {
          trigger: document.documentElement,
          start: 0,
          end: "bottom bottom",
          scrub: 0.25,
          onUpdate: (e) => {
            // 2. CRITICAL CHANGE: 
            // Multiply scroll direction (e.direction) by your specific Direction prop.
            // When scrolling down (e.direction = 1):
            //   - If Direction prop is 1: result is -1 (Move Left)
            //   - If Direction prop is -1: result is 1 (Move Right)
            direction.current = e.direction * Direction * -1;
          },
        },
        // 3. Optional: Flip the parallax movement direction too
        x: `${-300 * Direction}px`,
      });
    },
    { scope: slider }
  );


  return (
    <main className="relative flex h-[200px] w-[120vw] overflow-hidden">
      <div className="absolute top-0">
        <div ref={slider} className="relative whitespace-nowrap">
          <div ref={firstBlock} className="relative inline-flex items-center">
            <MarqueeContent PartOne={PartOne} PartTwo={PartTwo} />
          </div>
          <div ref={secondBlock} className="absolute left-full top-0 inline-flex items-center">
            <MarqueeContent PartOne={PartOne} PartTwo={PartTwo} />
          </div>
        </div>
      </div>
    </main>
  );
}

// ... (Rest of your components: MarqueeContent, Phrase, etc. remain exactly the same)
const MarqueeContent = ({ PartOne, PartTwo }: { PartOne?: React.ReactNode, PartTwo?: React.ReactNode }) => {
  return (
    <>
      <Phrase>{PartOne}</Phrase>
      <h1 className="m-0 pr-20 text-[100px] md:text-[180px] font-bold uppercase leading-none tracking-tighter text-primary">
        {PartTwo}
      </h1>
    </>
  );
};

interface PhraseProps {
  children: React.ReactNode;
  className?: string;
}

const Phrase = ({ children, className = "" }: PhraseProps) => {
  return (
    <h1 className={`m-0 pr-20 text-[100px] md:text-[180px] font-bold uppercase leading-none tracking-tighter text-transparent [-webkit-text-stroke:2px_#DB212F] ${className}`}>
      {children}
    </h1>
  );
};