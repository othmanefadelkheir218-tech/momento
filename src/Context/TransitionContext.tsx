// components/TransitionContext.tsx
"use client";

import { useRouter, usePathname } from "@/i18n/navigation";
import React, { createContext, useContext, useState, useRef, useEffect } from "react";

// If the route hasn't changed this long after covering the screen (failed
// fetch, same-URL push, ...), lift the curtain so the user is never stuck.
const NAVIGATION_TIMEOUT_MS = 8000;

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
  triggerEnterAnimation,
}: {
  children: React.ReactNode;
  triggerExitAnimation: () => Promise<void>;
  triggerEnterAnimation: () => void;
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [introSeen, setIntroSeen] = useState<boolean>(pathname !== "/");

  // Ref mirror: always current inside async callbacks / timers
  const isAnimatingRef = useRef(false);
  const fallbackTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [prevPathname, setPrevPathname] = useState(pathname);

  // Check for path change during the render phase
  // If the path has changed, we reset isAnimating immediately.
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    if (isAnimating) {
      setIsAnimating(false);
    }
  }

  // Route arrived: the safety fallback is no longer needed
  useEffect(() => {
    isAnimatingRef.current = false;
    if (fallbackTimer.current) clearTimeout(fallbackTimer.current);
    fallbackTimer.current = null;
  }, [pathname]);

  useEffect(() => () => {
    if (fallbackTimer.current) clearTimeout(fallbackTimer.current);
  }, []);

  const animatePageOut = async (href: string) => {
    if (isAnimatingRef.current) return; // Prevent double clicks

    isAnimatingRef.current = true;
    setIsAnimating(true);

    // 1. Play the Exit Animation (Cover screen)
    try {
      await triggerExitAnimation();
    } catch (error) {
      console.error("Animation failed", error);
    }

    // 2. Arm the safety net, then navigate to the new route
    if (fallbackTimer.current) clearTimeout(fallbackTimer.current);
    fallbackTimer.current = setTimeout(() => {
      fallbackTimer.current = null;
      if (!isAnimatingRef.current) return;
      isAnimatingRef.current = false;
      setIsAnimating(false);
      triggerEnterAnimation();
    }, NAVIGATION_TIMEOUT_MS);

    router.push(href);
  };

  return (
    <TransitionContext.Provider value={{ animatePageOut, isAnimating, introSeen, setIntroSeen }}>
      {children}
    </TransitionContext.Provider>
  );
};
