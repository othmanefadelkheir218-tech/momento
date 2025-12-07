"use client"
import { useState, useEffect } from 'react';

const useWidth = () => {
    const [width, setWidth] = useState<number>(0);

    useEffect(() => {
        // Set initial width
        setWidth(window.innerWidth);
        
        const handleResize = () => {
            setWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        
        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return width;
};

export default useWidth;