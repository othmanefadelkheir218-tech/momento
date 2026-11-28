import { ReactNode } from "react";

// The wrapper of every page (except the home): one continuous cream page, body text in Manrope.
// Sections are placed inside it, in order.

export default function PageShell({ children }: { children: ReactNode }) {
    return <div className="overflow-x-clip bg-cream font-body text-chocolate">{children}</div>;
}
