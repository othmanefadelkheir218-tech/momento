import { ReactNode } from "react";

// Page section wrapper: the same width and the same vertical rhythm everywhere.
// Width: 1180px on laptops, growing with big screens up to 1480px (so a 1920px screen isn't half empty).
//   tone "cream" → no background: the section sits on the continuous cream page.
//   tone "warm"  → cream-dark (#EDE1CF). `fade` says where it melts into the cream:
//                  "both" (alone), "top" (first of a warm group), "bottom" (last), "none" (middle).
//                  Consecutive warm sections then form ONE warm area, with no cream stripes between.
// `className` is for page-specific placement (e.g. pulling a section up under the one before).

type Fade = "both" | "top" | "bottom" | "none";

type Props = {
    children: ReactNode;
    id?: string;
    "aria-label"?: string;
    tone?: "cream" | "warm";
    fade?: Fade;
    className?: string;
};

const CREAM = "#F7EFE2";
const WARM = "#EDE1CF";
const FADE = "110px";

function warmBackground(fade: Fade) {
    const top = fade === "both" || fade === "top" ? `${CREAM} 0, ${WARM} ${FADE}` : `${WARM} 0`;
    const bottom = fade === "both" || fade === "bottom" ? `${WARM} calc(100% - ${FADE}), ${CREAM} 100%` : `${WARM} 100%`;
    return `linear-gradient(to bottom, ${top}, ${bottom})`;
}

export default function Section({ children, id, tone = "cream", fade = "both", className = "", ...rest }: Props) {
    const warm = tone === "warm";
    const padTop = warm && (fade === "both" || fade === "top") ? "pt-[clamp(80px,7vw,120px)]" : "pt-[clamp(40px,4.5vw,72px)]";
    const padBottom = warm && (fade === "both" || fade === "bottom") ? "pb-[clamp(80px,7vw,120px)]" : "pb-[clamp(40px,4.5vw,72px)]";
    return (
        <section
            id={id}
            aria-label={rest["aria-label"]}
            className={`px-5 md:px-8 ${padTop} ${padBottom} ${className}`}
            style={warm ? { background: warmBackground(fade) } : undefined}
        >
            <div className="mx-auto w-full max-w-[clamp(1180px,78vw,1480px)]">{children}</div>
        </section>
    );
}
