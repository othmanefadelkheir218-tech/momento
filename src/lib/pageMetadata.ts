import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

// The <title>, description and share picture of a page, from Metadata.<key> in the messages files.
// `values`: for texts with {placeholders} (e.g. a product name).

export async function pageMetadata(
    params: Promise<{ locale: string }>,
    key: string,
    values?: Record<string, string>,
): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: `Metadata.${key}` });
    const title = t("title", values);
    const description = t("description", values);
    return { title, description, openGraph: { title, description, images: ["/share.jpg"] } };
}
