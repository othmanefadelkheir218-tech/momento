// Text split into letters for the scroll colour wave (see useColorWave.ts).
// Each letter carries its final colour; until the wave runs (or on phones / reduced motion) the
// letters simply show that final colour, so the text always reads normally.
// `text` may contain one <accent>word</accent> (Playball, design spec). Words never break inside.
// Screen readers get the plain text once; the letters are hidden from them.

import { Fragment } from "react";

const ACCENT_CLASS = "not-italic font-accent font-normal text-[1.14em] leading-none";

type Props = { text: string; color: string };

export default function WaveText({ text, color }: Props) {
    const parts = text.split(/(<accent>.*?<\/accent>)/).filter(Boolean);
    const plain = text.replace(/<\/?accent>/g, "");

    const letters = (s: string) =>
        [...s].map((ch, i) => (
            <span key={i} data-wave={color} style={{ color }}>
                {ch}
            </span>
        ));

    // words stay whole (inline-block); the spaces between them are normal text, so lines wrap as usual
    const words = (s: string, key: string) =>
        s.split(/(\s+)/).map((w, i) =>
            /^\s+$/.test(w) || !w ? (
                w
            ) : (
                <span key={`${key}-${i}`} className="inline-block whitespace-nowrap">
                    {letters(w)}
                </span>
            ),
        );

    return (
        <>
            <span className="sr-only">{plain}</span>
            <span aria-hidden>
                {parts.map((part, i) => {
                    const accent = part.match(/^<accent>(.*)<\/accent>$/);
                    return accent ? (
                        <em key={i} className={`${ACCENT_CLASS} inline-block whitespace-nowrap`}>
                            {letters(accent[1])}
                        </em>
                    ) : (
                        <Fragment key={i}>{words(part, `p${i}`)}</Fragment>
                    );
                })}
            </span>
        </>
    );
}
