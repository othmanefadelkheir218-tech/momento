// Social media logos (simple outlines, in the current text colour, 20px).
// Used in round MomentoButtons, e.g. in the "Follow the episodes" section.

type Props = { className?: string };

const BASE = { width: 20, height: 20, viewBox: "0 0 24 24", "aria-hidden": true } as const;

export function InstagramIcon({ className = "" }: Props) {
    return (
        <svg {...BASE} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={`block ${className}`}>
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
        </svg>
    );
}

export function TikTokIcon({ className = "" }: Props) {
    return (
        <svg {...BASE} fill="currentColor" className={`block ${className}`}>
            <path d="M16.6 3c.3 2.2 1.6 3.6 3.9 3.8v2.6c-1.4.1-2.6-.3-3.9-1.1v5.6c0 3.6-2.6 6.1-6 6.1-3.2 0-5.6-2.5-5.6-5.6 0-3.4 2.9-6 6.6-5.5v2.8c-.5-.2-1-.2-1.6-.1-1.4.3-2.3 1.5-2.2 2.9.1 1.5 1.3 2.6 2.8 2.6 1.6 0 2.8-1.2 2.8-3V3h3.2Z" />
        </svg>
    );
}

export function FacebookIcon({ className = "" }: Props) {
    return (
        <svg {...BASE} fill="currentColor" className={`block ${className}`}>
            <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21h3.1Z" />
        </svg>
    );
}
