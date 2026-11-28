"use client";

import { Fragment, useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { LANGUAGES } from "@/Data/languages";

// A quiet row of language codes: FR · EN · NL · DE.
// The current language is burgundy and underlined; the others are soft ink and turn burgundy on hover.
// One click switches the language and keeps the visitor on the same page.
// Used in the header (desktop) and in the footer's bottom line.

type Props = {
    className?: string;
};

const CODE =
    "rounded-sm px-0.5 transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-caramel";

export default function LanguageSwitcher({ className = "" }: Props) {
    const t = useTranslations("Common");
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();

    const change = (code: string) => {
        if (code === locale) return;
        startTransition(() => router.replace(pathname, { locale: code }));
    };

    return (
        <nav aria-label={t("changeLanguage")} className={`flex items-center gap-1.5 font-body text-xs font-semibold tracking-[0.14em] ${className}`}>
            {LANGUAGES.map((lang, i) => {
                const isCurrent = lang.code === locale;
                return (
                    <Fragment key={lang.code}>
                        {i > 0 && <span aria-hidden className="text-ink/25">·</span>}
                        <button
                            type="button"
                            lang={lang.code}
                            title={lang.name}
                            aria-label={lang.name}
                            aria-current={isCurrent ? "true" : undefined}
                            disabled={isPending}
                            onClick={() => change(lang.code)}
                            className={`${CODE} ${
                                isCurrent
                                    ? "text-burgundy underline decoration-1 underline-offset-[5px]"
                                    : "text-ink/50 hover:text-burgundy cursor-pointer"
                            }`}
                        >
                            {lang.code.toUpperCase()}
                        </button>
                    </Fragment>
                );
            })}
        </nav>
    );
}
