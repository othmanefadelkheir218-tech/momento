// Smoothly scrolls to the element with this id (e.g. a form further down the page).
// Reduced motion: jumps straight there.

export function scrollToId(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const top = el.getBoundingClientRect().top + window.scrollY - 96; // leave room for the header
    window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
}
