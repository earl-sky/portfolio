import { ArrowUpRight, BookOpen, Calculator, HeartPulse } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import heroPortrait from '../assets/Leonardo_Anime_XL_anime_style_athletic_light_skin_filipino_mal_0 copy.jpg';

const projects: { icon: LucideIcon; art: string; charset: MatrixCharset; artLabel: string; category: string; title: string; description: string; technologies: string[]; to: string }[] = [
  { icon: BookOpen, art: 'software', charset: 'ascii', artLabel: 'MODEL DIRECTORY', category: 'SOFTWARE / AI REFERENCE', title: 'AI Reference', description: 'A searchable directory of AI models with official-source links where a match is verified.', technologies: ['AI models', 'Official links'], to: '/software/ai-reference' },
  { icon: Calculator, art: 'finance', charset: 'han', artLabel: 'PAY CALCULATORS', category: 'FINANCE / PAY TOOLS', title: 'Pay Calculators', description: 'Estimate salary take-home, or build a 2026 U.S. military paycheck from basic pay, duty-station BAH, BAS, and state tax.', technologies: ['Salary estimate', 'Basic pay', 'BAH', 'BAS'], to: '/finance/calculator' },
  { icon: HeartPulse, art: 'healthcare', charset: 'hiragana', artLabel: 'DISPLAY-ONLY DEMO', category: 'HEALTHCARE / WORKFLOW DEMO', title: 'Queue Eve IVs', description: 'A read-only workflow demonstration with collapsed macro panels; nothing is executed.', technologies: ['Display-only', 'Workflow demo'], to: '/healthcare/queue-eve-ivs' },
];

const experience = [
  { period: 'CURRENT', role: 'Software Engineering Student', organization: 'Western Governors University', detail: 'Bachelor of Science in Software Engineering (Java), completion date: Nov 2026.' },
  { period: '2022–2025', role: 'Inpatient Pharmacy Technician', organization: 'Seattle Veterans Affairs Hospital', detail: 'Evening-shift inpatient pharmacy technician.' },
  { period: 'EDUCATION', role: 'Education / Independent Work', organization: 'Western Governors University · Community College of the Air Force', detail: 'BS Software Engineering (Java), 2026 · AAS Pharmacy Technology, 2017 · Front End Web Development WGU Certificate, Mar 2024 · AWS Certified Cloud Practitioner · ITIL Foundation · CompTIA Project+ · Series 65 in progress.' },
];

// cmatrix-style falling columns: a trail of glyphs led by a single brighter head
// character at the leading edge. Glyphs are deterministic so columns do not reshuffle.
const matrixCharsets = {
  ascii: Array.from({ length: 94 }, (_, index) => String.fromCharCode(33 + index)).join(''),
  han: '的一是了我不人在他有这个上们来到时大地为子中你说生国年着就那和要她出也得里后自以会家可下而过天去能对小多然于心学么之都好看起发当没成只如事把还用第样道想作种开美总从无情己面最女但现前些所同日手又行意动方期它头经长儿回位分爱老因很给名法间斯知世什两次使身者被高已亲其进此话常与活正感',
  hiragana: 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわゐゑをんがぎぐげござじずぜぞだぢづでどばびぶべぼぱぴぷぺぽぁぃぅぇぉゃゅょゎゔゕゖゝゞ',
} as const;

type MatrixCharset = keyof typeof matrixCharsets;

const heroHeadingSegments = [
  { text: 'Here\'s to the ', accent: false },
  { text: 'crazy ones:', accent: true },
] as const;
const heroHeadingLabel = 'Here\'s to the crazy ones:';
const heroHeadingLetterCount = heroHeadingSegments.reduce(
  (total, segment) => total + (segment.text.match(/[a-z]/gi)?.length ?? 0),
  0,
);
// Mandarin plus hiragana, matching the two scripts used across the project cards.
const heroGlitchAlphabet = matrixCharsets.han + matrixCharsets.hiragana;
const heroGlitchSteps = 14;
const heroGlitchFrameMs = 35;

const heroGlitchGlyph = (letterIndex: number, step: number) => {
  let hash = Math.imul(letterIndex + 1, 0x9E3779B1) ^ Math.imul(step + 1, 0x85EBCA77);
  hash = Math.imul(hash ^ (hash >>> 15), 0x2C1B3C6D);
  return heroGlitchAlphabet.charAt(((hash ^ (hash >>> 12)) >>> 0) % heroGlitchAlphabet.length);
};

// cmatrix rain: one freshly generated character leads each column and five trailing
// characters fade out above it. Opacity rises toward the top of the trail, so the
// tail dissolves the further it is from the head.
const matrixTrailCount = 3;
const matrixTrailOpacity = [1, 0.33, 0.67, 0.76, 0.43];
// The Lucide art icon renders at full opacity, so the rain sits at half its visible weight.
// The authored ramp above is scaled at render time, which keeps these values editable.
const matrixOpacityScale = 0.5;
const matrixFrameMs = 110;

