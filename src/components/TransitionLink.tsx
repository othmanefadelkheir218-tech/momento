// components/TransitionLink.tsx
"use client";


import { forwardRef } from 'react';
import { useTransition } from "@/Context/TransitionContext";
import { usePathname } from "@/i18n/navigation";

interface TransitionLinkProps {
  href: string;
  label?: string;
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const TransitionLink = forwardRef<HTMLButtonElement, TransitionLinkProps>(({ href, className, children, onClick, onMouseEnter, onMouseLeave }, ref) => {
  const { animatePageOut } = useTransition();
  const pathname = usePathname();

  const handleClick = () => {
    onClick?.();
    // If we are already on this page, do nothing
    if (pathname === href) return;
    console.log("its clicked here", href);
    // Trigger the exit animation -> Then Route
    animatePageOut(href);
  };

  return (
    <button
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`cursor-pointer ${className}`} onClick={handleClick}>
      {children}
    </button>
  );
});

export default TransitionLink;