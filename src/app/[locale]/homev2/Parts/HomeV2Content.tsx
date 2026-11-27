"use client";

import ChefsIntro from "@/components/sections/ChefsIntro/ChefsIntro";
import Episodes from "@/components/sections/Episodes/Episodes";
import FindUs from "@/components/sections/FindUs/FindUs";
import Franchise from "@/components/sections/Franchise/Franchise";
import StoryQuote from "@/components/sections/StoryQuote/StoryQuote";
import WhyMomento from "@/components/sections/WhyMomento/WhyMomento";
import CreationsArc from "./CreationsArc";
import FollowShowcase from "./FollowShowcase";
import HomeHero from "./hero/HomeHero";
import { sans, serif } from "./fonts";

// The home page: its sections, in order. Each section is its own file.
// Old sections that were replaced are kept in ./v1/ (not shown).

export default function HomeV2Content() {
    return (
        <div
            className={`${serif.variable} ${sans.variable} overflow-x-clip bg-cream text-chocolate`}
            style={{ fontFamily: "var(--font-hv2-sans)" }}
        >
            <HomeHero />
            <CreationsArc />
            {/* pulled up into the empty bottom of the products showcase, so the two read as one flow */}
            <FollowShowcase className="relative z-20 -mt-[44svh]">
                <ChefsIntro />
            </FollowShowcase>
            {/* one continuous warm area: it fades in at the top of WhyMomento, out at the bottom of FindUs */}
            <WhyMomento fade="top" />
            <StoryQuote tone="warm" fade="none" />
            <FindUs fade="bottom" />
            <Franchise />
            <Episodes />
        </div>
    );
}
