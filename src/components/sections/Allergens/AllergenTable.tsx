import { useTranslations } from "next-intl";
import { accent } from "@/components/ui/Accent";
import FadeIn from "@/components/ui/FadeIn";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { ALLERGENS, ALLERGEN_TABLE } from "@/Data/allergens";
import { CREATIONS } from "@/Data/creations";
import DataTable from "./DataTable";

// The allergens of every creation (data: src/Data/allergens.ts — a draft to verify).
// "Contains" in burgundy, "Traces" in caramel, so the eye finds them quickly.

const TONE = { yes: "font-semibold text-burgundy", traces: "text-caramel", no: "text-chocolate/40", tbc: "text-chocolate/60" };

export default function AllergenTable() {
    const t = useTranslations("Sections.allergens.table");
    const names = useTranslations("Sections.creations.products");

    const rows = CREATIONS.map((c) => {
        const row = ALLERGEN_TABLE[c.key];
        return {
            key: c.key,
            cells: [
                names(`${c.key}.name`),
                ...ALLERGENS.map((a) => <span key={a} className={TONE[row[a]]}>{t(`values.${row[a]}`)}</span>),
                row.other.length ? row.other.map((o) => t(`other.${o}`)).join(", ") : t("values.no"),
            ],
        };
    });

    return (
        <Section aria-label={t("eyebrow")}>
            <FadeIn>
                <SectionHeading eyebrow={t("eyebrow")} title={t.rich("title", { accent })} text={t("draft")} />
            </FadeIn>
            <FadeIn delay={0.1} className="mt-10">
                <DataTable caption={t("eyebrow")} columns={[t("product"), ...ALLERGENS.map((a) => t(`columns.${a}`)), t("columns.other")]} rows={rows} />
                <p className="mt-4 font-body text-[13px] text-chocolate/70">{t("legend")}</p>
            </FadeIn>
        </Section>
    );
}