const matrixGlyphAt = (charset: string, column: number, step: number, salt: number) => {
  let hash = Math.imul(column + 1 + salt * 131, 0x9E3779B1) ^ Math.imul(step + 1, 0x85EBCA77);
  hash = Math.imul(hash ^ (hash >>> 15), 0x2C1B3C6D);
  return charset.charAt((((hash ^ (hash >>> 12)) >>> 0) % charset.length));
};

function MatrixField({ offset, charset }: { offset: number; charset: MatrixCharset }) {
  const fieldRef = useRef<HTMLDivElement>(null);
  const probeRef = useRef<HTMLSpanElement>(null);
  const [fit, setFit] = useState<{ columns: number; lines: number } | null>(null);
  const [tick, setTick] = useState(0);

  // Glyph advance differs per script (0.6em for DM Mono ASCII, 1em for CJK), so the
  // column count and run height are measured from the rendered font instead of guessed.
  useLayoutEffect(() => {
    const field = fieldRef.current;
    const probe = probeRef.current;
    if (!field || !probe) return;
    const measure = () => {
      probe.textContent = matrixCharsets[charset].charAt(0);
      const cellWidth = probe.getBoundingClientRect().width;
      if (!cellWidth) return;
      const style = getComputedStyle(field);
      const usable = field.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
      const lineHeight = parseFloat(getComputedStyle(probe).lineHeight) || cellWidth * 1.2;
      setFit({
        columns: Math.max(1, Math.floor(usable / cellWidth)),
        lines: Math.max(matrixTrailCount + 1, Math.ceil(field.clientHeight / lineHeight) + 1),
      });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(field);
    return () => observer.disconnect();
  }, [charset]);

  useEffect(() => {
    const field = fieldRef.current;
    if (!field) return;

    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let visible = !('IntersectionObserver' in window);
    let interval: number | null = null;
    const syncAnimation = () => {
      const active = visible && !motionPreference.matches;
      field.classList.toggle('is-active', active);
      if (active && interval === null) {
        interval = window.setInterval(() => setTick((value) => value + 1), matrixFrameMs);
      } else if (!active && interval !== null) {
        window.clearInterval(interval);
        interval = null;
      }
    };

    const observer = 'IntersectionObserver' in window
      ? new IntersectionObserver(([entry]) => {
          visible = entry.isIntersecting;
          syncAnimation();
        }, { threshold: 0.05 })
      : null;
    observer?.observe(field);
    motionPreference.addEventListener('change', syncAnimation);
    syncAnimation();

    return () => {
      observer?.disconnect();
      motionPreference.removeEventListener('change', syncAnimation);
      if (interval !== null) window.clearInterval(interval);
    };
  }, []);

  const columns = useMemo(() => {
    if (!fit) return [];
    const glyphs = matrixCharsets[charset];
    const blanks = '\n'.repeat(fit.lines - matrixTrailCount - 1);
    return Array.from({ length: fit.columns }, (_, column) => ({
      blanks,
      trail: Array.from({ length: matrixTrailCount }, (_, step) => matrixGlyphAt(glyphs, column, tick - (matrixTrailCount - step), offset)),
      head: matrixGlyphAt(glyphs, column, tick, offset),
    }));
  }, [charset, fit, offset, tick]);

  return (
    <div className="matrix-field" ref={fieldRef} aria-hidden="true">
      <span className="matrix-probe" ref={probeRef} aria-hidden="true" />
      {columns.map((column, index) => (
        <span
          className="matrix-column"
          key={index}
          style={{
            '--fall-duration': `${(2.4 + ((index * 7 + offset * 5) % 9) * 0.24).toFixed(2)}s`,
            '--fall-delay': `${-(((index * 13 + offset * 29) % 47) * 0.11).toFixed(2)}s`,
          } as CSSProperties}
        >
          <i>{column.blanks}{column.trail.map((glyph, step) => <span className="matrix-trail-char" key={step} style={{ opacity: matrixTrailOpacity[step] * matrixOpacityScale }}>{glyph}</span>)}<b className="matrix-head" style={{ opacity: matrixOpacityScale }}>{column.head}</b></i>
          <i>{column.blanks}{column.trail.map((glyph, step) => <span className="matrix-trail-char" key={step} style={{ opacity: matrixTrailOpacity[step] * matrixOpacityScale }}>{glyph}</span>)}<b className="matrix-head" style={{ opacity: matrixOpacityScale }}>{column.head}</b></i>
        </span>
      ))}
    </div>
  );
}

function HeroTitle() {
  const [step, setStep] = useState(heroGlitchSteps);
  const [glitching, setGlitching] = useState(false);

  // Runs once on load, like the EarlSky.dev wordmark, and settles left to right.
  // Deliberately not wired to hover or focus.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let frame = 0;
    setGlitching(true);
    setStep(0);
    const id = window.setInterval(() => {
      frame += 1;
      setStep(frame);
      if (frame >= heroGlitchSteps) {
        window.clearInterval(id);
        setGlitching(false);
      }
    }, heroGlitchFrameMs);
    return () => window.clearInterval(id);
  }, []);

  let seen = 0;
  const settled = Math.floor((step / heroGlitchSteps) * heroHeadingLetterCount);
  return (
    <h1 id="hero-title" className={glitching ? 'hero-title-glitch' : undefined} aria-label={heroHeadingLabel}>
      {heroHeadingSegments.map((segment) => {
        const text = [...segment.text].map((char) => {
          if (!/[a-z]/i.test(char)) return char;
          seen += 1;
          if (seen <= settled) return char;
          return heroGlitchGlyph(seen, step);
        }).join('');
        return segment.accent
          ? <span className="accent-red" aria-hidden="true" key={segment.text}>{text}</span>
          : <span aria-hidden="true" key={segment.text}>{text}</span>;
      })}
    </h1>
  );
}

