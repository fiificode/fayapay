# FayaPay website

<!-- test-pr: verify GitHub PR workflow (2026-10-14) -->

The marketing site for [FayaPay](https://fayapay.com): Next.js (App Router), Tailwind CSS, shadcn/ui, GSAP and Motion, set in Ubuntu.

## Commands

```bash
npm run dev     # local development
npm run build   # static export to ./out
npm run lint
```

The site builds as a fully static export, so `./out` can be served by any static host.

## The download

The APK and its metadata are not part of this project. They are served by the existing Cloudflare Worker:

- `/download` is the APK.
- `/download.json` returns `version`, `size` (bytes) and `sha256`.

`NEXT_PUBLIC_DOWNLOAD_BASE_URL` sets the origin for both. Leave it empty when the site is on the same origin as the Worker. Set it (for example to `https://fayapay.com`) when the site is hosted elsewhere; that origin must then allow cross-origin requests to `/download.json`. See `.env.example`.

When `/download.json` cannot be fetched, as in local development, the page shows "Android 7 and newer" and hides the checksum.

## Where things are

- `src/content/site.ts`: all copy, the FAQ and the hero demo's script. The FAQ list also generates the FAQPage structured data.
- `src/content/privacy-policy.ts`: the privacy policy, word for word. It is legal text.
- `src/components/ussd-demo.tsx`: the hero's live demo (GSAP timeline).
- `src/components/sections/`: one file per homepage section.
- `src/app/globals.css`: colour tokens for both themes.

## Motion

GSAP runs the hero demo, the pinned "first tap to every payment" showcase and the scroll-revealed statement. Motion runs interaction: press feedback, the gallery arrows, the theme toggle, the copy confirmation and in-view reveals. With `prefers-reduced-motion`, the demo waits for its play button, the showcase becomes a row of cards and the statement is shown in full.
