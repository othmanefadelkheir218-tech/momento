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
}: {
    color?: string;
    width?: number;
    height?: number;
    strokeWidth?: number;
}) {
    return (
        <svg
            width={width}
            height={height}
            viewBox="68 0 364 384"
            preserveAspectRatio="none"
            fill="none"
            aria-hidden="true"
            className="shrink-0"
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
            className={`${sans.className} relative min-h-svh w-full overflow-hidden flex flex-col items-center justify-center px-4 py-16 text-center`}
            style={{
                color: WINE,
                backgroundColor: "#f7e3d6",
                backgroundImage: [
                    "radial-gradient(120% 80% at 0% 0%, rgba(255,255,255,0.65) 0%, transparent 55%)",
                    "radial-gradient(90% 70% at 100% 20%, rgba(232,196,175,0.55) 0%, transparent 60%)",
                    "radial-gradient(100% 90% at 20% 100%, rgba(240,205,185,0.7) 0%, transparent 60%)",
                    "linear-gradient(160deg, #fbece3 0%, #f6dfd0 45%, #f3d6c4 100%)",
                ].join(","),
            }}
        >
            {/* Language switcher — full page loads, only locale roots are reachable */}
            <nav className="absolute top-5 right-5 flex gap-3 text-xs tracking-[0.25em] uppercase" aria-label={t("language")}>
                {routing.locales.map((l) => (
                    <a
                        key={l}
                        href={`/${l}`}
                        hrefLang={l}
                        aria-current={l === locale ? "true" : undefined}
                        className={`transition-opacity ${l === locale ? "opacity-100 underline underline-offset-4" : "opacity-50 hover:opacity-90"}`}
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
                    className="h-auto w-72 sm:w-96"
                />
            </div>

            {/* Divider with hearts */}
            <div className="mt-10 flex w-full max-w-xl items-center gap-4">
                <Rule className="flex-1" />
                <HeartsIcon />
                <Rule className="flex-1" />
            </div>

            {/* Headline */}
            <h1 className={`${serif.className} mt-8 font-normal leading-[1.05]`}>
                <span className="block text-4xl sm:text-6xl md:text-7xl">{t("titleLine1")}</span>
                <span
                    className={`${playfairItalic.className} block text-4xl sm:text-6xl md:text-7xl mt-1`}
                    style={{ fontStyle: "italic", fontWeight: 400 }}
                >
                    {t("titleLine2")}
                </span>
            </h1>

            <p className="mt-10 max-w-2xl text-[11px] sm:text-sm tracking-[0.3em] uppercase leading-relaxed">
                {t("subtitle")}
            </p>

            {/* Badge */}
            <div className="mt-10 flex w-full max-w-xl items-center gap-6">
                <Rule className="flex-1" />
                <span
                    className="shrink-0 rounded-full border px-8 py-3 text-xs sm:text-sm tracking-[0.3em] uppercase"
                    style={{ borderColor: WINE }}
                >
                    {t("badge")}
                </span>
                <Rule className="flex-1" />
            </div>
        </div>
    );
}
