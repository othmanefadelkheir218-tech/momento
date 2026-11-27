// ── Reason v1 (NOT USED — see ./WhyMomento.tsx) ──

import Image from "next/image";
import Glow from "@/components/ui/Glow";

// One reason of the "Pourquoi Momento" section: the pot that shows it (on a soft glow), then a
// thin number, a hairline, the title and its text. No box, no icon.

type Props = { number: string; title: string; text: string; image: string };

export default function ReasonV1({ number, title, text, image }: Props) {
    return (
        <div>
            <div className="relative isolate mx-auto aspect-[494/322] w-[78%] max-w-[360px]">
                <Glow tone="light" className="-inset-x-[22%] -inset-y-[30%]" />
                <Image
                    src={image}
                    alt=""
                    fill
                    sizes="(max-width: 767px) 70vw, 360px"
                    className="object-contain drop-shadow-[0_20px_22px_rgb(74_44_33/0.18)]"
                />
            </div>
            <div className="mt-10 flex items-baseline gap-4 border-t border-burgundy/20 pt-6">
                <span className="font-display font-medium text-[clamp(36px,3vw,56px)] leading-none text-caramel/80">{number}</span>
                <h3 className="font-display font-medium text-burgundy text-[clamp(24px,1.9vw,36px)] leading-tight">{title}</h3>
            </div>
            <p className="mt-4 max-w-[36ch] font-body text-[clamp(16px,1.05vw,20px)] leading-[1.65] text-chocolate">{text}</p>
        </div>
    );
}
