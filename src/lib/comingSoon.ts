// Site mode, controlled by NEXT_PUBLIC_APP_MODE:
//   "prod" (default) → "Coming soon" mode: every route redirects to the
//                       localized home page, which shows the ComingSoon screen.
//   "dev"            → the full site with all pages.
// No pages are deleted — switching to "dev" brings everything back.
export const APP_MODE = process.env.NEXT_PUBLIC_APP_MODE === "dev" ? "dev" : "prod";

export const COMING_SOON = APP_MODE === "prod";
