import { useTranslations } from "next-intl";
import { HAIRLINE, LABEL } from "@/components/ui/Hairline";

// The cookie table (name, purpose, duration, type). Empty until the tools are chosen.
// To fill it: add rows to COOKIES below (texts are not translated: cookie names are technical).

const COOKIES: { name: string; purpose: string; duration: string; type: string }[] = [];

export default function CookieTable() {
    const t = useTranslations("Sections.legal.cookies.table");
    const columns = t.raw("columns") as string[];

    return (
        <div className="mt-14">
            <h2 className="font-display font-medium text-burgundy text-[clamp(26px,2.2vw,38px)]">{t("title")}</h2>
            <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-[520px] text-left">
                    <thead>
                        <tr className={`border-b ${HAIRLINE}`}>
                            {columns.map((c) => (
                                <th key={c} scope="col" className={`${LABEL} py-3 pr-4`}>
                                    {c}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="font-body text-[15px] text-ink">
                        {COOKIES.length === 0 ? (
                            <tr className={`border-b ${HAIRLINE}`}>
                                <td colSpan={4} className="py-5 text-chocolate/75">
                                    {t("empty")}
                                </td>
                            </tr>
                        ) : (
                            COOKIES.map((c) => (
                                <tr key={c.name} className={`border-b ${HAIRLINE}`}>
                                    <td className="py-4 pr-4">{c.name}</td>
                                    <td className="py-4 pr-4">{c.purpose}</td>
                                    <td className="py-4 pr-4">{c.duration}</td>
                                    <td className="py-4 pr-4">{c.type}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
