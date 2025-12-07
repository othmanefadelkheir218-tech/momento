import CurveLoading from "@/components/CurveLoading";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "MenuPage" });
    return {
        title: t("title"),
        description: t("description"),
    };
}

export default function MenuPage() {
    const t = useTranslations("MenuPage");

    return (
        <div className="w-full bg-red-500 mx-auto px-4 py-12 ">
            <h1 className="text-4xl font-bold mb-6">{t("title")}</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
                {t("description")}
            </p>
        </div>
    );
}
