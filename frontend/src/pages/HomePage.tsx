import { ArrowUpRight, BookOpen, HeartPulse, Image as ImageIcon, UserRound } from 'lucide-react';
import { Link } from 'react-router-dom';

const projects = [
  { icon: BookOpen, art: 'software', artLabel: 'MODEL DIRECTORY', category: 'SOFTWARE / AI REFERENCE', title: 'AI Reference', description: 'A searchable directory of AI models with official-source links where a match is verified.', technologies: ['AI models', 'Official links'], to: '/software/ai-reference' },
  { icon: HeartPulse, art: 'healthcare', artLabel: 'DISPLAY-ONLY DEMO', category: 'HEALTHCARE / WORKFLOW DEMO', title: 'Queue Eve IVs', description: 'A read-only workflow demonstration with collapsed macro panels; nothing is executed.', technologies: ['Display-only', 'Workflow demo'], to: '/healthcare/queue-eve-ivs' },
  { icon: UserRound, art: 'about', artLabel: 'RÉSUMÉ TEMPLATE', category: 'ABOUT / RÉSUMÉ', title: 'About', description: 'A résumé page for engineering experience, skills, education, and contact details.', technologies: ['Experience', 'Résumé'], to: '/about' },
];

const experience = [
  { period: 'NOW', role: 'Current role', organization: 'Add your organization · dates', detail: 'Add one concise outcome: a system you owned, a measurable improvement, or a release you shipped.' },
  { period: 'PREVIOUS', role: 'Previous role', organization: 'Add your organization · dates', detail: 'Replace this draft with a specific engineering contribution and the impact it made.' },
  { period: 'FOUNDATION', role: 'Education or independent work', organization: 'Add a school, course, or relevant project', detail: 'Use this space for the experience that started your software journey.' },
];

const skillGroups = [
  { title: 'Core languages', skills: ['Java', 'TypeScript', 'SQL', 'HTML / CSS'] },
  { title: 'Frameworks & runtime', skills: ['React', 'Spring Boot', 'Vite', 'Node.js'] },
  { title: 'Infrastructure & tools', skills: ['MySQL', 'Docker', 'Docker Compose', 'REST APIs'] },
];

const activityRows = [
  '001221011230012101212010', '012332212341123201123321', '001120122231012210123210',
  '123201123442231012332101', '012210011231201123210012', '001232012210123321012201',
  '012101223210012321102330',
];

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
          <p className="eyebrow"><span className="status-dot" /> SOFTWARE ENGINEER <span className="eyebrow-divider">/</span> FULL STACK</p>
          <h1 id="hero-title">Building high-performance interfaces <span className="accent-red">&amp; scalable systems.</span></h1>
          <p className="hero-summary">I build thoughtful product experiences and dependable backend systems, from the first interface to the data layer.</p>
          <p className="hero-stack">React · TypeScript · Java · Spring Boot · MySQL · Docker</p>
          <div className="hero-actions"><Link className="button-primary" to="/software">EXPLORE SOFTWARE <span aria-hidden="true">↘</span></Link><Link className="button-text" to="/about">RÉSUMÉ <span aria-hidden="true">→</span></Link></div>
        </div>
        <div className="hero-visuals">
          <figure className="hero-image-holder" aria-label="JPEG portfolio image placeholder">
            <div className="hero-image-placeholder" aria-hidden="true">
              <ImageIcon size={33} strokeWidth={1.2} />
              <span className="hero-image-format">JPEG</span>
            </div>
            <figcaption><span className="hero-image-slot">IMAGE SLOT / 01</span><span>Portfolio photo placeholder</span></figcaption>
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
        <div className="section-heading"><div><p className="section-kicker lime-kicker">WORK · LEARNING · MOMENTUM</p><h2 id="experience-title">Chronological career path</h2></div><span className="section-index">02 / EXPERIENCE</span></div>
        <div className="timeline">{experience.map((item) => <article className="timeline-row" key={item.period}><p className="timeline-date">{item.period}</p><div className="timeline-copy"><h3>{item.role}</h3><p className="timeline-org">{item.organization}</p><p className="timeline-detail">{item.detail}</p></div><span className="timeline-arrow" aria-hidden="true">↗</span></article>)}</div>
      </section>

      <section className="content-section skills-section" aria-labelledby="skills-title">
        <div className="section-heading"><div><p className="section-kicker red-kicker">TOOLS I BUILD WITH</p><h2 id="skills-title">Skill matrix &amp; comfort</h2></div><span className="section-index">03 / TOOLKIT</span></div>
        <div className="skills-grid">{skillGroups.map((group) => <article className="skill-card" key={group.title}><h3>{group.title}</h3><div className="skill-list">{group.skills.map((skill) => <span className="skill-chip" key={skill}>{skill}</span>)}</div></article>)}</div>
      </section>

      <section className="content-section activity-section" aria-labelledby="activity-title">
        <div className="activity-copy"><p className="section-kicker lime-kicker">OPEN SOURCE · ACTIVITY</p><h2 id="activity-title">Good software is a team sport.</h2><p>Interested in clean systems, useful tools, and the small details that make products feel effortless.</p><p className="activity-note">The contribution grid is a visual placeholder. Connect a GitHub profile to show real activity.</p><Link className="button-text" to="/about">MORE ABOUT ME <span aria-hidden="true">→</span></Link></div>
        <div className="activity-card" aria-label="Illustrative contribution grid preview"><div className="activity-card-top"><span>CONTRIBUTION ACTIVITY</span><span className="preview-label">PREVIEW</span></div><div className="heatmap" aria-hidden="true">{activityRows.map((row, rowIndex) => <div className="heatmap-row" key={rowIndex}>{[...row].map((level, columnIndex) => <span className={`heat-cell level-${level}`} key={`${rowIndex}-${columnIndex}`} />)}</div>)}</div><div className="heatmap-legend"><span>Illustrative only</span><span>LESS <i className="level-0" /><i className="level-1" /><i className="level-2" /><i className="level-3" /><i className="level-4" /> MORE</span></div></div>
      </section>
      <section className="contact-band"><span className="contact-dot" /><p>Open to building something thoughtful together.</p><Link className="contact-placeholder" to="/about">Add your résumé and contact details →</Link></section>
    </main>
  );
}
