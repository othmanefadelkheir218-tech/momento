// The hero title, split into lines and words (used by both hero versions).

/**
 * Renders "Chaque instant|a sa|<accent>douceur</accent>." — "|" starts a new line. The <accent> word
 * is Playball (design spec: one accent per heading, in <em>, same colour, ~1.14x). Hero v1 animates
 * the pieces (each word rises from a mask, the accent gets a "handwriting" wipe); v2 doesn't.
 */
export default function HeroTitle({ raw, oneLineOnDesktop = false }: { raw: string; oneLineOnDesktop?: boolean }) {
    const lineClass = oneLineOnDesktop ? "block md:inline" : "block";
    const words = (text: string, key: string) =>
        text.split(/(\s+)/).map((w, i) =>
            /^\s+$/.test(w) || !w ? (
                w
            ) : (
                <span key={`${key}-${i}`} className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em]">
                    <span className="hv2-w inline-block">{w}</span>
                </span>
            ),
        );

    return (
        <>
            {raw.split("|").map((line, li, all) => {
                const m = line.match(/^(.*?)<accent>(.*?)<\/accent>(.*)$/);
                return (
                    <span key={li} className={lineClass}>
                        {oneLineOnDesktop && li > 0 && li < all.length && <span className="hidden md:inline"> </span>}
                        <span className="inline-block">
                            {m ? (
                                <>
                                    {words(m[1], `b${li}`)}
                                    <em className="hv2-accent inline-block not-italic font-accent font-normal text-[1.14em] leading-[1.1] pr-[0.06em]">
                                        {m[2]}
                                    </em>
                                    {m[3] && <span className="hv2-dot inline-block">{m[3]}</span>}
                                </>
                            ) : (
                                words(line, `l${li}`)
                            )}
                        </span>
                    </span>
                );
            })}
        </>
    );
}
