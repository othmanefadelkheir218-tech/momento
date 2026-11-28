"use client";

import { NAV_TEXT } from "../navText";
import { LABEL } from "../Hairline";

// A choice among a few options (business type, subject, contact method): a row of small outlined
// buttons, the chosen one filled in burgundy. Works like radio buttons (keyboard + screen readers).

type Props = {
    name: string;
    label: string;
    options: { value: string; label: string }[];
    value: string;
    onChange: (value: string) => void;
    error?: string;
    className?: string;
};

export default function Choices({ name, label, options, value, onChange, error, className = "" }: Props) {
    return (
        <fieldset className={className}>
            <legend className={LABEL}>
                {label}
                <span aria-hidden> *</span>
            </legend>
            <div className="mt-3 flex flex-wrap gap-2.5">
                {options.map((option) => {
                    const checked = value === option.value;
                    return (
                        <label
                            key={option.value}
                            className={`cursor-pointer rounded-2xl border px-4 py-2.5 leading-none ${NAV_TEXT} transition-colors duration-300 has-focus-visible:outline-2 has-focus-visible:outline-offset-[3px] has-focus-visible:outline-caramel ${
                                checked ? "border-burgundy bg-burgundy text-cream" : "border-burgundy/30 text-burgundy hover:border-burgundy"
                            }`}
                        >
                            <input
                                type="radio"
                                name={name}
                                value={option.value}
                                checked={checked}
                                onChange={() => onChange(option.value)}
                                className="sr-only"
                            />
                            {option.label}
                        </label>
                    );
                })}
            </div>
            {error && <p className="mt-2 font-body text-[13px] text-burgundy">{error}</p>}
        </fieldset>
    );
}
