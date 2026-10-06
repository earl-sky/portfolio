import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Shapes } from 'lucide-react';

// Curated visual-effects / generative-pattern reference links. Each entry
// links to the official site; `name` is used as the React key so the list
// stays stable even if two entries ever share a domain.
const effectsReferences = [
  { name: 'The Ladybug', url: 'https://theladybug.app/', domain: 'theladybug.app', description: 'A browser-based effects studio for pictures, video, type, and sound: layered looks, animation on a timeline, audio-reactive controls, and SVG or 4K exports with nothing to install.' },
  { name: 'Book of Shapes', url: 'https://bookofshapes.com/', domain: 'bookofshapes.com', description: 'A collection of minimal, generative, and customizable SVG patterns by Nikolaj Sokolowski, grouped by grid, flow, radial, noise, isometric, distortion, organic, and physics styles.' },
];

export default function EffectsPatternsPage() {
  return (
    <main className="route-main project-detail-page category-art art-reference-page">
      <div className="page-breadcrumb"><Link to="/">HOME</Link><span>/</span><Link to="/art">ART</Link><span>/</span><span>EFFECTS &amp; PATTERNS</span></div>
      <section className="detail-hero">
        <div className="detail-icon"><Shapes size={42} strokeWidth={1.4} aria-hidden="true" /></div>
        <div className="detail-copy">
          <p className="section-kicker red-kicker">EFFECTS / GENERATIVE PATTERNS</p>
          <h1>Effects &amp; patterns</h1>
          <p>A red-themed reference shelf for the art category: two official links for making visual effects in the browser and reusing generative SVG patterns.</p>
          <div className="tag-row">{['Effects', 'SVG patterns'].map((tag) => <span className="tech-tag" key={tag}>{tag}</span>)}</div>
        </div>
      </section>
      <section className="reference-shelf" aria-labelledby="effects-patterns-heading">
        <div className="reference-shelf-heading">
          <p className="section-kicker red-kicker">TOOLS / INSPIRATION</p>
          <h2 id="effects-patterns-heading">Reference links</h2>
        </div>
        <div className="reference-grid">
          {effectsReferences.map((reference) => (
            <article className="reference-item" key={reference.name}>
              <a href={reference.url} target="_blank" rel="noopener noreferrer" aria-label={`${reference.name} (opens in a new tab)`}>
                <h3>{reference.name}<ArrowUpRight size={14} aria-hidden="true" /></h3>
                <span>{reference.domain}</span>
              </a>
              <p>{reference.description}</p>
            </article>
          ))}
        </div>
      </section>
      <div className="route-backlink"><Link className="button-text" to="/art"><ArrowLeft size={14} /> BACK TO ART</Link></div>
    </main>
  );
}