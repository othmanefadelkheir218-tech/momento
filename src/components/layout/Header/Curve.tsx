"use client";
import React, { useRef, useEffect, useState } from "react";

interface CurveProps {
  isActive: boolean;
}

export default function Curve({ isActive }: CurveProps) {
  const svgPath = useRef<SVGPathElement>(null);
  const [currentPath, setCurrentPath] = useState<string>("");

  useEffect(() => {
    const height = window.innerHeight;
    const initialPath = `M100 0 L100 ${height} Q-100 ${height / 2} 100 0`;

    // Set initial path on mount
    if (!currentPath && svgPath.current) {
      svgPath.current.setAttribute("d", initialPath);
      setCurrentPath(initialPath);
    }
  }, []);

  useEffect(() => {
    if (!svgPath.current) return;

    const height = window.innerHeight;
    const initialPath = `M100 0 L100 ${height} Q-100 ${height / 2} 100 0`;
    const targetPath = `M100 0 L100 ${height} Q100 ${height / 2} 100 0`;

    const newPath = isActive ? targetPath : initialPath;
    
    // Apply CSS transition
    svgPath.current.style.transition = `d ${isActive ? 1000 : 800}ms cubic-bezier(0.76, 0, 0.24, 1)`;
    svgPath.current.setAttribute("d", newPath);
    setCurrentPath(newPath);

  }, [isActive]);

  return (
    <svg className="absolute top-0 -left-[99px] w-[100px] h-full fill-primary stroke-none pointer-events-none">
      <path ref={svgPath} />
    </svg>
  );
}