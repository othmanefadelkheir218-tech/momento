// Site mode, controlled by NEXT_PUBLIC_APP_MODE:
//   "prod" (default) → "Coming soon" mode: every route redirects to the
//                       localized home page, which shows the ComingSoon screen.
//   "dev"            → the full site with all pages.
// No pages are deleted — switching to "dev" brings everything back.
export const APP_MODE = process.env.NEXT_PUBLIC_APP_MODE === "dev" ? "dev" : "prod";

export const COMING_SOON = APP_MODE === "prod";

// ── Rebuild mode (only applies when the full site is on, i.e. not "coming soon") ──
// While we rebuild the site, the old pages and the old footer are hidden (not deleted).
// The new home (built in /homev2) is shown as the official home at "/{locale}".
// Only the routes listed in REBUILD_PAGES stay reachable ("" = the home); everything else
// redirects to the home. Add a page here once its new version is ready (e.g. "menu").
// Set REBUILD to false to bring every old page, the old home and the old footer back.
export const REBUILD = true;
export const REBUILD_HOME = "";
export const REBUILD_PAGES: string[] = [""];
