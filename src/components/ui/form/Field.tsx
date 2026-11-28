import { LABEL } from "../Hairline";

// A form field in the Momento style: small caramel label, then an open line with a thin underline
// (no box). `multiline` gives a text area. The error, if any, is shown under the line.

type Props = {
    name: string;
    label: string;
    type?: "text" | "email" | "tel";
    multiline?: boolean;
    required?: boolean;
    error?: string;
    autoComplete?: string;
    className?: string;
};

const INPUT =
    "mt-2 block w-full bg-transparent border-0 border-b border-burgundy/25 px-0 py-2.5 font-body text-[17px] text-ink " +
    "outline-none transition-colors duration-300 placeholder:text-chocolate/40 hover:border-burgundy/50 focus:border-burgundy";

export default function Field({ name, label, type = "text", multiline, required, error, autoComplete, className = "" }: Props) {
    const id = `field-${name}`;
    const errorId = error ? `${id}-error` : undefined;
    const common = { id, name, required, autoComplete, "aria-invalid": Boolean(error), "aria-describedby": errorId };
    return (
        <div className={className}>
            <label htmlFor={id} className={LABEL}>
                {label}
                {required && <span aria-hidden> *</span>}
            </label>
            {multiline ? (
                <textarea {...common} rows={4} className={`${INPUT} resize-y min-h-[120px]`} />
            ) : (
                <input {...common} type={type} className={INPUT} />
            )}
            {error && (
                <p id={errorId} className="mt-2 font-body text-[13px] text-burgundy">
                    {error}
                </p>
            )}
        </div>
    );
}
