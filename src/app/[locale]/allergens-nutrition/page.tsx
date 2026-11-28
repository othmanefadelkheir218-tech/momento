import { pageMetadata } from "@/lib/pageMetadata";
import PageShell from "@/components/ui/PageShell";
import PageHero from "@/components/sections/PageHero/PageHero";
import AllergenNotice from "@/components/sections/Allergens/AllergenNotice";
import AllergenTable from "@/components/sections/Allergens/AllergenTable";
import NutritionTable from "@/components/sections/Allergens/NutritionTable";
import AllergenContact from "@/components/sections/Allergens/AllergenContact";

// Allergens & Nutrition (/allergens-nutrition).

type Params = { params: Promise<{ locale: string }> };
export const generateMetadata = ({ params }: Params) => pageMetadata(params, "allergens");

export default function AllergensPage() {
    return (
        <PageShell>
            <PageHero ns="Sections.allergens.hero" />
            <AllergenNotice />
            <AllergenTable />
            <NutritionTable />
            <AllergenContact />
        </PageShell>
    );
}
