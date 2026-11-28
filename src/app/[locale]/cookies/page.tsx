import { pageMetadata } from "@/lib/pageMetadata";
import PageShell from "@/components/ui/PageShell";
import LegalPage from "@/components/sections/Legal/LegalPage";
import CookieTable from "@/components/sections/Legal/CookieTable";

// Cookies (/cookies).

type Params = { params: Promise<{ locale: string }> };
export const generateMetadata = ({ params }: Params) => pageMetadata(params, "cookies");

export default function CookiesPage() {
    return (
        <PageShell>
            <LegalPage page="cookies">
                <CookieTable />
            </LegalPage>
        </PageShell>
    );
}
