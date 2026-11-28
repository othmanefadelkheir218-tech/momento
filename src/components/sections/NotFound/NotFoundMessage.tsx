import { useTranslations } from "next-intl";
import { accent } from "@/components/ui/Accent";
import FadeIn from "@/components/ui/FadeIn";
import MomentoButton from "@/components/ui/MomentoButton";
import SoftImage from "@/components/ui/SoftImage";
import { PAGE_IMAGES } from "@/Data/pageImages";
import { ROUTES } from "@/Data/routes";

// The 404 page: a very big, very light "404", the message, Marcelo and Milo puzzled in their
// kitchen, two ways back, and a small closing line.

export default function NotFoundMessage() {
    const t = useTranslations("Sections.notFound");
    return (
        <section className="px-5 md:px-8 pt-[clamp(120px,11vw,180px)] pb-[clamp(56px,6vw,96px)]">
            <div className="mx-auto grid w-full max-w-[clamp(1180px,78vw,1480px)] items-center gap-10 md:grid-cols-12 md:gap-8">
                <FadeIn className="md:col-span-6">
                    <p aria-hidden className="font-display font-medium text-caramel/35 leading-none text-[clamp(110px,14vw,240px)]">{t("code")}</p>
                    <h1 className="mt-2 font-display font-medium text-burgundy leading-[1.05] text-[clamp(38px,4.4vw,76px)] text-balance">
                        {t.rich("title", { accent })}
                    </h1>
                    <p className="mt-6 max-w-[44ch] font-body text-[clamp(17px,1.15vw,21px)] leading-[1.65] text-chocolate">{t("text")}</p>
                    <div className="mt-10 flex flex-wrap gap-3">
                        <MomentoButton href={ROUTES.home}>{t("home")}</MomentoButton>
                        <MomentoButton href={ROUTES.creations} variant="ghost">
                            {t("creations")}
                        </MomentoButton>
                    </div>
                    <p className="mt-12 font-display text-[20px] text-chocolate/80">{t("line")}</p>
                </FadeIn>
                <FadeIn delay={0.15} className="-mx-5 md:col-span-6 md:mx-0 md:-mr-12">
                    <SoftImage src={PAGE_IMAGES.notFound} alt={t("imageAlt")} sizes="(max-width: 767px) 100vw, 720px" className="aspect-[4/3]" focus="60% 50%" feather={10} />
                </FadeIn>
            </div>
        </section>
    );
}
