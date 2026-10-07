# Wedding Invitation Website — Implementation Plan

## Project status

**Status:** Planning only — no website code/build yet.

**Goal:** Recreate the visual language and scroll experience of the supplied wedding-invitation reference video as a mobile-first, editable wedding invitation for:

- **Bride:** Riya Kothari
- **Groom:** Rahul Mehta
- **Wedding date:** Sunday, 27 December 2026
- **Muhurat / ceremony:** 12:00 PM
- **Venue:** Nemuch
- **Venue address:** `sample address` (placeholder)
- **Google Maps:** `sample link` (placeholder)
- **Bride's parents:** Nilesh Kothari and Sunita Kothari
- **Groom's parents:** `sample name` and `sample name` (placeholder)

### Pre-wedding / wedding events currently supplied

| Event | Date | Time |
|---|---|---:|
| Chaak | 26 Dec 2026 | 10:00 AM |
| Haldi | 26 Dec 2026 | 1:00 PM |
| Mamera | 26 Dec 2026 | 3:00 PM |
| Reception | 26 Dec 2026 | 5:00 PM |
| Jaimala | 27 Dec 2026 | 10:00 AM |
| Main wedding / Muhurat | 27 Dec 2026 | 12:00 PM |

---

# 1. Reference-video analysis

The supplied video is a **screen recording / promotional Reel showing a mobile wedding invitation being scrolled**. The social-media interface around the phone is not part of the website and should not be reproduced.

The actual invitation has a mobile-first, elegant Indian wedding aesthetic with:

- Deep indigo / navy / royal-purple background
- Warm gold/champagne ornamentation
- Cream/off-white typography
- Elegant script typography for names and major romantic phrases
- Serif/display typography for headings
- Small uppercase labels and time/date text
- Hanging floral/genda/mogra-style decorations
- Gold ornamental borders and line art
- Glowing string lights / star-like particles
- Rounded/translucent cards
- Large decorative wedding illustration
- Smooth scroll-driven transitions and reveal animations
- Countdown section
- Couple section
- Main ceremony/date section
- Event timeline
- Venue/location section
- Directions / calendar actions
- Final celebratory closing section

The design should preserve the **feel and hierarchy** of the reference rather than blindly copying the surrounding Reel/Instagram UI.

---

# 2. Proposed technology stack

## Frontend

- **Next.js**
- **React**
- **TypeScript**
- **CSS / Tailwind CSS** for layout and styling
- **Framer Motion or carefully chosen CSS animations** for reveals/transitions
- **SVG** for reusable decorative ornaments where practical

## Hosting

- **Vercel**
- GitHub repository connected to Vercel
- Automatic deployment whenever approved changes are pushed

## No backend initially

Version 1 should not require a database unless a real online RSVP system is requested.

The invitation can initially be a static/data-driven site with client-side interactions:

- Countdown
- Map link
- Calendar links
- WhatsApp RSVP/share
- Music toggle, if desired
- Scroll animations

This keeps the project inexpensive and easy to maintain.

---

# 3. Core architectural principle: editable content

Wedding information should be kept separate from the design.

Proposed structure:

```text
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
│
├── components/
│   ├── Hero.tsx
│   ├── WeddingIntro.tsx
│   ├── Countdown.tsx
│   ├── CoupleSection.tsx
│   ├── MainCeremony.tsx
│   ├── EventTimeline.tsx
│   ├── VenueSection.tsx
│   ├── CalendarActions.tsx
│   ├── Gallery.tsx
│   ├── RSVPSection.tsx
│   ├── MusicButton.tsx
│   └── ClosingSection.tsx
│
├── data/
│   └── invitation.ts
│
└── styles/
```

Content example:

```ts
export const invitation = {
  bride: {
    name: "Riya Kothari",
    parents: ["Nilesh Kothari", "Sunita Kothari"],
  },

  groom: {
    name: "Rahul Mehta",
    parents: ["sample name", "sample name"],
  },

  wedding: {
    date: "2026-12-27",
    day: "Sunday",
    muhurat: "12:00 PM",
  },

  venue: {
    name: "Nemuch",
    address: "sample address",
    mapsUrl: "sample link",
  },

  events: [
    {
      name: "Chaak",
      date: "2026-12-26",
      time: "10:00 AM",
    },
    {
      name: "Haldi",
      date: "2026-12-26",
      time: "1:00 PM",
    },
    {
      name: "Mamera",
      date: "2026-12-26",
      time: "3:00 PM",
    },
    {
      name: "Reception",
      date: "2026-12-26",
      time: "5:00 PM",
    },
    {
      name: "Jaimala",
      date: "2026-12-27",
      time: "10:00 AM",
    },
    {
      name: "Wedding Ceremony",
      date: "2026-12-27",
      time: "12:00 PM",
    },
  ],
};
```

