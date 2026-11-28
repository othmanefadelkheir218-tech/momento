import Image from "next/image";
import Glow from "@/components/ui/Glow";
import SoftImage from "@/components/ui/SoftImage";
import type { Creation } from "@/Data/creations";

// The pot of a creation, on a soft light (no frame). Cut-out pictures float on the glow;
// a photo that still has its background (Cookies) melts into the cream with soft edges.

type Props = { creation: Creation; alt: string; sizes: string; className?: string; priority?: boolean };

export default function CreationImage({ creation, alt, sizes, className = "", priority }: Props) {
    return (
        <div className={`relative isolate ${className}`}>
            <Glow className="inset-[6%]" />
            {creation.cutOut ? (
                <Image
                    src={creation.image}
                    alt={alt}
                    fill
                    sizes={sizes}
                    priority={priority}
                    className="object-contain p-[8%] transition-transform duration-700 ease-out group-hover:-translate-y-1.5 group-hover:scale-[1.03] motion-reduce:transition-none"
                />
            ) : (
                <div className="absolute inset-[6%]">
                    <SoftImage src={creation.image} alt={alt} sizes={sizes} className="h-full w-full" feather={14} />
                </div>
            )}
        </div>
    );
}
