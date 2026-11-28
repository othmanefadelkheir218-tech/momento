"use client";

import Section from "@/components/ui/Section";
import CatalogueToolbar from "./CatalogueToolbar";
import CreationCard from "./CreationCard";
import CreationRow from "./CreationRow";
import NoResults from "./NoResults";
import { useCatalogueFilters } from "./useCatalogueFilters";

// "Our Creations": the toolbar, then every creation (grid by default, or list), or the
// "No creations found" message. Creations: src/Data/creations.ts.
// Uses the page address (useSearchParams): the page wraps it in <Suspense>.

export const CATALOGUE_ID = "catalogue";

export default function CreationsCatalogue() {
    const { filters, results, isFiltered, reset } = useCatalogueFilters();

    return (
        <Section id={CATALOGUE_ID} className="scroll-mt-24 pt-0!">
            <CatalogueToolbar filters={filters} count={results.length} isFiltered={isFiltered} onReset={reset} />

            {results.length === 0 ? (
                <NoResults onReset={reset} />
            ) : filters.view === "grid" ? (
                <ul className="mt-8 grid grid-cols-2 gap-x-5 gap-y-12 sm:grid-cols-3 md:mt-10 md:gap-x-8 xl:grid-cols-4">
                    {results.map((c) => (
                        <li key={c.key}>
                            <CreationCard creation={c} />
                        </li>
                    ))}
                </ul>
            ) : (
                <ul className="mt-4">
                    {results.map((c) => (
                        <li key={c.key}>
                            <CreationRow creation={c} />
                        </li>
                    ))}
                </ul>
            )}
        </Section>
    );
}