The final implementation should make future edits possible mostly by changing this data file and replacing assets.

---

# 4. Planned page structure

## Section A — Opening / Hero

Purpose: reproduce the strongest visual moment from the reference.

Planned elements:

- Hanging floral ornament
- Decorative emblem
- "Welcome to the Wedding" / equivalent intro text
- Riya Kothari
- Decorative `&`
- Rahul Mehta
- Couple illustration
- Soft particles / glow

Semantic structure:

```html
<header>
  <p>Welcome to the Wedding</p>
  <h1>Riya Kothari & Rahul Mehta</h1>
  <figure>
    <img ... />
  </figure>
</header>
```

The names should be the dominant text on the page.

---

# 5. Wedding introduction / invitation wording

This section should present the family names and the formal invitation message.

Potential content structure:

```text
Together with their families,
Nilesh & Sunita Kothari
and
[ Groom's Parents ]

request the honour of your presence
...
```

Exact wording is not finalized.

The section will use:

- `section`
- `h2`
- `p`
- possibly `address` / family text where appropriate

---

# 6. Live countdown

A real-time countdown should lead to:

**27 December 2026, 12:00 PM**

Display:

```text
DAYS
HOURS
MINUTES
SECONDS
```

Each number can use a styled rounded/outlined card similar to the reference.

Important implementation detail:

- The countdown should calculate from a single ISO date/time value.
- Time zone must be fixed to the intended Indian wedding location/time zone rather than relying blindly on the visitor's device.

---

# 7. Couple section

The reference has an individual couple-information section.

For this invitation, it can contain:

- Riya's name
- Rahul's name
- Short personal/family line, if desired
- Initials
- Optional smaller portraits

Suggested semantic structure:

```html
<section>
  <h2>The Couple</h2>

  <article>...</article>
  <article>...</article>
</section>
```

This section should remain optional if the final invitation feels more elegant without extra biography text.

---

# 8. Main ceremony section

This is one of the hero content blocks.

Planned content:

```text
THE MAIN CEREMONY

27
December 2026

Sunday
Muhurat at 12:00 PM

Nemuch
sample address
```

It should include the main decorative motif from the reference and visually distinguish the wedding date from the other events.

---

# 9. Event timeline

All functions should be data-driven and displayed in chronological order.

Current timeline:

```text
26 Dec
10:00 AM  — Chaak
1:00 PM   — Haldi
3:00 PM   — Mamera
5:00 PM   — Reception

27 Dec
10:00 AM  — Jaimala
12:00 PM  — Wedding Ceremony
```

Potential UI:

- Date divider
- Vertical line
- Decorative event nodes
- Event name
- Event date/time
- Optional icon

The order should be generated from the data rather than manually hard-coded into the page.

---

# 10. Venue section

Planned content:

```text
WHERE & WHEN

Nemuch

sample address

[Get Directions]
```

The venue card may also support an optional venue image later.

Semantic HTML:

```html
<section>
  <h2>The Venue</h2>
  <h3>Nemuch</h3>
  <address>sample address</address>
  <a href="sample link">Get Directions</a>
</section>
```

---

# 11. Map / directions

Do not make the invitation dependent on an always-loaded interactive map.

Preferred approach:

- Elegant visual venue card
- Map thumbnail or decorative map treatment if desired
- Main CTA: `Get Directions`
- Open Google Maps in a new tab/app

Later, a live embedded map can be added if there is a reason to do so.

---

# 12. Calendar functionality

Recommended buttons:

- Add to Google Calendar
- Download `.ics` calendar file

The generated calendar event should use the correct:

- Event name
- Date
- Start time
- End time
- Venue
- Address

This will be particularly useful for relatives.

---

# 13. RSVP / WhatsApp

Recommended first version:

```text
RSVP / CONTACT

[ RSVP ON WHATSAPP ]
[ SHARE INVITATION ]
```

WhatsApp can open with a pre-filled message.

A full form/database should only be added if needed.

---

# 14. Closing section

The invitation should end in the visual style of the reference:

- Large romantic closing message
- Floral/ornamental repeat
- Family names
- Optional hashtag
- RSVP/share actions
- Optional music control

Example direction:

```text
We can't wait to celebrate with you

With love,
The Kothari & Mehta Families
```

Final wording is not locked yet.

---

# 15. Illustrations and image assets

## Supplied couple illustration

The user has provided:

