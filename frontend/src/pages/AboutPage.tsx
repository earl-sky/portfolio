import { Printer } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  return (
    <main className="route-main resume-page">
      <div className="page-breadcrumb no-print"><Link to="/">HOME</Link><span>/</span><span>ABOUT / RÉSUMÉ</span></div>
      <div className="resume-toolbar no-print"><p className="section-kicker">ABOUT / MY STORY</p><button className="button-primary" type="button" onClick={() => window.print()}><Printer size={14} /> PRINT / SAVE PDF</button></div>
      <article className="resume-sheet">
        <header className="resume-header"><div><p className="resume-label">SOFTWARE ENGINEERING STUDENT</p><h1>Earl Sky</h1><p className="resume-summary">Software engineering student at Western Governors University, completing a B.S. in Software Engineering (Java) in November 2026. U.S. Air Force veteran with eight years of experience in military pharmacy.</p></div><div className="resume-contact"><span>Las Vegas, NV</span><span>notEarlSky@gmail.com</span><span>github.com/earl-sky</span><span>linkedin.com/in/notEarlSky</span></div></header>

        <section className="resume-section">
          <h2>Summary of Qualifications</h2>
          <ul className="resume-bullets">
            <li>Competent in Java Springboot, React, TypeScript, MySQL, Docker, Python.</li>
            <li>U.S. Air Force veteran with 8 years of experience in the military pharmacy field.</li>
            <li>Competent with Veterans Affairs Hospital pharmacy software and hardware: Vista, Pyxis, CHCS, Omnicell, ScriptPro, and MedCarousel.</li>
          </ul>
        </section>

        <section className="resume-section">
          <h2>Work Experience</h2>
          <div className="resume-entry">
            <div><h3>Inpatient Pharmacy Technician</h3><p className="resume-meta">VA Puget Sound Healthcare System · Seattle, WA</p><p className="resume-meta">February 2022 – April 2025</p></div>
            <ul className="resume-bullets">
              <li>Abided by DEA laws and regulations when accurately, thoroughly, and promptly documenting controlled-substance dispensing in the computer.</li>
              <li>Used approved Pharmacy Service protocols to support patients admitted to the hospital.</li>
              <li>Independently filled Omnicell computerized medication inventories across multiple wards as part of unit-dose medication management.</li>
              <li>Refilled medications in emergency crash carts throughout the hospital.</li>
              <li>Prepared, compounded, dispensed, and distributed hazardous medications in designated sterile compounding areas using aseptic techniques and established procedures in accordance with USP 797 and 800.</li>
            </ul>
          </div>
          <div className="resume-entry">
            <div><h3>Realtor® / Real Estate Agent</h3><p className="resume-meta">Keller Williams The Marketplace · Henderson, NV</p><p className="resume-meta">January 2020 – January 2022</p></div>
            <ul className="resume-bullets">
              <li>Earned the REALTOR® Military Relocation Professional designation and counseled military members on buying, selling, and investing in real estate.</li>
              <li>Earned Remote Pilot (Part 107) certification and captured aerial photos and videos of community interests.</li>
            </ul>
          </div>
          <div className="resume-entry">
            <div><h3>Track Attendant / Host</h3><p className="resume-meta">Exotics Racing · Las Vegas, NV</p><p className="resume-meta">October 2019 – March 2020</p></div>
            <ul className="resume-bullets">
              <li>Educated customers on racing etiquette, safety policies, and procedures.</li>
              <li>Helped customers choose vehicles that fit their needs and budget.</li>
              <li>Personally set a top 0.12% fastest track time overall.</li>
            </ul>
          </div>
          <div className="resume-entry">
            <div><h3>Assistant Course Supervisor – Pharmacy (Main, Satellite, &amp; Inpatient)</h3><p className="resume-meta">United States Air Force · Keesler AFB, MS</p><p className="resume-meta">December 2016 – April 2019</p></div>
            <ul className="resume-bullets">
              <li>Managed the Pharmacy Phase II Preceptor program, training and certifying 36 personnel on compliance with 36 tasks.</li>
              <li>As Pharmacy Staff Development Representative, managed deployment-readiness requirements for pharmacy airmen.</li>
              <li>As Pharmacy Education and Training Monitor, oversaw continuing education and certification requirements for 71 pharmacy staff.</li>
              <li>Served as a Basic Life Support Instructor, teaching BLS to healthcare personnel.</li>
              <li>Evaluated monthly inspections for three pharmacies on Cardiac Arrest Code Blue response.</li>
            </ul>
          </div>
        </section>

        <section className="resume-section">
          <h2>Education</h2>
          <div className="resume-entry"><div><h3>B.S. Software Engineering (Java)</h3><p className="resume-meta">Western Governors University · 2026</p></div><p>Expected completion: November 2026.</p></div>
          <div className="resume-entry"><div><h3>A.A.S. Pharmacy Technology</h3><p className="resume-meta">Community College of the Air Force · 2017</p></div><p>Associate of Applied Science in Pharmacy Technology.</p></div>
        </section>

        <section className="resume-section">
          <h2>Certifications &amp; Licenses</h2>
          <ul className="resume-bullets">
            <li>Front End Web Development WGU Certificate · Awarded March 2024</li>
            <li>AWS Certified Cloud Practitioner · Validation #: 1dadb8e5335b485f88015eb9813ae0a6</li>
            <li>ITIL Foundation in IT Service Management · Cert #: GR671818076EP</li>
            <li>CompTIA Project+ · Candidate ID: COMP001022942651</li>
            <li>Series 65 Registered Investment Advisor · In progress</li>
          </ul>
        </section>

        <section className="resume-section">
          <h2>Technical Skills</h2>
          <p>Python · MySQL · Java · HTML · CSS · JavaScript · React · TypeScript · Spring Boot · Docker · SQL · REST</p>
        </section>
      </article>
    </main>
  );
}
