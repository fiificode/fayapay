# Redesign fayapay.com

You are rebuilding the marketing site for FayaPay (https://fayapay.com) from scratch in this empty directory. I have been contracted to redesign it. The current site is honest and well written but visually plain: flat rows of screenshots and almost no motion. The new site should look professional and modern, be engaging to scroll, and show the product working instead of only describing it.

Read this whole brief before starting. Study the live site first (homepage, `/privacy`, `/assets/site.css`) so you know what you are replacing.

## The product

FayaPay is an Android app for Ghana. It automates mobile money USSD: the user taps "Send money", "Buy airtime" or "Check balance", and FayaPay dials the USSD code (for example `*123#`) and answers the network's menus for them. It is not a wallet. It runs the user's own MoMo menus on their own SIMs, on MTN MoMo, Telecel Cash and AT Money. It also builds a payment history from the SMS receipts the network sends.

Facts that constrain the design:

- Android 7 and newer only. There is no iPhone version and no Google Play listing: the app is a directly downloaded APK that the user sideloads. The install steps and the SHA-256 checksum exist because of this, so they matter.
- Ghana only. Currency is GHS.
- It is made by Fayaworks Technologies, LLC (https://fayaworks.com). Support is support@fayapay.com.
- The whole pitch rests on trust: the app asks for Accessibility and SMS permissions, so the privacy promises are a core selling point, not fine print.

The audience is Ghanaian Android users, mostly visiting on a phone, often a mid-range or low-end one on metered data. Design mobile first, and treat performance as part of the design.

## Stack

- Next.js (latest stable, App Router, TypeScript)
- Tailwind CSS and shadcn/ui
- GSAP with `@gsap/react` (`useGSAP`) and ScrollTrigger
- Motion (the `motion` package, imported from `motion/react`)
- Fonts: Ubuntu for everything, Ubuntu Mono for USSD codes, amounts in the phone demo, and the checksum. Load both with `next/font/google`. Ubuntu is not a variable font and only ships weights 300, 400, 500 and 700, so build the type scale from those and do not reach for 600 or 800.

Check the current documentation for each library before using its API. These libraries change, and your memory of them may be out of date.

## Content rules

The existing copy is the source of truth. It is reproduced in the appendix at the end of this brief.

- Keep every fact and claim. You may tighten wording, write short section labels and captions, and reorder sentences where the new layout needs it.
- Do not invent anything: no user counts, ratings, testimonials, partner logos, press mentions, new features, or security certifications. If a design idea needs content that does not exist, change the design.
- The privacy policy is legal text. Port `/privacy` from the live site word for word, with only typographic restyling.
- Keep the plain, direct voice of the current copy. No marketing superlatives.

## Brand

Keep the existing identity. The site has to sit comfortably next to the app's own green UI in the screenshots.

- Logo: the green flame, at `https://fayapay.com/assets/flame.svg`, next to the wordmark "FayaPay".
- Colour: keep the green family and the existing light and dark themes. Map these tokens onto shadcn's CSS variables instead of using shadcn's default palette.

| Token | Light | Dark |
|---|---|---|
| accent | `#2E7D32` | `#4CAF50` |
| accent-deep | `#1E5A24` | (take from live CSS) |
| on-accent | `#FFFFFF` | `#06140B` |
| background | `#FFFFFF` | `#0C1510` |
| soft (alternate band) | `#F3F7F2` | `#122019` |
| surface | `#FFFFFF` | `#1A2A20` |
| surface-muted | `#DDEEDC` | `#1F3325` |
| ink | `#10251A` | `#E6F0E7` |
| ink-muted | `#4E6354` | `#9DB3A2` |
| divider | `#DCE6D9` | `#22332A` |
| outline | `#A9C2A7` | `#365042` |
| highlight | `#A5D6A7` | `#5E9B62` |
| credit | `#1E6B32` | `#6FCF8A` |
| debit | `#B3261E` | `#F08A7E` |

- Network chips use each network's own colour (MTN yellow `#FBCC0D`, Telecel red `#E32527`; take AT's from the live CSS). Render them as text chips as the current site does. Do not use the networks' official logos.
- Theme: follow the system preference by default, with a toggle that persists the choice. No flash of the wrong theme on load.

## Design direction

Aim for a confident, calm fintech look: generous white space, a strong type hierarchy in Ubuntu, green used with intent instead of everywhere, and the phone as the hero object. The USSD code itself (`*123#`, in Ubuntu Mono) is a distinctive visual motif that belongs to this product, so use it.

Avoid the generic template look: no purple gradients, no glassmorphism cards, no floating blobs, no stock illustrations, no emoji as icons. If a section looks like it could belong to any SaaS landing page, rework it until it is clearly about USSD and mobile money.

Use shadcn components where they fit (button, accordion for the FAQ, and so on), restyled to the brand.

## Pages

Three routes: `/`, `/privacy`, and the download (which is not a page; see "Download" below).

### Homepage sections

1. **Header.** Flame and wordmark, anchor links to the main sections, theme toggle, and a "Download for Android" button. Compact on mobile.

2. **Hero, with the live USSD demo.** This is the centrepiece.
   - Left: the headline "Automate your USSD", the supporting line, the download button, and the version line (see "Download").
   - Right: a phone built in HTML and CSS, not a screenshot, that plays the product on a loop:
     1. The three flow pills sit ready: Send money, Buy airtime, Check balance.
     2. One is tapped. `*123#` is dialled, with rings rippling out.
     3. A system-style USSD pop-up appears with a numbered menu. An option is chosen by itself, the reply is typed into the field, and Send is pressed. One or two menus follow.
     4. The result lands and the pill shows its outcome: "Sent", "GHS 10.00", or "GHS 607.16".
     5. The demo moves on to the next flow.
   - Base the pop-up and the menu wording on the real screenshots `menus.webp` and `dial.webp`. Keep menu text generic and short.
   - When a menu asks for a PIN, show masked dots only, never digits. This matches the promise that the PIN is never saved.
   - The loop must pause when off screen, and there must be a visible pause/play control. Let the user tap a pill to play that flow.
   - Reserve the phone's space so nothing shifts while it loads.

3. **Works with the mobile money you already have.** The three networks and the four things that work on every network, plus the dual-SIM note. Make "it isn't a new wallet" the point of the section.

4. **From the first tap to every payment.** Four steps (flows, dial, menus, SMS history) using `flows.webp`, `dial.webp`, `menus.webp` and `sms.webp`. One phone frame stays pinned while the screens change and each step's caption comes into focus as the user scrolls. Write the captions from the screenshots' alt text.

5. **Sending money, start to finish.** Four steps (recipient, amount, confirm, success) using the four `send-*.webp` screenshots. Give this a different treatment from section 4 so the page does not repeat itself, for example a horizontal progression with a step indicator. On mobile this can be a swipeable row with scroll snap.

6. **Your money stays yours.** The four privacy promises, with the link to the privacy policy. Give this section weight: it answers the visitor's main worry. Each promise needs a clear icon or small diagram that says what is and is not read.

7. **Questions.** The five FAQs in an accordion. Answers must be in the HTML even when collapsed, for search engines.

8. **Get FayaPay.** Download button, version line, the three install steps, and the SHA-256 checksum with a copy button. Present the install steps as a clear numbered sequence. The "Android may warn..." step should reassure, not alarm.

9. **Footer.** "FayaPay is made by Fayaworks Technologies, LLC. Available in Ghana.", the privacy policy link and the support email.

### Screenshots

All ten are at `https://fayapay.com/assets/screens/<name>.webp` (540×1127): `home`, `home-dark`, `flows`, `dial`, `menus`, `sms`, `send-recipient`, `send-amount`, `send-confirm`, `send-done`. Download them into `public/` along with the flame SVG, the favicons and `og.png`. Keep the existing alt text, which is good. Use `home` and `home-dark` somewhere they earn their place, switching with the theme.

Build one reusable phone frame component and use it everywhere a screen is shown.

## Motion

Motion is here to explain the product and to make the page feel alive and well made. Every animation should have a reason: showing how a flow works, guiding the eye to what matters next, or confirming an interaction.

**Which library does what.** Keep the split clean so the two never fight over the same element.

- GSAP: the hero demo timeline, the pinned and scroll-scrubbed sections, the hero's entrance sequence, and any text-splitting effects.
- Motion: component-level interaction and state. Hover and press feedback, the FAQ accordion, the theme toggle, the "Copied" confirmation, the mobile menu, and simple in-view reveals.
- Never animate one element with both libraries.

**Ideas worth using.**

- A hero entrance that lands the headline, then the phone, then starts the demo.
- The `*123#` motif: a struck-through code in the hero (the current site does this), or digits that type themselves.
- Staggered reveals for lists, with the stagger short enough that nobody waits for content.
- Numbers in the demo that count up to the balance.
- Buttons with real press feedback.

**Rules.**

- Animate `transform` and `opacity`. Do not animate layout properties.
- Honour `prefers-reduced-motion`. With reduced motion, the hero demo shows a static finished state with a play button, pinned sections become normal stacked content, and reveals are instant. Use `gsap.matchMedia()` for this and for breakpoints.
- Scope GSAP with `useGSAP` so everything is cleaned up on unmount, and refresh ScrollTrigger after fonts and images have loaded.
- On small screens, simplify the pinned sections if pinning feels awkward or janky. A smooth simple section beats a stuttering clever one.
- No scroll hijacking and no smooth-scroll library. The page must scroll natively.
- Content must never be invisible if JavaScript fails or is slow. Do not hide things in CSS and rely on JS to reveal them without a fallback.
- Keep animation code out of the server components. Put it in small client components so most of the page stays server rendered.

## Download

Hosting is not decided yet, so the site must work either way.

- The site must build as a fully static export (`output: "export"`). Use no server-only features: no route handlers, no server actions, no middleware, no runtime image optimisation.
- The APK and its metadata are served by an existing Cloudflare Worker, not by this project. Do not create a `/download` route.
- Read one environment variable, `NEXT_PUBLIC_DOWNLOAD_BASE_URL`, defaulting to an empty string (same origin). The download button links to `${base}/download`. Document it in the README and in `.env.example`.
- On load, fetch `${base}/download.json`. It returns `version`, `size` (bytes) and `sha256`. When it succeeds, the version line reads "Version {version}, {size in MB} MB, for Android 7 and newer" and the checksum block appears with a working copy button. When it fails, the line reads "Android 7 and newer" and the checksum block stays hidden. The page must look right in both cases, including during local development where the fetch will fail.

## SEO and metadata

Carry over everything the current site has, using the Next.js metadata API:

- Title: "FayaPay: send money, buy airtime and check balance by USSD", and the existing meta description.
- Canonical URL, `en-GH` locale, theme colour, favicons, Open Graph and Twitter tags with `og.png`.
- JSON-LD with the same four entities as today: Organization, WebSite, MobileApplication and FAQPage. Copy the values from the live page's source. Generate the FAQPage entries from the same data that renders the accordion so they cannot drift apart.

## Quality bar

- Accessible: semantic landmarks and headings, full keyboard operation, visible focus states, WCAG AA contrast in both themes, alt text on every screenshot, and the animated demo hidden from screen readers with a text equivalent beside it.
- Responsive from 360px wide up to large desktops, with no horizontal scrolling.
- Fast: the hero must be readable before any animation library has loaded. Lazy load below-the-fold screenshots. Keep the JavaScript for the page lean and do not add dependencies beyond the stack above without a good reason.
- Clean code: small focused components, content held in typed data files instead of scattered through JSX, no dead code.

## How to work

1. Study the live site and download the assets.
2. Scaffold the project, set up the theme tokens and fonts, and build the phone frame and the layout shell.
3. Build every section as static, finished-looking content first. The page should already look good with no animation.
4. Add motion: the hero demo first, then the pinned sections, then the smaller interactions.
5. Build `/privacy`.
6. Verify, then fix what you find.

Verify in a real browser, not only by reading the code. Check the page at 360px, 768px and 1440px, in light and dark, and with reduced motion turned on. Watch the hero demo run through all three flows, scroll through both pinned sections in both directions, and confirm the download line in both its success and failure states. Run the production build with static export and a Lighthouse pass on mobile.

When you finish, tell me what you built, what you verified and how, and anything that did not work or that you left out. If you had to make a judgement call on content or scope, list it.

---

## Appendix: existing copy

**Hero**
- H1: Automate your USSD
- Sending money, airtime and balance checks are ready to go. Tap one and FayaPay dials and answers the menus for you.
- Pills: Send money → Sent. Buy airtime → GHS 10.00. Check balance → GHS 607.16.
- Button: Download for Android

**Works with the mobile money you already have**
- FayaPay isn't a new wallet. It runs your own MoMo menus on your own SIMs, so your money stays where it is.
- Networks: MTN MoMo, Telecel Cash, AT Money
- On every network:
  - Send money, to the same network or any other
  - Check your balance
  - Buy airtime, for yourself or anyone else
  - Payment history from your SMS receipts
- Two SIMs? FayaPay sets up an account for each and always dials on the right one.

**From the first tap to every payment** (from the screenshots' alt text)
- Flows for everything you do by USSD: Send money, Buy airtime, Stanbic balance and Data bundle tiles, with Data bundle pinned
- Let FayaPay dial for you: a `*123#` code with rings rippling out
- Let FayaPay answer the menus: a USSD pop-up with 3 Check Balance chosen and Send pressed
- Keep track of every payment: an SMS receipt from Ama Serwaa becoming a row in the payment history

**Sending money, start to finish**
- Pick who to pay, enter the amount and your PIN, then check the details before anything is sent.
- Recipient number: a list of contacts to pick from
- Amount: GHS 50 entered on the number pad
- Send GHS50.00 to Ama Serwaa? The recipient, number, amount, fee and reference, with Confirm and Cancel
- Success: the transaction ID, amount, fee and new balance

**Your money stays yours**
- Your PIN is never saved. You type it each time a menu asks for it. FayaPay answers the menu with it and forgets it.
- Nothing personal is uploaded. Your SMS, contacts, phone numbers, payments and balances stay on your phone.
- It reads only what it needs. Only your mobile money receipts, not your other messages. Only the USSD pop-ups of a flow you started, not other apps.
- No ads. No advertising ID either. Crash and usage reports never contain your SMS, numbers or PIN, and you can turn them off in Settings.
- Link: Read the privacy policy

**Questions**
- Does FayaPay charge fees? FayaPay runs the same USSD menus you would, so your network charges its usual fees and nothing more. FayaPay shows each fee in your history. USSD works without mobile data.
- Why does FayaPay need Accessibility? To read your network's USSD pop-up while a flow you started is running, choose the options and type your answers. It doesn't read other apps or anything else on your screen, and it asks before turning it on.
- Why does it read my SMS? Your network sends an SMS receipt after every payment. FayaPay reads only those receipts to build your history and show your balance, and skips every other message.
- Which phones does it work on? Android 7 and newer, with one or two SIMs from MTN, Telecel or AT in Ghana. There's no iPhone version, because iPhones don't let apps run USSD.
- What if a menu changes? FayaPay checks each menu before it answers. If one doesn't match what it expects, it stops and tells you, instead of guessing. Updated menus arrive as signed updates, at most once a day.

**Get FayaPay**
- Button: Download for Android
- Android 7 and newer
- Steps:
  1. Open the file you downloaded. If Android asks, allow your browser to install apps.
  2. Tap **Install**. Android may warn that the app didn't come from Google Play. That's expected.
  3. Open FayaPay and tap **Get started**. It explains each permission before it asks.
- SHA-256 checksum with a Copy button

**Footer**
- FayaPay is made by Fayaworks Technologies, LLC. Available in Ghana.
- Privacy policy · support@fayapay.com
