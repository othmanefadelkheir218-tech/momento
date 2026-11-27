import Image from "next/image";

// A picture whose edges melt into the background (no frame, no hard line) — the same soft edge as
// the hero picture, so pictures feel part of the page instead of boxes placed on it.

type Props = {
    src: string;
    alt: string;
    sizes: string;
    className?: string; // size / aspect ratio of the frame
    focus?: string; // CSS object-position
    /** how wide the soft edge is, in % of the picture */
    feather?: number;
};

export default function SoftImage({ src, alt, sizes, className = "", focus = "50% 50%", feather = 9 }: Props) {
    const f = `${feather}%`;
    const mask =
        `linear-gradient(to right, transparent, #000 ${f}, #000 calc(100% - ${f}), transparent),` +
        `linear-gradient(to bottom, transparent, #000 ${f}, #000 calc(100% - ${f}), transparent)`;

    return (
        <div
            className={`relative ${className}`}
            style={{ maskImage: mask, WebkitMaskImage: mask, maskComposite: "intersect", WebkitMaskComposite: "source-in" }}
        >
            <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" style={{ objectPosition: focus }} />
        </div>
    );
}
