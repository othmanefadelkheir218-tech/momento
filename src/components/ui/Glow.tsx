// A soft light behind a picture or a product, for depth. It has no edge at all (a radial fade),
// so it never reads as a band or a box.
//   tone "warm"  → cream-dark light, for the plain cream page
//   tone "light" → white-cream light, for warm (cream-dark) sections
// Place it inside a `relative isolate` parent (isolate keeps it above the page background);
// size and position come from `className`.

const COLOURS = {
    warm: "radial-gradient(closest-side, #EDE1CF 0%, rgb(237 225 207 / 0.55) 55%, transparent 100%)",
    light: "radial-gradient(closest-side, #FFFBF5 0%, rgb(255 251 245 / 0.6) 55%, transparent 100%)",
};

export default function Glow({ className = "", tone = "warm" }: { className?: string; tone?: "warm" | "light" }) {
    return (
        <div
            aria-hidden
            className={`pointer-events-none absolute -z-10 rounded-full ${className}`}
            style={{ background: COLOURS[tone] }}
        />
    );
}
