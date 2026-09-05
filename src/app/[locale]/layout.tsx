import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { ThemeProvider } from "@/components/ThemeProvider";
import Header from "@/components/layout/Header/Header";
import { Geist, Geist_Mono } from "next/font/google";
import TransitionWrapper from "@/components/TransitionWrapper";
import ReactLenis from "lenis/react";
import { Analytics } from "@vercel/analytics/next";

import "../globals.css";
import Footer from "@/components/layout/Footer/Footer";
import type { Metadata } from "next";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Metadata" });

    const baseUrl = process.env.NEXT_BASE_URL || "https://momento-artisanal.com"; // Provide a fallback if not set

    return {
        title: {
            default: t("title"),
            template: `%s | ${t("title")}`
        },
        description: t("description"),
        metadataBase: new URL(baseUrl),
        alternates: {
            canonical: "/",
            languages: {
                "en": "/en",
                "fr": "/fr",
                "de": "/de",
                "nl": "/nl",
            },
        },
        openGraph: {
            type: "website",
            locale: locale,
            url: baseUrl,
            siteName: "Momento",
            images: [
                {
                    url: "/share.jpg",
                    width: 4168,
                    height: 1405,
                    alt: t("title"),
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: t("title"),
            description: t("description"),
            images: ["/share.jpg"],
        },
        manifest: "/meta/site.webmanifest",
        icons: {
            icon: [
                { url: "/favicon.ico", sizes: "any" },
                { url: "/meta/favicon.svg", type: "image/svg+xml" },
                { url: "/meta/favicon-32x32.png", sizes: "32x32", type: "image/png" },
                { url: "/meta/favicon-16x16.png", sizes: "16x16", type: "image/png" },
            ],
            apple: [{ url: "/meta/apple-touch-icon.png", sizes: "180x180" }],
            other: [
                { rel: "mask-icon", url: "/meta/safari-pinned-tab.svg", color: "#DB212F" },
            ],
        },
    };
}

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});



export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    // Ensure that the incoming `locale` is valid
    if (!routing.locales.includes(locale as "en" | "de" | "fr" | "nl")) {
        notFound();
    }

    // Providing all messages to the client
    // side is the easiest way to get started
    const messages = await getMessages();

    return (
        <html lang={locale} suppressHydrationWarning>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground transition-colors duration-300`}
            >
                <NextIntlClientProvider messages={messages}>
                    <ReactLenis root>
                        <ThemeProvider
                            attribute="class"
                            defaultTheme="light"
                            enableSystem
                            disableTransitionOnChange
                        >
                            <TransitionWrapper>
                                <Header />
                                <main className="min-h-screen">
                                    {children}
                                </main>
                                <Footer />
                            </TransitionWrapper>
                        </ThemeProvider>
                    </ReactLenis>
                </NextIntlClientProvider>
                <Analytics />
            </body>
        </html>
    );
}
