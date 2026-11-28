import { BODY, HAIRLINE, NUMBER, number } from "@/components/ui/Hairline";

// One numbered article of a legal page: number, title, paragraphs and an optional list.

export type Article = { title: string; body: string[]; items?: string[] };

export default function LegalArticle({ index, article }: { index: number; article: Article }) {
    return (
        <li className={`grid gap-3 border-b ${HAIRLINE} py-8 sm:grid-cols-[64px_minmax(0,1fr)] sm:gap-6`}>
            <span className={`${NUMBER} text-[28px]`}>{number(index)}</span>
            <div>
                <h2 className="font-display font-medium text-burgundy text-[clamp(24px,1.9vw,32px)] leading-tight">{article.title}</h2>
                <div className={`mt-3 space-y-3 ${BODY}`}>
                    {article.body.map((p) => (
                        <p key={p}>{p}</p>
                    ))}
                </div>
                {article.items && (
                    <ul className={`mt-3 space-y-2 ${BODY}`}>
                        {article.items.map((item) => (
                            <li key={item} className="flex gap-3">
                                <span aria-hidden className="mt-[0.8em] h-px w-4 shrink-0 bg-caramel" />
                                {item}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </li>
    );
}
