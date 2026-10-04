import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { categories, statusLabel, type CategoryKey } from '../data/portfolio';

const artReferences = [
  { name: 'The Ladybug', url: 'https://theladybug.app/', domain: 'theladybug.app', description: 'Browser-based visual effects and animation studio for images, video, type, and sound.' },
  { name: 'PaperAnimator', url: 'https://paperanimator.com/', domain: 'paperanimator.com', description: 'Create paper-cutout and fold-out animations, magazine-style lettering, and animated graphics from images.' },
  { name: 'CodePen', url: 'https://codepen.io/', domain: 'codepen.io', description: 'An online playground for creating, testing, and sharing front-end code demos.' },
  { name: 'anime.js', url: 'https://animejs.com/', domain: 'animejs.com', description: 'A JavaScript animation engine for web interfaces, timelines, motion, and SVG effects.' },
];

export default function CategoryPage({ categoryKey }: { categoryKey: CategoryKey }) {
  const category = categories[categoryKey];
  return (
    <main className={`route-main category-page category-${category.key}`}>
      <div className="page-breadcrumb"><Link to="/">HOME</Link><span>/</span><span>{category.label.toUpperCase()}</span></div>
      <section className="route-hero">
        <div className="route-hero-copy"><p className="section-kicker">{category.eyebrow}</p><h1>{category.title}</h1><p>{category.description}</p></div>
        <div className="route-hero-symbol" aria-hidden="true"><span className="symbol-orbit orbit-one" /><span className="symbol-orbit orbit-two" /><span className="symbol-core">{category.label.slice(0, 1)}</span><span className="symbol-cross">+</span></div>
      </section>
      <section className="route-section" aria-labelledby="category-projects-heading">
        <div className="section-heading"><div><p className="section-kicker">BROWSE / {category.label.toUpperCase()}</p><h2 id="category-projects-heading">Projects &amp; experiments</h2></div><span className="section-index">{String(category.projects.length).padStart(2, '0')} PROJECTS</span></div>
        <div className="category-card-grid">
          {category.projects.map((project, index) => {
            const Icon = project.icon;
            return (
              <Link className="category-project-card" to={project.route} key={project.slug}>
                <div className="category-card-visual">
                  <span className="card-index">0{index + 1}</span>
                  <Icon size={42} strokeWidth={1.45} aria-hidden="true" />
                  <ArrowUpRight className="card-open-icon" size={19} aria-hidden="true" />
                </div>
                <div className="category-card-copy"><div className="category-card-meta"><span>{project.kicker}</span><span className={`project-status status-${project.status}`}>{statusLabel(project.status)}</span></div><h3>{project.title}</h3><p>{project.description}</p><div className="tag-row">{project.tags.map((tag) => <span className="tech-tag" key={tag}>{tag}</span>)}</div></div>
              </Link>
            );
          })}
        </div>
        {categoryKey === 'finance' && <p className="market-disclaimer">Market cards are design demos. No live prices or investment signals are connected.</p>}
        {(categoryKey === 'healthcare' || categoryKey === 'art' || categoryKey === 'software') && <p className="market-disclaimer">{categoryKey === 'healthcare' ? 'Healthcare source content is unverified and is not clinical guidance. Queue Eve IVs shows the supplied macros as collapsed display-only text; the page never executes them. Baxter IVP exp lists the supplied medication intervals, but no expiry dates are calculated.' : categoryKey === 'software' ? 'AI Reference uses names and descriptions from a supplied list. Only model destinations marked verified link to official first-party pages.' : 'Project slots are editable templates. Replace the concept copy with your implemented work before publishing.'}</p>}
      </section>
      {categoryKey === 'art' && (
        <section className="reference-shelf" aria-labelledby="art-references-heading">
          <div className="reference-shelf-heading">
            <p className="section-kicker red-kicker">TOOLS / INSPIRATION</p>
            <h2 id="art-references-heading">Creative references</h2>
          </div>
          <div className="reference-grid">
            {artReferences.map((reference) => (
              <article className="reference-item" key={reference.domain}>
                <a href={reference.url} target="_blank" rel="noopener noreferrer" aria-label={`${reference.name} (opens in a new tab)`}>
                  <h3>{reference.name}<ArrowUpRight size={14} aria-hidden="true" /></h3>
                  <span>{reference.domain}</span>
                </a>
                <p>{reference.description}</p>
              </article>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
