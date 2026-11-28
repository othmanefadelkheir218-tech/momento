import Image from "next/image";
import { HAIRLINE, LABEL, NUMBER, number } from "@/components/ui/Hairline";
import type { MiniSeries } from "@/Data/miniSeries";

// One mini-series: number, season, title and what it is about; its cover picture when there is one;
// a link to watch it (or "Coming soon" when there is nothing to watch yet).

type Props = {
    index: number;
    series: MiniSeries;
    season: string;
    title: string;
    text: string;
    watchLabel: string;
    soonLabel: string;
    /** where "Watch the episodes" goes when the series has no Reel yet */
    fallbackHref: string | null;
};

export default function SeriesRow({ index, series, season, title, text, watchLabel, soonLabel, fallbackHref }: Props) {
    const href = series.reel || fallbackHref;
    return (
        <li className={`grid gap-5 border-b ${HAIRLINE} py-8 md:grid-cols-12 md:items-center md:gap-8`}>
            <span className={`${NUMBER} text-[clamp(30px,2.4vw,44px)] md:col-span-1`}>{number(index)}</span>
            <div className="md:col-span-6">
                <p className={LABEL}>{season}</p>
                <h3 className="mt-2 font-display font-medium text-burgundy text-[clamp(26px,2.2vw,40px)] leading-tight">{title}</h3>
                <p className="mt-2 font-body text-[clamp(16px,1.05vw,19px)] leading-[1.6] text-chocolate">{text}</p>
            </div>
            <div className="md:col-span-3">
                {series.image && (
                    <div className="relative aspect-[4/3] overflow-hidden rounded-[18px]">
                        <Image src={series.image} alt="" fill sizes="(max-width: 767px) 90vw, 280px" className="object-cover" />
                    </div>
                )}
            </div>
            <div className="md:col-span-2 md:text-right">
                {href ? (
                    <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 font-body text-[13px] font-semibold text-burgundy border-b border-burgundy/30 pb-0.5 hover:border-burgundy focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-caramel"
                    >
                        {watchLabel} <span aria-hidden>↗</span>
                    </a>
                ) : (
                    <span className={LABEL}>{soonLabel}</span>
                )}
            </div>
        </li>
    );
}
