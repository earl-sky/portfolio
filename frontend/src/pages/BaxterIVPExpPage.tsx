import { Link } from 'react-router-dom';
import { ArrowLeft, Pill, ShieldAlert } from 'lucide-react';
import { baxterIVPSections } from '../data/baxterIVP';

function formatShortDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: '2-digit',
  }).format(date);
}

function calculateIllustrativeExpiryDate(sourceInterval: string, baseDate: Date): string | null {
  const match = sourceInterval.trim().match(/^(\d+)\s+days?$/i);
  if (!match) return null;

  const intervalDays = Number(match[1]);
  const result = new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate());
  result.setDate(result.getDate() + intervalDays);
  return formatShortDate(result);
}

export default function BaxterIVPExpPage() {
  const calculationBaseDate = new Date();
  const calculationBaseDateLabel = formatShortDate(calculationBaseDate);
  return (
    <main className="route-main project-detail-page category-healthcare baxter-exp-page">
      <div className="page-breadcrumb"><Link to="/">HOME</Link><span>/</span><Link to="/healthcare">HEALTHCARE</Link><span>/</span><span>BAXTER IVP EXP</span></div>

      <section className="detail-hero">
        <div className="detail-icon"><Pill size={42} strokeWidth={1.4} aria-hidden="true" /></div>
        <div className="detail-copy">
          <p className="section-kicker">HEALTHCARE / REFERENCE DEMO</p>
          <h1>Baxter IVP exp</h1>
          <p>A portfolio adaptation of the supplied medication storage-and-expiration table concept.</p>
          <div className="tag-row"><span className="tech-tag">8 source rows</span><span className="tech-tag">Intervals shown</span><span className="tech-tag">Illustrative dates</span></div>
        </div>
      </section>

      <aside className="baxter-exp-notice" role="note" aria-label="Clinical safety disclaimer">
        <ShieldAlert size={20} aria-hidden="true" />
        <div>
          <strong>Disclaimer: use at your own risk; not reviewed or tested for accuracy</strong>
          <p>The medication names and intervals below are transcribed from the supplied HTML only and have not been independently verified. Displayed dates are arithmetic examples based on the viewer’s current local date, not patient-specific or validated beyond-use dates. This is not clinical guidance; confirm current product labeling and applicable institutional policy. Do not use this demo to store, dispense, or administer medication.</p>
        </div>
      </aside>

      <section className="baxter-exp-table-panel" aria-labelledby="baxter-exp-table-title">
        <div className="placeholder-top"><span>01 / SOURCE TABLE</span><span>VALUES UNVERIFIED</span></div>
        <h2 id="baxter-exp-table-title">Source-listed medication intervals</h2>
        <p className="baxter-exp-table-intro">The rows preserve the medication names and storage intervals written in the supplied source. Example expiry date = the viewer’s local date ({calculationBaseDateLabel}) plus the listed interval. These dates do not account for a medication’s actual preparation, storage history, labeling, or institutional policy.</p>
        <div className="baxter-exp-table-wrap">
          <table className="baxter-exp-table">
            <thead><tr><th scope="col">Medication</th><th scope="col">Source-listed interval</th><th scope="col">Expiry date</th></tr></thead>
            {baxterIVPSections.map((section) => (
              <tbody key={section.group}>
                <tr className="baxter-exp-group"><th scope="colgroup" colSpan={3}>{section.group}</th></tr>
                {section.items.map((item) => {
                  const expiryDate = calculateIllustrativeExpiryDate(item.sourceInterval, calculationBaseDate);
                  return (
                    <tr key={item.medication}>
                      <th scope="row">{item.medication}</th>
                      <td>{item.sourceInterval}</td>
                      <td>{expiryDate ? <span className="baxter-exp-calculated-date">{expiryDate}</span> : <span className="baxter-exp-not-calculated">Interval not recognized</span>}</td>
                    </tr>
                  );
                })}
              </tbody>
            ))}
          </table>
        </div>
      </section>

      <section className="baxter-exp-boundary" aria-labelledby="baxter-exp-boundary-title">
        <div className="placeholder-top"><span>02 / CALCULATION BASIS</span><span>ILLUSTRATIVE ONLY</span></div>
        <h2 id="baxter-exp-boundary-title">How the displayed dates are derived</h2>
        <p>For intervals written as a number of days, this demo adds that many calendar days to the viewer’s current local date. For example, a 30-day interval viewed on 09/30/26 displays 10/30/26. This simple date arithmetic is not an expiration determination and must not replace pharmacy review, product labeling, or institutional policy.</p>
      </section>

      <p className="baxter-exp-source-note">Source: user-supplied <code>roomexp.html</code>. Medication values are reproduced as provided, are unverified, and must not be treated as clinical guidance.</p>
      <div className="route-backlink"><Link className="button-text" to="/healthcare"><ArrowLeft size={14} /> BACK TO HEALTHCARE</Link></div>
    </main>
  );
}
