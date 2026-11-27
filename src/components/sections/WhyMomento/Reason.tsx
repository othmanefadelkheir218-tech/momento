import Image from "next/image";

// One reason of the "Pourquoi Momento" section: a moment of the Marcelo & Milo story in an arch
// frame (like a pastry-shop window), then a thin number, a hairline, the title and its text.
// The bottom of the picture melts softly into the page.
// The data-* attributes are the parts animated by useReasonsReveal.ts. Hover: the picture zooms in
// very slightly and the number turns burgundy.

type Props = { number: string; title: string; text: string; image: string };

const ARCH = { borderRadius: "9999px 9999px 0 0" }; // round top, straight bottom
const MELT = "linear-gradient(to bottom, #000 82%, transparent 100%)";

export default function Reason({ number, title, text, image }: Props) {
    return (
        <div data-reason className="group">
            {/* frame (opens upwards) → moving layer (depth + settle) → hover zoom → picture */}
            <div
                data-arch
                className="relative mx-auto aspect-[500/620] w-[82%] max-w-[380px] overflow-hidden"
                style={{ ...ARCH, maskImage: MELT, WebkitMaskImage: MELT }}
            >
                <div data-arch-move className="absolute inset-x-0 -top-[8%] h-[116%] will-change-transform">
                    <div className="relative h-full w-full transition-transform duration-900 ease-out group-hover:scale-[1.05]">
                        <Image src={image} alt="" fill sizes="(max-width: 767px) 80vw, 380px" className="object-cover" />
                    </div>
                </div>
            </div>

            <div className="relative mt-8 pt-6">
                <span data-line aria-hidden className="absolute inset-x-0 top-0 h-px origin-left bg-burgundy/20" />
                <div data-copy className="flex items-baseline gap-4">
                    <span className="font-display font-medium text-[clamp(36px,3vw,56px)] leading-none text-caramel/80 transition-colors duration-500 group-hover:text-burgundy">
                        {number}
                    </span>
                    <h3 className="font-display font-medium text-burgundy text-[clamp(24px,1.9vw,36px)] leading-tight">{title}</h3>
                </div>
                <p data-copy className="mt-4 max-w-[36ch] font-body text-[clamp(16px,1.05vw,20px)] leading-[1.65] text-chocolate">
                    {text}
                </p>
            </div>
        </div>
    );
}
