"use client";
import { useState, useEffect } from "react";

/**
 * Returns `true` when the window has been scrolled down, otherwise `false`.
 */
const useScroll = (): boolean => {
    const [isScrolled, setIsScrolled] = useState<boolean>(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };
        // Initialise state
        handleScroll();
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return isScrolled;
};

export default useScroll;
