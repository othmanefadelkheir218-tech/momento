import { getTranslations } from "next-intl/server";
import { Playfair_Display, Jost } from "next/font/google";
import Image, { getImageProps } from "next/image";
import { routing } from "@/i18n/routing";
import BackgroundPicture from "./BackgroundPicture";
import { BG_DESKTOP_PLACEHOLDER, BG_MOBILE_PLACEHOLDER } from "./placeholders";

const serif = Playfair_Display({
    subsets: ["latin"],
    weight: ["400", "500"],
    style: ["normal", "italic"],
    display: "swap",
});

// Dedicated Playfair Display Italic for the emphasized part of the headline
// ("fresh new look.").
const playfairItalic = Playfair_Display({
    subsets: ["latin"],
    weight: ["400"],
    style: ["italic"],
    display: "swap",
});

const sans = Jost({
    subsets: ["latin"],
    weight: ["400", "500"],
    display: "swap",
});

const WINE = "#6b0f1f";
const INK = "#4a1418";
const GOLD = "#c9a063";

// Heart floral icon (from public/heart_icon.svg), inlined so the color is customizable.
// Rendered slightly wider than tall; the stroke stays even thanks to non-scaling-stroke.
function HeartsIcon({
    color = GOLD,
    width = 56,
    height = 44,
    strokeWidth = 1.6,
    className = "",
}: {
    color?: string;
    width?: number;
    height?: number;
    strokeWidth?: number;
    className?: string;
}) {
    return (
        <svg
            width={width}
            height={height}
            viewBox="68 0 364 384"
            preserveAspectRatio="none"
            fill="none"
            aria-hidden="true"
            className={`shrink-0 ${className}`}
        >
            <g
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
            >
                {/* Outer heart */}
                <path
                    vectorEffect="non-scaling-stroke"
                    d="M250 375 C215 340 145 290 105 235 C67 183 75 126 111 104 C151 80 207 108 250 202 C293 108 349 80 389 104 C425 126 433 183 395 235 C355 290 285 340 250 375 Z"
                />
                {/* Central petal */}
                <path
                    vectorEffect="non-scaling-stroke"
                    d="M250 202 C231 160 190 116 185 73 C180 34 211 8 250 8 C289 8 320 34 315 73 C310 116 269 160 250 202"
                />
            </g>
        </svg>
    );
}

function Rule() {
    return (
        <span
            className="cs-rule block h-px"
            style={{ background: `linear-gradient(90deg, transparent, ${GOLD} 30%, ${GOLD} 70%, transparent)` }}
        />
    );
}

// Scoped styles: fluid sizes driven by the viewport width AND height, so the
// layout fits one screen at any zoom level (e.g. 150%) and on mobile.
const styles = `
    html, body {
        height: 100%;
        overflow: hidden !important;
        overscroll-behavior: none;
    }
    body { touch-action: none; }

    .cs-root {
        position: fixed;
        inset: 0;
        height: 100dvh;
        width: 100%;
        overflow: hidden;
        overscroll-behavior: none;
        background-color: #f3d2bd;
    }
    /* Background fills the screen; anchored to the top so the wall (text area) stays visible */
    .cs-frame {
        position: absolute;
        inset: 0;
        overflow: hidden;
    }
    /* Instant blurred preview under the real image (also the fallback if it fails) */
    .cs-frame::before {
        content: "";
        position: absolute;
        inset: 0;
        background: var(--cs-ph-desktop) center top / cover no-repeat;
        filter: blur(18px);
        transform: scale(1.08);
    }
    .cs-bg {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center top;
    }
    /* Soft light behind the text so it stays readable on any crop */
    .cs-veil {
        position: absolute;
        inset: 0;
        pointer-events: none;
        background:
            radial-gradient(ellipse 60% 48% at 50% 18%, rgba(255, 241, 230, 0.55) 0%, rgba(255, 241, 230, 0) 70%);
    }
    .cs-content {
        position: relative;
        z-index: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        padding: clamp(14px, 4.5vh, 44px) clamp(16px, 5vw, 48px) 0;
    }
    .cs-logo { width: clamp(150px, min(24vw, 30vh), 360px); height: auto; }
    .cs-divider {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: clamp(10px, 1.4vw, 16px);
        width: clamp(240px, 32vw, 460px);
        margin-top: clamp(8px, 2.6vh, 26px);
    }
    .cs-rule { flex: 1; }
    .cs-heart { width: clamp(30px, min(3vw, 5.2vh), 46px); aspect-ratio: 56 / 44; display: flex; }
    .cs-title {
        margin-top: clamp(6px, 2vh, 20px);
        font-size: clamp(22px, min(3.5vw, 6.4vh), 52px);
        line-height: 1.15;
        font-weight: 400;
        color: ${INK};
        text-wrap: balance;
    }
    .cs-title em { color: ${WINE}; }
    .cs-badge {
        margin-top: clamp(8px, 2.6vh, 24px);
        font-size: clamp(10px, min(1vw, 1.9vh), 14px);
        letter-spacing: 0.4em;
        padding-left: 0.4em; /* optically center the tracked text */
        font-weight: 500;
        color: ${INK};
        text-transform: uppercase;
        white-space: nowrap;
    }
    .cs-lang {
        position: absolute;
        z-index: 2;
        top: clamp(10px, 2.2vh, 18px);
        right: clamp(10px, 2.5vw, 20px);
        display: flex;
        gap: 2px;
        padding: 4px 6px;
        border-radius: 999px;
        background: rgba(255, 244, 236, 0.72);
        -webkit-backdrop-filter: blur(6px);
        backdrop-filter: blur(6px);
        font-size: clamp(10px, 1.5vh, 12px);
        letter-spacing: 0.2em;
        text-transform: uppercase;
        color: ${WINE};
    }
    .cs-lang a { padding: 4px 6px 4px 8px; border-radius: 999px; transition: opacity .2s, background-color .2s; }

    /* Mobile / portrait: bigger type, title wraps, focus the crop on the chalkboard */
    @media (max-aspect-ratio: 1/1) {
        /* Portrait art: keep the characters + chalkboard centered, wall on top */
        .cs-bg { object-position: center top; }
        .cs-frame::before { background-image: var(--cs-ph-mobile); }
        .cs-veil {
            background:
                linear-gradient(to bottom, rgba(255, 241, 230, 0.45) 0%, rgba(255, 241, 230, 0.3) 30%, rgba(255, 241, 230, 0) 46%);
        }
        .cs-content { padding-top: clamp(52px, 8vh, 80px); }
        .cs-logo { width: clamp(150px, min(58vw, 22vh), 300px); }
        .cs-divider { width: min(78vw, 360px); }
        .cs-heart { width: clamp(30px, min(9vw, 5vh), 44px); }
        .cs-title { font-size: clamp(22px, min(7.4vw, 4.4vh), 40px); max-width: 22ch; }
        .cs-badge { font-size: clamp(10px, min(3vw, 1.7vh), 13px); }
    }
`;

