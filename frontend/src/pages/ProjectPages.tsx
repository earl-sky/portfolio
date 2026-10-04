import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Calculator, CircleDollarSign, TrendingUp } from 'lucide-react';
import { getProject, categories, type CategoryKey } from '../data/portfolio';
import { getMonthlyBasicPay2026, militaryGradeGroups, serviceBrackets, type PayGrade } from '../data/militaryPay2026';
import { bahLocationsByState, getBahLocation2026, getMonthlyBah2026, getMonthlyBas2026, type DependentStatus } from '../data/militaryAllowances2026';
import { stateIncomeTaxSchedules2026, type StateTaxBracket2026, type StateTaxFilingKind } from '../data/stateIncomeTax2026';

const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 });
type FilingStatus = 'single' | 'marriedFilingJointly' | 'marriedFilingSeparately' | 'headOfHousehold';

const federalTaxSchedules: Record<FilingStatus, { label: string; standardDeduction: number; brackets: { upperLimit: number; rate: number }[] }> = {
  single: {
    label: 'Single', standardDeduction: 16100,
    brackets: [{ upperLimit: 12400, rate: 0.10 }, { upperLimit: 50400, rate: 0.12 }, { upperLimit: 105700, rate: 0.22 }, { upperLimit: 201775, rate: 0.24 }, { upperLimit: 256225, rate: 0.32 }, { upperLimit: 640600, rate: 0.35 }, { upperLimit: Infinity, rate: 0.37 }],
  },
  marriedFilingJointly: {
    label: 'Married filing jointly', standardDeduction: 32200,
    brackets: [{ upperLimit: 24800, rate: 0.10 }, { upperLimit: 100800, rate: 0.12 }, { upperLimit: 211400, rate: 0.22 }, { upperLimit: 403550, rate: 0.24 }, { upperLimit: 512450, rate: 0.32 }, { upperLimit: 768700, rate: 0.35 }, { upperLimit: Infinity, rate: 0.37 }],
  },
  marriedFilingSeparately: {
    label: 'Married filing separately', standardDeduction: 16100,
    brackets: [{ upperLimit: 12400, rate: 0.10 }, { upperLimit: 50400, rate: 0.12 }, { upperLimit: 105700, rate: 0.22 }, { upperLimit: 201775, rate: 0.24 }, { upperLimit: 256225, rate: 0.32 }, { upperLimit: 384350, rate: 0.35 }, { upperLimit: Infinity, rate: 0.37 }],
  },
  headOfHousehold: {
    label: 'Head of household', standardDeduction: 24150,
    brackets: [{ upperLimit: 17700, rate: 0.10 }, { upperLimit: 67450, rate: 0.12 }, { upperLimit: 105700, rate: 0.22 }, { upperLimit: 201750, rate: 0.24 }, { upperLimit: 256200, rate: 0.32 }, { upperLimit: 640600, rate: 0.35 }, { upperLimit: Infinity, rate: 0.37 }],
  },
};

const usStates = [
  ['AL', 'Alabama'], ['AK', 'Alaska'], ['AZ', 'Arizona'], ['AR', 'Arkansas'], ['CA', 'California'],
  ['CO', 'Colorado'], ['CT', 'Connecticut'], ['DE', 'Delaware'], ['DC', 'District of Columbia'], ['FL', 'Florida'],
  ['GA', 'Georgia'], ['HI', 'Hawaii'], ['ID', 'Idaho'], ['IL', 'Illinois'], ['IN', 'Indiana'],
  ['IA', 'Iowa'], ['KS', 'Kansas'], ['KY', 'Kentucky'], ['LA', 'Louisiana'], ['ME', 'Maine'],
  ['MD', 'Maryland'], ['MA', 'Massachusetts'], ['MI', 'Michigan'], ['MN', 'Minnesota'], ['MS', 'Mississippi'],
  ['MO', 'Missouri'], ['MT', 'Montana'], ['NE', 'Nebraska'], ['NV', 'Nevada'], ['NH', 'New Hampshire'],
  ['NJ', 'New Jersey'], ['NM', 'New Mexico'], ['NY', 'New York'], ['NC', 'North Carolina'], ['ND', 'North Dakota'],
  ['OH', 'Ohio'], ['OK', 'Oklahoma'], ['OR', 'Oregon'], ['PA', 'Pennsylvania'], ['RI', 'Rhode Island'],
  ['SC', 'South Carolina'], ['SD', 'South Dakota'], ['TN', 'Tennessee'], ['TX', 'Texas'], ['UT', 'Utah'],
  ['VT', 'Vermont'], ['VA', 'Virginia'], ['WA', 'Washington'], ['WV', 'West Virginia'], ['WI', 'Wisconsin'], ['WY', 'Wyoming'],
] as const;

