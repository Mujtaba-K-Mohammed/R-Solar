# Royal Voltage Trading — Solar Website

A complete responsive React + TypeScript + Vite corporate website, with a self-contained procedural photovoltaic module rendered using Three.js, React Three Fiber and Drei. GSAP and ScrollTrigger animate the solar story, imagery and content.

## Run locally

Use Node.js 22.12+ (or a compatible newer LTS) and npm.

```sh
npm install
npm run dev
```

Open the local address printed by Vite. The development server uses port 4173 by default. Open this folder in VS Code; no GLB, API key, video, or image download is necessary.

```sh
npm run build
npm run preview
```

`build` checks TypeScript and generates `dist/`. Deploy `dist/` to any static host. All sections are on one route and navigation uses semantic anchors.

## Architecture

- `src/components/`: navbar, hero, contact, footer, shared branding/icons; editorial sections are grouped in `Sections.tsx`.
- `src/components/three/`: lazy-loaded scene, procedural solar module and studio lighting.
- `src/hooks/`: motion preference and scoped GSAP lifecycle.
- `src/data/`: replaceable company, solutions, projects and statistics.
- `src/styles/`: design tokens, base styling and responsive adaptations.
- `public/images/`: optimized local WebP illustrative photography and photographic fallback for unavailable WebGL.
- `index.html`, `public/robots.txt`: SEO foundation.

## Replace the logo

Put the official file at `public/images/royal-solar-logo.svg` (or PNG). Set `company.logo` to `/images/royal-solar-logo.svg` in `src/data/company.ts`. The shared `Brand` component handles header and footer. Use an appropriate version for navy backgrounds; the temporary wordmark remains when the value is null.

## Edit company information

Edit `src/data/company.ts`: description, phone, email, office, hours, principles, process, and reasons. Company content now follows the supplied 2026 Royal Voltage Trading profile. Business name, logo, establishment year, services, GoodWe distribution, mission, vision and contact details were updated from that source. See CONTENT_SOURCES.md for page references and limitations. Rebuild after editing TypeScript content.

## Edit solutions

Update `src/data/solutions.ts`. The grid and inquiry dropdown read this same source. The short name is the inquiry project-type value. Clicking a solution selects that inquiry type.

## Add real projects and photographs

Put optimized WebP or AVIF files in `public/images/` and update `src/data/projects.ts`. Each record supports title, location, category, capacity, year, client, status, image and descriptive alt text. The gallery currently contains profile highlights rather than invented named projects. Null values are displayed as not specified in the profile. Each record also includes a source page and description. Add confirmed project metadata when it becomes available. Replace the About/CTA image paths there if needed.

## Edit statistics

`src/data/statistics.ts` contains company facts: establishment in 2026, Dubai/UAE base and GoodWe distribution. Project counts, installed capacity and customer satisfaction are not provided by the profile and are not displayed. The reusable numeric-counter hook remains available for future verified statistics.

## Procedural solar panel

`SolarPanel.tsx` builds the aluminum frame, cell layer, glass surface, back sheet, support rails, junction box and short connectors. Seventy-two repeated cells share one geometry/material using an instanced mesh. A small 128×128 canvas texture supplies fine conductor lines; deterministic instance tinting subtly varies the cells. Physically based materials and a low-resolution procedural light environment provide glass and aluminum reflections. There are no external models or environment-map downloads.

`SolarScene.tsx` implements eased entrance, tiny idle motion, damped desktop pointer response and scroll-driven orientation/camera distance. Rendering pauses when offscreen or the document is hidden. Reduced motion uses demand rendering and a static presentation. The hero supplies a static solar photograph fallback when the renderer is unavailable. Context loss switches back to this fallback.

### Optional GLB replacement

Place an optimized model in `public/models/solar-panel.glb`. In a new component import `useGLTF` from `@react-three/drei`, load that path, and return a cloned `scene` via `<primitive object={scene} />`. Replace `<SolarPanel />` inside `Assembly` with that component. Keep the surrounding animation group and adjust its scale/origin to match the procedural model. Keep the lazy import, Suspense and error boundary. Dispose owned resources appropriately; do not mutate a shared cached scene.

## Motion system

`useGsapReveal.ts` registers ScrollTrigger and creates a scoped `gsap.context`. Cleanup calls `context.revert()` to remove only this instance's animations/triggers, including during StrictMode/hot reload. Data attributes select heading masks, element reveals, image clips, stagger groups and counters. The energy SVG path draws with scroll; energy nodes and process stages brighten progressively. The hero has a short unpinned scroll transformation. `useReducedMotion` reacts to OS preference changes and disables continuous/large motion while retaining all content.

## Inquiry integration

The preview is intentionally not connected to a backend and never reports false success. Validation runs locally and retains text on errors. To enable real submission, copy `.env.example` to `.env.local`, set `VITE_INQUIRY_ENDPOINT`, and rebuild. The endpoint must accept a JSON POST with `name`, `company`, `email`, `phone`, `projectType`, `message`, return non-2xx on failure, and apply server-side validation, rate limiting, spam protection and suitable CORS. It must return 2xx only after accepting the inquiry. Client requests time out after 15 seconds. Never put server secrets in `VITE_` variables: they are public browser configuration.

## SEO and public launch

The canonical and `og:url` now point to the existing published Site. Update them when moving to the final company domain; add an approved social image when provided. Generate `public/sitemap.xml` using the final domain, then add its absolute URL to `robots.txt`. The hash-based sections are one canonical page, not separate sitemap URLs. Review content, photos, contact details and inquiry delivery before public use. This version is a complete frontend; real company facts and backend delivery are intentionally pending.

## Performance and accessibility

- Lazy 3D module separates WebGL dependencies from the primary interface.
- DPR capped at 1.5 desktop / 1 mobile; no postprocessing, real-time shadows or video.
- Instanced cells, shared materials, small generated texture, environment resolution 64.
- Continuous rendering stops outside the hero; coarse pointers do not drive rotation.
- Local compressed photos lazy-load below the hero with reserved layout dimensions.
- Semantic sections, one H1, native labels and validation, focus indicators, skip link.
- Mobile menu closes with Escape, traps keyboard focus while open and releases scroll lock on desktop resize.
- Native project dialog provides modal semantics and Escape dismissal.
- CSS recomposes at 1200, 1100, 767 and 400 pixels; honors reduced motion.

## Typography

Manrope is self-hosted under `public/fonts/` with its SIL Open Font License included. System sans-serif fonts provide a loading fallback.

## Photo sources

Legacy stock assets remain in the source for reference; the current page uses images extracted from the user-supplied company profile. Product families are editable in `src/data/products.ts`.

Original stock photo credits:

- Solar farm: Tom Fisk / Pexels, https://images.pexels.com/photos/9893727/pexels-photo-9893727.jpeg
- Commercial roof: Nova lv / Pexels, https://www.pexels.com/photo/aerial-view-of-solar-panels-on-industrial-building-29923348/
- Residential: Robert So / Pexels, https://www.pexels.com/photo/a-house-with-solar-panel-on-the-roof-12243093/

Confirm suitability and the applicable Pexels license when using or replacing these photos commercially.
