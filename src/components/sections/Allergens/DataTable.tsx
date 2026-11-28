import { ReactNode } from "react";
import { HAIRLINE, LABEL } from "@/components/ui/Hairline";

// A wide table that reads well on phones: it scrolls sideways while the first column (the product)
// stays in place. Hairlines between rows, no boxes.

type Props = { caption: string; columns: string[]; rows: { key: string; cells: ReactNode[] }[] };

export default function DataTable({ caption, columns, rows }: Props) {
    return (
        <div className="overflow-x-auto" tabIndex={0} role="region" aria-label={caption}>
            <table className="w-full min-w-[760px] text-left">
                <caption className="sr-only">{caption}</caption>
                <thead>
                    <tr className={`border-b ${HAIRLINE}`}>
                        {columns.map((c, i) => (
                            <th key={c} scope="col" className={`${LABEL} py-3 pr-4 align-bottom ${i === 0 ? "sticky left-0 bg-cream" : ""}`}>
                                {c}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="font-body text-[14px] text-ink">
                    {rows.map((row) => (
                        <tr key={row.key} className={`border-b ${HAIRLINE}`}>
                            {row.cells.map((cell, i) =>
                                i === 0 ? (
                                    <th key={i} scope="row" className="sticky left-0 bg-cream py-3.5 pr-4 font-display font-medium text-[18px] text-burgundy">
                                        {cell}
                                    </th>
                                ) : (
                                    <td key={i} className="py-3.5 pr-4">
                                        {cell}
                                    </td>
                                ),
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
