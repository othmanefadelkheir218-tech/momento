"use client";

import { useCallback, useState } from "react";
import type { getImageProps } from "next/image";

type ImgProps = ReturnType<typeof getImageProps>["props"];

// Art-directed background: portrait image on mobile/portrait screens, wide image
// otherwise (the browser downloads only the matching one).
// If the image fails to load, it is hidden so no broken-image icon/border shows —
// the blurred placeholder behind it stays visible instead.
export default function BackgroundPicture({
    desktop,
    mobile,
    className,
}: {
    desktop: ImgProps;
    mobile: Pick<ImgProps, "srcSet" | "sizes">;
    className?: string;
}) {
    const [failed, setFailed] = useState(false);

    // Also catches an error that happened before React hydrated.
    const ref = useCallback((img: HTMLImageElement | null) => {
        if (img && img.complete && img.naturalWidth === 0) setFailed(true);
    }, []);

    if (failed) return null;

    return (
        <picture>
            <source media="(max-aspect-ratio: 1/1)" srcSet={mobile.srcSet} sizes={mobile.sizes} />
            <img
                {...desktop}
                ref={ref}
                alt=""
                className={className}
                fetchPriority="high"
                onError={() => setFailed(true)}
            />
        </picture>
    );
}
