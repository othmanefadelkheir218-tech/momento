import TransitionLink from "@/components/TransitionLink";

// A footer text link: quiet text that simply turns burgundy on hover / keyboard focus.
// Site pages go through TransitionLink; tel:, mailto: and https: are plain links.
// (The previous version, with letters rolling over on hover, is kept in ./v1/RollLink.tsx.)

type Props = {
    href: string;
    label: string;
    /** opens in a new tab (Instagram, Facebook…) */
    external?: boolean;
    className?: string;
};

const STYLE =
    "inline-flex w-fit max-w-full text-left rounded-sm transition-colors duration-300 " +
    "hover:text-burgundy focus-visible:text-burgundy focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-caramel";

export default function FooterLink({ href, label, external = false, className = "" }: Props) {
    const isPlainLink = external || /^[a-z]+:/i.test(href);

    return isPlainLink ? (
        <a
            href={href}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className={`${STYLE} ${className}`}
        >
            {label}
        </a>
    ) : (
        <TransitionLink href={href} className={`${STYLE} ${className}`}>
            {label}
        </TransitionLink>
    );
}
