"use client";

import CostumButton from "@/components/CostumButton";
import { useTransitionRouter } from "@/hooks/useTransitionRouter";

// The Momento button: the header button's shape (16px radius, 1.5px border) and its hover fill
// (a colour rises from the bottom, magnetic text). Only the font (Manrope) and the colours change.
//
//   primary → burgundy button, cream text; on hover it fills with cream, text burgundy (on cream)
//   light   → cream button, burgundy text        (on burgundy backgrounds)
//   ghost   → outlined burgundy, see-through     (secondary actions on cream)

type Variant = "primary" | "light" | "ghost";

const VARIANTS: Record<Variant, { className: string; fill: string; hoverText: string }> = {
    primary: { className: "bg-burgundy text-cream border-burgundy", fill: "#F7EFE2", hoverText: "#751B32" },
    light: { className: "bg-cream text-burgundy border-cream", fill: "#5A1124", hoverText: "#F7EFE2" },
    ghost: { className: "bg-cream/60 text-burgundy border-burgundy", fill: "#751B32", hoverText: "#F7EFE2" },
};

type Props = {
    href: string;
    children: string;
    variant?: Variant;
    /** Opens in a new tab (Instagram, TikTok…). Internal pages use the page transition. */
    external?: boolean;
    className?: string;
};

export default function MomentoButton({ href, children, variant = "primary", external = false, className = "" }: Props) {
    const router = useTransitionRouter();
    const style = VARIANTS[variant];

    const go = () => {
        if (external) window.open(href, "_blank", "noopener,noreferrer");
        else router.push(href);
    };

    return (
        <CostumButton
            role="link"
            tabIndex={0}
            onClick={go}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    go();
                }
            }}
            backgroundColor={style.fill}
            hoverTextColor={style.hoverText}
            className={`rounded-2xl! border-[1.5px]! px-7 py-4 focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-caramel ${style.className} ${className}`}
        >
            <span className="block font-body font-semibold text-sm tracking-[.04em] leading-none whitespace-nowrap">
                {children}
            </span>
        </CostumButton>
    );
}
