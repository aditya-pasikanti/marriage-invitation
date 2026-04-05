# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start        # Dev server at http://localhost:3000
npm run build    # Production build → /build
npm test         # Run tests (watch mode)
```

## Architecture

This is a Create React App replicating [southindianmarriage.framer.website](https://southindianmarriage.framer.website/). It uses **framer-motion** for all animations.

### Key files

- **`src/App.js`** — Single file containing all 4 page sections as inline components: `Hero`, `Blessings`, `GoldenSection`, `SaveTheDate`. This is the active codebase. Components in `src/components/` are legacy/unused.
- **`src/config.js`** — Single source of truth for all content: couple names, parents, blessings text, event dates, venue, image URLs, gallery columns. Change content here only.
- **`src/App.css`** — All section styles and responsive breakpoints (tablet: 768px, mobile: 480px).
- **`src/styles/global.css`** — Font imports (Cormorant SC, Cormorant Upright, Tiny5) and base resets.

### Section order (matches reference site)

1. **Hero** — Sky background, names text, diyas (left/right), temple image, 3D card (`hero__card-wrap`) at bottom with `rotateX(48deg)` perspective
2. **Blessings** — Red mandala card background; Vinayagar image, blessings text, "Inviting", garland, family names
3. **GoldenSection** — Saffron background; intro text, "WHERE OUR STORY BEGINS" letter animation, parallax gallery columns, food image
4. **SaveTheDate** — Pink/salmon gradient; banner, couples photo, event details grid

### Animation patterns

- **Load animations**: `initial`/`animate` on mount (Hero diyas, text, temple)
- **Scroll-triggered**: `useInView` + `variants` with stagger (Blessings, GoldenSection intro)
- **Scroll-parallax**: `useScroll` + `useTransform` + `useSpring` (GalleryColumn)
- Spring configs are defined at top of App.js: `SPRING_BOUNCE`, `SPRING_SLOW`, `SPRING_SOFT`

### Mobile priority

Primary audience is mobile. The hero section uses `svh` units (`220svh` on mobile) to handle browser chrome. The `hero__card-wrap` uses `perspective` + `rotateX(48deg)` to create the 3D card emerging from below the temple — card width scales dramatically on mobile (`380vw`) to fill the viewport.

### Images

All images are hosted on `framerusercontent.com`. To swap images, update the URLs in `src/config.js` under the `images` key.
