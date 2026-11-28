import { useTranslations } from "next-intl";
import { HAIRLINE, LABEL } from "@/components/ui/Hairline";
import SoftImage from "@/components/ui/SoftImage";
import { COMPANY_INSTAGRAM, COMPANY_TIKTOK } from "@/Data/socialmedia";
import { PAGE_IMAGES } from "@/Data/pageImages";

// Beside the contact form: a picture of Marcelo at work, the email and phone, the press note and
// the social links. Social links that don't exist yet ("#") are not shown.

const LINK = "font-display font-medium text-[24px] text-burgundy border-b border-burgundy/25 pb-0.5 transition-colors hover:border-burgundy";

export default function ContactAside() {
    const t = useTranslations("Sections.contact");
    const social = [
        { href: COMPANY_INSTAGRAM, label: t("social.instagram") },
        { href: COMPANY_TIKTOK, label: t("social.tiktok") },
    ].filter((s) => s.href !== "#");

    return (
        <aside className="space-y-10">
            <SoftImage src={PAGE_IMAGES.contact} alt={t("imageAlt")} sizes="(max-width: 767px) 90vw, 440px" className="aspect-[4/3] max-w-[440px]" focus="50% 25%" feather={10} />

            <div>
                <p className={LABEL}>{t("details.eyebrow")}</p>
                <dl className={`mt-3 border-t ${HAIRLINE}`}>
                    {(["email", "phone"] as const).map((key) => (
                        <div key={key} className={`flex items-baseline justify-between gap-4 border-b ${HAIRLINE} py-4`}>
                            <dt className="font-body text-[14px] text-chocolate/75">{t(`details.${key}`)}</dt>
                            <dd className="font-body text-[16px] text-ink text-right">{t(`details.${key}Value`)}</dd>
                        </div>
                    ))}
                </dl>
            </div>

            <div>
                <p className={LABEL}>{t("press.title")}</p>
                <p className="mt-3 font-body text-[16px] leading-[1.65] text-chocolate">{t("press.text")}</p>
            </div>

            {social.length > 0 && (
                <div>
                    <p className={LABEL}>{t("social.title")}</p>
                    <ul className="mt-3 flex flex-wrap gap-6">
                        {social.map((s) => (
                            <li key={s.href}>
                                <a href={s.href} target="_blank" rel="noopener noreferrer" className={LINK}>
                                    {s.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </aside>
    );
}
