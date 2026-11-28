# Missing information: what to fill in, and where

Everything on the site that still says **[To be confirmed]**, **[TBC]** or **[date…]**, plus a few
things that are not visible but need a check. When you get the information, find the line here, open
the file, change the text, and tick the box.

**How to edit a text:** open `src/messages/en.json` and search for the key (for example
`Sections.partner.order`). The key path follows the nesting in the file:
`Sections` → `partner` → `order` → `rows`. Numbers like `items[1]` mean "the 2nd item of the list"
(counting starts at 0).

Only English is written for now (fr / nl / de are not touched yet).

---

## 1. Company and legal (ask: accountant / company registration)

| ☐ | What is missing | Where it shows | Where to edit |
|---|---|---|---|
| ☐ | Legal entity name, address, company (registration) number | Privacy Policy §1, Terms §2 | `en.json` → `Sections.legal.privacy.articles[0].body[0]` and `Sections.legal.terms.articles[1].body[0]` |
| ☐ | Which law applies: Belgian only? (task.md says "Belgian and/or Moroccan", but the business is in Belgium only for now) | Terms §9 | `Sections.legal.terms.articles[8].body[0]` |
| ☐ | Also check "Belgium and Morocco" in the Privacy Policy complaints article | Privacy §9 | `Sections.legal.privacy.articles[8].body[0]` |
| ☐ | How long we keep personal data (retention periods) | Privacy §6 | `Sections.legal.privacy.articles[5].body[0]` |
| ☐ | Email for privacy requests | Privacy §8 | `Sections.legal.privacy.articles[7].body[0]` |
| ☐ | Do we use marketing cookies? (keep or delete "[If used]") | Cookies §2 | `Sections.legal.cookies.articles[1].items[2]` |
| ☐ | Cookie table: name · purpose · duration · type of each cookie, once the analytics tools are chosen | Cookies page | add rows in `COOKIES` in `src/components/sections/Legal/CookieTable.tsx` |
| ☐ | Online ordering: if it is ever added, write this article; otherwise delete it | Terms §6 | `Sections.legal.terms.articles[5]` |
| ☐ | "Last updated" date of the legal pages (one date for all) | Privacy, Cookies, Terms, Allergens | `Sections.legal.date` |

## 2. Contact details

