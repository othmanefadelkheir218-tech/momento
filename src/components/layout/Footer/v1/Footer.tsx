// OLD FOOTER (v1): newsletter form + contact form on burgundy. Replaced by ../Footer.tsx (the
// four-column footer with the bouncing top edge). Not imported anywhere. To switch back, import
// this file in src/app/[locale]/layout.tsx instead of "@/components/layout/Footer/Footer".

import FooterSection from "./FooterSection";
import FooterSection2 from "./FooterSection2";

export default function Footer() {
  return (
    <>
      <FooterSection />
      <FooterSection2 />
    </>
  );
}