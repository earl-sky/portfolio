import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Gamepad2 } from 'lucide-react';

// Curated game-making / pixel-art reference links. Each entry links to the
// official site; `name` is used as the React key because `domain` repeats
// (twinery.org hosts both the Cookbook and the Twine 2 docs).
const toolkitReferences = [
  { name: 'PICO-8', url: 'https://www.lexaloffle.com/pico-8.php', domain: 'lexaloffle.com', description: 'A fantasy console for making, sharing, and playing tiny games, with built-in code, sprite, map, and sound editors and a 16-colour palette.' },
  { name: 'PuzzleScript', url: 'https://puzzlescript.net/', domain: 'puzzlescript.net', description: 'An open-source engine for small puzzle games where sprites, levels, rules, and sound are all written in plain text.' },
  { name: 'Twine Cookbook', url: 'https://twinery.org/cookbook/', domain: 'twinery.org', description: 'The official Twine cookbook: worked examples for branching passages, variables, conditional logic, and styling.' },
  { name: 'Twine 2', url: 'https://twinery.org/2/#/', domain: 'twinery.org', description: 'Documentation for Twine 2, the open-source tool for telling interactive, nonlinear stories that run in the browser.' },
  { name: 'Bitsy Docs', url: 'https://make.bitsy.org/docs/', domain: 'make.bitsy.org', description: 'Documentation for Bitsy, a little tool for making tiny worlds and stories: draw tiles, add dialogue, and share from the browser.' },
  { name: 'Lospec', url: 'https://lospec.com/', domain: 'lospec.com', description: 'A pixel-art hub with colour palettes, tutorials, a community, and links to pixel-art tools and workflows.' },
  { name: 'LibreSprite', url: 'https://libresprite.github.io/#!/', domain: 'libresprite.github.io', description: 'A free and open-source fork of Aseprite for pixel-art sprites, animations, and tilesets, with desktop builds.' },
];

export default function CreativeToolkitPage() {
  return (
    <main className="route-main project-detail-page category-art art-reference-page">
      <div className="page-breadcrumb"><Link to="/">HOME</Link><span>/</span><Link to="/art">ART</Link><span>/</span><span>CREATIVE TOOLKIT</span></div>
      <section className="detail-hero">
        <div className="detail-icon"><Gamepad2 size={42} strokeWidth={1.4} aria-hidden="true" /></div>
        <div className="detail-copy">
          <p className="section-kicker red-kicker">GAMES / PIXEL ART / INTERACTIVE FICTION</p>
          <h1>Creative toolkit</h1>
          <p>A red-themed reference shelf for the art category: seven official links for making tiny games, puzzle games, interactive fiction, and pixel art.</p>
          <div className="tag-row">{['PICO-8', 'Twine', 'Bitsy', 'Lospec'].map((tag) => <span className="tech-tag" key={tag}>{tag}</span>)}</div>
        </div>
      </section>
      <section className="reference-shelf" aria-labelledby="creative-toolkit-heading">
        <div className="reference-shelf-heading">
          <p className="section-kicker red-kicker">TOOLS / INSPIRATION</p>
          <h2 id="creative-toolkit-heading">Reference links</h2>
        </div>
        <div className="reference-grid">
          {toolkitReferences.map((reference) => (
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