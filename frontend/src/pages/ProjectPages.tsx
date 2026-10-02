import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Calculator, CircleDollarSign, TrendingUp } from 'lucide-react';
import { getProject, categories, type CategoryKey } from '../data/portfolio';
import { getMonthlyBasicPay2026, militaryGradeGroups, serviceBrackets, type PayGrade } from '../data/militaryPay2026';

const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 });
const embeddedVisionExample = `# Illustrative only; not safety-rated detection.
from dataclasses import dataclass

WARNABLE = {"pedestrian", "car", "bicycle", "motorcycle", "scooter"}
DEMO_CONFIDENCE = 0.70  # Tune and validate for the camera and environment.

@dataclass(frozen=True)
class Detection:
  label: str
  confidence: float

def rear_view_warnings(detections: list[Detection]) -> list[Detection]:
  return [
    detection for detection in detections
    if detection.label in WARNABLE
    and detection.confidence >= DEMO_CONFIDENCE
  ]`;

const terminalArtGroups = [
  {
    title: 'Animated scenes',
    commands: [
      { name: 'Matrix rain', formula: 'cmatrix', run: 'cmatrix' },
      { name: 'Steam locomotive', formula: 'sl', run: 'sl' },
      { name: 'Aquarium', formula: 'asciiquarium', run: 'asciiquarium' },
      { name: 'ASCII fire', formula: 'libcaca', run: 'cacafire' },
      { name: 'Nyan Cat', formula: 'nyancat', run: 'nyancat' },
    ],
  },
  {
    title: 'ASCII & text art',
    commands: [
      { name: 'Talking cow', formula: 'cowsay', run: 'cowsay "Hello World"' },
      { name: 'Large text', formula: 'figlet', run: 'figlet Hello!' },
      { name: 'Colorful text', formula: 'toilet', run: 'toilet --gay Hello' },
      { name: 'System logo', formula: 'neofetch', run: 'neofetch' },
      { name: 'Dog text box', formula: 'boxes', run: 'echo "Hello" | boxes -d dog' },
    ],
  },
  {
    title: 'Dashboards & audio',
    commands: [
      { name: 'Audio visualizer', formula: 'cava', run: 'cava --help' },
      { name: 'System monitor', formula: 'btop', run: 'btop' },
      { name: 'System monitor', formula: 'htop', run: 'htop' },
      { name: 'System monitor', formula: 'gtop', run: 'gtop' },
      { name: 'System monitor', formula: 'vtop', run: 'vtop' },
      { name: 'GPU monitor', formula: 'nvtop', run: 'nvtop' },
    ],
  },
  {
    title: 'Built-in surprise',
    commands: [
      { name: 'Emacs Tetris', formula: 'emacs', run: 'emacs -q --no-splash -f tetris' },
    ],
  },
];

function PageBreadcrumb({ category, title }: { category: string; title: string }) {
  return <div className="page-breadcrumb"><Link to="/">HOME</Link><span>/</span><Link to={`/${category.toLowerCase()}`}>{category.toUpperCase()}</Link><span>/</span><span>{title.toUpperCase()}</span></div>;
}

