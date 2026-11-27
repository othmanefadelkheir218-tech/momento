import { ReactNode } from "react";
import Eyebrow from "./Eyebrow";

// Eyebrow + title (h2) + optional intro text, styled by the design spec.
//   tone "dark"  → burgundy title, chocolate text (on cream)
//   tone "light" → cream title and text (on burgundy)

type Props = {
    eyebrow: ReactNode;
    title: ReactNode;
    text?: ReactNode;
    tone?: "dark" | "light";
    align?: "left" | "center";
    className?: string;
};

export default function SectionHeading({ eyebrow, title, text, tone = "dark", align = "left", className = "" }: Props) {
    const light = tone === "light";
    const center = align === "center";
    return (
        <div className={`${center ? "text-center mx-auto" : ""} ${className}`}>
            <Eyebrow centered={center}>{eyebrow}</Eyebrow>
            <h2
                className={`mt-5 font-display font-medium leading-[1.06] tracking-[-0.01em] text-[clamp(34px,4.2vw,72px)] text-balance ${
                    light ? "text-cream" : "text-burgundy"
                }`}
            >
                {title}
            </h2>
            {text && (
                <p
                    className={`mt-6 font-body text-[clamp(17px,1.15vw,22px)] leading-[1.65] max-w-[48ch] ${
                        light ? "text-cream/90" : "text-chocolate"
                    } ${center ? "mx-auto" : ""}`}
                >
                    {text}
                </p>
            )}
        </div>
    );
}
