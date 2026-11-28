"use client";

import { LABEL } from "@/components/ui/Hairline";

// One filter (category or type): its label, then the choices as quiet words — the chosen one in
// burgundy, underlined. Works like radio buttons.

type Props<T extends string> = {
    label: string;
    options: { value: T; label: string }[];
    value: T;
    onChange: (value: T) => void;
};

export default function FilterRow<T extends string>({ label, options, value, onChange }: Props<T>) {
    return (
        <div role="radiogroup" aria-label={label} className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
            <span className={`${LABEL} w-full sm:w-24 sm:shrink-0`}>{label}</span>
            {options.map((option) => {
                const active = option.value === value;
                return (
                    <button
                        key={option.value}
                        type="button"
                        role="radio"
                        aria-checked={active}
                        onClick={() => onChange(option.value)}
                        className={`font-body text-[15px] font-medium underline-offset-[6px] decoration-1 transition-colors rounded-sm focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-caramel ${
                            active ? "text-burgundy underline" : "text-chocolate/70 hover:text-burgundy"
                        }`}
                    >
                        {option.label}
                    </button>
                );
            })}
        </div>
    );
}
