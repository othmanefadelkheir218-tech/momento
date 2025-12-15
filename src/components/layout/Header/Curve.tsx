'use client';

import React, { useEffect, useState } from 'react';

// Assuming you have props like this
interface CurveProps {
    isActive: boolean;
}

export default function Curve({ isActive }: CurveProps) {
    // 1. We only need state for window dimensions
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const resize = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        // Initialize dimensions
        resize();

        window.addEventListener("resize", resize);
        return () => window.removeEventListener("resize", resize);
    }, []);

    // 2. Calculate paths directly in the render body
    // If width is 0 (SSR or initial load), return empty paths
    const initialPath = dimensions.width > 0 
        ? `M100 0 L100 ${dimensions.height} Q-100 ${dimensions.height / 2} 100 0` 
        : "";

    const targetPath = dimensions.width > 0 
        ? `M100 0 L100 ${dimensions.height} Q100 ${dimensions.height / 2} 100 0` 
        : "";

    // 3. Determine the current path based on props
    // No "useEffect" needed -> React handles the switch automatically
    const currentPath = isActive ? targetPath : initialPath;

    // 4. Define the transition style dynamically
    const transitionStyle = {
        transition: `d ${isActive ? 1000 : 800}ms cubic-bezier(0.76, 0, 0.24, 1)`
    };

    return (
        <svg className="absolute top-0 -left-[99px] w-[100px] h-full fill-primary stroke-none">
            <path 
                d={currentPath} 
                style={transitionStyle}
            />
        </svg>
    );
}