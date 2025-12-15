"use client";

import { useEffect, useState } from "react";
import Introduction from "./Introduction";
import { useTransition } from "@/Context/TransitionContext";

export default function OneTimeIntroduction() {
    const { introSeen, setIntroSeen } = useTransition();
    const [showIntroduction, setShowIntroduction] = useState(!introSeen);

    useEffect(() => {
        // Check if the user has already seen the introduction in this session (Context State)
        if (!introSeen) {
            // If not seen, show it and mark as seen
            setIntroSeen(true);

            // Hide it after the animation duration (sync with Introduction.tsx or desired time)
            const timer = setTimeout(() => {
                setShowIntroduction(false);
            }, 4000);

            return () => clearTimeout(timer);
        }
    }, [introSeen, setIntroSeen]);

    if (!showIntroduction) return null;

    return <Introduction />;
}