`couple illustration.png`

This should be treated as the **current hero/couple artwork**.

For the first implementation:

- Place the supplied illustration as-is.
- Do not attempt background removal in the first build.
- Leave the asset path/configuration easy to replace later.

The user plans to provide a version with the background removed later.

Once a transparent/background-removed version is supplied, the hero can place the couple illustration over the website's custom background without the rectangular image backdrop.

## Important

The supplied illustration should be used as the actual image asset, not recreated in HTML/CSS.

---

# 16. Assets I may still need from the user

## Required later

1. **Background-removed couple illustration**
   - Preferred format: transparent PNG or WebP
   - Keep good resolution

2. **Final groom's parents' names**
   - Current values are placeholders

3. **Actual venue address**
   - Current value is `sample address`

4. **Actual Google Maps URL**
   - Current value is `sample link`

## Strongly recommended

5. A good **couple photograph**, if one exists
6. Optional **venue photograph**
7. Optional individual **bride portrait**
8. Optional individual **groom portrait**

These are not mandatory if the illustration is going to be the main visual.

## Optional

9. Background music/audio file
10. A wedding monogram / initials/logo
11. A specific Sanskrit/Hindi/English blessing or invitation quote
12. Wedding hashtag

No separate purple background image is required at this stage; the visual background can be recreated with CSS/SVG so it remains responsive and editable.

---

# 17. Typography plan

Use three distinct typographic roles.

## Display/script font

For:

- Riya Kothari
- Rahul Mehta
- romantic closing phrase
- large ceremonial headings where appropriate

## Serif/display font

For:

- section headings
- dates
- formal invitation copy

## Small uppercase font

For:

- labels
- times
- event metadata
- buttons
- location information

Fonts should be selected/licensed so they can legally be embedded in the site.

Exact font matching will be chosen after a visual comparison against the reference.

---

# 18. Color system

Initial palette:

```css
--navy: #0a1230;
--indigo: #141d4b;
--royal-purple: #2c245d;
--gold: #d2ae62;
--champagne: #f2dfb6;
--cream: #fff6e6;
--muted-text: #d9d1c3;
```

These are starting values, not final locked colors.

The goal is to reproduce the reference's **deep blue/purple + warm gold/cream** contrast.

---

# 19. Decorative system

Use reusable layers instead of baking the whole design into a single image.

Possible layers:

1. CSS background gradients
2. Subtle noise/texture
3. SVG ornamental frames
4. Gold floral motifs
5. Hanging garlands
6. String lights
7. Small particle/star layer
8. Section separators
9. Glowing highlights

This makes it possible to change the theme later without replacing the whole page.

---

# 20. Animation plan

Animation should be elegant and restrained.

## Hero

- Slow fade-in
- Name reveal
- Illustration reveal
- Small particle movement

## Scroll

- Section fade/translate reveal
- Timeline nodes reveal sequentially
- Decorative elements move slightly

## Countdown

- Live number updates
- Avoid excessive number-flipping effects unless it matches the final reference closely

## Closing

- Slow ornament / light movement

Animations should respect `prefers-reduced-motion`.

---

# 21. Responsive plan

The site should be designed **mobile-first** because the reference itself is a mobile invitation.

Primary target widths:

```text
360px
375px
390px
414px
```

Then adapt to:

```text
768px
1024px
1440px+
```

Desktop should not simply stretch the mobile design.

Instead, desktop can:

- limit content width
- enlarge illustration area
- give decorations more breathing room
- preserve the invitation's tall, elegant feel

---

# 22. Accessibility and semantic HTML

Recommended elements:

```text
main
header
section
footer
nav
h1
h2
h3
p
time
address
article
figure
img
a
button
```

Images should have meaningful `alt` text.

Examples:

```html
<img
  src="/wedding/couple.png"
  alt="Illustration of Riya Kothari and Rahul Mehta"
/>
```

Dates and times should use `<time>` where practical.

Interactive controls should remain keyboard accessible.

---

# 23. Performance plan

Wedding invitations are often opened over mobile data.

Therefore:

- Compress images
- Prefer WebP/AVIF where appropriate
- Lazy-load non-critical images
- Avoid giant video backgrounds
- Avoid heavy JavaScript libraries unless necessary
- Keep animations lightweight
- Optimize fonts
- Preload only critical assets

The supplied illustration should be resized/exported appropriately for its actual display size.

---

# 24. What should NOT be copied from the reference video

Do not include:

- Instagram/Reel UI
- Reel buttons
- Social-media header
- Hand/phone recording frame
- "Send message" interface
- Promotional account branding
- Any unrelated watermark/creator branding

