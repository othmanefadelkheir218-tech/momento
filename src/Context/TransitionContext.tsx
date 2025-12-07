// components/TransitionContext.tsx
"use client";

import { useRouter, usePathname } from "@/i18n/navigation";
import React, { createContext, useContext, useState, useEffect } from "react";


// Define the shape of our context
interface TransitionContextType {
  animatePageOut: (href: string) => void;
  isAnimating: boolean;
  introSeen: boolean;
  setIntroSeen: (seen: boolean) => void;
}

const TransitionContext = createContext<TransitionContextType>({
  animatePageOut: () => { },
  isAnimating: false,
  introSeen: false,
  setIntroSeen: () => { },
});

export const useTransition = () => useContext(TransitionContext);

export const TransitionProvider = ({
  children,
  triggerExitAnimation, // This function comes from the GSAP component
}: {
  children: React.ReactNode;
  triggerExitAnimation: () => Promise<void>; // Needs to return a promise so we wait for it
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [introSeen, setIntroSeen] = useState<boolean>(false);

  // Reset isAnimating when the route changes
  useEffect(() => {
    setIsAnimating(false);
  }, [pathname]);

  const animatePageOut = async (href: string) => {
    if (isAnimating) return; // Prevent double clicks

    setIsAnimating(true);

    console.log("its clicked here 22", href);


    // 1. Play the Exit Animation (Cover screen)
    try {
      await triggerExitAnimation();
    } catch (error) {
      console.error("Animation failed", error);
    }

    // 2. NOW navigate to the new route
    router.push(href);


    // Note: setIsAnimating(false) will happen automatically
    // via the useEffect above when the route changes
  };

  return (
    <TransitionContext.Provider value={{ animatePageOut, isAnimating, introSeen, setIntroSeen }}>
      {children}
    </TransitionContext.Provider>
  );
};