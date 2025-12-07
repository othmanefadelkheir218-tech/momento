import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Marque from '../Marque';

interface HeroMarqueeProps {
  // Define props here if any
}

const HeroMarquee: React.FC<HeroMarqueeProps> = () => {

  return (
    <section className="h-[120vh] relative w-full flex items-center justify-center overflow-hidden -z-1 ">
      <div className="w-[120vw] -mr-vw] -rotate-12  ">
        <Marque
          PartOne="TAKE YOUR MOMENT *"
          PartTwo="Small Moments, Big Memories *"
          Direction={1}
          speed={0.07}
        />
        <Marque
          PartOne="The Secret is in the Creme *"
          PartTwo="Authentic Artisanal Recipes *"
          Direction={-1}
          speed={0.1}
        />
        <Marque
          PartOne="Tradition Meets Creativity *"
          PartTwo="100% Halal Certified *"
          Direction={1}
          speed={0.06}
        />
      </div>
    </section>
  );
};

export default HeroMarquee;