const stateNameByCode = new Map<string, string>(usStates);

function calculateFederalTax(taxableIncome: number, filingStatus: FilingStatus): number {
  let tax = 0;
  let lowerLimit = 0;

  for (const bracket of federalTaxSchedules[filingStatus].brackets) {
    const incomeInBracket = Math.min(taxableIncome, bracket.upperLimit) - lowerLimit;
    if (incomeInBracket > 0) tax += incomeInBracket * bracket.rate;
    if (taxableIncome <= bracket.upperLimit) break;
    lowerLimit = bracket.upperLimit;
  }

  return tax;
}

function calculateStateTax(taxableIncome: number, brackets: StateTaxBracket2026[]): number {
  return brackets.reduce((tax, [lowerLimit, rate], index) => {
    const upperLimit = brackets[index + 1]?.[0] ?? Infinity;
    const incomeInBracket = Math.max(0, Math.min(taxableIncome, upperLimit) - lowerLimit);
    return tax + incomeInBracket * rate;
  }, 0);
}

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
              <div className="embedded-icon-panel">
                <Icon size={54} strokeWidth={1.3} aria-hidden="true" />
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

            <section className="embedded-reference">
              <div>
                <p className="section-kicker">REFERENCE TOOL</p>
                <h3>Tinkercad</h3>
                <p>Browser-based 3D design, electronics, and coding tools for prototyping circuit ideas before testing them on hardware.</p>
              </div>
              <a href="https://www.tinkercad.com/" target="_blank" rel="noopener noreferrer" aria-label="Tinkercad (opens in a new tab)">
                TINKERCAD.COM <ArrowUpRight size={14} aria-hidden="true" />
              </a>
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
  const [filingStatus, setFilingStatus] = useState<FilingStatus>('single');
  const [pretaxDeductions, setPretaxDeductions] = useState(0);
  const [state, setState] = useState('NV');
  const [payGrade, setPayGrade] = useState<PayGrade>('E-5');
  const [serviceStep, setServiceStep] = useState(5);
  const [dutyStation, setDutyStation] = useState('NV212');
  const [dependents, setDependents] = useState<DependentStatus>('withoutDependents');
  const [residenceState, setResidenceState] = useState('NV');
  const [militaryFilingStatus, setMilitaryFilingStatus] = useState<StateTaxFilingKind>('single');
  const stateFilingKind: StateTaxFilingKind = filingStatus === 'marriedFilingJointly' ? 'joint' : 'single';
  const selectedStateName = stateNameByCode.get(state) ?? state;

  const salaryResult = useMemo(() => {
    const annualGross = Math.max(0, gross || 0);
    const pretax = Math.min(annualGross, Math.max(0, pretaxDeductions || 0));
    const incomeAfterPretax = annualGross - pretax;
    const federalTaxableIncome = Math.max(0, incomeAfterPretax - federalTaxSchedules[filingStatus].standardDeduction);
    const federalTax = calculateFederalTax(federalTaxableIncome, filingStatus);
    const stateSchedule = stateIncomeTaxSchedules2026[state];
    const stateTaxableIncome = Math.max(0, incomeAfterPretax - stateSchedule.standardDeduction[stateFilingKind]);
    const stateTax = calculateStateTax(stateTaxableIncome, stateSchedule.brackets[stateFilingKind]);
    const stateEffectiveRate = annualGross > 0 ? stateTax / annualGross * 100 : 0;
    const totalTax = federalTax + stateTax;
    return { annualGross, pretax, federalTaxableIncome, federalTax, stateTax, stateEffectiveRate, totalTax, net: Math.max(0, incomeAfterPretax - totalTax) };
  }, [gross, filingStatus, pretaxDeductions, state, stateFilingKind]);

  const militaryMonthly = getMonthlyBasicPay2026(payGrade, serviceStep);
  const activeBracket = serviceBrackets[serviceStep];

  const militaryResult = useMemo(() => {
    const basicPay = militaryMonthly ?? 0;
    const bah = getMonthlyBah2026(payGrade, dutyStation, dependents) ?? 0;
    const bas = getMonthlyBas2026(payGrade);
    const totalMonthly = basicPay + bah + bas;
    // BAH and BAS are excluded from federal taxable income, so only basic pay is taxed here.
    const annualBasicPay = basicPay * 12;
    const residenceSchedule = stateIncomeTaxSchedules2026[residenceState];
    const stateTaxableIncome = Math.max(0, annualBasicPay - residenceSchedule.standardDeduction[militaryFilingStatus]);
    const stateTax = calculateStateTax(stateTaxableIncome, residenceSchedule.brackets[militaryFilingStatus]);
    return {
      basicPay, bah, bas, totalMonthly,
      annualBasicPay, stateTaxableIncome, stateTax,
      stateEffectiveRate: annualBasicPay > 0 ? stateTax / annualBasicPay * 100 : 0,
      netMonthly: Math.max(0, basicPay - stateTax / 12),
    };
  }, [militaryMonthly, payGrade, dutyStation, dependents, residenceState, militaryFilingStatus]);

  const residenceStateName = stateNameByCode.get(residenceState) ?? residenceState;
  const dutyStationName = getBahLocation2026(dutyStation)?.name ?? dutyStation;
  const isEnlisted = payGrade.startsWith('E-');

  return (
    <main className="route-main calculator-page">
      <PageBreadcrumb category="Finance" title="Pay Calculators" />
      <section className="detail-hero"><div className="detail-icon lime-icon"><Calculator size={42} strokeWidth={1.4} /></div><div className="detail-copy"><p className="section-kicker lime-kicker">FINANCE / PAY TOOLS</p><h1>Pay calculators</h1><p>Two straightforward estimates: an editable gross-to-net salary model and 2026 U.S. military compensation — basic pay, BAH, and BAS by grade, service bracket, and duty station, less state income tax for your state of residence.</p></div></section>
      <div className="calculator-tabs" role="tablist" aria-label="Pay calculator type">
        <button type="button" id="salary-tab" role="tab" aria-selected={tab === 'salary'} aria-controls="salary-panel" className={tab === 'salary' ? 'selected' : ''} onClick={() => setTab('salary')}>Salary · gross to net</button>
        <button type="button" id="military-tab" role="tab" aria-selected={tab === 'military'} aria-controls="military-panel" className={tab === 'military' ? 'selected' : ''} onClick={() => setTab('military')}>Military pay grade</button>
      </div>

      {tab === 'salary' ? (
        <section id="salary-panel" className="calculator-panel" role="tabpanel" aria-labelledby="salary-tab">
          <div className="calculator-panel-heading"><div><p className="section-kicker">ESTIMATED TAKE-HOME</p><h2>2026 Salary Calculator</h2></div><span className="demo-pill">EDITABLE ASSUMPTIONS</span></div>
          <div className="calculator-form-grid">
            <label className="calculator-field"><span>Annual gross salary</span><div className="input-with-prefix"><i>$</i><input type="number" min="0" step="1000" value={gross} onChange={(event) => setGross(Number(event.target.value))} /></div></label>
            <label className="calculator-field"><span>Federal filing status</span><select value={filingStatus} onChange={(event) => setFilingStatus(event.target.value as FilingStatus)}>{Object.entries(federalTaxSchedules).map(([value, schedule]) => <option value={value} key={value}>{schedule.label}</option>)}</select></label>
            <label className="calculator-field"><span>Annual pre-tax deductions</span><div className="input-with-prefix"><i>$</i><input type="number" min="0" step="100" value={pretaxDeductions} onChange={(event) => setPretaxDeductions(Number(event.target.value))} /></div></label>
          </div>
          <div className="state-tax-controls">
            <label className="calculator-field"><span>State / district</span><select value={state} onChange={(event) => setState(event.target.value)}>{usStates.map(([code, name]) => <option value={code} key={code}>{name}</option>)}</select></label>
          </div>
          <div className="salary-results"><div className="salary-result-main"><span>ESTIMATED NET / YEAR</span><strong>{money.format(salaryResult.net)}</strong><small>{money.format(salaryResult.net / 12)} / month · {money.format(salaryResult.net / 26)} / biweekly</small></div><div className="salary-result-line"><span>Gross salary</span><strong>{money.format(salaryResult.annualGross)}</strong></div><div className="salary-result-line"><span>Pre-tax deductions</span><strong>−{money.format(salaryResult.pretax)}</strong></div><div className="salary-result-line"><span>Federal income tax</span><strong>−{money.format(salaryResult.federalTax)}</strong></div><div className="salary-result-line"><span>{selectedStateName} income tax · {salaryResult.stateEffectiveRate.toFixed(2)}% of gross</span><strong>−{money.format(salaryResult.stateTax)}</strong></div><div className="salary-result-line"><span>Total estimated tax</span><strong>−{money.format(salaryResult.totalTax)}</strong></div></div>
          <p className="calculator-disclaimer">Illustrative 2026 estimate using published federal and state brackets plus listed standard deductions. State schedules cover single and joint filers; married filing separately and head-of-household use the single state schedule as an approximation. State credits, personal exemptions, special recapture rules, local and payroll taxes, and individual withholding are not modeled. Washington’s state income tax applies to capital gains, not wages. See the <a href="https://www.irs.gov/newsroom/irs-releases-tax-inflation-adjustments-for-tax-year-2026-including-amendments-from-the-one-big-beautiful-bill" target="_blank" rel="noreferrer">IRS 2026 adjustments</a> and <a href="https://taxfoundation.org/data/all/state/state-income-tax-rates-2026/" target="_blank" rel="noreferrer">2026 state schedules</a>.</p>
        </section>
      ) : (
        <section id="military-panel" className="calculator-panel" role="tabpanel" aria-labelledby="military-tab">
          <div className="calculator-panel-heading"><div><p className="section-kicker">U.S. ACTIVE DUTY / 2026 TABLE</p><h2>2026 Military Pay Grade</h2></div><span className="demo-pill">PAY + BAH + BAS + STATE TAX</span></div>
          <div className="calculator-form-grid military-form-grid">
            <label className="calculator-field"><span>Pay grade</span><select value={payGrade} onChange={(event) => setPayGrade(event.target.value as PayGrade)}>{militaryGradeGroups.map((group) => <optgroup key={group.label} label={group.label}>{group.grades.map((grade) => <option value={grade} key={grade}>{grade}</option>)}</optgroup>)}</select></label>
            <label className="calculator-field"><span>Creditable years of service</span><select value={serviceStep} onChange={(event) => setServiceStep(Number(event.target.value))}>{serviceBrackets.map((bracket) => <option value={bracket.id} key={bracket.id}>{bracket.label}</option>)}</select></label>
            <label className="calculator-field military-station-field"><span>Duty station · military housing area</span><select value={dutyStation} onChange={(event) => setDutyStation(event.target.value)}>{Object.entries(bahLocationsByState).map(([code, locations]) => <optgroup key={code} label={stateNameByCode.get(code) ?? code}>{locations.map((location) => <option value={location.id} key={location.id}>{location.name}</option>)}</optgroup>)}</select></label>
            <label className="calculator-field"><span>Dependent status</span><select value={dependents} onChange={(event) => setDependents(event.target.value as DependentStatus)}><option value="withDependents">With dependents</option><option value="withoutDependents">Without dependents</option></select></label>
          </div>
          <div className="state-tax-controls military-tax-controls">
            <label className="calculator-field"><span>State of residence · tax filing</span><select value={residenceState} onChange={(event) => setResidenceState(event.target.value)}>{usStates.map(([code, name]) => <option value={code} key={code}>{name}</option>)}</select></label>
            <label className="calculator-field"><span>State filing status</span><select value={militaryFilingStatus} onChange={(event) => setMilitaryFilingStatus(event.target.value as StateTaxFilingKind)}><option value="single">Single</option><option value="joint">Married filing jointly</option></select></label>
          </div>
          <div className="military-result"><div><span>MONTHLY ENTITLEMENT · {payGrade}</span><strong>{money.format(militaryResult.totalMonthly)}</strong><small>Basic pay + BAH + BAS · Annualized {money.format(militaryResult.totalMonthly * 12)}</small></div><p>{militaryMonthly === null ? 'The official table has no basic-pay rate for this grade/service bracket, so only allowances are shown.' : `${activeBracket.label}. ${dutyStationName}, ${residenceStateName} · ${dependents === 'withDependents' ? 'with' : 'without'} dependents. BAH and BAS are federal tax-free; deductions and special pays are not included.`}</p></div>
          <div className="salary-results">
            <div className="salary-result-main"><span>TAKE-HOME / MONTH</span><strong>{money.format(militaryResult.netMonthly)}</strong><small>Basic pay less {residenceStateName} income tax · {militaryResult.stateEffectiveRate.toFixed(2)}% of basic pay</small></div>
            <div className="salary-result-line"><span>Basic pay</span><strong>{militaryMonthly === null ? '—' : money.format(militaryResult.basicPay)}</strong></div>
            <div className="salary-result-line"><span>BAH · {dependents === 'withDependents' ? 'with' : 'without'} dependents</span><strong>{money.format(militaryResult.bah)}</strong></div>
            <div className="salary-result-line"><span>BAS · {isEnlisted ? 'enlisted' : 'officer'} rate</span><strong>{money.format(militaryResult.bas)}</strong></div>
            <div className="salary-result-line"><span>{residenceStateName} income tax · /mo</span><strong>−{money.format(militaryResult.stateTax / 12)}</strong></div>
            <div className="salary-result-line"><span>{residenceStateName} income tax · /yr</span><strong>−{money.format(militaryResult.stateTax)}</strong></div>
          </div>
          <p className="calculator-disclaimer">Basic pay is the standard active-duty table and excludes special O-1E/O-2E/O-3E rates; the E-1 2-or-less rate assumes at least four months of active duty. BAH is the DTMO rate for the selected military housing area and is only payable without government housing; overseas stations receive OHA instead, and rate protection can lock in a higher prior-year rate. BAS uses the flat 2026 enlisted or officer rate and excludes BAS II. Only basic pay is taxed here — BAH and BAS are excluded from federal taxable income, but several states treat allowances as wages, so your state's treatment of BAH and BAS can change this estimate. Federal income tax, TSP contributions, SGLI, and other deductions are not modeled. See the <a href="https://www.dfas.mil/MilitaryMembers/payentitlements/Pay-Tables/" target="_blank" rel="noreferrer">official DFAS tables</a> and <a href="https://www.travel.dod.mil/Allowances/Basic-allowance-for-Housing/" target="_blank" rel="noreferrer">DTMO BAH rate lookup</a>.</p>
        </section>
      )}
      <div className="pay-sources"><span>OFFICIAL TABLES</span><a href="https://www.dfas.mil/Military-Members/payentitlements/Pay-Tables/Basic-Pay/EM/" target="_blank" rel="noreferrer">Enlisted ↗</a><a href="https://www.dfas.mil/Military-Members/payentitlements/Pay-Tables/Basic-Pay/WO/" target="_blank" rel="noreferrer">Warrant officers ↗</a><a href="https://www.dfas.mil/Military-Members/payentitlements/Pay-Tables/Basic-Pay/CO/" target="_blank" rel="noreferrer">Commissioned officers ↗</a><a href="https://www.dfas.mil/militarymembers/payentitlements/Pay-Tables/bas/" target="_blank" rel="noreferrer">BAS ↗</a><a href="https://www.travel.dod.mil/Allowances/Basic-allowance-for-Housing/" target="_blank" rel="noreferrer">BAH ↗</a></div>
      <div className="route-backlink"><Link className="button-text" to="/finance"><ArrowLeft size={14} /> BACK TO FINANCE</Link></div>
    </main>
  );
}

export function NotFoundPage() {
  return <main className="route-main not-found-page"><p className="section-kicker">404 / NOT FOUND</p><h1>This page hasn’t shipped yet.</h1><p>Use the category pages to explore the portfolio project slots.</p><Link className="button-primary" to="/">RETURN HOME <ArrowUpRight size={14} /></Link></main>;
}
