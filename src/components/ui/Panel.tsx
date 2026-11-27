import { ReactNode } from "react";

// A rounded block inside the page (design rule: dark blocks are panels, not full-width bands, so
// the page stays one continuous surface).
//   burgundy → cream text, for the strong moments (story, franchise)
//   cream    → cream-dark background, for side boxes (shop list…)

type Props = {
    children: ReactNode;
    tone?: "burgundy" | "cream";
    className?: string;
};

const TONES = {
    burgundy: "bg-burgundy text-cream",
    cream: "bg-cream-dark text-ink border border-burgundy/10",
};

export default function Panel({ children, tone = "burgundy", className = "" }: Props) {
    return <div className={`rounded-[28px] ${TONES[tone]} ${className}`}>{children}</div>;
}
