import { useTranslations } from "next-intl";
import MomentoButton from "@/components/ui/MomentoButton";

// Shown when the search and filters match no creation.

export default function NoResults({ onReset }: { onReset: () => void }) {
    const t = useTranslations("Sections.creations.empty");
    return (
        <div className="py-16 text-center md:py-24">
            <p className="font-display font-medium text-burgundy text-[clamp(30px,2.8vw,48px)] leading-tight">{t("title")}</p>
            <p className="mx-auto mt-4 max-w-[46ch] font-body text-[clamp(16px,1.05vw,19px)] leading-[1.65] text-chocolate">{t("text")}</p>
            <MomentoButton onClick={onReset} variant="ghost" className="mx-auto mt-8 w-fit">
                {t("button")}
            </MomentoButton>
        </div>
    );
}
