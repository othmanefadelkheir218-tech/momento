import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import FAQPagePart from "./Parts/FAQPage";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "FAQPage" });
    return {
        title: t("title"),
        description: t("description"),
    };
}

export default function FAQPage() {
    const t = useTranslations("FAQPage");


    return (
        <div className="bg-[#F7D6D9] mx-auto px-4 py-12">
            <FAQPagePart
                title={t("title")}
            />
        </div>
    );
}
