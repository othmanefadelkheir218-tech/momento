import { pageMetadata } from "@/lib/pageMetadata";
import PageShell from "@/components/ui/PageShell";
import LegalPage from "@/components/sections/Legal/LegalPage";

// Terms (/terms).

type Params = { params: Promise<{ locale: string }> };
export const generateMetadata = ({ params }: Params) => pageMetadata(params, "terms");

export default function TermsPage() {
    return (
        <PageShell>
            <LegalPage page="terms" />
        </PageShell>
    );
}