export function ProjectRoutePage({ projectCategory, projectSlug }: { projectCategory?: string; projectSlug?: string } = {}) {
  const params = useParams();
  const category = projectCategory ?? params.category;
  const slug = projectSlug ?? params.slug;
  const project = getProject(category, slug);
  if (!project || !category) return <NotFoundPage />;
  const categoryLabel = categories[category as CategoryKey]?.label ?? category;
  const Icon = project.icon;
  return (
    <main className={`route-main project-detail-page category-${category}`}>
      <PageBreadcrumb category={categoryLabel} title={project.title} />
      <section className="detail-hero">
        <div className="detail-icon"><Icon size={42} strokeWidth={1.4} aria-hidden="true" /></div>
        <div className="detail-copy"><p className="section-kicker">{project.kicker} / {project.status === 'demo' ? 'DEMO' : 'CASE STUDY'}</p><h1>{project.title}</h1><p>{project.description}</p><div className="tag-row">{project.tags.map((tag) => <span className="tech-tag" key={tag}>{tag}</span>)}</div></div>
      </section>
      <section className="detail-placeholder">
        <div className="placeholder-top"><span>PROJECT DETAIL</span><span className={`project-status status-${project.status}`}>{project.status === 'demo' ? 'DEMO DATA' : 'PROJECT SLOT'}</span></div>
        {project.slug === 'embedded' ? (
          <div className="embedded-project">
            <div className="embedded-project-content">
              <div className="embedded-image-placeholder" role="img" aria-label="Image placeholder for Arduino and Raspberry Pi 5 projects">
                <span>PROJECT IMAGE PLACEHOLDER</span>
                <strong>ARDUINO / RASPBERRY PI 5</strong>
              </div>
              <div className="embedded-project-copy">
                <p className="section-kicker">ARDUINO + RASPBERRY PI 5 / JETSON ORIN</p>
                <h2>Embedded display &amp; vision console</h2>
                <p>A configurable in-vehicle display concept combining maps, camera views, and experimental object-warning overlays. The iPad is the display; a Raspberry Pi 5 or Jetson Orin is a candidate for camera processing, with Arduino available for simple physical controls.</p>
              </div>
            </div>

            <div className="embedded-spec-grid">
              <section className="embedded-spec">
                <h3>Display modes</h3>
                <ul>
                  <li>Movie</li>
                  <li>GPS</li>
                  <li>Racetrack map</li>
                  <li>Touge map with upcoming lane intersections</li>
                  <li>Camera</li>
                </ul>
              </section>
              <section className="embedded-spec">
                <h3>Hardware &amp; controls</h3>
                <ul>
                  <li>iPad mini display · 8.3 in</li>
                  <li>iPad Air display · 11 in</li>
                  <li>Rotator input mapped to <code>dimmer_func</code></li>
                  <li>Button input mapped to On / Off</li>
                  <li>Arducam camera module; Raspberry Pi 5 or Jetson Orin as candidate compute</li>
                </ul>
              </section>
              <section className="embedded-spec">
                <h3>GPS &amp; map behavior</h3>
                <ul>
                  <li>Map, speedometer, and miles remaining until the next direction</li>
                  <li>Map orientation modes: rotating or fixed / north-up</li>
                  <li>Touge view highlights upcoming lane intersections</li>
                </ul>
              </section>
              <section className="embedded-spec">
                <h3>Camera &amp; vision concepts</h3>
                <ul>
                  <li>Rear view: experimental warnings for pedestrians and vehicles, including cars, bikes, motorcycles, and scooters</li>
                  <li>Rear and 360 views: experimental trajectory approximation overlays</li>
                  <li>Evaluate camera placement and visibility in controlled go-kart / motorcycle tests</li>
                </ul>
              </section>
            </div>

            <section className="embedded-code-section">
              <div className="embedded-code-heading"><h3>Vision warning filter</h3><span>PYTHON / CONCEPT</span></div>
              <pre className="embedded-code"><code>{embeddedVisionExample}</code></pre>
            </section>

            <p className="embedded-safety-note">Prototype concept only. Detection and trajectory overlays can miss or misclassify hazards and are not safety equipment. Do not use them instead of mirrors, direct observation, or established navigation. Validate on the bench first; vehicle testing should be supervised and limited to a controlled closed course.</p>
          </div>
        ) : project.slug === 'terminal-art' ? (
          <div className="terminal-art-content">
            <div className="terminal-art-intro">
              <h2>A little theater in the terminal</h2>
              <p>Install a command with Homebrew, then run its demo in Terminal. These examples are local command-line programs; this page does not execute them.</p>
            </div>
            {terminalArtGroups.map((group) => (
              <section className="terminal-art-group" key={group.title}>
                <h3>{group.title}</h3>
                <div className="terminal-art-grid">
                  {group.commands.map((item) => (
                    <article className="terminal-art-command" key={`${item.formula}-${item.run}`}>
                      <h4>{item.name}</h4>
                      <p>Install</p>
                      <code>brew install {item.formula}</code>
                      <p>Run</p>
                      <code>{item.run}</code>
                    </article>
                  ))}
                </div>
              </section>
            ))}
            <p className="terminal-art-note">Press Ctrl+C to quit interactive demos. Install packages one at a time; Homebrew formula availability varies by macOS version and enabled taps. <code>btop++</code> is commonly launched with the <code>btop</code> command.</p>
          </div>
        ) : (
          <>
            <h2>{project.status === 'demo' ? 'A data connection can bring this view to life.' : 'Make this case study yours.'}</h2>
            <p>{project.status === 'demo' ? 'This page establishes the route and visual treatment. Connect a quote or data provider before presenting live market figures.' : 'Add a real build, screenshots, architecture notes, and outcomes here. The card and route are ready for your project details.'}</p>
            <div className="detail-placeholder-grid"><div><span>01 / OVERVIEW</span><p>What problem does the project solve?</p></div><div><span>02 / BUILD</span><p>Which decisions, tools, or constraints made it interesting?</p></div><div><span>03 / OUTCOME</span><p>Add a demo link and a truthful result when available.</p></div></div>
          </>
        )}
      </section>
      <div className="route-backlink"><Link className="button-text" to={`/${category}`}><ArrowLeft size={14} /> BACK TO {categoryLabel.toUpperCase()}</Link></div>
    </main>
  );
}

