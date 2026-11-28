import { pageMetadata } from "@/lib/pageMetadata";
import PageShell from "@/components/ui/PageShell";
import PageHero from "@/components/sections/PageHero/PageHero";
import TextSplit from "@/components/sections/TextSplit/TextSplit";
import MiniSeriesList from "@/components/sections/World/MiniSeriesList";
import SeasonsGallery from "@/components/sections/World/SeasonsGallery";
import FollowStory from "@/components/sections/World/FollowStory";
import { PAGE_IMAGES } from "@/Data/pageImages";

// The Momento World (/world).

type Params = { params: Promise<{ locale: string }> };
export const generateMetadata = ({ params }: Params) => pageMetadata(params, "world");

export default function WorldPage() {
    return (
        <PageShell>
            <PageHero ns="Sections.world.hero" image={PAGE_IMAGES.worldHero} aspect="aspect-[16/10]" focus="45% 50%" />
            <TextSplit ns="Sections.world.kitchen" image={PAGE_IMAGES.worldKitchen} aspect="aspect-[16/9]" reverse />
            <MiniSeriesList />
            <SeasonsGallery />
            <FollowStory />
        </PageShell>
    );
}
