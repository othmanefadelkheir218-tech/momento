import { getTranslations } from "next-intl/server";
import { Playfair_Display, Jost } from "next/font/google";
import Image from "next/image";
import { routing } from "@/i18n/routing";

const serif = Playfair_Display({
    subsets: ["latin"],
    weight: ["400", "500"],
    style: ["normal", "italic"],
    display: "swap",
});

// Dedicated Playfair Display Italic for the second headline line
// ("getting a fresh new look.").
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

const WINE = "#7a0f1f";
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

function Rule({ className = "" }: { className?: string }) {
    return (
        <span
            className={`block h-px ${className}`}
            style={{ background: `linear-gradient(90deg, transparent, ${GOLD} 25%, ${GOLD} 75%, transparent)` }}
        />
    );
}

export default async function ComingSoon({ locale }: { locale: string }) {
    const t = await getTranslations({ locale, namespace: "ComingSoon" });

    return (
        <div
            className={`${sans.className} fixed inset-0 h-dvh w-full overflow-hidden overscroll-none flex flex-col items-center justify-center text-center`}
            style={{
                color: WINE,
                padding: "clamp(12px, 4vh, 48px) clamp(16px, 5vw, 48px)",
                backgroundColor: "#f7e3d6",
                backgroundImage: [
                    "radial-gradient(120% 80% at 0% 0%, rgba(255,255,255,0.65) 0%, transparent 55%)",
                    "radial-gradient(90% 70% at 100% 20%, rgba(232,196,175,0.55) 0%, transparent 60%)",
                    "radial-gradient(100% 90% at 20% 100%, rgba(240,205,185,0.7) 0%, transparent 60%)",
                    "linear-gradient(160deg, #fbece3 0%, #f6dfd0 45%, #f3d6c4 100%)",
                ].join(","),
            }}
        >
            {/* Lock the page: no scrollbars, no overscroll / rubber-band bounce (also at 150% zoom) */}
            <style>{`
                html, body {
                    height: 100%;
                    overflow: hidden !important;
                    overscroll-behavior: none;
                }
                body { touch-action: none; }
            `}</style>

            {/* Language switcher — full page loads, only locale roots are reachable */}
            <nav
                className="absolute flex uppercase"
                style={{
                    top: "clamp(10px, 2.5vh, 20px)",
                    right: "clamp(12px, 3vw, 20px)",
                    gap: "clamp(8px, 1.5vw, 12px)",
                    fontSize: "clamp(10px, 1.6vh, 12px)",
                    letterSpacing: "0.25em",
                }}
                aria-label={t("language")}
            >
                {routing.locales.map((l) => (
                    <a
                        key={l}
                        href={`/${l}`}
                        hrefLang={l}
                        aria-current={l === locale ? "true" : undefined}
                        className={`p-1 transition-opacity ${l === locale ? "opacity-100 underline underline-offset-4" : "opacity-50 hover:opacity-90"}`}
                    >
                        {l}
                    </a>
                ))}
            </nav>

            {/* Logo */}
            <div className="flex justify-center">
                <Image
                    src="/Momento Dessert Wordmark.png"
                    alt="Momento Dessert"
                    width={2172}
                    height={724}
                    priority
                    sizes="(max-width: 640px) 75vw, 384px"
                    className="h-auto"
                    style={{ width: "clamp(160px, min(75vw, 40vh), 384px)" }}
                />
            </div>

            {/* Divider with hearts */}
            <div
                className="flex w-full max-w-xl items-center"
                style={{ marginTop: "clamp(10px, 4vh, 40px)", gap: "clamp(10px, 2vw, 16px)" }}
            >
                <Rule className="flex-1" />
                <span className="flex" style={{ width: "clamp(36px, min(10vw, 6.5vh), 56px)", aspectRatio: "56 / 44" }}>
                    <HeartsIcon width={56} height={44} className="h-full w-full" />
                </span>
                <Rule className="flex-1" />
            </div>

            {/* Headline */}
            <h1
                className={`${serif.className} font-normal text-balance`}
                style={{
                    marginTop: "clamp(8px, 3.5vh, 32px)",
                    fontSize: "clamp(26px, min(9.5vw, 8.5vh), 76px)",
                    lineHeight: 1.08,
                }}
            >
                <span className="block">{t("titleLine1")}</span>
                <span
                    className={`${playfairItalic.className} block`}
                    style={{ fontStyle: "italic", fontWeight: 400, marginTop: "0.05em" }}
                >
                    {t("titleLine2")}
                </span>
            </h1>

            <p
                className="max-w-2xl uppercase text-balance"
                style={{
                    marginTop: "clamp(10px, 4vh, 40px)",
                    fontSize: "clamp(10px, min(2.8vw, 2vh), 14px)",
                    letterSpacing: "0.3em",
                    lineHeight: 1.7,
                }}
            >
                {t("subtitle")}
            </p>

            {/* Badge */}
            <div
                className="flex w-full max-w-xl items-center"
                style={{ marginTop: "clamp(10px, 4vh, 40px)", gap: "clamp(12px, 3vw, 24px)" }}
            >
                <Rule className="flex-1" />
                <span
                    className="shrink-0 rounded-full border uppercase whitespace-nowrap"
                    style={{
                        borderColor: WINE,
                        fontSize: "clamp(10px, min(2.8vw, 2vh), 14px)",
                        letterSpacing: "0.3em",
                        padding: "clamp(7px, 1.5vh, 12px) clamp(20px, 5vw, 32px)",
                    }}
                >
                    {t("badge")}
                </span>
                <Rule className="flex-1" />
            </div>
        </div>
    );
}
