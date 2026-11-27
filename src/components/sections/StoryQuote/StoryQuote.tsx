import StoryScene from "./StoryScene";
import StoryStacked from "./StoryStacked";

// "Notre histoire en une phrase". Same content everywhere, two layouts:
//   desktop → StoryScene: full-width picture with parallax, the sentence on it (StoryScene.tsx)
//   phones  → StoryStacked: the picture, then the sentence under it (StoryStacked.tsx)
// The picture is set in storyImage.ts. `tone` / `fade` (phones): see Section.
// Older versions: ./v1/

type Props = { tone?: "cream" | "warm"; fade?: "both" | "top" | "bottom" | "none" };

export default function StoryQuote({ tone = "cream", fade = "both" }: Props) {
    return (
        <>
            <StoryScene className="hidden md:block" />
            <StoryStacked tone={tone} fade={fade} className="md:hidden" />
        </>
    );
}
