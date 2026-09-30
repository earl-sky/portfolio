# Design direction — multi-page portfolio

## Ground-truth visual reference
Keep the user's supplied reference as the design authority: near-black canvas, compact weather strip, restrained wordmark and nav, large split hero with terminal card, visual project tiles, career timeline, skill groups, activity preview, and minimal footer. Preserve the editorial developer-portfolio mood, dense-but-readable technical labels, and red/cyan/lime accents.

## Design movement
Editorial, systems-minded engineering portfolio with terminal-inspired details and measured technical imagery.

## Core principles
- Clear hierarchy and generous section spacing.
- Accessible navigation and keyboard-visible focus; dropdowns work by pointer and keyboard/touch.
- Keep the existing live weather widget and cursor racer global, secondary, and non-blocking.
- Avoid false credentials, shipped-project claims, health outcomes, or unsupported real-time market claims. The Eve Chemo screen is a reference demo, not a clinically validated tool.
- Make each category landing page visually consistent, with large icon tiles leading to dedicated URLs.

## Color philosophy
Near-black/blue-charcoal surfaces (`#090a0e`, `#111319`), off-white headings, slate secondary text, signal-red headlines, engineering teal, and occasional lime labels. Category cards use luminous, subdued accent treatments, not saturated full-page themes.

## Layout paradigm
Persistent top weather rail and shared header/footer around React Router pages. Navigation: Home, Software, Finance, Healthcare, Art, About. Software and Finance and Healthcare and Art each have a main route plus an adjacent dropdown toggle with links to their overview and project pages. Home remains the original portfolio long page; category routes show a concise hero and card grid; project routes show a dedicated detail/preview page; Finance has a calculator route; About has a print-ready résumé template.

## Signature elements
Retain the four-city weather strip, dark glass treatment, terminal card, project-card visuals, original Weatherline artwork, and 🏎️💨 mouse/pen follower. Category landing tiles use large Lucide icons and their own subtle accent light.

## Interaction philosophy
Clicking a category label navigates to its overview. A separate chevron button toggles its dropdown; pointer movement does not dismiss a click-open menu. Escape, outside click, route navigation, or clicking the chevron again closes it. Project tiles open their matching detail URLs. The Finance pay calculator is interactive. Demo-only market data is clearly marked. About offers print/save-to-PDF.

## Animation
Short transitions and restrained hover elevation only; honor `prefers-reduced-motion`; no parallax or scroll hijacking.

## Typography system
Bold geometric sans for headlines, readable sans for body, monospace for terminal output and metadata.

## Brand essence and voice
A focused software engineer's portfolio: practical, confident, systems-minded, and explicit about what is a demo versus completed work.

## Wordmark and signature color
Use editable `YourName.dev` until the user supplies a preferred name. Signal red (`#ef4653`) remains the main accent, balanced with teal (`#44d2c5`) and lime (`#d0db54`).

## Content and data assumptions
- Weatherline is the only confirmed shipped project; AI Reference is a functional directory built from supplied content. The remaining Software, Healthcare, and Art concept cards are clearly labeled until implemented projects are supplied.
- Eve Chemo transcribes the user-supplied medication list without validating it; the page must prominently state that it is unverified and not clinical guidance.
- Queue Eve IVs shows the supplied workflow details and PowerShell macro text in collapsed, display-only panels; no macro is executed, and the source remains unverified and not operational guidance.
- Baxter IVP exp shows the medication names and storage intervals transcribed from supplied HTML, prominently labels them unverified and not clinical guidance, and keeps expiry-date calculations disabled.
- AI Reference preserves the supplied model names/descriptions; only exact or explicitly mapped first-party model destinations receive links, with unmatched names labeled unverified.
- Finance market pages remain visual demos. The homepage ticker uses four TradingView-supported feeds: `FOREXCOM:SPXUSD` (S&P 500), `FOREXCOM:DJI` (Dow Jones/US30), `FOREXCOM:NSXUSD` (US 100/Nasdaq-100 proxy, not Nasdaq Composite IXIC), and `FOREXCOM:US2000` (US Small Cap 2000/Russell 2000 proxy). No FX, crypto, or gold symbols are included. Sources: https://www.tradingview.com/symbols/FOREXCOM-SPXUSD/, https://www.tradingview.com/symbols/FOREXCOM-DJI/, https://www.tradingview.com/symbols/FOREXCOM-NSXUSD/, https://www.tradingview.com/symbols/FOREXCOM-US2000/. Quote availability and timing vary; do not present the widget as a guaranteed real-time trading feed.
- Salary net-pay estimation uses the user's editable combined effective tax rate and is not individualized tax advice.
- Military pay uses official 2026 U.S. active-duty monthly basic pay by grade/service bracket; it excludes allowances and deductions.
- The About page is a printable résumé template with placeholders for the user's real name, experience, education, and contact details.