const sampleCells = [
  ['AAPL', 'teal'], ['MSFT', 'lime'], ['NVDA', 'red'], ['AMZN', 'teal'], ['GOOGL', 'slate'], ['META', 'lime'],
  ['BRK.B', 'slate'], ['LLY', 'red'], ['AVGO', 'teal'], ['JPM', 'lime'], ['V', 'slate'], ['XOM', 'red'],
  ['UNH', 'teal'], ['COST', 'lime'], ['MA', 'teal'], ['HD', 'slate'], ['PG', 'red'], ['NFLX', 'lime'],
  ['ORCL', 'teal'], ['CRM', 'red'], ['ABBV', 'slate'], ['KO', 'lime'], ['MRK', 'teal'], ['BAC', 'red'],
];

export function SP500HeatmapPage() {
  return (
    <main className="route-main market-page">
      <PageBreadcrumb category="Finance" title="S&P 500 Heatmap" />
      <section className="detail-hero"><div className="detail-icon lime-icon"><TrendingUp size={42} strokeWidth={1.4} /></div><div className="detail-copy"><p className="section-kicker lime-kicker">MARKET VISUALIZATION / DEMO</p><h1>S&amp;P 500 heatmap</h1><p>A tile-based layout for scanning a market at a glance. The cells below are illustrative only; they do not represent current performance.</p></div></section>
      <section className="market-demo-panel"><div className="market-demo-heading"><div><p className="section-kicker">SAMPLE LAYOUT</p><h2>Index components</h2></div><span className="demo-pill">NO LIVE DATA</span></div><div className="stock-heatmap">{sampleCells.map(([ticker, color]) => <div className={`stock-tile tile-${color}`} key={ticker}><span>{ticker}</span><small>DEMO</small></div>)}</div><p className="market-footnote">Color blocks are visual placeholders only. Connect a market-data provider to display real returns and constituents.</p></section>
      <div className="route-backlink"><Link className="button-text" to="/finance"><ArrowLeft size={14} /> BACK TO FINANCE</Link></div>
    </main>
  );
}

const indexes = [
  { symbol: 'SPX', name: 'S&P 500', description: 'Large-cap U.S. equities' },
  { symbol: 'DJIA', name: 'Dow Jones Industrial Average', description: '30 prominent U.S. companies' },
  { symbol: 'IXIC', name: 'Nasdaq Composite', description: 'Nasdaq-listed securities' },
  { symbol: 'RUT', name: 'Russell 2000', description: 'U.S. small-cap equities' },
];

