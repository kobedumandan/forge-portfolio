import '../styles/Hero.css';

const stats = [
  { value: '5', sup: '+', label: 'Years at the anvil' },
  { value: '12', sup: '+', label: 'Pieces forged' },
  { value: '3', sup: '', label: 'Stacks mastered' },
];

export default function Hero({ stageBoxRef }) {
  return (
    <section id="top" className="hero">
      {/* ambient glow behind everything */}
      <div aria-hidden="true" className="hero__glow" />

      {/* LEFT: copy */}
      <div className="hero__copy">
        {/* <div className="hero__badge">
          <span className="hero__badge-dot" />
          Forge is hot
        </div> */}

        <h1 className="hero__title">
          Welcome to my
          <br />
          <span className="hero__title-accent">Forge</span>
        </h1>

        <p className="hero__lead">
          I'm{' '}
          <span className="hero__lead-name">Kobe Dumandan</span>{' '}
          — a full-stack developer building web &amp; mobile products
          end-to-end. Heat the iron, set the form, strike with intent.
        </p>

        <div className="hero__actions">
          <a href="#work" className="hero__btn">
            See my work
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 8H13M13 8L9 4M13 8L9 12"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="square"
              />
            </svg>
          </a>
          <a href="#contact" className="hero__btn hero__btn--ghost">
            Commission a project
          </a>
        </div>

        {/* stats / hammer-marks */}
        {/* <div className="hero__stats">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="hero__stat-value">
                {s.value}
                {s.sup && <span className="hero__stat-sup">{s.sup}</span>}
              </div>
              <div className="hero__stat-label">{s.label}</div>
            </div>
          ))}
        </div> */}
      </div>

      {/* RIGHT: dock target — the fixed 3D forge stage lands here */}
      <div ref={stageBoxRef} className="hero__stage">
        <div className="hero__label hero__label--tl">
          <span className="hero__label-dot" />
          FORGE.STATION_01
        </div>
        <div className="hero__label hero__label--tr">TEMP // 1450°C</div>
        <div className="hero__label hero__label--bl">↻ Drag to rotate</div>
        <div className="hero__label hero__label--br">ANVIL · No. 001</div>

        {/* corner ticks */}
        <div aria-hidden="true" className="hero__tick hero__tick--tl" />
        <div aria-hidden="true" className="hero__tick hero__tick--tr" />
        <div aria-hidden="true" className="hero__tick hero__tick--bl" />
        <div aria-hidden="true" className="hero__tick hero__tick--br" />
      </div>
    </section>
  );
}
