import { techStack } from '../data/tech';
import '../styles/TechGrid.css';

function Tile({ name, Icon, color }) {
  return (
    <div className="tech-tile">
      <span className="tech-tile__icon" style={{ color }}>
        <Icon />
      </span>
      <span className="tech-tile__name">{name}</span>
    </div>
  );
}

export default function TechGrid() {
  // Duplicate the list so the belt can loop seamlessly: when the track has
  // scrolled exactly one copy's width, it resets with no visible jump.
  const belt = [...techStack, ...techStack];

  return (
    <section id="tools" className="tech">
      <div className="tech__head">
        <div className="tech__eyebrow">— 03 / Toolbelt</div>
        <h2 className="tech__title">The tools on the wall.</h2>
        <p className="tech__intro">
          Every smith has favorites. These are the tools I build with.
        </p>
      </div>

      <div className="tech-belt" aria-label="Technology stack">
        <div className="tech-belt__track">
          {belt.map((t, i) => (
            <Tile key={`${t.name}-${i}`} {...t} />
          ))}
        </div>
      </div>
    </section>
  );
}
