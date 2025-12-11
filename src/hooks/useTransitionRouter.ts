"use client";

import { useTransition } from "../Context/TransitionContext";
import { useRouter as useNextRouter, usePathname } from "@/i18n/navigation";

export const useTransitionRouter = () => {
    const router = useNextRouter();
    const pathname = usePathname();
    const { animatePageOut } = useTransition();

    const push = (href: string) => {
        if (pathname === href) return;
        animatePageOut(href);
    };

    return { ...router, push };
};
