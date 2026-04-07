import { getTranslations } from "next-intl/server";
import HomeContent from "./Parts/HomeContent";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Metadata.home" });

    return {
        title: t("title"),
        description: t("description"),
        openGraph: {
            title: t("title"),
            description: t("description"),
        },
    };
}

export default function HomePage() {
    return <HomeContent />;
}
