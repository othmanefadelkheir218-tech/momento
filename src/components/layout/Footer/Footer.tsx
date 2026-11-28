import Image from "next/image";
import { useTranslations } from "next-intl";
import { ROUTES } from "@/Data/routes";
import { COMPANY_EMAIL, COMPANY_FACEBOOK, COMPANY_INSTAGRAM, COMPANY_PHONE, COMPANY_TIKTOK } from "@/Data/socialmedia";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import FooterBounce from "./FooterBounce";
import FooterLink from "./FooterLink";

// The site footer: four quiet columns of text on cream-dark, and a top edge that bounces into
// place when the visitor reaches the bottom (FooterBounce). Everything above it moves; the footer
// stays simple: who we are, how to reach us, where to go, where to follow us.
// The old footer (newsletter + contact form) is kept in ./v1/.

const NAV = [
    { href: ROUTES.home, key: "home" },
    { href: ROUTES.creations, key: "creations" },
    { href: ROUTES.world, key: "world" },
    { href: ROUTES.characters, key: "characters" },
    { href: ROUTES.story, key: "story" },
    { href: ROUTES.questions, key: "questions" },
    { href: ROUTES.partner, key: "partner" },
    { href: ROUTES.contact, key: "contact" },
] as const;

// the small line of legal pages at the very bottom
const LEGAL = [
    { href: ROUTES.privacy, key: "privacy" },
    { href: ROUTES.cookies, key: "cookies" },
    { href: ROUTES.terms, key: "terms" },
    { href: ROUTES.allergens, key: "allergens" },
] as const;

// links that are still "#" (not created yet) are not shown
const SOCIAL = [
    { href: COMPANY_INSTAGRAM, key: "instagram" },
    { href: COMPANY_TIKTOK, key: "tiktok" },
    { href: COMPANY_FACEBOOK, key: "facebook" },
] as const;

/** the small caramel heading over each column */
const LABEL = "font-body text-xs font-semibold uppercase tracking-[0.2em] text-caramel";
const LIST = "mt-4 flex flex-col items-start gap-1.5 text-sm";

export default function Footer() {
    const t = useTranslations("SiteFooter");
    const nav = useTranslations("Navigation");

    return (
        // The top margin = the bounce band's height (FooterBounce): the edge draws and wobbles in this gap.
        <footer className="relative mt-24 bg-cream-dark font-body text-ink sm:mt-32 lg:mt-44">
            <FooterBounce />

            {/* data-footer-lift: FooterBounce moves this content with the edge's spring */}
            <div data-footer-lift className="container mx-auto px-4 pb-14 pt-2 sm:px-6 lg:px-8 lg:pb-16 lg:pt-4">
                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
                    {/* Who we are: the logo is this column's heading */}
                    <div>
                        <Image src="/logo/momento-logo-burgundy.png" alt="Momento" width={140} height={34} className="h-auto w-32" />
                        <p className={`mt-3 ${LABEL}`}>{t("tagline")}</p>
                        <p className="mt-6 max-w-[16rem] text-xs leading-relaxed text-ink/60">
                            {t("rights", { year: new Date().getFullYear() })}
                        </p>
                        <p className="mt-2 flex flex-wrap items-baseline gap-x-1 text-xs text-ink/60">
                            {t("createdBy")}
                            <FooterLink href="https://zakariya-devloper-profile.vercel.app/" label="Zakariya Zouazou" external className="text-ink/80" />
                        </p>
                    </div>

                    <div>
                        <p className={LABEL}>{t("contact")}</p>
                        <div className={LIST}>
                            <FooterLink href={`tel:${COMPANY_PHONE.replace(/\s/g, "")}`} label={COMPANY_PHONE} />
                            <FooterLink href={`mailto:${COMPANY_EMAIL}`} label={COMPANY_EMAIL} className="border-b border-ink/30 pb-0.5 hover:border-burgundy" />
                        </div>
                    </div>

                    <div>
                        <p className={LABEL}>{t("explore")}</p>
                        <ul className={LIST}>
                            {NAV.map((item) => (
                                <li key={item.href}>
                                    <FooterLink href={item.href} label={nav(item.key)} />
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <p className={LABEL}>{t("follow")}</p>
                        <ul className={LIST}>
                            {SOCIAL.filter((s) => s.href !== "#").map((s) => (
                                <li key={s.key}>
                                    <FooterLink href={s.href} label={t(`social.${s.key}`)} external />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom line, under a hairline: legal pages on the left, languages on the right.
                    ("Back to top" is the floating button, ui/ScrollToTopFloating.tsx; the earlier text
                    button that sat here is kept in ui/v1/ScrollToTopButton.tsx.) */}
                <div className="mt-12 flex flex-col gap-6 border-t border-ink/10 pt-6 md:flex-row md:items-center md:justify-between">
                    <nav aria-label={t("legal")} className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-ink/70">
                        {LEGAL.map((item) => (
                            <FooterLink key={item.href} href={item.href} label={nav(item.key)} />
                        ))}
                    </nav>
                    <LanguageSwitcher />

                </div>
            </div>
        </footer>
    );
}
