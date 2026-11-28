import { pageMetadata } from "@/lib/pageMetadata";
import PageShell from "@/components/ui/PageShell";
import PageHero from "@/components/sections/PageHero/PageHero";
import ContactSection from "@/components/sections/Contact/ContactSection";

// Contact (/contact). The previous contact page is kept in ../_v1/contact/.

type Params = { params: Promise<{ locale: string }> };
export const generateMetadata = ({ params }: Params) => pageMetadata(params, "contact");

export default function ContactPage() {
    return (
        <PageShell>
            <PageHero ns="Sections.contact.hero" />
            <ContactSection />
        </PageShell>
    );
}
