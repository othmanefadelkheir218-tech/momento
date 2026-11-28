// Shared text styles for the editorial lists (numbers, small labels, hairlines), so every page
// uses exactly the same ones.

/** "01", "02"… */
export const number = (i: number) => String(i + 1).padStart(2, "0");

/** the thin caramel number in front of a list item */
export const NUMBER = "font-display font-medium text-caramel/80 leading-none";

/** small caramel uppercase label (fields, table heads, captions) */
export const LABEL = "font-body font-semibold text-[11px] uppercase tracking-[.18em] text-caramel";

/** a thin line between items */
export const HAIRLINE = "border-burgundy/15";

/** body text size used in lists */
export const BODY = "font-body text-[clamp(16px,1.05vw,19px)] leading-[1.65] text-chocolate";
