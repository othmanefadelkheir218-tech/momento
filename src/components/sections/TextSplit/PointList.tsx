import { BODY, HAIRLINE, NUMBER, number } from "@/components/ui/Hairline";

// A short list of points: a thin number, the text, a hairline between them (no icons, no boxes).

export default function PointList({ items, className = "" }: { items: string[]; className?: string }) {
    return (
        <ol className={`border-t ${HAIRLINE} ${className}`}>
            {items.map((item, i) => (
                <li key={item} className={`flex items-baseline gap-5 border-b ${HAIRLINE} py-4`}>
                    <span className={`${NUMBER} text-[20px] w-7 shrink-0`}>{number(i)}</span>
                    <span className={BODY}>{item}</span>
                </li>
            ))}
        </ol>
    );
}
