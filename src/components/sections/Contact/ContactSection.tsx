import { useTranslations } from "next-intl";
import FadeIn from "@/components/ui/FadeIn";
import Section from "@/components/ui/Section";
import ContactForm from "../Forms/ContactForm";
import ContactAside from "./ContactAside";

// The contact form on the left; on the right, the other ways to reach us (ContactAside).

export default function ContactSection() {
    const t = useTranslations("Sections.contact");
    return (
        <Section aria-label={t("hero.eyebrow")} className="pt-0!">
            <div className="grid gap-14 md:grid-cols-12 md:gap-12">
                <FadeIn className="md:col-span-7">
                    <ContactForm />
                </FadeIn>
                <FadeIn delay={0.12} className="md:col-span-5">
                    <ContactAside />
                </FadeIn>
            </div>
        </Section>
    );
}
