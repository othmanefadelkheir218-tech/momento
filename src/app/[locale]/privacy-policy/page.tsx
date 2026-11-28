import { pageMetadata } from "@/lib/pageMetadata";
import PageShell from "@/components/ui/PageShell";
import LegalPage from "@/components/sections/Legal/LegalPage";

// Privacy Policy (/privacy-policy).

type Params = { params: Promise<{ locale: string }> };
export const generateMetadata = ({ params }: Params) => pageMetadata(params, "privacy");

export default function PrivacyPage() {
    return (
        <PageShell>
            <LegalPage page="privacy" />
        </PageShell>
    );
}
