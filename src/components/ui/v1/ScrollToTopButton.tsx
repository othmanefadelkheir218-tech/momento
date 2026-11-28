// v1 (not used): the "Back to top" text button that sat in the footer's bottom line.
// Replaced by the floating MomentoButton in ../ScrollToTopFloating.tsx. To switch back: move this file
// up to src/components/ui/, then put <ScrollToTopButton /> next to <LanguageSwitcher /> in Footer.tsx.

"use client";

import { useTranslations } from "next-intl";
import { useLenis } from "lenis/react";
import { ArrowUp } from "lucide-react";
import { scrollToTop } from "../scrollToTop";

// "Back to top": quiet text with a small arrow in a thin ring. On hover the ring fills burgundy
// and the arrow lifts a little. Smooth scroll through Lenis; with prefers-reduced-motion it jumps.
// Used in the footer's bottom line.

type Props = {
    className?: string;
};

export default function ScrollToTopButton({ className = "" }: Props) {
    const t = useTranslations("SiteFooter");
    const lenis = useLenis();

    return (
        <button
            type="button"
            onClick={() => scrollToTop(lenis)}
            className={`group inline-flex cursor-pointer items-center gap-3 rounded-sm font-body text-xs font-semibold uppercase tracking-[0.14em] text-ink/70 transition-colors duration-300 hover:text-burgundy focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-caramel ${className}`}
        >
            {t("backToTop")}
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-burgundy/40 text-burgundy transition-colors duration-300 group-hover:border-burgundy group-hover:bg-burgundy group-hover:text-cream">
                <ArrowUp
                    aria-hidden
                    size={15}
                    strokeWidth={1.75}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0"
                />
            </span>
        </button>
    );
}
