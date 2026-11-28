import { useTranslations } from "next-intl";
import Eyebrow from "@/components/ui/Eyebrow";
import FadeIn from "@/components/ui/FadeIn";
import { HAIRLINE, LABEL } from "@/components/ui/Hairline";
import RevealImage from "@/components/ui/RevealImage";
import Section from "@/components/ui/Section";
import SoftImage from "@/components/ui/SoftImage";

// One chef: his portrait (melting into the page) and, beside it, his role, his name very big,
// his introduction, his personality (a quiet list), what he stands for and his signature line.
// `reverse`: portrait on the right. Texts: Sections.characters.<who>.

type Props = { who: "marcelo" | "milo"; image: string; reverse?: boolean; tone?: "cream" | "warm" };

export default function CharacterProfile({ who, image, reverse, tone }: Props) {
    const t = useTranslations("Sections.characters");
    const c = (key: string) => t(`${who}.${key}`);

    return (
        <Section aria-label={c("name")} tone={tone}>
            <div className="grid items-center gap-10 md:grid-cols-12 md:gap-12">
                <FadeIn className={`-mx-5 md:mx-0 md:col-span-5 ${reverse ? "md:order-2" : ""}`}>
                    <RevealImage>
                        <SoftImage src={image} alt={c("imageAlt")} sizes="(max-width: 767px) 100vw, 560px" quality={90} className="aspect-[4/5]" focus="50% 30%" feather={10} />
                    </RevealImage>
                </FadeIn>

                <FadeIn delay={0.12} className={`md:col-span-7 ${reverse ? "md:order-1" : ""}`}>
                    <Eyebrow>{c("eyebrow")}</Eyebrow>
                    <h2 className="mt-4 font-accent text-burgundy text-[clamp(64px,7vw,128px)] leading-[1.05]">{c("name")}</h2>
                    <p className="mt-6 max-w-[50ch] font-body text-[clamp(17px,1.15vw,21px)] leading-[1.7] text-chocolate">{c("intro")}</p>

                    <div className="mt-10 grid gap-8 sm:grid-cols-2">
                        <div>
                            <p className={LABEL}>{t("personality")}</p>
                            <ul className={`mt-3 border-t ${HAIRLINE}`}>
                                {(t.raw(`${who}.traits`) as string[]).map((trait) => (
                                    <li key={trait} className={`border-b ${HAIRLINE} py-3 font-display font-medium text-[20px] text-burgundy`}>
                                        {trait}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <p className={LABEL}>{t("standsFor")}</p>
                            <p className="mt-3 font-display font-medium text-[clamp(22px,1.7vw,28px)] leading-snug text-burgundy">{c("values")}</p>
                            <blockquote className="mt-8 border-l-2 border-caramel/60 pl-5 font-display text-[22px] leading-snug text-chocolate">
                                “{c("quote")}”
                            </blockquote>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </Section>
    );
}
