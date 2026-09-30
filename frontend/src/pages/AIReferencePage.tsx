import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, BrainCircuit, Search } from 'lucide-react';
import { aiModels } from '../data/aiModels';

const modelTiers = ['All tiers', ...new Set(aiModels.map((model) => model.tier))];

export default function AIReferencePage() {
  const [query, setQuery] = useState('');
  const [tier, setTier] = useState('All tiers');
  const visibleModels = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return aiModels.filter((model) => {
      const matchesTier = tier === 'All tiers' || model.tier === tier;
      const matchesQuery = !needle || `${model.name} ${model.description} ${model.tier}`.toLowerCase().includes(needle);
      return matchesTier && matchesQuery;
    });
  }, [query, tier]);
  const verifiedCount = aiModels.filter((model) => model.verification === 'verified' && model.officialUrl).length;
  const unverifiedCount = aiModels.filter((model) => model.verification === 'unverified').length;

  return (
    <main className="route-main project-detail-page category-software ai-reference-page">
      <div className="page-breadcrumb"><Link to="/">HOME</Link><span>/</span><Link to="/software">SOFTWARE</Link><span>/</span><span>AI REFERENCE</span></div>

      <section className="detail-hero">
        <div className="detail-icon"><BrainCircuit size={42} strokeWidth={1.4} aria-hidden="true" /></div>
        <div className="detail-copy">
          <p className="section-kicker">ARTIFICIAL INTELLIGENCE / MODEL DIRECTORY</p>
          <h1>AI Reference</h1>
          <p>A tiered directory of model names and descriptions from your supplied list, with direct official destinations only where a first-party source confirms the model.</p>
          <div className="tag-row"><span className="tech-tag">{aiModels.length} supplied entries</span><span className="tech-tag">{verifiedCount} verified links</span><span className="tech-tag">{unverifiedCount} unlinked names</span></div>
        </div>
      </section>

      <section className="ai-reference-overview" aria-labelledby="ai-reference-overview-title">
        <div className="placeholder-top"><span>01 / OVERVIEW</span><span>REFERENCE DIRECTORY</span></div>
        <h2 id="ai-reference-overview-title">What problem does this project solve?</h2>
        <p>It puts the supplied AI model list into one browsable place, grouped by capability tier, so readers can scan the summaries and open official model documentation when a match is confirmed.</p>
      </section>

      <aside className="ai-reference-notice" role="note">
        <strong>Source note</strong>
        <p>Model names and descriptions are copied from your supplied list and have not been independently fact-checked. Only the official destinations marked <span className="ai-inline-verified">VERIFIED</span> are linked; unmatched names remain unlinked and are labeled.</p>
      </aside>

      <section className="ai-model-panel" aria-labelledby="ai-model-directory-title">
        <div className="ai-model-heading">
          <div><p className="section-kicker">MODEL DIRECTORY / FIRST-PARTY LINKS</p><h2 id="ai-model-directory-title">Browse models</h2></div>
          <span className="ai-model-count" role="status" aria-live="polite">{visibleModels.length} / {aiModels.length} MODELS</span>
        </div>
        <div className="ai-model-controls">
          <label className="ai-model-search"><Search size={15} aria-hidden="true" /><span className="sr-only">Search models</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search names or descriptions…" aria-label="Search AI model names and descriptions" /></label>
          <label className="ai-tier-select"><span>Tier</span><select value={tier} onChange={(event) => setTier(event.target.value)} aria-label="Filter by model tier">{modelTiers.map((option) => <option value={option} key={option}>{option}</option>)}</select></label>
        </div>

        <div className="ai-model-table-wrap">
          <table className="ai-model-table" aria-label="AI models from the supplied reference list">
            <thead><tr><th scope="col">Tier</th><th scope="col">AI model</th><th scope="col">Description <small>SUPPLIED TEXT</small></th><th scope="col">Official model page</th></tr></thead>
            <tbody>
              {visibleModels.length ? visibleModels.map((model) => (
                <tr key={model.id}>
                  <td><span className="ai-tier-chip">{model.tier}</span></td>
                  <th scope="row">{model.name}</th>
                  <td>{model.description}</td>
                  <td>
                    {model.verification === 'verified' && model.officialUrl ? (
                      <a className="ai-model-link" href={model.officialUrl} target="_blank" rel="noreferrer noopener" title={model.officialPageName} aria-label={`Official model page for ${model.name}${model.officialPageName ? ` (${model.officialPageName})` : ''}`}>
                        OFFICIAL SOURCE <ArrowUpRight size={13} aria-hidden="true" />
                      </a>
                    ) : (
                      <span className={`ai-model-status is-${model.verification}`} title={model.note || undefined}>
                        {model.verification === 'pending' ? 'CHECKING' : 'NO OFFICIAL LINK VERIFIED'}
                      </span>
                    )}
                    {model.verification === 'unverified' && model.note && <details className="ai-model-verification-note"><summary>Why unlinked</summary><p>{model.note}</p></details>}
                  </td>
                </tr>
              )) : <tr><td className="ai-model-empty" colSpan={4}>No models match those filters.</td></tr>}
            </tbody>
          </table>
        </div>
        <p className="ai-reference-source-note">A model may remain unlinked when its supplied name cannot be matched to an official first-party page. No third-party or guessed destinations are used.</p>
      </section>

      <section className="ai-reference-method" aria-labelledby="ai-reference-method-title">
        <div className="placeholder-top"><span>02 / VERIFICATION</span><span>OFFICIAL SOURCE ONLY</span></div>
        <h2 id="ai-reference-method-title">How links are handled</h2>
        <p>Each clickable destination must identify the model on an official provider page or official model documentation. Similar names and generic provider homepages are not treated as a verified match.</p>
      </section>

      <div className="route-backlink"><Link className="button-text" to="/software"><ArrowLeft size={14} /> BACK TO SOFTWARE</Link></div>
    </main>
  );
}
