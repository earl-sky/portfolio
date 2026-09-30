import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Pill, Search, ShieldAlert } from 'lucide-react';
import { eveChemoEntries } from '../data/eveChemo';

export default function EveChemoPage() {
  const [query, setQuery] = useState('');
  const filteredEntries = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return eveChemoEntries.filter((entry) => entry.medication.toLowerCase().includes(needle));
  }, [query]);

  return (
    <main className="route-main project-detail-page category-healthcare eve-chemo-page">
      <div className="page-breadcrumb">
        <Link to="/">HOME</Link><span>/</span><Link to="/healthcare">HEALTHCARE</Link><span>/</span><span>EVE CHEMO</span>
      </div>

      <section className="detail-hero">
        <div className="detail-icon"><Pill size={42} strokeWidth={1.4} aria-hidden="true" /></div>
        <div className="detail-copy">
          <p className="section-kicker">HEALTHCARE / REFERENCE DEMO</p>
          <h1>Eve Chemo</h1>
          <p>A searchable, portfolio-styled view of the supplied medication reference for evening-shift chemotherapy technicians.</p>
          <div className="tag-row">
            <span className="tech-tag">16 medications</span>
            <span className="tech-tag">BUD reference</span>
            <span className="tech-tag">Tubing notes</span>
          </div>
        </div>
      </section>

      <aside className="eve-chemo-notice" role="note" aria-label="Clinical safety notice">
        <ShieldAlert size={20} aria-hidden="true" />
        <div>
          <strong>Unverified source content — not clinical guidance</strong>
          <p>This table is transcribed from the supplied HTML and has not been independently checked. Do not use it to prepare or administer medication. Verify all details against current institutional pharmacy protocols and authoritative references. Symbols and abbreviations are retained as supplied.</p>
        </div>
      </aside>

      <section className="eve-chemo-panel" aria-labelledby="eve-chemo-table-title">
        <div className="eve-chemo-heading">
          <div>
            <p className="section-kicker">REFERENCE TABLE / SUPPLIED CONTENT</p>
            <h2 id="eve-chemo-table-title">Evening-shift medication list</h2>
          </div>
          <span className="eve-chemo-count" role="status" aria-live="polite">{String(filteredEntries.length).padStart(2, '0')} / {eveChemoEntries.length} ITEMS</span>
        </div>

        <label className="eve-chemo-search">
          <Search size={15} aria-hidden="true" />
          <span className="sr-only">Filter by medication name</span>
          <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Filter medication names…" aria-label="Filter by medication name" />
        </label>

        <div className="eve-chemo-table-wrap">
          <table className="eve-chemo-table" aria-label="Medication reference transcribed from supplied HTML">
            <thead>
              <tr><th scope="col">Medication</th><th scope="col">Tubing</th><th scope="col">BUD</th><th scope="col">Other</th></tr>
            </thead>
            <tbody>
              {filteredEntries.length > 0 ? filteredEntries.map((entry) => (
                <tr key={entry.medication}>
                  <th scope="row">{entry.medication}</th>
                  <td className="eve-chemo-tubing">{entry.tubing}</td>
                  <td className="eve-chemo-multiline">{entry.bud}</td>
                  <td className="eve-chemo-multiline eve-chemo-other">{entry.other}</td>
                </tr>
              )) : (
                <tr><td className="eve-chemo-empty" colSpan={4}>No medication names match “{query}”.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        <p className="eve-chemo-source-note">The medication names, tubing labels, BUD strings, and notes are retained from the supplied <code>evechemolist.html</code>. This demo does not verify the accuracy or currency of that information.</p>
      </section>

      <div className="route-backlink"><Link className="button-text" to="/healthcare"><ArrowLeft size={14} /> BACK TO HEALTHCARE</Link></div>
    </main>
  );
}
