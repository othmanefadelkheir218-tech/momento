import type Lenis from "lenis";

// Takes the page back to the very top: smoothly through Lenis (the site's smooth scroll),
// or with the browser's own smooth scroll if Lenis is not there. prefers-reduced-motion: it jumps.
// Used by the footer's "Back to top" and the floating button (ScrollToTopFloating).

export function scrollToTop(lenis?: Lenis) {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (lenis) lenis.scrollTo(0, { immediate: reduce, duration: 1.6 });
    else window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
}
