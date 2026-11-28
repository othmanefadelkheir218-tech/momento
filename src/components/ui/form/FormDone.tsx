import { ReactNode } from "react";

// What replaces a form once it is sent: a calm thank-you, in the same place.

export default function FormDone({ title, text, action }: { title: string; text: string; action?: ReactNode }) {
    return (
        <div role="status" className="border-t border-burgundy/15 pt-10">
            <p className="font-display font-medium text-burgundy text-[clamp(34px,3.2vw,52px)] leading-tight">{title}</p>
            <p className="mt-4 max-w-[44ch] font-body text-[clamp(16px,1.05vw,19px)] leading-[1.65] text-chocolate">{text}</p>
            {action && <div className="mt-8">{action}</div>}
        </div>
    );
}
