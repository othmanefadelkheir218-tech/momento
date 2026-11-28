import { pageMetadata } from "@/lib/pageMetadata";
import PageShell from "@/components/ui/PageShell";
import MomentoButton from "@/components/ui/MomentoButton";
import PageHero from "@/components/sections/PageHero/PageHero";
import CharacterProfile from "@/components/sections/Characters/CharacterProfile";
import TextSplit from "@/components/sections/TextSplit/TextSplit";
import ClosingPanel from "@/components/sections/ClosingPanel/ClosingPanel";
import { PAGE_IMAGES } from "@/Data/pageImages";
import { ROUTES } from "@/Data/routes";
import { getTranslations } from "next-intl/server";

// Meet Marcelo & Milo (/marcelo-and-milo).

type Params = { params: Promise<{ locale: string }> };
export const generateMetadata = ({ params }: Params) => pageMetadata(params, "characters");

export default async function CharactersPage({ params }: Params) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Sections.characters" });
    return (
        <PageShell>
            <PageHero ns="Sections.characters.hero" image={PAGE_IMAGES.charactersHero} aspect="aspect-[16/10]" />
            <CharacterProfile who="marcelo" image={PAGE_IMAGES.marcelo} />
            <CharacterProfile who="milo" image={PAGE_IMAGES.milo} reverse />
            <TextSplit ns="Sections.characters.duo" image={PAGE_IMAGES.duo} aspect="aspect-[16/9]" tone="warm" fade="both" />
            <TextSplit ns="Sections.characters.story" image={PAGE_IMAGES.beginning} aspect="aspect-[16/10]" reverse>
                <MomentoButton href={ROUTES.story} variant="ghost">
                    {t("story.cta")}
                </MomentoButton>
            </TextSplit>
            <ClosingPanel ns="Sections.characters.cta">
                <MomentoButton href={ROUTES.world} variant="light">
                    {t("cta.button")}
                </MomentoButton>
            </ClosingPanel>
        </PageShell>
    );
}
