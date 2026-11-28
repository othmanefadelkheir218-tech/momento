# Old pages (v1), kept for reference — not used

These are the pages from before the rebuild. They live in `_v1` (a folder starting with `_` is
never a route in Next.js), so nothing here can be visited and nothing imports it.

| Old page | Old address | Replaced by |
| --- | --- | --- |
| `about/` | /about | `our-story/` (/our-story) and `marcelo-and-milo/` |
| `menu/` (+ `menu/[productName]`) | /menu | `creations/` (/creations, /creations/[slug]) |
| `faq/` | /faq | `questions/` (/questions) |
| `become-a-client/` | /become-a-client | `become-a-partner/` (/become-a-partner) |
| `contact/` | /contact | `contact/` (new version) |
| `not-found.tsx` | 404 | `../not-found.tsx` (new version) |

To switch one back: move its folder back to `src/app/[locale]/`, remove the new page with the same
address, remove its line from `redirects()` in `next.config.ts`, and add it to `REBUILD_PAGES` in
`src/lib/comingSoon.ts`.
