"use client";
import { useState, useEffect, useRef } from "react";

/**
 * Returns `true` when the user is scrolling down, `false` when scrolling up or at top.
 */
const useScroll = (): boolean => {
    const [isScrolledDown, setIsScrolledDown] = useState<boolean>(false);
    const lastY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentY = window.scrollY;
            if (currentY <= 0) {
                setIsScrolledDown(false);
            } else if (currentY > lastY.current) {
                setIsScrolledDown(true);   // scrolling down → hide header
            } else {
                setIsScrolledDown(false);  // scrolling up → show header immediately
            }
            lastY.current = currentY;
        };

        lastY.current = window.scrollY;
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return isScrolledDown;
};

export default useScroll;