function TerminalCard() {
  return (
    <div className="terminal-card" aria-label="Docker Compose startup output">
      <div className="terminal-topline"><span className="terminal-dots" aria-hidden="true"><i /><i /><i /></span><span>WEATHERLINE / LOCAL</span><span>JAVA 21</span></div>
      <div className="terminal-body">
        <p className="terminal-comment">$ docker compose up --build</p>
        <p><span className="terminal-green">✓</span> mysql <span className="terminal-muted">healthy</span></p>
        <p><span className="terminal-green">✓</span> weatherline-api <span className="terminal-muted">listening :8080</span></p>
        <p><span className="terminal-green">✓</span> frontend <span className="terminal-muted">serving :3000</span></p>
        <div className="terminal-divider" />
        <p className="terminal-comment">$ curl /api/weather/cities</p>
        <p><span className="terminal-cyan">200 OK</span> <span className="terminal-muted">· 8 cities · live forecast</span></p>
        <p className="terminal-caret" aria-hidden="true">▌</p>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <main>
      <section className="hero-section" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow"><span className="status-dot" /> SOFTWARE ENGINEER <span className="eyebrow-divider">/</span> FULL STACK (OPEN FOR WORK)</p>
          <HeroTitle />
          <p className="hero-summary">The misfits, the rebels. The troublemakers. The round pegs in the square holes. The ones who see things differently. They’re not fond of rules. You can quote them, disagree with them, glorify or vilify them. About the only thing you can’t do is ignore them. Because they change things. They push the human race forward. And while some may see them as the crazy ones, we see genius. Because the ones who are crazy enough to think that they can change the world, are the ones who do.</p>
          <p className="hero-stack">React · TypeScript · Java · Spring Boot · MySQL · Docker</p>
          <div className="hero-actions"><Link className="button-primary" to="/software">EXPLORE SOFTWARE <span aria-hidden="true">↘</span></Link><Link className="button-text" to="/about">RÉSUMÉ <span aria-hidden="true">→</span></Link></div>
        </div>
        <div className="hero-visuals">
          <figure className="hero-image-holder">
            <img className="hero-image-photo" src={heroPortrait} alt="Anime-style portrait with sunglasses against a red backdrop" />
          </figure>
          <TerminalCard />
        </div>
      </section>

      <section className="content-section projects-section" aria-labelledby="projects-title">
        <div className="section-heading"><div><p className="section-kicker red-kicker">SELECTED PROJECTS · THREE PATHS</p><h2 id="projects-title">Built with purpose.</h2></div><span className="section-index">01 / WORK</span></div>
        <div className="project-grid">
          {projects.map((project, index) => {
            const Icon = project.icon;
            return (
              <Link className="project-card" key={project.title} to={project.to}>
                <div className={`project-art project-art-${project.art}`} aria-hidden="true">
                  <MatrixField offset={index} charset={project.charset} />
                  <Icon className="project-art-icon" size={39} strokeWidth={1.25} />
                  <span className="project-art-label">{project.artLabel}</span>
                  <span className="project-number">0{index + 1}</span>
                </div>
                <div className="project-content">
                  <p className="project-category">{project.category}</p>
                  <h3>{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <div className="tag-row">{project.technologies.map((technology) => <span className="tech-tag" key={technology}>{technology}</span>)}</div>
                  <span className="project-open">OPEN PROJECT <ArrowUpRight size={13} aria-hidden="true" /></span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="content-section experience-section" aria-labelledby="experience-title">
        <div className="section-heading"><div><p className="section-kicker lime-kicker">WORK · LEARNING · MOMENTUM</p><h2 id="experience-title">Chronological Career Path</h2></div><span className="section-index">02 / EXPERIENCE</span></div>
        <div className="timeline">{experience.map((item) => <article className="timeline-row" key={item.period}><p className="timeline-date">{item.period}</p><div className="timeline-copy"><h3>{item.role}</h3><p className="timeline-org">{item.organization}</p><p className="timeline-detail">{item.detail}</p></div><span className="timeline-arrow" aria-hidden="true">↗</span></article>)}</div>
      </section>

      <section className="contact-band"><span className="contact-dot" /><p>Open to building something thoughtful together.</p><Link className="contact-placeholder" to="/about">Résumé →</Link></section>
    </main>
  );
}
