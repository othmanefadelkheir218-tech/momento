import { ReactNode } from "react";

// The handwritten accent word of a heading (design spec: Playball, in <em>, same colour, ~1.14×).
// In the translations, wrap the word in <accent>…</accent> and render the text with:
//     t.rich("title", { accent })

export const accent = (chunks: ReactNode) => (
    <em className="not-italic font-accent font-normal text-[1.14em] leading-none">{chunks}</em>
);
