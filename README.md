# EarlSky.dev — Software Engineer Portfolio

A responsive multi-page portfolio built with **React + TypeScript**, **Java 21 / Spring Boot**, **MySQL**, and **Docker Compose**.

## Routes

- `/` — portfolio homepage with a TradingView ticker tape above the eight-city weather rail.
- `/software`, `/finance`, `/healthcare`, `/art`, `/about` — category pages and résumé page.
- `/software/task-to-do`, `/software/ai-reference`, `/software/edge-ai`, `/software/embedded`, `/software/api-observability` — Software projects.
- `/finance/sp500-heatmap`, `/finance/indices-tracker`, `/finance/calculator` — Finance projects.
- `/healthcare/care-team`, `/healthcare/health-insights`, `/healthcare/medication-planner`, `/healthcare/eve-chemo`, `/healthcare/queue-eve-ivs`, `/healthcare/baxter-ivp-exp` — Healthcare projects.
- `/art/digital-gallery`, `/art/generative-studies`, `/art/interactive-sketchbook`, `/art/creative-toolkit`, `/art/effects-patterns` — Art projects.
- Project slots have explicit routes and render the shared placeholder detail page until project content is added.
- `/finance/calculator` — gross-to-net estimate and a 2026 U.S. military compensation estimate (basic pay, BAH by duty station, BAS, and state residence tax).
- `/software/ai-reference` — searchable, tiered model table; official links appear only where first-party sources confirm a match.
- `/healthcare/eve-chemo` — searchable demo page transcribed from supplied HTML; medication information is unverified and not clinical guidance.
- `/healthcare/queue-eve-ivs` — source workflow details plus the four supplied PowerShell text blocks, shown collapsed as display-only content; no macro is executed.
- `/healthcare/baxter-ivp-exp` — supplied medication names and storage intervals with illustrative dates calculated from the viewer's current local date; source values and date projections are unverified and not clinical guidance.
- `/about` — editable résumé template; use Print / Save PDF to export.
- `/art/creative-toolkit` — red-themed Art reference page linking PICO-8, PuzzleScript, the Twine Cookbook, Twine 2 docs, Bitsy docs, Lospec, and LibreSprite (external links open in a new tab).
- `/art/effects-patterns` — red-themed Art reference page linking The Ladybug browser effects studio and Book of Shapes (external links open in a new tab).

The weather rail shows current conditions for Las Vegas, Palo Alto, San Francisco, Seattle, Dallas, Miami, Dededo, and Baguio City. Each tile includes Fahrenheit/Celsius readings and a local clock with timezone abbreviation and UTC offset.

The homepage's “Built with purpose” section links to AI Reference, Queue Eve IVs, and About, and includes a marked JPEG image slot beside the hero headline.

## What is implemented vs. a placeholder

- Weatherline is the confirmed working project from the existing portfolio.
- Task To Do, Edge AI, Embedded, API Observability, the remaining Healthcare concepts, and Art items are editable project slots. AI Reference is a searchable directory; Eve Chemo, Queue Eve IVs, and Baxter IVP exp are separate reference demos containing user-supplied, unverified information.
- AI Reference preserves the supplied model names and descriptions. Official-source review confirmed links for 20 of the 32 entries; 12 remain unlinked where no exact or explicitly mapped first-party match was found. Descriptions themselves are not fact-checked.
- The Finance heatmap and index-tracker page remain visual demos. The homepage uses the supplied TradingView `tv-ticker-tape` web component with four supported index/proxy feeds: [`FOREXCOM:SPXUSD`](https://www.tradingview.com/symbols/FOREXCOM-SPXUSD/) (S&P 500 CFD-style feed), [`FOREXCOM:DJI`](https://www.tradingview.com/symbols/FOREXCOM-DJI/) (Dow Jones / US30), [`FOREXCOM:NSXUSD`](https://www.tradingview.com/symbols/FOREXCOM-NSXUSD/) (US 100 / Nasdaq-100 proxy, not Nasdaq Composite IXIC), and [`FOREXCOM:US2000`](https://www.tradingview.com/symbols/FOREXCOM-US2000/) (US Small Cap 2000 / Russell 2000 proxy). Quote availability and timing may vary; this is not a guaranteed real-time trading feed. See [TradingView's Ticker Tape documentation](https://www.tradingview.com/widget-docs/widgets/tickers/ticker-tape/).
- Gross-to-net uses your editable combined effective-tax-rate assumption and pre-tax deductions. It does not calculate individual tax returns or withholding.
- Military pay shows published 2026 U.S. active-duty monthly **basic pay** by grade and official service bracket, plus **BAH** for the selected military housing area and dependent status and **BAS** at the 2026 enlisted or officer rate. It estimates state income tax on basic pay only, using the state of residence you select, since BAH and BAS are excluded from federal taxable income (state treatment of allowances varies). It excludes special pays, federal income tax, and deductions. Sources: [DFAS enlisted](https://www.dfas.mil/Military-Members/payentitlements/Pay-Tables/Basic-Pay/EM/), [warrant officer](https://www.dfas.mil/Military-Members/payentitlements/Pay-Tables/Basic-Pay/WO/), and [commissioned officer](https://www.dfas.mil/Military-Members/payentitlements/Pay-Tables/Basic-Pay/CO/) basic-pay tables, the [DFAS BAS table](https://www.dfas.mil/militarymembers/payentitlements/Pay-Tables/bas/), and the [DTMO 2026 BAH rates](https://www.travel.dod.mil/Allowances/Basic-allowance-for-Housing/) for all 299 U.S. military housing areas.
- Baxter IVP example dates use simple calendar-day addition from the viewer's current local date and the source-listed interval (for example, 30 days from 09/30/26 displays 10/30/26). They are arithmetic illustrations only—not patient-specific or validated beyond-use dates—and do not account for preparation time, actual storage history, product labeling, or institutional policy. Verify independently; do not use as clinical guidance.
- The homepage JPEG image slot is intentionally empty and labeled for replacement with a portfolio image.
- EarlSky, experience, education, résumé links, and contact details remain editable placeholders.

## Host on GitHub Pages

The repository includes a GitHub Actions workflow that builds the frontend and deploys it when changes are pushed to `main`. In the repository settings, open **Pages** and set the build and deployment source to **GitHub Actions**. The site will be available at <https://earl-sky.github.io/portfolio/> after the workflow completes. Page links use hash routes so direct navigation works on GitHub Pages.

## Run with Docker

From the project root, with Docker Engine or Desktop and the Compose plugin installed:

```bash
docker compose up --build
```

Open **http://localhost:3000**. Nginx serves the React app with history fallback for direct navigation to nested routes and proxies `/api` to Spring Boot; MySQL stores the configured weather cities.

The Compose defaults (`local-only-change-me`, `local-root-change-me`) are for local development only. Replace them before sharing or deploying; never commit real secrets.

## Run separately

- Frontend: `cd frontend && npm install && npm run dev` (Vite proxies `/api` to `http://localhost:8080`).
- API: `cd backend && mvn spring-boot:run` (requires MySQL at `localhost:3306`; see `backend/src/main/resources/application.yml`).

If the API is unavailable during UI-only preview, the weather rail falls back to public Open-Meteo data. No API key is required for the prototype.

## Existing API

- `GET /api/weather/cities` — current weather for Las Vegas, Palo Alto, San Francisco, Seattle, Dallas, Miami, Dededo, and Baguio City.
- `GET /api/health` — health check.
