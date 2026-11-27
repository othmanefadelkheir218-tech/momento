# Momento website: rules for writing code

Next.js (App Router) + next-intl + Tailwind v4 + GSAP. Languages: fr, en, nl, de (`src/messages/*.json`).

## Code organisation (the owner reads and edits the code himself)
- **No long files.** Split code into small, clearly named parts that are easy to read and update by hand.
- **One section = one file (or one folder).** A page file only puts its sections in order; it holds no section markup.
- **Sections are reusable.** The same section can appear on several pages, so sections live in
  `src/components/sections/<SectionName>/`, not inside a page folder. Section-only helpers sit next to it
  (e.g. `Episodes/EpisodeCard.tsx`). Content that is data (shops, episodes…) goes in `src/Data/`.
- Shared UI pieces live in `src/components/ui/` (button, eyebrow, accent heading, fade-in).
- **Never delete an old version ("v1") when replacing it.** Move it to a `v1/` folder next to the live
  file (not imported), with a comment at the top saying what it was and how to switch back.

## Look and feel
- Follow the Momento design spec: Cormorant Garamond for headings (never italic), Manrope for text and
  buttons, Playball for ONE accent word per heading (`<em>`, same colour, ~1.14×). Colours: burgundy
  `#751B32` (dark `#5A1124`), cream `#F7EFE2` (page), cream-dark `#EDE1CF`, caramel `#C68B4E` (eyebrows),
  chocolate `#4A2C21`, ink `#2B1A14` (body text), card `#FFFBF5`. Tailwind names: `burgundy`, `cream`, …
  `font-display`, `font-body`, `font-accent`.
- **Sections must flow into each other.** The visitor should never feel they "leave" one section for the
  next: one continuous cream page, no hard colour bands, borders or dividers between sections. Dark
  (burgundy) blocks are rounded panels inside the page, not full-width bands.
- **Premium, editorial — never a "UI kit / template" look** (the owner called that "cheap"). Avoid:
  boxed cards with icons, pill badges or caption boxes on top of photos, a picture framed inside a box
  inside a box, dashed boxes. Prefer: big refined serif headings, thin hairlines, numbers (01 · 02 · 03),
  pictures with soft edges that melt into the cream (`SoftImage`), captions under pictures, generous space.
- **Animations: beautiful and calm, never too much.** A soft fade/rise when content comes into view is
  enough. Always respect `prefers-reduced-motion`.
- **Buttons: always `MomentoButton`** (`src/components/ui/MomentoButton.tsx`): the header button's shape
  and hover fill; only the font (Manrope) and the colours change per variant.

## Content
- **All visible text goes through next-intl and is translated in all 4 languages** (fr, en, nl, de) in
  the same change. No hard-coded text in components. Section texts live under `Sections.<sectionName>`.
- English uses British spelling. Calm, warm, gourmet tone; no exclamation marks in series.

## Before saying something works
- Run it: `npx tsc --noEmit -p .`, `npx eslint <files>`, and look at the page (desktop + phone) in a browser.
