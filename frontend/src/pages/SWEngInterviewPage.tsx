import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, MessagesSquare } from 'lucide-react';

// Curated interview-prep references. Each entry links to the official source
// for one pillar of the software engineering interview loop: coding practice,
// system design, and behavioral questions.
const interviewReferences = [
  { name: 'LeetCode 75', url: 'https://leetcode.com/studyplan/leetcode-75/', domain: 'leetcode.com', description: 'A focused, ordered study plan of 75 must-know coding interview problems, grouped by pattern (two pointers, sliding window, trees, graphs, dynamic programming) so you can drill the core question types in a guided sequence.' },
  { name: 'Top 10 System Design Questions', url: 'https://www.geeksforgeeks.org/system-design/top-10-system-design-interview-questions-and-answers/', domain: 'geeksforgeeks.org', description: 'Answers to the classic high-level and low-level system design prompts — scalability, load balancing, databases, caching, and more — written as concise Q&A for quick revision before a design interview.' },
  { name: 'Tech Interview Handbook · Behavioral Questions', url: 'https://www.techinterviewhandbook.org/behavioral-interview-questions/', domain: 'techinterviewhandbook.org', description: 'The 30 most commonly asked behavioral interview questions across top tech companies, grouped by company (Airbnb, Amazon, Google, Stripe, and others), from the open-source Tech Interview Handbook by Yangshun Tay.' },
];

export default function SWEngInterviewPage() {
  return (
    <main className="route-main project-detail-page category-software software-reference-page">
      <div className="page-breadcrumb"><Link to="/">HOME</Link><span>/</span><Link to="/software">SOFTWARE</Link><span>/</span><span>SWENG INTERVIEW</span></div>
      <section className="detail-hero">
        <div className="detail-icon"><MessagesSquare size={42} strokeWidth={1.4} aria-hidden="true" /></div>
        <div className="detail-copy">
          <p className="section-kicker">INTERVIEW PREP / REFERENCE SHELF</p>
          <h1>SWEng interview</h1>
          <div className="tag-row">{['Coding', 'System design', 'Behavioral'].map((tag) => <span className="tech-tag" key={tag}>{tag}</span>)}</div>
        </div>
      </section>
      <section className="reference-shelf" aria-labelledby="sweng-interview-references-heading">
        <div className="reference-shelf-heading">
          <p className="section-kicker">INTERVIEW REFERENCES</p>
          <h2 id="sweng-interview-references-heading">Reference links</h2>
        </div>
        <div className="reference-grid">
          {interviewReferences.map((reference) => (
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
      <div className="route-backlink"><Link className="button-text" to="/software"><ArrowLeft size={14} /> BACK TO SOFTWARE</Link></div>
    </main>
  );
}
