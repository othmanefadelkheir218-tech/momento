import { useTranslations } from "next-intl";
import { accent } from "@/components/ui/Accent";
import FadeIn from "@/components/ui/FadeIn";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { CREATIONS } from "@/Data/creations";
import DataTable from "./DataTable";

// Nutrition per 100 g of every creation (figures from the supplier spec sheets, through
// src/Data/MomentoProducts.ts). "[TBC]" where there is no figure yet.

const COLUMNS = ["product", "portion", "energy", "fat", "saturates", "carbs", "sugars", "protein", "salt"] as const;

export default function NutritionTable() {
    const t = useTranslations("Sections.allergens.nutrition");
    const names = useTranslations("Sections.creations.products");
    const g = (value: number) => t("grams", { value: String(value) });

    const rows = CREATIONS.map((c) => {
        const n = c.nutrition;
        const portion = c.weight ? c.weight.replace(/(\d)\s*g$/, "$1 g") : t("tbc");
        return {
            key: c.key,
            cells: n
                ? [names(`${c.key}.name`), portion, `${n.energyKcal} / ${n.energyKj}`, g(n.fat), g(n.saturatedFat), g(n.carbohydrates), g(n.sugars), g(n.protein), g(n.salt)]
                : [names(`${c.key}.name`), portion, ...Array(7).fill(t("tbc"))],
        };
    });

    return (
        <Section aria-label={t("eyebrow")}>
            <FadeIn>
                <SectionHeading eyebrow={t("eyebrow")} title={t.rich("title", { accent })} text={t("note")} />
            </FadeIn>
            <FadeIn delay={0.1} className="mt-10">
                <DataTable caption={t("eyebrow")} columns={COLUMNS.map((c) => t(`columns.${c}`))} rows={rows} />
            </FadeIn>
        </Section>
    );
}
