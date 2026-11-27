// A form field that looks real but isn't typed into here: clicking it opens the partner page, where
// the full form is. Label above, an empty line with a thin underline (like an elegant form).

type Props = { label: string; onOpen: () => void; className?: string };

export default function TeaserField({ label, onOpen, className = "" }: Props) {
    return (
        <button
            type="button"
            onClick={onOpen}
            className={`group block w-full text-left rounded-sm focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-caramel ${className}`}
        >
            <span className="block font-body font-semibold text-[11px] uppercase tracking-[.18em] text-caramel">{label}</span>
            <span className="mt-3 block h-8 border-b border-burgundy/25 transition-colors duration-300 group-hover:border-burgundy" />
        </button>
    );
}
