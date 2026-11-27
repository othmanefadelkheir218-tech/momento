"use client";

// ── Features strip (NOT USED — kept for reference) ──
// Four icons with short promises under the hero. It was already hidden.
// To show it again: import it in ../HomeV2Content.tsx and put <FeaturesStrip /> back in the list.

import { useTranslations } from "next-intl";
import { ChefHat, Gift, Heart, Leaf } from "lucide-react";
import { Reveal } from "@/components/animation/Reveal";

const BURGUNDY = "#751B32";
const CREAM = "#F7EFE2";
const CARAMEL = "#C68B4E";

export default function FeaturesStrip() {
    const t = useTranslations("HomeV2");
    const features = [
        { icon: ChefHat, label: t("f1") },
        { icon: Leaf, label: t("f2") },
        { icon: Heart, label: t("f3") },
        { icon: Gift, label: t("f4") },
    ];
    return (
        <section className="border-b" style={{ backgroundColor: CREAM, borderColor: `${CARAMEL}40` }}>
            <div className="max-w-6xl mx-auto px-6 md:px-12 py-8 grid grid-cols-2 md:grid-cols-4 gap-y-6">
                {features.map(({ icon: Icon, label }, i) => (
                    <Reveal key={label} delay={i * 0.08} rotate={false}>
                        <div
                            className={`flex items-center justify-center gap-3 md:px-4 ${i > 0 ? "md:border-l" : ""}`}
                            style={{ borderColor: `${CARAMEL}55` }}
                        >
                            <Icon className="w-7 h-7 shrink-0" strokeWidth={1.4} style={{ color: BURGUNDY }} />
                            <span className="text-sm md:text-[15px] leading-tight max-w-[9rem]">{label}</span>
                        </div>
                    </Reveal>
                ))}
            </div>
        </section>
    );
}
