import { useTranslations } from "next-intl";
import type { Shop } from "@/Data/shops";

// One shop of the "Où nous trouver" list: a row between two hairlines, name on the left, details
// on the right. Until the shop's details are filled in (src/Data/shops.ts), it shows the
// "[À compléter…]" placeholder.

export default function ShopCard({ shop }: { shop: Shop }) {
    const t = useTranslations("Sections.findUs");
    const details = [shop.address, shop.hours, shop.phone].filter(Boolean);

    return (
        <li className="grid gap-2 border-b border-burgundy/15 py-6 md:grid-cols-[1fr_1.2fr] md:gap-8">
            <h3 className="font-display font-medium text-burgundy text-[24px] leading-tight">{shop.name || t("shopName")}</h3>
            <div>
                {details.length > 0 ? (
                    details.map((line) => (
                        <p key={line} className="font-body text-[15px] leading-[1.7] text-chocolate">
                            {line}
                        </p>
                    ))
                ) : (
                    <Placeholder>{t("shopPlaceholder")}</Placeholder>
                )}
            </div>
        </li>
    );
}

/** Content that still has to be written: shown quietly, in caramel. */
export function Placeholder({ children }: { children: string }) {
    return <span className="block font-body text-[14px] leading-[1.7] text-caramel">{children}</span>;
}