| ☐ | What is missing | Where it shows | Where to edit |
|---|---|---|---|
| ☐ | Public email address | Contact page | `Sections.contact.details.emailValue` |
| ☐ | Public phone number | Contact page | `Sections.contact.details.phoneValue` |
| ☐ | Email for press & partnerships | Contact page | `Sections.contact.press.text` |
| ☐ | Email for allergen questions | Allergens page (bottom) | `Sections.allergens.contact.text` |
| ☐ | **The footer shows a placeholder email and phone** (`contact@momento.com`, `+216 55 55 55 55`, a Tunisian number) | Footer, every page | `COMPANY_EMAIL` and `COMPANY_PHONE` in `src/Data/socialmedia.ts` |
| ☐ | TikTok page link (the TikTok buttons stay hidden until it exists) | Footer, The Momento World, Contact | `COMPANY_TIKTOK` in `src/Data/socialmedia.ts` |
| ☐ | Check that the central admin accepts a contact message **without phone and without city** (the contact page doesn't ask for a city, and the phone is optional). If it refuses, the contact form will show an error | Contact form | `src/app/api/central/contact/route.ts` |

## 3. Products (ask: production / supplier spec sheets)

| ☐ | What is missing | Where it shows | Where to edit |
|---|---|---|---|
| ☐ | **Storage: frozen or refrigerated?** task.md says "Keep refrigerated", but the supplier spec sheets say *stored frozen (−18 °C), keep max. 7 days at 2–4 °C after thawing, do not refreeze*. Choose the right wording | Every product page, Become a Partner (order details), Questions | `Sections.creations.product.storageValue`, `Sections.partner.order.rows[2].value`, `Sections.questions.groups.creations.items[1].a[0]` |
| ☐ | Shelf life (the spec sheets give 282 to 365 days frozen, depending on the product) | Every product page | `Sections.creations.product.storageValue` |
| ☐ | Size of the pot for Tiramisu Classique and Nutella Crousti (the others show the weight from their spec sheet: 100 g, 110 g, 115 g or 120 g; check those too) | Their product pages, nutrition table | `weight` in `src/Data/MomentoProducts.ts` (empty = "[to be confirmed]") |
| ☐ | **Cookies is not a pot.** Its photos show a 480 g bag of 6 frozen cookie-dough balls "to bake at home". Decide: is it part of the creations? If yes, it needs its own one-line description, description, format ("Bag of 6, 480 g"?) and quote | Our Creations, Cookies page | `Sections.creations.products.cookies` (short, description, quote) |
| ☐ | Which creations are **seasonal**? Today all 14 are "Everyday range", so the "Seasonal specials" filter shows "No creations found" | Our Creations (filter + seasonal section), product pages | `type` of each line in `src/Data/creations.ts` (`"everyday"` or `"seasonal"`) |
| ☐ | Which creations are the **newest**? "Newest first" uses the order of the list in `creations.ts` (the last line = newest) | Our Creations (sort) | order of the lines in `src/Data/creations.ts` |

### Allergens: must be checked before the site goes live

| ☐ | What is missing | Where to edit |
|---|---|---|
| ☐ | **The whole allergen table is a draft**, copied from the supplier spec sheets ("Contient…" / "Peut contenir des traces de…"). Every value must be checked against the official recipes. Note: most tiramisus list **fish** (gelatine) | `ALLERGEN_TABLE` in `src/Data/allergens.ts` |
| ☐ | Allergens of Tiramisu Classique, Nutella Crousti, Cookies (no spec sheet yet: all "[TBC]") | same file |
| ☐ | When everything is verified: remove the red-flag sentence above the table | `Sections.allergens.table.draft` |

### Nutrition (per 100 g)

| ☐ | What is missing | Where to edit |
|---|---|---|
| ☐ | Nutrition values of Tiramisu Classique, Bueno, Nutella Crousti, Cookies | `nutrition` in `src/Data/MomentoProducts.ts` (Cookies has no line yet: add one, or ask me) |
| ☐ | Check the other values (copied from spec sheets; some sheets were incomplete) and remove "[All values to be completed…]" | `Sections.allergens.nutrition.note` |

## 4. For businesses (B2B) (ask: sales)

| ☐ | What is missing | Where it shows | Where to edit |
|---|---|---|---|
| ☐ | Other business types we work with (or delete the line) | Become a Partner, "Who it's for" | `Sections.partner.who.items[5]` |
| ☐ | Wholesale prices: what can we say? | "What you get" | `Sections.partner.offer.items[1]` |
| ☐ | Regular and/or one-off orders? | "What you get" | `Sections.partner.offer.items[2]` |
| ☐ | Brand visuals and display materials: do we give them? | "What you get" | `Sections.partner.offer.items[3]` |
| ☐ | A dedicated contact for orders? | "What you get" | `Sections.partner.offer.items[4]` |
| ☐ | Delivery or collection? | "How it works", step 05 | `Sections.partner.steps.items[4]` |
| ☐ | Minimum order | "Order details" + Questions | `Sections.partner.order.rows[0].value` and `Sections.questions.groups.business.items[0].a[0]` |
| ☐ | Ordering frequency | "Order details" | `Sections.partner.order.rows[1].value` |
| ☐ | Delivery: area, days, cost | "Order details" + Questions | `Sections.partner.order.rows[3].value` and `Sections.questions.groups.business.items[3].a[0]` |
| ☐ | Payment terms | "Order details" | `Sections.partner.order.rows[4].value` |
| ☐ | Can a client choose the flavours? | Questions | `Sections.questions.groups.business.items[1].a[0]` |
| ☐ | Can a client order seasonal creations? | Questions | `Sections.questions.groups.business.items[2].a[0]` |
| ☐ | Where to find Momento: list of partners / points of sale in Belgium | Questions | `Sections.questions.groups.momento.items[3].a[0]` |

## 5. Franchise (ask: management)

| ☐ | What is missing | Where it shows | Where to edit |
|---|---|---|---|
| ☐ | Product range and recipes: what is provided? | Become a Partner, "What we offer" | `Sections.partner.franchiseOffer.items[1]` |
| ☐ | Training | "What we offer" + Questions | `Sections.partner.franchiseOffer.items[2]` and `Sections.questions.groups.franchise.items[2].a[0]` |
| ☐ | Ongoing support | "What we offer" | `Sections.partner.franchiseOffer.items[5]` |
| ☐ | Other criteria for franchisees (or delete the line) | "Who we are looking for" | `Sections.partner.profile.items[3]` |
| ☐ | Do I need experience in pastry? | Questions + Become a Partner | `Sections.questions.groups.franchise.items[0].a[0]` |
| ☐ | How long does it take to open? | Questions + Become a Partner | `Sections.questions.groups.franchise.items[1].a[0]` |

## 6. Marcelo & Milo (ask: brand / content team)

| ☐ | What is missing | Where it shows | Where to edit |
|---|---|---|---|
| ☐ | Marcelo's signature line (a short sentence he always says) | Meet Marcelo & Milo | `Sections.characters.marcelo.quote` |
| ☐ | Milo's signature line | Meet Marcelo & Milo | `Sections.characters.milo.quote` |
| ☐ | The product quotes were written by me (one per creation, Marcelo or Milo): read them and change any you don't like | Each product page | `Sections.creations.products.<product>.quote` (who speaks: `voice` in `src/Data/creations.ts`) |
| ☐ | Links to the Reels / playlists of each mini-series (until then, "Watch the episodes" opens the Instagram page) | The Momento World | `reel` of each line in `src/Data/miniSeries.ts` |

## 7. Not built yet (from task.md)

- **Cookie banner** ("We use cookies… Accept all · Refuse · Customise"): not built yet. It should
  be added together with the analytics tool, because the banner has to really switch the cookies on
  and off.
