import { useEffect, useRef, useState } from 'react';
import '../styles/Smith.css';

const FACTS = [
  { label: 'Based in', value: 'Philippines · GMT+8' },
  { label: 'Currently', value: 'Open to work' },
  { label: 'Best at', value: 'Full-stack & mobile' },
  { label: 'Lead time', value: '2–3 weeks' },
];

export default function Smith() {
  // reveal the section once it scrolls into view (matches the Work/Services pattern)
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect(); // reveal once, then stop watching
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="smith"
      ref={ref}
      className={`smith${visible ? ' is-visible' : ''}`}
    >
      <div className="smith__grid">
        <div className="smith__copy">
          <div className="smith__eyebrow">— 04 / The Smith</div>
          <h2 className="smith__title">
            Kobe Dumandan,
            <br />
            <span className="smith__title-accent">at the anvil.</span>
          </h2>
          <p className="smith__para">
            I build for the web and mobile — from the database up to the last
            pixel. I like products that feel like one person made them with care:
            opinionated, fast, and quiet where they should be.
          </p>
          <p className="smith__para smith__para--last">
            When I'm not at the keyboard you'll find me sketching new ideas,
            sharpening fundamentals, or breaking down something I admire to learn
            how it was made.
          </p>

          <div className="smith__facts">
            {FACTS.map((f) => (
              <div key={f.label}>
                <div className="smith__fact-label">{f.label}</div>
                <div className="smith__fact-value">{f.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* right: portrait card with mark */}
        <div className="smith__card">
          <div className="smith__mark">
            <div className="smith__mark-inner">
              <div className="smith__mark-glow" />
              <svg
                viewBox="0 0 200 200"
                className="smith__mark-svg"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="kdGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#ff7a2e" />
                    <stop offset="1" stopColor="#e23b2e" />
                  </linearGradient>
                </defs>
                <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(184,173,161,0.2)" strokeWidth="1" />
                <circle cx="100" cy="100" r="78" fill="none" stroke="rgba(226,59,46,0.4)" strokeWidth="1" strokeDasharray="2 4" />
                <text x="100" y="125" fontFamily="Cinzel, serif" fontSize="86" fontWeight="800" textAnchor="middle" fill="url(#kdGrad)">
                  KD
                </text>
                <text x="100" y="160" fontFamily="JetBrains Mono, monospace" fontSize="9" letterSpacing="6" textAnchor="middle" fill="#8a7e72">
                  FORGED · 2020
                </text>
              </svg>
            </div>
          </div>
          <div aria-hidden="true" className="smith__corner smith__corner--tl">SMITH.MARK</div>
          <div aria-hidden="true" className="smith__corner smith__corner--tr">№ 001</div>
          <div aria-hidden="true" className="smith__corner smith__corner--bl">KOBE.DUMANDAN</div>
          <div aria-hidden="true" className="smith__corner smith__corner--br">FULL · STACK</div>
        </div>
      </div>
    </section>
  );
}
