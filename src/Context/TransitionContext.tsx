// components/TransitionContext.tsx
"use client";

import { useRouter, usePathname } from "@/i18n/navigation";
import React, { createContext, useContext, useState, useRef } from "react"; // Added useRef

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
  triggerExitAnimation,
}: {
  children: React.ReactNode;
  triggerExitAnimation: () => Promise<void>;
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [introSeen, setIntroSeen] = useState<boolean>(pathname !== "/");

  const [prevPathname, setPrevPathname] = useState(pathname);

  // FIX: Check for path change during the render phase
  // If the path has changed, we reset isAnimating immediately.
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    if (isAnimating) {
      setIsAnimating(false);
    }
  }

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
  };

  return (
    <TransitionContext.Provider value={{ animatePageOut, isAnimating, introSeen, setIntroSeen }}>
      {children}
    </TransitionContext.Provider>
  );
};