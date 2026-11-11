import { getTranslations } from "next-intl/server";
import HomeV2Content from "./Parts/HomeV2Content";

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

export default function HomeV2Page() {
    return <HomeV2Content />;
}
