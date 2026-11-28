import { pageMetadata } from "@/lib/pageMetadata";
import PageShell from "@/components/ui/PageShell";
import PartnerHero from "@/components/sections/Partner/PartnerHero";
import FranchiseIntro from "@/components/sections/Partner/FranchiseIntro";
import { CLIENT_ID } from "@/components/sections/Partner/ids";
import TextSplit from "@/components/sections/TextSplit/TextSplit";
import NumberedGrid from "@/components/sections/NumberedGrid/NumberedGrid";
import Steps from "@/components/sections/Steps/Steps";
import DetailRows from "@/components/sections/DetailRows/DetailRows";
import FormSection from "@/components/sections/Forms/FormSection";
import ClientForm from "@/components/sections/Forms/ClientForm";
import FranchiseForm from "@/components/sections/Forms/FranchiseForm";
import FaqGroups from "@/components/sections/Faq/FaqGroups";
import { PAGE_IMAGES } from "@/Data/pageImages";

// Become a Partner (/become-a-partner): one page, two parts.
//   1. Become a client — businesses that sell or serve Momento (the main business)
//   2. Open a Momento — franchise
// The previous become-a-client page is kept in ../_v1/become-a-client/.

type Params = { params: Promise<{ locale: string }> };
export const generateMetadata = ({ params }: Params) => pageMetadata(params, "partner");

export default function PartnerPage() {
    return (
        <PageShell>
            <PartnerHero />

            {/* 1. Become a client */}
            <TextSplit id={CLIENT_ID} ns="Sections.partner.why" image={PAGE_IMAGES.partnerWhy} aspect="aspect-[4/5]" points reverse />
            <NumberedGrid ns="Sections.partner.who" tone="warm" fade="both" />
            <NumberedGrid ns="Sections.partner.offer" />
            <Steps ns="Sections.partner.steps" />
            <DetailRows ns="Sections.partner.order" />
            <FormSection ns="Sections.partner.clientForm" id="client-form">
                <ClientForm />
            </FormSection>

            {/* 2. Open a Momento (franchise) */}
            <FranchiseIntro />
            <TextSplit ns="Sections.partner.franchiseWhy" points />
            <TextSplit ns="Sections.partner.concept" image={PAGE_IMAGES.franchiseConcept} aspect="aspect-[4/5]" reverse tone="warm" fade="both" />
            <NumberedGrid ns="Sections.partner.franchiseOffer" />
            <NumberedGrid ns="Sections.partner.profile" columns={2} />
            <Steps ns="Sections.partner.franchiseSteps" />
            <FormSection ns="Sections.partner.franchiseForm" id="franchise-form">
                <FranchiseForm />
            </FormSection>

            <FaqGroups groups={["business", "franchise"]} headingNs="Sections.partner.faq" />
        </PageShell>
    );
}
