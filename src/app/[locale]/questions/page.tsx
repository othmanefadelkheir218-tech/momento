import { getTranslations } from "next-intl/server";
import { pageMetadata } from "@/lib/pageMetadata";
import PageShell from "@/components/ui/PageShell";
import MomentoButton from "@/components/ui/MomentoButton";
import PageHero from "@/components/sections/PageHero/PageHero";
import FaqGroups from "@/components/sections/Faq/FaqGroups";
import ClosingPanel from "@/components/sections/ClosingPanel/ClosingPanel";
import { ROUTES } from "@/Data/routes";

// Questions (/questions). The previous FAQ page is kept in ../_v1/faq/.

type Params = { params: Promise<{ locale: string }> };
export const generateMetadata = ({ params }: Params) => pageMetadata(params, "questions");

export default async function QuestionsPage({ params }: Params) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Sections.questions" });
    return (
        <PageShell>
            <PageHero ns="Sections.questions.hero" />
            <FaqGroups groups={["momento", "creations", "business", "franchise"]} />
            <ClosingPanel ns="Sections.questions.cta">
                <MomentoButton href={ROUTES.contact} variant="light">
                    {t("cta.button")}
                </MomentoButton>
            </ClosingPanel>
        </PageShell>
    );
}
