import { getTranslations } from "next-intl/server";
import HomeContent from "./Parts/HomeContent";
import ComingSoon from "@/components/ComingSoon/ComingSoon";
import { COMING_SOON } from "@/lib/comingSoon";

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
    return <HomeContent />;
}
