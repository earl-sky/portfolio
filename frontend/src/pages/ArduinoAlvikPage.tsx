import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, CircuitBoard } from 'lucide-react';

// Official Arduino sources for the Alvik robotics kit: the store product page
// and the Getting Started tutorial. The store URL is kept in its canonical
// form (tracking parameters from the original link are stripped).
const alvikReferences = [
  { name: 'Arduino Store · Alvik', url: 'https://store-usa.arduino.cc/pages/alvik', domain: 'store-usa.arduino.cc', description: 'Official product page for Alvik, Arduino’s learning and robotics robot companion: block-based coding for beginners, MicroPython and Arduino language for text-based projects.' },
  { name: 'Getting Started with Alvik', url: 'https://docs.arduino.cc/tutorials/alvik/getting-started/', domain: 'docs.arduino.cc', description: 'The official Arduino documentation tutorial that walks through powering the robot, connecting it, and running your first MicroPython and Arduino sketches.' },
];

const alvikSpecs = [
  { label: 'MAIN BOARD', value: 'Arduino Nano 33 BLE Sense with IMU and microphone' },
  { label: 'SENSORS', value: 'Time-of-flight distance, RGB colour, 6-axis gyro/accelerometer, line-follower array' },
  { label: 'MOTION', value: 'DC motors with encoders and a dedicated motor-driver MCU' },
  { label: 'EXPANSION', value: 'Qwiic and Grove I²C connectors, LEGO Technic and M3 mounts, no soldering' },
  { label: 'LANGUAGES', value: 'MicroPython, Arduino language, and block-based coding (mBlock)' },
  { label: 'COURSES', value: 'Free project-based learning courses included for K12 and makers' },
];

export default function ArduinoAlvikPage() {
  return (
    <main className="route-main project-detail-page category-hardware hardware-reference-page">
      <div className="page-breadcrumb"><Link to="/">HOME</Link><span>/</span><Link to="/hardware">HARDWARE</Link><span>/</span><span>ARDUINO ALVIK</span></div>
      <section className="detail-hero">
        <div className="detail-icon"><CircuitBoard size={42} strokeWidth={1.4} aria-hidden="true" /></div>
        <div className="detail-copy">
          <p className="section-kicker purple-kicker">ROBOTICS / EDUCATIONAL HARDWARE</p>
          <h1>Arduino Alvik</h1>
          <p>A purple-themed Hardware project page for the Arduino Alvik robotics kit: an overview of the board, sensors, and languages, plus official Arduino references for the product and the Getting Started tutorial.</p>
          <div className="tag-row">{['Arduino Alvik', 'MicroPython', 'Nano 33 BLE'].map((tag) => <span className="tech-tag" key={tag}>{tag}</span>)}</div>
        </div>
      </section>
      <section className="detail-placeholder">
        <div className="placeholder-top"><span>PROJECT DETAIL</span><span className="project-status status-tool">REFERENCE PAGE</span></div>
        <div className="detail-placeholder-grid">
          {alvikSpecs.map((spec) => (
            <div key={spec.label}>
              <span>{spec.label}</span>
              <p>{spec.value}</p>
            </div>
          ))}
        </div>
        <p>Specs above summarize Arduino’s official Alvik materials. This page links to first-party Arduino sources only; it does not run firmware or ship demos of its own.</p>
      </section>
      <section className="reference-shelf" aria-labelledby="alvik-references-heading">
        <div className="reference-shelf-heading">
          <p className="section-kicker purple-kicker">OFFICIAL SOURCES</p>
          <h2 id="alvik-references-heading">References</h2>
        </div>
        <div className="reference-grid">
          {alvikReferences.map((reference) => (
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
      <div className="route-backlink"><Link className="button-text" to="/hardware"><ArrowLeft size={14} /> BACK TO HARDWARE</Link></div>
    </main>
  );
}