Those elements belong to the video context, not to the wedding invitation.

---

# 25. Potential implementation difficulties

## A. Exact font matching

The exact reference typeface may not be known or may not be legally reusable.

Solution:

- Identify visually similar licensable fonts
- Centralize typography variables so the font can be changed later

## B. Decorative artwork

Some reference decorations may be image artwork rather than CSS.

Solution:

- Recreate major repeating motifs as SVG/CSS
- Use real supplied assets where available

## C. Hero illustration

The current image has its own background.

Solution:

- Use it as-is for the first version
- Replace with transparent-background version later

## D. Exact mobile spacing

The design relies heavily on carefully tuned vertical spacing.

Solution:

- Build against real phone widths
- Test at 360/375/390/414px

## E. Calendar interoperability

Google Calendar and `.ics` need slightly different handling.

Solution:

- Provide a Google Calendar URL/button
- Generate a standards-compatible `.ics` file for other calendar apps

## F. Time zones

Countdown must use the Indian time zone intended for the ceremony.

Solution:

- Store the target wedding timestamp explicitly
- Avoid using ambiguous local browser dates

## G. Motion quality

Too much animation will make the site feel like an advertisement.

Solution:

- Use slow, elegant transitions
- Respect `prefers-reduced-motion`

---

# 26. Recommended development order

```text
Phase 1 — Content and architecture
    ↓
Define invitation.ts
Define components
Define asset structure

Phase 2 — Mobile visual shell
    ↓
Background
Typography
Hero
Main spacing system

Phase 3 — Content sections
    ↓
Invitation message
Countdown
Couple
Main ceremony
Timeline
Venue
Closing

Phase 4 — Interactions
    ↓
Countdown logic
Maps
Calendar
WhatsApp
Share
Optional music

Phase 5 — Decorative fidelity
    ↓
SVG ornaments
Floral decorations
Particles
Borders
Glow effects

Phase 6 — Responsive + performance
    ↓
Phone testing
Desktop testing
Image optimization
Font optimization

Phase 7 — Deployment
    ↓
GitHub
Vercel
Final testing
Share link
```

---

# 27. Questions / decisions still needed

These do not block planning, but they should be answered before the final website implementation.

### Content

1. What are the groom's parents' actual names?
2. What is the actual address for Nemuch?
3. What is the actual Google Maps link?
4. Is `Nemuch` the exact spelling/display name you want?

### Invitation wording

5. Do you want a traditional formal invitation message, or a short modern one?
6. Do you want any Sanskrit/Hindi/English blessing or shloka?
7. Should the family names appear prominently on the hero, or only in the invitation section?

### Event structure

8. Is "Reception" really on **26 Dec at 5:00 PM**, or is that another function?
9. Is "Chaak" the exact spelling you want displayed?
10. Is "Mamera" the exact spelling you want displayed?
11. Are there any additional functions missing from the current list?
12. What is the expected duration/end time for each major event, especially the wedding ceremony?

### Visual

13. Should we keep the same deep navy/purple + gold palette from the reference?
14. Do you want the supplied illustration to be the dominant hero visual?
15. Once the transparent version is ready, should the couple appear full-body as in the supplied illustration?
16. Do you have a preferred script font/style, or should I choose one matching the reference?
17. Do you want real couple photos anywhere, or only the illustration?

### Features

18. Do you want background music?
19. Do you want a WhatsApp RSVP button?
20. Do you want Google Calendar / `.ics` calendar buttons?
21. Do you want a "Share Invitation" button?
22. Do you want a gallery?
23. Do you want an actual RSVP form/database, or just WhatsApp RSVP?

### Editing

24. For later editing, is changing one `invitation.ts` configuration file enough, or do you eventually want a visual admin panel where you can edit the invitation without touching code?

---

# 28. Final recommendation

For this wedding, I recommend **not building an admin dashboard initially**.

Build a polished, reusable, data-driven Next.js invitation with:

- One configuration file for all wedding details
- Reusable React components
- Replaceable image assets
- Mobile-first styling
- Vercel deployment
- Google Maps
- Calendar support
- WhatsApp/share actions
- Real countdown
- Reference-matched visual treatment

Then, if you later discover that multiple people need to edit it without touching code, a small CMS/admin layer can be added without throwing away the visual design.

**Current content placeholders that must be replaced before launch:**

```text
Groom parents:
sample name and sample name

Venue address:
sample address

Google Maps:
sample link
```

**Current hero asset:**

```text
couple illustration.png
```

This asset is approved for the first implementation, and the background-removed version can replace it later.
