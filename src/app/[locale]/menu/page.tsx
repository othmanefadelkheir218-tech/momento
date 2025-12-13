import { getTranslations } from "next-intl/server";
import Catalogue from "./Parts/Catalogue";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "MenuPage" });
    return {
        title: t("title"),
        description: t("description"),
    };
}

export default function MenuPage() {
    return (
        <Catalogue/>
    );
}
