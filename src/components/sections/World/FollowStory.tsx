"use client";

import { useTranslations } from "next-intl";
import MomentoButton from "@/components/ui/MomentoButton";
import { InstagramIcon, TikTokIcon } from "@/components/ui/SocialIcons";
import { COMPANY_INSTAGRAM, COMPANY_TIKTOK } from "@/Data/socialmedia";
import ClosingPanel from "../ClosingPanel/ClosingPanel";

// The end of The Momento World: follow the story on Instagram and TikTok (a link that doesn't
// exist yet, "#", is not shown).

export default function FollowStory() {
    const t = useTranslations("Sections.world.follow");
    const links = [
        { href: COMPANY_INSTAGRAM, label: t("instagram"), Icon: InstagramIcon },
        { href: COMPANY_TIKTOK, label: t("tiktok"), Icon: TikTokIcon },
    ].filter((l) => l.href !== "#");

    return (
        <ClosingPanel ns="Sections.world.follow">
            {links.map(({ href, label, Icon }) => (
                <MomentoButton key={href} href={href} variant="light" external>
                    <span className="flex items-center gap-2.5">
                        <Icon />
                        {label}
                    </span>
                </MomentoButton>
            ))}
        </ClosingPanel>
    );
}
