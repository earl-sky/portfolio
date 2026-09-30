import { Printer } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  return (
    <main className="route-main resume-page">
      <div className="page-breadcrumb no-print"><Link to="/">HOME</Link><span>/</span><span>ABOUT / RÉSUMÉ</span></div>
      <div className="resume-toolbar no-print"><p className="section-kicker">ABOUT / YOUR STORY</p><button className="button-primary" type="button" onClick={() => window.print()}><Printer size={14} /> PRINT / SAVE PDF</button></div>
      <article className="resume-sheet">
        <header className="resume-header"><div><p className="resume-label">SOFTWARE ENGINEER</p><h1>Your Name</h1><p className="resume-summary">Write a concise professional summary here: the systems you build, the problems you enjoy solving, and the value you bring to a team.</p></div><div className="resume-contact"><span>City, State</span><span>you@example.com</span><span>github.com/your-handle</span><span>linkedin.com/in/your-handle</span></div></header>
        <section className="resume-section"><h2>Experience</h2><div className="resume-entry"><div><h3>Role title · Company</h3><p className="resume-meta">Location · Start year – Present</p></div><p>Add a specific outcome, system you owned, or improvement you shipped. Use concrete scope and a truthful metric where available.</p></div><div className="resume-entry"><div><h3>Previous role · Company</h3><p className="resume-meta">Location · Start year – End year</p></div><p>Replace this placeholder with one or two concise contributions relevant to the roles you want.</p></div></section>
        <section className="resume-section"><h2>Selected work</h2><div className="resume-entry"><div><h3>Weatherline</h3><p className="resume-meta">React · TypeScript · Java · Spring Boot · MySQL · Docker</p></div><p>A live four-city weather widget with a Spring Boot API and a containerized local stack.</p></div><div className="resume-entry"><div><h3>Additional project</h3><p className="resume-meta">Add stack · dates</p></div><p>Replace with a project you have built and link its repository or demo.</p></div></section>
        <section className="resume-section resume-columns"><div><h2>Technical skills</h2><p>Java · TypeScript · React · Spring Boot · MySQL · Docker · SQL · REST</p></div><div><h2>Education</h2><p>Add degree, school, or relevant training · dates</p></div></section>
        <p className="resume-edit-note no-print">Template note: replace every sample name, date, contact detail, role, and project claim with your own information.</p>
      </article>
    </main>
  );
}
