import { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { accent } from "@/components/ui/Accent";
import Eyebrow from "@/components/ui/Eyebrow";
import FadeIn from "@/components/ui/FadeIn";
import { H1 } from "../PageHero/PageHero";
import LegalArticle, { type Article } from "./LegalArticle";

// A legal page (privacy, cookies, terms): the title, the "last updated" line, then numbered
// articles in a calm reading column. `children`: extra content after the articles (cookie table).
// Texts: Sections.legal.<page>.title / articles.

export default function LegalPage({ page, children }: { page: "privacy" | "cookies" | "terms"; children?: ReactNode }) {
    const t = useTranslations("Sections.legal");
    const articles = t.raw(`${page}.articles`) as Article[];

    return (
        <section className="px-5 md:px-8 pt-[clamp(128px,12vw,200px)] pb-[clamp(56px,6vw,96px)]">
            <div className="mx-auto w-full max-w-[860px]">
                <FadeIn>
                    <Eyebrow>{t("eyebrow")}</Eyebrow>
                    <h1 className={H1}>{t.rich(`${page}.title`, { accent })}</h1>
                    <p className="mt-6 font-body text-[14px] text-chocolate/70">{t("updated", { date: t("date") })}</p>
                </FadeIn>
                <ol className="mt-14 border-t border-burgundy/15">
                    {articles.map((article, i) => (
                        <LegalArticle key={article.title} index={i} article={article} />
                    ))}
                </ol>
                {children}
            </div>
        </section>
    );
}
