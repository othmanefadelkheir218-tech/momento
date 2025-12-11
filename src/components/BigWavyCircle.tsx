import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface BigWavyCircleProps extends Omit<React.SVGProps<SVGSVGElement>, "rotate"> {
    className?: string;
    fill?: string;
    stroke?: string;
    strokeWidth?: number | string;
    children?: React.ReactNode;
    animate?: boolean;
    duration?: number;
    rotate?: boolean;
    rotateSpeed?: number;
    rotateDirection?: "clockwise" | "counter-clockwise";
    isButton?: boolean;
    hoverTextColor?: string;
    hoverStrokeColor?: string;
    hoverStrokeWidth?: number | string;
    hoverFill?: string;
    onClick?: () => void;
}

export default function BigWavyCircle({
    className,
    fill = "white",
    stroke = "#1d1d1b",
    strokeWidth = 5.67,
    children,
    animate = false,
    duration = 2,
    rotate = false,
    rotateSpeed = 10,
    rotateDirection = "clockwise",
    isButton = false,
    hoverTextColor,
    onClick , 
    ...props
}: BigWavyCircleProps & {
    rotate?: boolean;
    rotateSpeed?: number;
    rotateDirection?: "clockwise" | "counter-clockwise";
    isButton?: boolean;
    hoverTextColor?: string;
    onClick?: () => void;
}) {
    const strokePathRef = useRef<SVGPathElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);
    const svgRef2 = useRef<SVGSVGElement>(null);
    const fillRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            // Handwriting animation
            if (animate && strokePathRef.current) {
                const length = strokePathRef.current.getTotalLength();
                gsap.set(strokePathRef.current, {
                    strokeDasharray: length,
                    strokeDashoffset: length,
                });
                gsap.to(strokePathRef.current, {
                    strokeDashoffset: 0,
                    duration: duration,
                    ease: "power2.out",
                });
            }

            // Rotation animation
            if (rotate && svgRef.current) {
                gsap.to(svgRef.current, {
                    rotation: rotateDirection === "clockwise" ? 360 : -360,
                    duration: rotateSpeed,
                    repeat: -1,
                    ease: "linear",
                });
            }

            if (rotate && svgRef2.current) {
                gsap.to(svgRef2.current, {
                    rotation: rotateDirection === "clockwise" ? 360 : -360,
                    duration: rotateSpeed / 1.5, // Faster rotation
                    repeat: -1,
                    ease: "linear",
                });
            }
        },
        { scope: containerRef, dependencies: [animate, duration, rotate, rotateSpeed, rotateDirection] }
    );

    const handleMouseEnter = () => {
        if (isButton) {
            if (hoverTextColor && containerRef.current) {
                gsap.to(containerRef.current.querySelector(".content-container"), {
                    color: hoverTextColor,
                    duration: 0.4,
                });
            }
            if (fillRef.current) {
                gsap.to(fillRef.current, {
                    top: "0%",
                    // opacity: 1,
                    duration: 0.4,
                    ease: "power2.out"
                });
            }
        }
    };

    const handleMouseLeave = () => {
        if (isButton) {
            if (hoverTextColor && containerRef.current) {
                gsap.to(containerRef.current.querySelector(".content-container"), {
                    color: "inherit", // Or revert to original color if known
                    delay: 0.3,
                    duration: 0.4,
                });
            }
            if (fillRef.current) {
                gsap.to(fillRef.current, {
                    top: "-100%",
                    // opacity: 0,
                    duration: 0.4,
                    ease: "power2.in",
                    onComplete: () => {
                        gsap.set(fillRef.current, { top: "100%" });
                    }
                });
            }
        }
    };

    return (
        <div
            ref={containerRef}
            onClick={onClick}
            className={`relative flex items-center justify-center  ${isButton ? "cursor-pointer" : ""} ${className || ""}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <svg
                ref={svgRef}
                id="Layer_1"
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 401.33 377.08"
                className="absolute inset-0 h-full w-full pointer-events-none"
                {...props}
            >
                <path
                    d="M495.47,398.21c0,16.44-18.05,30.1-22.51,45.21-4.58,15.49,3.06,36.71-5.56,50.19S436.25,509.15,424.28,520c-11.77,10.65-15.92,32.9-30.31,40.45-14,7.33-34.65-1.8-50.53,2-15.24,3.69-29.33,21.41-45.8,21.41s-30.57-17.72-45.81-21.41c-15.88-3.85-36.55,5.28-50.53-2-14.39-7.55-18.54-29.8-30.3-40.45-12-10.85-34.53-12.93-43.13-26.39s-1-34.7-5.55-50.19c-4.47-15.11-22.51-28.77-22.51-45.21s18-30.1,22.51-45.21c4.57-15.5-3.07-36.71,5.55-50.2S159,287.26,171,276.42c11.76-10.66,15.91-32.91,30.3-40.45,14-7.33,34.65,1.79,50.53-2.05,15.24-3.69,29.34-21.42,45.81-21.42s30.56,17.73,45.8,21.42C359.32,237.76,380,228.64,394,236c14.39,7.54,18.54,29.79,30.31,40.45,12,10.84,34.52,12.92,43.13,26.38s1,34.7,5.55,50.2C477.42,368.11,495.47,381.77,495.47,398.21Z"
                    transform="translate(-96.97 -209.67)"
                    fill={fill}
                />
                <path
                    ref={strokePathRef}
                    d="M495.47,398.21c0,16.44-18.05,30.1-22.51,45.21-4.58,15.49,3.06,36.71-5.56,50.19S436.25,509.15,424.28,520c-11.77,10.65-15.92,32.9-30.31,40.45-14,7.33-34.65-1.8-50.53,2-15.24,3.69-29.33,21.41-45.8,21.41s-30.57-17.72-45.81-21.41c-15.88-3.85-36.55,5.28-50.53-2-14.39-7.55-18.54-29.8-30.3-40.45-12-10.85-34.53-12.93-43.13-26.39s-1-34.7-5.55-50.19c-4.47-15.11-22.51-28.77-22.51-45.21s18-30.1,22.51-45.21c4.57-15.5-3.07-36.71,5.55-50.2S159,287.26,171,276.42c11.76-10.66,15.91-32.91,30.3-40.45,14-7.33,34.65,1.79,50.53-2.05,15.24-3.69,29.34-21.42,45.81-21.42s30.56,17.73,45.8,21.42C359.32,237.76,380,228.64,394,236c14.39,7.54,18.54,29.79,30.31,40.45,12,10.84,34.52,12.92,43.13,26.38s1,34.7,5.55,50.2C477.42,368.11,495.47,381.77,495.47,398.21Z"
                    transform="translate(-96.97 -209.67)"
                    fill="none"
                    stroke={stroke}
                    strokeMiterlimit="10"
                    strokeWidth={strokeWidth}
                />
            </svg>

            {rotate && (
                <svg
                    ref={svgRef2}
                    id="Layer_1_Copy"
                    data-name="Layer 1 Copy"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 401.33 377.08"
                    className="absolute inset-0 h-full w-full pointer-events-none"
                    {...props}
                >
                    <path
                        d="M495.47,398.21c0,16.44-18.05,30.1-22.51,45.21-4.58,15.49,3.06,36.71-5.56,50.19S436.25,509.15,424.28,520c-11.77,10.65-15.92,32.9-30.31,40.45-14,7.33-34.65-1.8-50.53,2-15.24,3.69-29.33,21.41-45.8,21.41s-30.57-17.72-45.81-21.41c-15.88-3.85-36.55,5.28-50.53-2-14.39-7.55-18.54-29.8-30.3-40.45-12-10.85-34.53-12.93-43.13-26.39s-1-34.7-5.55-50.19c-4.47-15.11-22.51-28.77-22.51-45.21s18-30.1,22.51-45.21c4.57-15.5-3.07-36.71,5.55-50.2S159,287.26,171,276.42c11.76-10.66,15.91-32.91,30.3-40.45,14-7.33,34.65,1.79,50.53-2.05,15.24-3.69,29.34-21.42,45.81-21.42s30.56,17.73,45.8,21.42C359.32,237.76,380,228.64,394,236c14.39,7.54,18.54,29.79,30.31,40.45,12,10.84,34.52,12.92,43.13,26.38s1,34.7,5.55,50.2C477.42,368.11,495.47,381.77,495.47,398.21Z"
                        transform="translate(-96.97 -209.67)"
                        fill={fill}
                    />
                    <path
                        d="M495.47,398.21c0,16.44-18.05,30.1-22.51,45.21-4.58,15.49,3.06,36.71-5.56,50.19S436.25,509.15,424.28,520c-11.77,10.65-15.92,32.9-30.31,40.45-14,7.33-34.65-1.8-50.53,2-15.24,3.69-29.33,21.41-45.8,21.41s-30.57-17.72-45.81-21.41c-15.88-3.85-36.55,5.28-50.53-2-14.39-7.55-18.54-29.8-30.3-40.45-12-10.85-34.53-12.93-43.13-26.39s-1-34.7-5.55-50.19c-4.47-15.11-22.51-28.77-22.51-45.21s18-30.1,22.51-45.21c4.57-15.5-3.07-36.71,5.55-50.2S159,287.26,171,276.42c11.76-10.66,15.91-32.91,30.3-40.45,14-7.33,34.65,1.79,50.53-2.05,15.24-3.69,29.34-21.42,45.81-21.42s30.56,17.73,45.8,21.42C359.32,237.76,380,228.64,394,236c14.39,7.54,18.54,29.79,30.31,40.45,12,10.84,34.52,12.92,43.13,26.38s1,34.7,5.55,50.2C477.42,368.11,495.47,381.77,495.47,398.21Z"
                        transform="translate(-96.97 -209.67)"
                        fill="none"
                        stroke={stroke}
                        strokeMiterlimit="10"
                        strokeWidth={strokeWidth}
                    />
                </svg>
            )}



            {isButton && (
                <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
                    <div
                        ref={fillRef}
                        style={{ backgroundColor: stroke  }}
                        className="w-full h-full absolute left-0 top-full rounded-full "
                    ></div>
                </div>
            )}

            {children && <div className="content-container relative z-10">{children}</div>}
        </div>
    );
}
