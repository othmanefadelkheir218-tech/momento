"use client";

import { useId, useState } from "react";

// One question: the question as a button with a thin plus that turns into a minus; the answer
// opens softly underneath (height animation; none with reduced motion).

type Props = { question: string; answer: string[] };

export default function FaqItem({ question, answer }: Props) {
    const [open, setOpen] = useState(false);
    const id = useId();

    return (
        <div className="border-b border-burgundy/15">
            <h3>
                <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={id}
                    onClick={() => setOpen(!open)}
                    className="group flex w-full items-center justify-between gap-6 py-6 text-left rounded-sm focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-caramel"
                >
                    <span className="font-display font-medium text-burgundy text-[clamp(21px,1.6vw,28px)] leading-snug transition-colors group-hover:text-burgundy-dark">
                        {question}
                    </span>
                    <span aria-hidden className="relative h-4 w-4 shrink-0 text-caramel">
                        <span className="absolute left-0 top-1/2 h-px w-4 bg-current" />
                        <span
                            className={`absolute left-1/2 top-0 h-4 w-px bg-current transition-transform duration-500 motion-reduce:transition-none ${
                                open ? "scale-y-0" : "scale-y-100"
                            }`}
                        />
                    </span>
                </button>
            </h3>
            <div
                id={id}
                role="region"
                className={`grid transition-[grid-template-rows] duration-500 ease-out motion-reduce:transition-none ${
                    open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
            >
                <div className="overflow-hidden">
                    <div className="max-w-[62ch] space-y-3 pb-7 font-body text-[clamp(16px,1.05vw,19px)] leading-[1.65] text-chocolate">
                        {answer.map((p) => (
                            <p key={p}>{p}</p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
