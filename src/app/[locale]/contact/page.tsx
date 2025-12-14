import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import ContactPagePart from "./Parts/ContactPage";
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "ContactPage" });
    return {
        title: t("title"),
        description: t("description"),
    };
}

export default function ContactPage() {
    const t = useTranslations("ContactPage");

    return (
        <div className="bg-[#F7D6D9] mx-auto px-4 py-12">
            <ContactPagePart
                title={t("title")}
            />
        </div>

    );
}
