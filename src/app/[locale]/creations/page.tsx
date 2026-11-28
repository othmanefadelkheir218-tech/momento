import { Suspense } from "react";
import { pageMetadata } from "@/lib/pageMetadata";
import PageShell from "@/components/ui/PageShell";
import CreationsIntro from "@/components/sections/Creations/CreationsIntro";
import CreationsCatalogue from "@/components/sections/Creations/CreationsCatalogue";
import SeasonalCallout from "@/components/sections/Creations/SeasonalCallout";
import TextSplit from "@/components/sections/TextSplit/TextSplit";
import { PAGE_IMAGES } from "@/Data/pageImages";

// Our Creations (/creations). The previous menu page is kept in ../_v1/menu/.
// The top used to be the big <PageHero ns="Sections.creations.hero" />; CreationsIntro is a compact
// version so the desserts show in the first screen (put PageHero back to switch).

type Params = { params: Promise<{ locale: string }> };
export const generateMetadata = ({ params }: Params) => pageMetadata(params, "creations");

export default function CreationsPage() {
    return (
        <PageShell>
            <CreationsIntro />
            <Suspense>
                <CreationsCatalogue />
            </Suspense>
            <TextSplit ns="Sections.creations.whyPot" image={PAGE_IMAGES.whyPot} aspect="aspect-[4/5] md:aspect-[5/4]" reverse tone="warm" fade="both" />
            <SeasonalCallout />
        </PageShell>
    );
}
