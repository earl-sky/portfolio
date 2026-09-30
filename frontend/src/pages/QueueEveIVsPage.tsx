import { Link } from 'react-router-dom';
import { ArrowLeft, ClipboardList, ShieldAlert } from 'lucide-react';
import { queueEveSourceSections } from '../data/queueEveSource';

const workflows = [
  {
    number: '01',
    timing: 'SUN–THU',
    title: 'All Now · workday',
    description: 'The source lists unit-dose and PICK LIST passes for AL - CLC, AL - DOM, MTU, and ZONE OBS, plus SEA UD MED zones, IV-on-day ward/label steps, and DSII passes.',
  },
  {
    number: '02',
    timing: 'FRI–SAT / PRE-HOLIDAY',
    title: 'All Now · non-workday',
    description: 'A day-type variant repeats queue-preparation steps and describes IV-off-day ward/label work for groups 2, 3, and 5, followed by DSII passes.',
  },
  {
    number: '03',
    timing: 'REPEAT PASS',
    title: 'UD Med / DSII again',
    description: 'A later-shift source section revisits selected unit-dose queues and DSII steps for the listed areas.',
  },
  {
    number: '04',
    timing: 'FORM ASSIST',
    title: 'Ward Inspection',
    description: 'The source repeats numeric form entries with tab navigation, then includes Cart #, Lock #, and Exp: placeholders.',
  },
];

export default function QueueEveIVsPage() {
  return (
    <main className="route-main project-detail-page category-healthcare queue-eve-page">
      <div className="page-breadcrumb"><Link to="/">HOME</Link><span>/</span><Link to="/healthcare">HEALTHCARE</Link><span>/</span><span>QUEUE EVE IVS</span></div>

      <section className="detail-hero">
        <div className="detail-icon"><ClipboardList size={42} strokeWidth={1.4} aria-hidden="true" /></div>
        <div className="detail-copy">
          <p className="section-kicker">HEALTHCARE / SOURCE WORKFLOW DEMO</p>
          <h1>Queue Eve IVs</h1>
          <p>A portfolio view of the supplied evening-shift queue workflow, including its schedule variants and source text.</p>
          <div className="tag-row"><span className="tech-tag">4 source sections</span><span className="tech-tag">Display-only macros</span><span className="tech-tag">Unverified</span></div>
        </div>
      </section>

      <aside className="queue-eve-notice" role="note" aria-label="Safety disclaimer">
        <ShieldAlert size={20} aria-hidden="true" />
        <div>
          <strong>Disclaimer: use at your own risk; not reviewed or tested for accuracy</strong>
          <p>This is user-supplied source content, not clinical or operational guidance. The macro text below is displayed only; this webpage never runs it. Do not use it in a live clinical or pharmacy system without appropriate local review and authorization.</p>
        </div>
      </aside>

      <section className="queue-eve-overview" aria-labelledby="queue-eve-overview-title">
        <div className="placeholder-top"><span>01 / OVERVIEW</span><span>NO LIVE SYSTEM INTEGRATION</span></div>
        <h2 id="queue-eve-overview-title">What does this project represent?</h2>
        <p>The supplied page describes Windows keystroke automation for recurring queue preparation and ward-inspection tasks. This portfolio adaptation preserves the described schedules and shows the source in collapsed text panels; it contains no connection to hospital systems and does not execute keystrokes.</p>
      </section>

      <section className="queue-eve-workflows" aria-labelledby="queue-eve-workflows-title">
        <div className="queue-eve-section-heading">
          <div><p className="section-kicker">SOURCE-BASED SUMMARY</p><h2 id="queue-eve-workflows-title">Workflow map</h2></div>
          <span className="queue-eve-count">04 SECTIONS</span>
        </div>
        <div className="queue-eve-grid">
          {workflows.map((workflow) => (
            <article className="queue-eve-card" key={workflow.number}>
              <div className="queue-eve-card-meta"><span>{workflow.number} / WORKFLOW</span><span>{workflow.timing}</span></div>
              <h3>{workflow.title}</h3>
              <p>{workflow.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="queue-eve-source-panel" aria-labelledby="queue-eve-source-title">
        <div className="placeholder-top"><span>02 / SOURCE CONTENT</span><span>DISPLAY ONLY · NOT EXECUTED</span></div>
        <h2 id="queue-eve-source-title">Supplied macro text</h2>
        <p className="queue-eve-source-intro">Expand a section to view its original text. These blocks are included for reference only and have not been validated for correctness or safe use.</p>
        <div className="queue-eve-source-list">
          {queueEveSourceSections.map((section, index) => (
            <details className="queue-eve-source-detail" key={section.id}>
              <summary><span className="queue-eve-source-index">0{index + 1} / SOURCE</span><span className="queue-eve-source-title">{section.title}</span><span className="queue-eve-source-action">VIEW TEXT</span></summary>
              <div className="queue-eve-source-body">
                <p>{section.summary}</p>
                <pre><code>{section.source}</code></pre>
              </div>
            </details>
          ))}
        </div>
      </section>

      <section className="queue-eve-safety" aria-labelledby="queue-eve-safety-title">
        <div className="placeholder-top"><span>03 / SAFETY BOUNDARY</span><span>NON-OPERATIONAL</span></div>
        <h2 id="queue-eve-safety-title">Keystroke automation needs careful review</h2>
        <p>The source sends synthetic keypresses to whichever window has focus. A focus change, timing difference, or interface update could send input to the wrong place. No macro was run or validated while preparing this portfolio page.</p>
      </section>

      <p className="queue-eve-source-note">Source: user-supplied <code>queueeveshift.html</code>. Content is reproduced as display-only text; it is unverified and not clinical or operational guidance.</p>
      <div className="route-backlink"><Link className="button-text" to="/healthcare"><ArrowLeft size={14} /> BACK TO HEALTHCARE</Link></div>
    </main>
  );
}
