import { getTranslations } from "next-intl/server";
import OriginStory from "./Parts/OriginStory";
import InANutshell from "./Parts/InANutshell";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Metadata.about" });
    return {
        title: t("title"),
        description: t("description"),
        openGraph: {
            title: t("title"),
            description: t("description"),
        },
    };
}

export default function AboutPage() {

    return (
        <>
            <InANutshell />
            <OriginStory />
        </>

    );
}
