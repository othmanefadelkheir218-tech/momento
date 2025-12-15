"use client"
import { useState, useEffect } from 'react';

const useWidth = () => {
    // Start with 0 (safe for Server-Side Rendering)
    const [width, setWidth] = useState<number>(0);

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        };

        // 1. Add the listener
        window.addEventListener('resize', handleResize);

        // 2. Set the initial width
        // wrapping this in requestAnimationFrame makes it asynchronous,
        // fixing the "synchronous setState" linter error.
        requestAnimationFrame(() => {
            handleResize();
        });
        
        // 3. Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return width;
};

export default useWidth;