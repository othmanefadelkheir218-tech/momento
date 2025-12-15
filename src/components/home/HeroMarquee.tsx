import React from 'react';
import Marque from '../Marque';



const HeroMarquee = () => {

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
