# Images needed: what to generate, and where it goes

The pictures the new pages still need, each with a ready-to-paste AI prompt written for the exact
section it fills. Until a picture exists, the page shows an existing picture in its place (or no
picture), so nothing is broken in the meantime.

**When a picture is ready:**
1. Save it in `public/` under the file name given (create the folders if needed).
2. Open the file named in "Plug it in", replace the old path with the new one, save.

---

## The business, in short (so every picture tells the same story)

Momento is a Belgian brand of **handmade desserts in individual clear pots**: tiramisus, cheesecakes,
mousse, each with visible layers and "Momento" written on the pot in a burgundy script. It sells
mainly **to cafés, restaurants, hotels and shops**, and later through **franchise shops**.
The brand is told through two **imaginary characters**, in an animated-film style:

- **Marcelo**: the experienced pastry chef. Generous, warm, a perfectionist, loyal to tradition, a
  little dreamy and clumsy.
- **Milo**: the young creative chef. Curious, bold, spontaneous, funny, always trying something new.

They live in **one warm artisan kitchen** that changes with the seasons. Each season has its own
mini-series (Christmas, Valentine's Day, Ramadan, Easter, Summer, Back to school).

## Keep every picture consistent

Paste these two blocks into every prompt (they are already included in the prompts below).

**Characters**
> Marcelo: a middle-aged pastry chef, big and round, warm kind face, short dark-brown curly hair,
> thick dark eyebrows, rosy cheeks, clean-shaven, cream double-breasted chef jacket with brown
> buttons and rolled sleeves, deep burgundy apron, a striped tea towel at his waist.
> Milo: a young pastry chef in his mid-twenties, tall and slim, long face, big expressive eyes,
> tousled wavy chestnut-brown hair, cream chef jacket with brown buttons, rust-brown apron.

**Style**
> Stylised 3D animated family-film look, soft global illumination, warm golden light, gentle depth of
> field, cosy artisan pastry kitchen with wooden counters, copper pans, glass jars and cream plaster
> walls. Colour palette: cream, caramel, burgundy, chocolate brown. Clear round dessert pots with
> visible layers and "Momento" in burgundy script. No text, no captions, no watermark, no logo other
> than "Momento" on the pots.

**Composition rules for this site**
- The site melts the **edges** of every picture into the cream page. Keep the subject in the middle
  80% and the edges calm and light (no faces or hands cut at the border).
- No words or signs in the picture (apart from "Momento" on the pots); all text is on the page.
- Generate a little bigger than the size given (for example 2400 px wide for a 16:10 picture), then
  save as `.jpg` (quality around 85).

> Tip: some AI tools refuse prompts that name a film studio. These prompts describe the look
> instead, so they work everywhere. If your tool accepts it, you can add "in the style of a modern
> animated feature film".

---

## The Momento World (`/world`)

### 1. Hero: "Welcome to The Momento World"
- **Section text:** *A warm little kitchen where every dessert begins with a story.*
- **Save as:** `public/pages/world/hero.jpg` · **Shape:** 16:10 landscape
- **Plug it in:** `worldHero` in `src/Data/pageImages.ts`
- **Today:** the Christmas kitchen picture (it is also used for the winter season)

```
A wide, welcoming establishing shot of a cosy artisan pastry kitchen seen from the doorway, as if the
viewer is being invited in. In the middle, Marcelo and Milo look up from the counter with warm smiles,
as if greeting a guest. A row of clear Momento dessert pots on the wooden counter, soft morning
sunlight through a tall arched window, steam from a cup, flour in the air catching the light. Neutral
season (no Christmas decorations). Marcelo: a middle-aged pastry chef, big and round, warm kind face,
short dark-brown curly hair, thick dark eyebrows, rosy cheeks, clean-shaven, cream double-breasted
chef jacket with brown buttons, deep burgundy apron. Milo: a young slim pastry chef, big expressive
eyes, tousled wavy chestnut-brown hair, cream chef jacket, rust-brown apron. Stylised 3D animated
family-film look, soft global illumination, warm golden light, copper pans, glass jars, cream plaster
walls, palette of cream, caramel, burgundy and chocolate brown. Calm, light edges. No text, no watermark.
```

### 2. "Step into the kitchen"
- **Section text:** *This is where Marcelo and Milo imagine, taste, test and sometimes make a
  delicious mess. It is warm, bright and always smells of something sweet.*
- **Save as:** `public/pages/world/kitchen.jpg` · **Shape:** 16:9 landscape
- **Plug it in:** `worldKitchen` in `src/Data/pageImages.ts`
- **Today:** Milo holding up an empty pot (also used on the Marcelo & Milo page)

```
A joyful, slightly chaotic moment in a warm artisan pastry kitchen: Milo, licking a spoon with his
eyes closed in delight, accidentally knocks a bag of flour that bursts into a soft cloud, while
Marcelo, piping cream into clear dessert pots, freezes with a raised eyebrow and a hidden smile.
Bowls, whisks, chocolate shavings and berries scattered on the wooden counter: a delicious mess.
Bright warm light from a window. Marcelo: a middle-aged pastry chef, big and round, short dark-brown
curly hair, thick dark eyebrows, rosy cheeks, cream double-breasted chef jacket, deep burgundy apron,
striped tea towel at his waist. Milo: a young slim pastry chef, tousled wavy chestnut-brown hair, big
expressive eyes, cream chef jacket, rust-brown apron. Stylised 3D animated family-film look, soft
global illumination, copper pans, glass jars, cream plaster walls, palette of cream, caramel, burgundy
and chocolate brown. Clear pots with "Momento" in burgundy script. No other text, no watermark.
```

### 3–6. "The kitchen changes with the seasons" (4 pictures, one set)
- **Section text:** *Christmas lights, spring flowers, summer colours. The kitchen is always the same
  home, dressed for the season.*
- **Save as:** `public/pages/world/season-winter.jpg`, `season-spring.jpg`, `season-summer.jpg`,
  `season-autumn.jpg` · **Shape:** 3:4 portrait
- **Plug it in:** `worldSeasons` in `src/Data/pageImages.ts` (the 4 pictures appear only once all 4
  are filled in)
- **Important:** the **same kitchen corner, same camera angle** in all four; only the decoration and
  light change. Generate the first one, then reuse it as the reference image for the other three.

```
[WINTER] Portrait view of the same corner of a cosy artisan pastry kitchen: an arched window, a wooden
counter with three clear Momento dessert pots, copper pans on the wall, a shelf of glass jars. Dressed
for winter: warm string lights, pine branches and red berries on the window, snow falling outside,
a cup of hot chocolate, cinnamon sticks. Golden evening light. No people. Stylised 3D animated
family-film look, soft global illumination, palette of cream, caramel, burgundy and chocolate brown.
Calm, light edges. No text except "Momento" on the pots, no watermark.
```
For the other three, keep the prompt and replace the "Dressed for…" sentence:
- **Spring:** *Dressed for spring: fresh flowers in a jug, pastel blossoms outside the open window,
  strawberries on the counter, soft fresh morning light.*
- **Summer:** *Dressed for summer: lemons and mangoes in a bowl, a straw hat on a hook, bright sunny
  light and green leaves outside the open window.*
- **Autumn:** *Dressed for autumn: pumpkins, chestnuts and copper leaves, rain on the window, a
  knitted scarf on a hook, soft amber afternoon light.*

### 7–12. Mini-series covers: "Watch the story unfold"
- **Save as:** `public/pages/world/series-<name>.jpg` (names below) · **Shape:** 4:3 landscape
- **Plug it in:** `image` of each line in `src/Data/miniSeries.ts` (for example
  `{ key: "valentine", image: "/pages/world/series-valentine.jpg", reel: "" }`)
- **Today:** no pictures (the list shows text only). Fill all six, so the list stays even.

Start every prompt with the **Characters** and **Style** blocks above, then add:

| File | Season · Series | Scene to add to the prompt |
|---|---|---|
| `series-christmas.jpg` | Christmas · *The Birth of Momento* | `On a snowy Christmas night, Milo holds up an empty clear pot with a spark of an idea in his eyes, while Marcelo, next to a traditional cake, looks at the pot with a raised eyebrow, curious. Christmas lights, pine branches, snow on the window.` |
| `series-valentine.jpg` | Valentine's Day · *Marcelo Prepares a Surprise* | `Marcelo secretly decorates two Momento pots with tiny raspberry hearts, his tongue out in concentration, while Milo peeks from behind a shelf, grinning. Soft pink evening light, a few red roses in a jar.` |
| `series-ramadan.jpg` | Ramadan · *Evening Sweetness* | `At sunset, Marcelo and Milo set a long wooden table with Momento pots, dates and mint tea for friends to share after the fast. Warm lanterns, a crescent moon visible through the window, deep blue and golden light.` |
| `series-easter.jpg` | Easter · *The Hunt for New Flavours* | `Milo, with a little basket, searches the kitchen for hidden chocolate eggs, finding one inside a copper pan, while Marcelo laughs behind the counter holding a new Momento pot topped with mini eggs. Spring flowers, soft fresh light.` |
| `series-summer.jpg` | Spring / Summer · *Milo's Tasty Adventures* | `Milo, wearing a straw hat, bursts in with a crate of mangoes, lemons and raspberries, while Marcelo, sweating a little in the summer heat, fans himself with a recipe book. Bright sunny light, open window, green leaves.` |
| `series-back-to-school.jpg` | Back to school · *Back to the Kitchen* | `Marcelo writes a new recipe on a small blackboard like a teacher, while Milo sits on a stool taking notes in a notebook, a row of new Momento pots between them. Early autumn morning light.` |

---

## Meet Marcelo & Milo (`/marcelo-and-milo`)

### 13. Marcelo's portrait: "The experienced pastry chef"
- **Section text:** *Marcelo is the heart of Momento… he imagines the recipes, chooses the flavour
  pairings and makes sure every creation is perfect.* Generous, warm, a perfectionist, loyal to
  tradition, a little dreamy and clumsy.
- **Save as:** `public/pages/characters/marcelo.jpg` · **Shape:** 4:5 portrait
- **Plug it in:** `marcelo` in `src/Data/pageImages.ts`
- **Today:** Marcelo piping chocolate (a crop of an existing picture)

```
Portrait of Marcelo alone in his artisan pastry kitchen, from the waist up, centred: a middle-aged
pastry chef, big and round, warm kind face, short dark-brown curly hair, thick dark eyebrows, rosy
cheeks, clean-shaven, cream double-breasted chef jacket with brown buttons, deep burgundy apron, a
striped tea towel at his waist. He carefully places a single raspberry on top of a clear Momento
dessert pot with tweezers, completely focused, a tiny proud smile, a smudge of flour on his cheek.
An old handwritten recipe book open beside him. Warm golden light, softly blurred copper pans and
glass jars behind. Stylised 3D animated family-film look, soft global illumination, palette of cream,
caramel, burgundy and chocolate brown. Light, calm edges. No text, no watermark.
```

### 14. Milo's portrait: "The young creative chef"
- **Section text:** *Curious and full of energy, he is always looking for new ideas, and he is the
  one who dares to try something different.* Curious, bold, spontaneous, funny.
- **Save as:** `public/pages/characters/milo.jpg` · **Shape:** 4:5 portrait
- **Plug it in:** `milo` in `src/Data/pageImages.ts`
- **Today:** Milo tasting by a winter window (from the home page)

```
Portrait of Milo alone in an artisan pastry kitchen, from the waist up, centred: a young pastry chef
in his mid-twenties, tall and slim, long face, big expressive eyes, tousled wavy chestnut-brown hair,
cream chef jacket with brown buttons, rust-brown apron. He holds a clear Momento dessert pot in one
hand and pours an unexpected topping (bright mango coulis) with the other, tongue slightly out,
eyes sparkling with curiosity, as if inventing a new flavour right now. A few experimental
ingredients on the counter. Warm golden light, softly blurred copper pans behind. Stylised 3D
animated family-film look, soft global illumination, palette of cream, caramel, burgundy and
chocolate brown. Light, calm edges. No text, no watermark.
```

### 15–16. Small round portraits for the product pages: "Marcelo & Milo say"
- **Where:** next to the chef's quote on every product page (shown as a 56 px circle)
- **Save as:** `public/pages/characters/marcelo-portrait.jpg` and `milo-portrait.jpg` ·
  **Shape:** 1:1 square
- **Plug it in:** `portraitMarcelo` and `portraitMilo` in `src/Data/pageImages.ts`
- **Today:** crops of the "Why Momento" pictures (faces too small in the circle)

```
Head-and-shoulders portrait of [Marcelo: a middle-aged pastry chef, big and round, warm kind face,
short dark-brown curly hair, thick dark eyebrows, rosy cheeks, cream chef jacket, burgundy apron
strap] / [Milo: a young pastry chef, slim, big expressive eyes, tousled wavy chestnut-brown hair,
cream chef jacket, rust-brown apron strap], looking at the viewer with a friendly smile, face centred
and filling most of the square. Plain soft cream background with a gentle warm glow. Stylised 3D
animated family-film look, soft studio light. No text, no watermark.
```
(Generate once for Marcelo, once for Milo: keep only the bracket you need.)

---

## Our Story (`/our-story`)

### 17. Hero: "Our Story"
- **Section text:** *Every moment has its sweetness.*
- **Save as:** `public/pages/story/hero.jpg` · **Shape:** 16:10 landscape
- **Plug it in:** `storyHero` in `src/Data/pageImages.ts`
- **Today:** the chalkboard picture from the home hero (it works; replace only if you want a new one)

```
A quiet, emotional moment at the end of a day in a cosy artisan pastry kitchen: Marcelo and Milo sit
side by side on the edge of the wooden counter, each enjoying a clear Momento dessert pot with a
spoon, looking out of a big arched window at a warm sunset over Belgian rooftops. Seen slightly from
behind and to the side, faces in soft profile, relaxed and happy. Marcelo: big and round, short
dark-brown curly hair, cream chef jacket, deep burgundy apron. Milo: slim, tousled wavy chestnut-brown
hair, cream chef jacket, rust-brown apron. Stylised 3D animated family-film look, soft global
illumination, golden-hour light, palette of cream, caramel, burgundy and chocolate brown. Light, calm
edges. No text, no watermark.
```

### 18. "An idea in the kitchen"
- **Section text:** *How can we make desserts easier to enjoy, without losing the care of homemade
  pastry? Marcelo knew the traditions. Milo had the ideas. Together they found the answer:
  individual pots.*
- **Save as:** `public/pages/story/idea.jpg` · **Shape:** 16:9 landscape
- **Plug it in:** `storyBegan` in `src/Data/pageImages.ts`
- **Today:** Milo holding up an empty pot, Marcelo arms crossed (also on the Marcelo & Milo page)

```
The birth of an idea in a cosy artisan pastry kitchen. On the left, Marcelo stands proudly behind a
big traditional layered tiramisu in a large ceramic dish, a serving spoon in hand. On the right, Milo
holds up a small empty clear dessert pot towards the light, eyes wide with excitement, as if he has
just had the idea. Between them, the first clear Momento pot already filled with neat visible layers,
glowing in a ray of light. Marcelo looks from the big dish to the little pot, a raised eyebrow turning
into a smile. Marcelo: big and round, short dark-brown curly hair, thick eyebrows, cream chef jacket,
deep burgundy apron. Milo: slim, tousled wavy chestnut-brown hair, cream chef jacket, rust-brown
apron. Stylised 3D animated family-film look, warm golden light, copper pans, cream plaster walls,
palette of cream, caramel, burgundy and chocolate brown. No text except "Momento" on the pot.
```

### 19. "Desserts made for your moment"
- **Section text:** *A dessert is more than something sweet. It is a pause, a treat, a moment to
  share… wherever you are.*
- **Save as:** `public/pages/story/moment.jpg` · **Shape:** 5:4 landscape (it is also shown as 4:5
  portrait on phones, so keep the people in the centre)
- **Plug it in:** `storyIdea` in `src/Data/pageImages.ts`
- **Today:** Milo tasting by a winter window

```
Two friends (ordinary customers, same stylised animated style as the chefs) share a pause on a
bench in a sunny Belgian park, each holding a clear Momento dessert pot and a spoon, laughing
together, a paper bag beside them. Autumn leaves, soft afternoon light, a café terrace blurred in the
background. The pots are clearly visible with their layers and "Momento" in burgundy script. Stylised
3D animated family-film look, soft global illumination, warm light, palette of cream, caramel,
burgundy and chocolate brown. Subjects centred, light calm edges. No other text, no watermark.
```

---

## Become a Partner (`/become-a-partner`)

### 20. "The Momento concept" (franchise part)
- **Section text:** *A shop built around a warm, artisan kitchen. Customers choose from a range of
  handmade desserts in pots, take them away and enjoy them wherever they are.*
- **Save as:** `public/pages/partner/franchise-shop.jpg` · **Shape:** 4:5 portrait
- **Plug it in:** `franchiseConcept` in `src/Data/pageImages.ts`
- **Today:** guests enjoying desserts (an episode picture from the home page)

```
Inside a small, elegant Momento dessert shop: a long chilled glass display full of clear Momento
pots in neat rows (tiramisu, red velvet, mango, raspberry, chocolate), behind it an open artisan
kitchen where Marcelo is piping cream and Milo hands a paper bag of pots to a smiling customer.
Cream walls, burgundy details, warm wood, copper pendant lamps, a big shop window with a soft street
view. Inviting and premium, not crowded. Marcelo: big and round, short dark-brown curly hair, cream
chef jacket, deep burgundy apron. Milo: slim, tousled wavy chestnut-brown hair, cream chef jacket,
rust-brown apron. Stylised 3D animated family-film look, soft global illumination, warm light,
palette of cream, caramel, burgundy and chocolate brown. Light calm edges. No text except "Momento"
on the pots, no watermark.
```

---

## Contact (`/contact`)

### 21. Beside the contact form
- **Section text:** *A question, a suggestion or a sweet idea? We'd love to hear from you.*
- **Save as:** `public/pages/contact/letter.jpg` · **Shape:** 4:3 landscape
- **Plug it in:** `contact` in `src/Data/pageImages.ts`
- **Today:** a close-up of Marcelo's hands adding crumbs to a pot

```
Marcelo sits at the end of the wooden counter in his cosy pastry kitchen, reading a handwritten
letter with a warm, touched smile, reading glasses on his nose, while Milo leans over his shoulder
to read too, a spoon still in his mouth. A small stack of envelopes and a clear Momento pot next to
them. Warm afternoon light from the window. Marcelo: big and round, short dark-brown curly hair,
thick eyebrows, cream chef jacket, deep burgundy apron. Milo: slim, tousled wavy chestnut-brown hair,
cream chef jacket, rust-brown apron. Stylised 3D animated family-film look, soft global illumination,
copper pans, palette of cream, caramel, burgundy and chocolate brown. Subjects centred, light calm
edges. No readable writing on the letter, no text, no watermark.
```

---

## 404 page

### 22. "Oops, this page has melted"
- **Section text:** *Marcelo is looking for it in the kitchen, and Milo thinks he may have eaten it.*
- **Save as:** `public/pages/404/confused.jpg` · **Shape:** 4:3 landscape
- **Plug it in:** `notFound` in `src/Data/pageImages.ts`
- **Today:** Milo holding up an empty pot (used on several pages)

```
A funny scene in a cosy artisan pastry kitchen: Marcelo, on his knees, searches under the counter
with a small torch, puzzled, cupboard doors open and pans everywhere, while behind him Milo stands
very still with an innocent face, hiding an empty clear Momento pot behind his back, a little
chocolate cream on the corner of his mouth and a spoon sticking out of his apron pocket. Marcelo:
big and round, short dark-brown curly hair, thick eyebrows, cream chef jacket, deep burgundy apron.
Milo: slim, tousled wavy chestnut-brown hair, big expressive eyes, cream chef jacket, rust-brown
apron. Stylised 3D animated family-film look, soft global illumination, warm light, palette of cream,
caramel, burgundy and chocolate brown. Subjects centred, light calm edges. No text, no watermark.
```

---

## Product photo (a real photo, not AI)

### 23. Cookies, without background
- **Where:** Our Creations card + Cookies product page
- **What:** the other creations use a studio photo of the pot **without background** (transparent
  PNG), seen three-quarters with the lid half open. Cookies only has photos with a background, and
  it is a bag, not a pot (see MISSING-INFO.md §3).
- **Do not generate this with AI**: a product must be shown as it really is. Ask the photographer
  for the same shots as the other products (8 standard views, with and without background), or cut
  out the background of `public/momento_product/Cookies Chocolat au lait - face 3-4 droite.jpeg`.
- **Plug it in:** `COOKIES_PHOTO` / `COOKIES_GALLERY` in `src/Data/creations.ts` (or give Cookies a
  product folder like the others, in `src/Data/MomentoProducts.ts`).
