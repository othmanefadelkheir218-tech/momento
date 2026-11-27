import Image from "next/image";
import type { Episode } from "@/Data/episodes";

// One episode: a clean portrait picture (nothing printed on it), then "Épisode 01" and its title
// underneath, like a page of a storybook. Desktop: the picture drifts inside its frame while scrolling.

type Props = { episode: Episode; label: string; title: string; className?: string };

export default function EpisodeCard({ episode, label, title, className = "" }: Props) {
    return (
        <figure className={`group ${className}`}>
            <div className="relative aspect-3/4 overflow-hidden rounded-[20px] bg-cream-dark">
                {/* taller than its frame, so it can drift up and down inside it (data-parallax, desktop) */}
                <div data-parallax="6" className="absolute inset-x-0 -top-[8%] h-[116%]">
                    <Image
                        src={episode.image}
                        alt=""
                        fill
                        sizes="(max-width: 767px) 46vw, 280px"
                        className="object-cover transition-transform duration-1200 ease-out group-hover:scale-[1.04]"
                        style={{ objectPosition: episode.focus }}
                    />
                </div>
            </div>
            <figcaption className="mt-5">
                <span className="block font-body font-semibold text-[11px] uppercase tracking-[.18em] text-caramel">{label}</span>
                <span className="mt-2 block font-display font-medium text-[clamp(20px,1.8vw,24px)] leading-snug text-burgundy">
                    {title}
                </span>
            </figcaption>
        </figure>
    );
}
