"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useLenis } from "lenis/react";
import { ArrowUp } from "lucide-react";
import MomentoButton from "./MomentoButton";
import { scrollToTop } from "./scrollToTop";

// The "back to top" button, fixed at the bottom-right of the screen on every page.
// It is a MomentoButton (the site's button: same shape, rising hover fill, magnetic arrow),
// as a round icon button. It fades in once the visitor has scrolled a little, and stays
// there down to the very bottom, footer included.
// Placed once for the whole site, in app/[locale]/layout.tsx.

const SHOW_AFTER = 400; // px scrolled before it appears

export default function ScrollToTopFloating() {
    const t = useTranslations("SiteFooter");
    const lenis = useLenis();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > SHOW_AFTER);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        // inert while hidden: it can't be clicked or reached with the keyboard
        <div
            inert={!visible}
            className={`fixed bottom-5 right-4 z-20 rounded-2xl shadow-[0_10px_28px_-10px_rgb(74_44_33/0.45)] transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none sm:bottom-8 sm:right-8 ${
                visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
            }`}
        >
            <MomentoButton onClick={() => scrollToTop(lenis)} label={t("backToTop")}>
                <ArrowUp aria-hidden size={20} strokeWidth={1.75} />
            </MomentoButton>
        </div>
    );
}
