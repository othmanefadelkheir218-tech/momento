"use client";

import { useRef } from "react";
import TransitionLink from "@/components/TransitionLink";
import { HoverRollText, type HoverRollTextHandle } from "@/components/ui/HoverRollText";

// A footer text link: its letters roll over on hover and on keyboard focus, and it turns burgundy.
// Site pages go through TransitionLink (page curtain); tel:, mailto: and https: are plain links.

type Props = {
    href: string;
    label: string;
    /** opens in a new tab (Instagram, Facebook…) */
    external?: boolean;
    className?: string;
};

const STYLE =
    "inline-flex w-fit max-w-full items-baseline text-left rounded-sm transition-colors duration-300 " +
    "hover:text-burgundy focus-visible:text-burgundy focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-caramel";

export default function RollLink({ href, label, external = false, className = "" }: Props) {
    const roll = useRef<HoverRollTextHandle>(null);
    const play = () => roll.current?.play();
    const reset = () => roll.current?.reset();

    const content = (
        <>
            <HoverRollText ref={roll} text={label} />
            <span className="sr-only">{label}</span>
        </>
    );

    const isPlainLink = external || /^[a-z]+:/i.test(href);

    return (
        // focus events bubble, so the wrapper catches them for both kinds of link
        <span className="inline-flex" onMouseEnter={play} onMouseLeave={reset} onFocus={play} onBlur={reset}>
            {isPlainLink ? (
                <a
                    href={href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className={`${STYLE} ${className}`}
                >
                    {content}
                </a>
            ) : (
                <TransitionLink href={href} className={`${STYLE} ${className}`}>
                    {content}
                </TransitionLink>
            )}
        </span>
    );
}
