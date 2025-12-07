import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Dot } from "lucide-react";
import TransitionLink from "./TransitionLink";

interface LinkProps {
  data: {
    title: string;
    href: string;
    index: number;
  };
  isActive: boolean;
  onClick?: () => void;
}

export default function NavLink({ data, isActive, onClick }: LinkProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useGSAP(() => {
    if (!ref.current) return;

    const xTo = gsap.quickTo(ref.current, "x", { duration: 1, ease: "power3.out" });
    const yTo = gsap.quickTo(ref.current, "y", { duration: 1, ease: "power3.out" });

    const mouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = ref.current!.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      xTo(x * 0.1); // Reduced factor for subtler effect
      yTo(y * 0.1); // Reduced factor for subtler effect
    };

    const mouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    ref.current.addEventListener("mousemove", mouseMove);
    ref.current.addEventListener("mouseleave", mouseLeave);

    return () => {
      ref.current?.removeEventListener("mousemove", mouseMove);
      ref.current?.removeEventListener("mouseleave", mouseLeave);
    };
  }, { scope: ref });

  return (
    <TransitionLink
      href={data.href}
      onClick={onClick}
      className={`text-white flex items-center `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Dot className={`w-10 h-10 transition-opacity duration-300 ${isActive || isHovered ? "opacity-100" : "opacity-0"}`} />
      <p ref={ref} className="inline-block py-4 px-2">{data.title}</p>
    </TransitionLink>
  );
}