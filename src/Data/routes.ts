// Every page of the site, in one place. Header, side menu, footer and buttons use these, so a page
// address is changed here only. Old addresses (/menu, /about…) are sent to the new ones in next.config.ts.

export const ROUTES = {
    home: "/",
    creations: "/creations",
    world: "/world",
    characters: "/marcelo-and-milo",
    story: "/our-story",
    partner: "/become-a-partner",
    questions: "/questions",
    contact: "/contact",
    privacy: "/privacy-policy",
    cookies: "/cookies",
    terms: "/terms",
    allergens: "/allergens-nutrition",
} as const;

/** The page of one creation, e.g. /creations/red-velvet */
export const creationRoute = (slug: string) => `${ROUTES.creations}/${slug}`;
