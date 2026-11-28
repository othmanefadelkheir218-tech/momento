import { getTranslations } from "next-intl/server";
import { pageMetadata } from "@/lib/pageMetadata";
import PageShell from "@/components/ui/PageShell";
import MomentoButton from "@/components/ui/MomentoButton";
import PageHero from "@/components/sections/PageHero/PageHero";
import TextSplit from "@/components/sections/TextSplit/TextSplit";
import NumberedGrid from "@/components/sections/NumberedGrid/NumberedGrid";
import ClosingPanel from "@/components/sections/ClosingPanel/ClosingPanel";
import { PAGE_IMAGES } from "@/Data/pageImages";
import { ROUTES } from "@/Data/routes";

// Our Story (/our-story). The previous about page is kept in ../_v1/about/.

type Params = { params: Promise<{ locale: string }> };
export const generateMetadata = ({ params }: Params) => pageMetadata(params, "story");

export default async function StoryPage({ params }: Params) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Sections.story" });
    return (
        <PageShell>
            <PageHero ns="Sections.story.hero" image={PAGE_IMAGES.storyHero} aspect="aspect-[16/10]" focus="60% 50%" />
            <TextSplit ns="Sections.story.began" image={PAGE_IMAGES.storyBegan} aspect="aspect-[16/9]" />
            <TextSplit ns="Sections.story.idea" image={PAGE_IMAGES.storyIdea} aspect="aspect-[4/5] md:aspect-[5/4]" reverse tone="warm" fade="both" />
            <NumberedGrid ns="Sections.story.values" />
            <ClosingPanel ns="Sections.story.promise">
                <MomentoButton href={ROUTES.creations} variant="light">
                    {t("promise.cta")}
                </MomentoButton>
            </ClosingPanel>
        </PageShell>
    );
}