export default async function ComingSoon({ locale }: { locale: string }) {
    const t = await getTranslations({ locale, namespace: "ComingSoon" });

    // Desktop (2:1) and mobile (portrait) backgrounds, optimized by next/image.
    const { props: desktopBg } = getImageProps({
        src: "/bg_hero_2.png",
        alt: "",
        width: 1774,
        height: 887,
        quality: 90,
        priority: true,
        // cover: as wide as the screen, or 2x the height on narrower screens
        sizes: "max(100vw, 200vh)",
    });
    const { props: mobileBg } = getImageProps({
        src: "/bg_hero_2_mobile.jpeg",
        alt: "",
        width: 1051,
        height: 1496,
        quality: 90,
        // portrait cover: as wide as ~70% of the screen height
        sizes: "max(100vw, 71vh)",
    });

    return (
        <div
            className={`${sans.className} cs-root`}
            style={
                {
                    "--cs-ph-desktop": `url("${BG_DESKTOP_PLACEHOLDER}")`,
                    "--cs-ph-mobile": `url("${BG_MOBILE_PLACEHOLDER}")`,
                } as React.CSSProperties
            }
        >
            {/* Start downloading the right background immediately (only the matching one) */}
            <link
                rel="preload"
                as="image"
                imageSrcSet={desktopBg.srcSet}
                imageSizes={desktopBg.sizes}
                media="not all and (max-aspect-ratio: 1/1)"
                fetchPriority="high"
            />
            <link
                rel="preload"
                as="image"
                imageSrcSet={mobileBg.srcSet}
                imageSizes={mobileBg.sizes}
                media="(max-aspect-ratio: 1/1)"
                fetchPriority="high"
            />
            <style>{styles}</style>

            {/* Background illustration */}
            <div className="cs-frame">
                <BackgroundPicture
                    desktop={desktopBg}
                    mobile={{ srcSet: mobileBg.srcSet, sizes: mobileBg.sizes }}
                    className="cs-bg"
                />
            </div>
            <div className="cs-veil" aria-hidden="true" />

            {/* Language switcher — full page loads, only locale roots are reachable */}
            <nav className="cs-lang" aria-label={t("language")}>
                {routing.locales.map((l) => (
                    <a
                        key={l}
                        href={`/${l}`}
                        hrefLang={l}
                        aria-current={l === locale ? "true" : undefined}
                        className={l === locale ? "bg-white/70 opacity-100" : "opacity-60 hover:opacity-100"}
                    >
                        {l}
                    </a>
                ))}
            </nav>

            <div className="cs-content">
                {/* Logo */}
                <Image
                    src="/Momento Dessert Wordmark.png"
                    alt="Momento Dessert"
                    width={2172}
                    height={724}
                    priority
                    sizes="(max-aspect-ratio: 1/1) 60vw, 320px"
                    className="cs-logo"
                />

                {/* Divider with heart */}
                <div className="cs-divider">
                    <Rule />
                    <span className="cs-heart">
                        <HeartsIcon width={56} height={44} className="h-full w-full" />
                    </span>
                    <Rule />
                </div>

                {/* Headline: plain start + Playfair Display Italic emphasis */}
                <h1 className={`${serif.className} cs-title`}>
                    {t("titleStart")}{" "}
                    <em className={playfairItalic.className} style={{ fontStyle: "italic", fontWeight: 400 }}>
                        {t("titleEmphasis")}
                    </em>
                </h1>

                <p className="cs-badge">{t("badge")}</p>
            </div>
        </div>
    );
}