export function IndicesTrackerPage() {
  return (
    <main className="route-main market-page">
      <PageBreadcrumb category="Finance" title="Indices Tracker" />
      <section className="detail-hero"><div className="detail-icon lime-icon"><CircleDollarSign size={42} strokeWidth={1.4} /></div><div className="detail-copy"><p className="section-kicker lime-kicker">MARKET OVERVIEW / DATA CONNECTOR PENDING</p><h1>Indices tracker</h1><p>One place for the benchmarks you named. Quote cells stay blank until a live data provider is chosen.</p></div></section>
      <section className="index-list-panel"><div className="index-list-heading"><span>SYMBOL</span><span>INDEX</span><span>FEED</span></div>{indexes.map((index) => <article className="index-row" key={index.symbol}><div className="index-symbol">{index.symbol}</div><div><h2>{index.name}</h2><p>{index.description}</p></div><span className="feed-status">NOT CONNECTED</span></article>)}</section>
      <p className="market-footnote">No market prices, changes, or investment signals are shown in this preview.</p>
      <div className="route-backlink"><Link className="button-text" to="/finance"><ArrowLeft size={14} /> BACK TO FINANCE</Link></div>
    </main>
  );
}

export function FinanceCalculatorPage() {
  const [tab, setTab] = useState<'salary' | 'military'>('salary');
  const [gross, setGross] = useState(85000);
  const [effectiveRate, setEffectiveRate] = useState(25);
  const [pretaxDeductions, setPretaxDeductions] = useState(0);
  const [payGrade, setPayGrade] = useState<PayGrade>('E-4');
  const [serviceStep, setServiceStep] = useState(0);

  const salaryResult = useMemo(() => {
    const annualGross = Math.max(0, gross || 0);
    const pretax = Math.min(annualGross, Math.max(0, pretaxDeductions || 0));
    const rate = Math.min(100, Math.max(0, effectiveRate || 0)) / 100;
    const estimatedTax = Math.max(0, annualGross - pretax) * rate;
    return { annualGross, pretax, estimatedTax, net: Math.max(0, annualGross - pretax - estimatedTax) };
  }, [gross, effectiveRate, pretaxDeductions]);

  const militaryMonthly = getMonthlyBasicPay2026(payGrade, serviceStep);
  const activeBracket = serviceBrackets[serviceStep];

  return (
    <main className="route-main calculator-page">
      <PageBreadcrumb category="Finance" title="Pay Calculators" />
      <section className="detail-hero"><div className="detail-icon lime-icon"><Calculator size={42} strokeWidth={1.4} /></div><div className="detail-copy"><p className="section-kicker lime-kicker">FINANCE / PAY TOOLS</p><h1>Pay calculators</h1><p>Two straightforward estimates: an editable gross-to-net salary model and 2026 U.S. military monthly basic pay by grade and service bracket.</p></div></section>
      <div className="calculator-tabs" role="tablist" aria-label="Pay calculator type">
        <button type="button" id="salary-tab" role="tab" aria-selected={tab === 'salary'} aria-controls="salary-panel" className={tab === 'salary' ? 'selected' : ''} onClick={() => setTab('salary')}>Salary · gross to net</button>
        <button type="button" id="military-tab" role="tab" aria-selected={tab === 'military'} aria-controls="military-panel" className={tab === 'military' ? 'selected' : ''} onClick={() => setTab('military')}>Military pay grade</button>
      </div>

      {tab === 'salary' ? (
        <section id="salary-panel" className="calculator-panel" role="tabpanel" aria-labelledby="salary-tab">
          <div className="calculator-panel-heading"><div><p className="section-kicker">ESTIMATED TAKE-HOME</p><h2>Salary calculator</h2></div><span className="demo-pill">EDITABLE ASSUMPTIONS</span></div>
          <div className="calculator-form-grid">
            <label className="calculator-field"><span>Annual gross salary</span><div className="input-with-prefix"><i>$</i><input type="number" min="0" step="1000" value={gross} onChange={(event) => setGross(Number(event.target.value))} /></div></label>
            <label className="calculator-field"><span>Combined effective tax rate</span><div className="input-with-suffix"><input type="number" min="0" max="100" step="0.1" value={effectiveRate} onChange={(event) => setEffectiveRate(Number(event.target.value))} /><i>%</i></div></label>
            <label className="calculator-field"><span>Annual pre-tax deductions</span><div className="input-with-prefix"><i>$</i><input type="number" min="0" step="100" value={pretaxDeductions} onChange={(event) => setPretaxDeductions(Number(event.target.value))} /></div></label>
          </div>
          <div className="salary-results"><div className="salary-result-main"><span>ESTIMATED NET / YEAR</span><strong>{money.format(salaryResult.net)}</strong><small>{money.format(salaryResult.net / 12)} / month · {money.format(salaryResult.net / 26)} / biweekly</small></div><div className="salary-result-line"><span>Gross salary</span><strong>{money.format(salaryResult.annualGross)}</strong></div><div className="salary-result-line"><span>Pre-tax deductions</span><strong>−{money.format(salaryResult.pretax)}</strong></div><div className="salary-result-line"><span>Estimated tax</span><strong>−{money.format(salaryResult.estimatedTax)}</strong></div></div>
          <p className="calculator-disclaimer">Illustrative estimate only. This uses your entered flat effective rate; it does not calculate tax brackets, filing status, state/local rules, credits, or individual payroll withholding.</p>
        </section>
      ) : (
        <section id="military-panel" className="calculator-panel" role="tabpanel" aria-labelledby="military-tab">
          <div className="calculator-panel-heading"><div><p className="section-kicker">U.S. ACTIVE DUTY / 2026 TABLE</p><h2>Military basic pay</h2></div><span className="demo-pill">BASE PAY ONLY</span></div>
          <div className="calculator-form-grid military-form-grid">
            <label className="calculator-field"><span>Pay grade</span><select value={payGrade} onChange={(event) => setPayGrade(event.target.value as PayGrade)}>{militaryGradeGroups.map((group) => <optgroup key={group.label} label={group.label}>{group.grades.map((grade) => <option value={grade} key={grade}>{grade}</option>)}</optgroup>)}</select></label>
            <label className="calculator-field"><span>Creditable years of service</span><select value={serviceStep} onChange={(event) => setServiceStep(Number(event.target.value))}>{serviceBrackets.map((bracket) => <option value={bracket.id} key={bracket.id}>{bracket.label}</option>)}</select></label>
          </div>
          <div className="military-result"><div><span>MONTHLY BASIC PAY · {payGrade}</span><strong>{militaryMonthly === null ? '—' : money.format(militaryMonthly)}</strong><small>{activeBracket.label} · Annualized {militaryMonthly === null ? '—' : money.format(militaryMonthly * 12)}</small></div><p>{militaryMonthly === null ? 'The official table has no rate for this grade/service bracket.' : 'A lookup from the published 2026 basic-pay table. Allowances and deductions are not included.'}</p></div>
          <p className="calculator-disclaimer">Estimate uses the standard active-duty basic-pay table; it excludes BAH, BAS, special pays, taxes, deductions, and special O-1E/O-2E/O-3E rates. The E-1 2-or-less rate assumes at least four months of active duty; the 2026 table lists $2,225.70 below four months. See the <a href="https://www.dfas.mil/MilitaryMembers/payentitlements/Pay-Tables/" target="_blank" rel="noreferrer">official DFAS tables</a> for full notes.</p>
        </section>
      )}
      <div className="pay-sources"><span>OFFICIAL TABLES</span><a href="https://www.dfas.mil/Military-Members/payentitlements/Pay-Tables/Basic-Pay/EM/" target="_blank" rel="noreferrer">Enlisted ↗</a><a href="https://www.dfas.mil/Military-Members/payentitlements/Pay-Tables/Basic-Pay/WO/" target="_blank" rel="noreferrer">Warrant officers ↗</a><a href="https://www.dfas.mil/Military-Members/payentitlements/Pay-Tables/Basic-Pay/CO/" target="_blank" rel="noreferrer">Commissioned officers ↗</a></div>
      <div className="route-backlink"><Link className="button-text" to="/finance"><ArrowLeft size={14} /> BACK TO FINANCE</Link></div>
    </main>
  );
}

export function NotFoundPage() {
  return <main className="route-main not-found-page"><p className="section-kicker">404 / NOT FOUND</p><h1>This page hasn’t shipped yet.</h1><p>Use the category pages to explore the portfolio project slots.</p><Link className="button-primary" to="/">RETURN HOME <ArrowUpRight size={14} /></Link></main>;
}
