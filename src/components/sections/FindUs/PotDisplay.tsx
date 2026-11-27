"use client";

import { useRef } from "react";
import Image from "next/image";
import Glow from "@/components/ui/Glow";
import { useScrollParallax } from "@/components/ui/useScrollParallax";

// Three Momento pots arranged like a shop display (one in front, two behind), on a soft glow.
// Decorative: the "Où nous trouver" text says what it is.
// Desktop: while scrolling, the pots float at different speeds (the front one moves most), for depth.

const POT = "/momento_product";
const POTS = [
    // behind, left
    { src: `${POT}/Cheesecake framboos 120g/images_nobg/Cheesecake framboise - 3 ouvert trois quarts.png`, className: "left-0 top-[6%] w-[52%] -rotate-[4deg]", depth: 10 },
    // behind, right
    { src: `${POT}/Tiramisu pistache 100g/images_nobg/Tiramisu pistache - 3 ouvert trois quarts.png`, className: "right-0 top-[2%] w-[50%] rotate-[4deg]", depth: 16 },
    // in front, centred
    { src: `${POT}/Nutella Crousti/images_nobg/Nutella Crousti - 1 face avec etiquette.png`, className: "left-1/2 bottom-0 w-[62%] -translate-x-1/2 z-10", depth: 24 },
];

export default function PotDisplay() {
    const ref = useRef<HTMLDivElement>(null);
    useScrollParallax(ref);

    return (
        <div ref={ref} className="relative isolate mx-auto aspect-[5/4] w-full max-w-[560px]">
            <Glow tone="light" className="-inset-[12%]" />
            {POTS.map((pot) => (
                <div key={pot.src} className={`absolute aspect-[494/322] ${pot.className}`}>
                    <div data-parallax={pot.depth} className="absolute inset-0">
                        <Image
                            src={pot.src}
                            alt=""
                            fill
                            sizes="(max-width: 767px) 60vw, 340px"
                            className="object-contain drop-shadow-[0_22px_24px_rgb(74_44_33/0.2)]"
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}
