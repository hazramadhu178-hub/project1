# Verdara Mountain Resort — Single-Page Luxury Hotel Website

A premium, single-page hospitality website for a fictional luxury mountain resort in
Darjeeling, West Bengal. Built with React + Vite, Tailwind (used sparingly) and
Framer Motion for slow, editorial scroll animations.

## Run

```bash
npm install
# Add Gmail credentials to backend/.env for real reservation emails.
npm run dev            # starts the Vite app + reservation email server
npm run build          # production build (single file in dist/)
```

In local development, if `backend/.env` is not configured yet, the reservation
endpoint will still accept requests and return a success message so the form works
without crashing. For real email delivery, add your Gmail app credentials there.

## Stack

- React 19 + Vite (JavaScript / JSX only — no TypeScript in app code)
- Framer Motion — reveals, parallax, accordion, lightbox, counters
- lucide-react — line icons (social icons are hand-rolled SVG)
- Plain CSS design system in `src/styles`, Tailwind only for small utilities

## Structure

```
mountain-resort/
  backend/
    server.js
    package.json
    .env
  public/
  src/
    App.jsx               entry, renders pages/Home
    pages/Home.jsx        the whole single-page journey, in scroll order
    components/           Header, MobileMenu, Hero, section components,
                          RoomCard, GalleryGrid, Lightbox, BookingForm, Footer…
    data/                 rooms.js, experiences.js, offers.js, gallery.js,
                          faq.js, nav.js, images.js  ← edit content here
    styles/               variables.css, global.css, header.css, hero.css,
                          sections.css, rooms.css, gallery.css, footer.css
    utils/
    index.css
    main.jsx
  .env                    Vite environment variables
  package.json
  package-lock.json
  vite.config.ts
  index.html
  README.md
```

### Content & imagery

All copy lists live in `src/data`. Imagery is served from the Pexels CDN through the
`px(id, w, h)` helper in `src/data/images.js` — replace that helper (or the IDs) to
plug in real resort photography without touching any component.

### Design tokens

Colours, fonts, radii and elevation are declared once in `src/styles/variables.css`:
deep forest `#18352C`, dark forest `#10251F`, warm ivory `#F5F1E8`, soft cream
`#EAE3D5`, mountain stone `#8A867B`, muted gold `#B59A63`.
Headings use Playfair Display, everything else Poppins.

The radius scale runs `--r-xs` (8px) → `--r-2xl` (fluid 28–56px) plus `--r-pill`,
and elevation runs `--shadow-xs` → `--shadow-lg`. Every section is rendered as a
rounded panel that overlaps the one above it (`main > section + section` pulls up by
`--r-2xl`), so the page reads as a stack of floating cards on a forest canvas.
Change the two variables to retune the whole site's softness.

### Behaviour notes

- Navigation scrolls smoothly between sections on a single page; the active section
  is tracked with an IntersectionObserver.
- The booking form validates on the client (required fields, email format, date
  order, guest count) and shows an inline confirmation — it never claims the
  reservation is confirmed, and no `alert()` is used.
- Gallery filtering + fullscreen lightbox supports keyboard (←, →, Esc).
- Footer "Information" links open real destinations: FAQ scrolls to its section,
  while Cancellation Policy, Privacy Policy and Terms & Conditions open full
  document pages (`PolicyPage.jsx`, content in `src/data/policies.js`) — a
  fullscreen overlay with an ivory paper sheet, Esc to close, scroll lock and
  focus return.
- `prefers-reduced-motion` disables parallax, counters and reveal motion.
