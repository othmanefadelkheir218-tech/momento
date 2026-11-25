import { getTranslations } from "next-intl/server";
import HomeContent from "./Parts/HomeContent";
import ComingSoon from "@/components/ComingSoon/ComingSoon";
import { COMING_SOON, REBUILD } from "@/lib/comingSoon";
import HomeV2Content from "./homev2/Parts/HomeV2Content";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Metadata.home" });

    return {
        title: t("title"),
        description: t("description"),
        openGraph: {
            title: t("title"),
            description: t("description"),
            images: ["/share.jpg"],
        },
    };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
    if (COMING_SOON) {
        const { locale } = await params;
        return <ComingSoon locale={locale} />;
    }
    // The new home (homev2) is the official home during the rebuild; the old one is kept, just hidden.
    return REBUILD ? <HomeV2Content /> : <HomeContent />;
}
