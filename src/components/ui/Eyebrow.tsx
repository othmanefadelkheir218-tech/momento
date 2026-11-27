import { ReactNode } from "react";

// Small uppercase label above a heading, led by a thin hairline (same family as the hero's label).
// Design spec: Manrope 600, 12px, .18em, caramel.

type Props = { children: ReactNode; className?: string; centered?: boolean };

export default function Eyebrow({ children, className = "", centered = false }: Props) {
    return (
        <p
            className={`flex items-center gap-3 font-body font-semibold text-[12px] uppercase tracking-[.18em] text-caramel ${
                centered ? "justify-center" : ""
            } ${className}`}
        >
            <span aria-hidden className="h-px w-8 bg-current opacity-60" />
            {children}
            {centered && <span aria-hidden className="h-px w-8 bg-current opacity-60" />}
        </p>
    );
}
