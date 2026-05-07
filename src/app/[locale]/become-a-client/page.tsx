import { getTranslations } from "next-intl/server";
import BecomeClientPage from "./Parts/BecomeClientPage";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Metadata.becomeClient" });
    return {
        title: t("title"),
        description: t("description"),
        openGraph: {
            title: t("title"),
            description: t("description"),
        },
    };
}

export default function BecomeAClientPage() {
    return <BecomeClientPage />;
}
