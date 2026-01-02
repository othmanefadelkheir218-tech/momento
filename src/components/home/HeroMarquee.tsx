import React from 'react';
import Marque from '../Marque';
import { useTranslations } from 'next-intl';



const HeroMarquee = () => {
  const t = useTranslations("HomePage.HeroMarquee");

  return (
    <section className="h-[120vh] relative w-full flex items-center justify-center overflow-hidden -z-1 ">
      <div className="w-[120vw] -mr-vw] -rotate-12  ">
        <Marque
          PartOne={t("row1Part1")}
          PartTwo={t("row1Part2")}
          Direction={1}
          speed={0.07}
        />

        <Marque
          PartOne={t("row2Part1")}
          PartTwo={t("row2Part2")}
          Direction={-1}
          speed={0.1}
        />

        <Marque
          PartOne={t("row3Part1")}
          PartTwo={t("row3Part2")}
          Direction={1}
          speed={0.06}
        />

      </div>
    </section>
  );
};

export default HeroMarquee;
