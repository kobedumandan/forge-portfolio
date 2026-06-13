import '../styles/Nav.css';

export default function Nav({ entered = true }) {
  return (
    <nav className="nav" data-entered={entered}>
      <a href="#top" className="nav__brand">
        <span className="nav__brand-word">
          <span className="nav__brand-the">THE</span>
          <span className="nav__brand-forge">FORGE</span>
        </span>
      </a>

      <div className="nav__links">
        <a href="#services" className="nav__link">
          01 / Craft
        </a>
        <a href="#work" className="nav__link">
          02 / Work
        </a>
        <a href="#tools" className="nav__link">
          03 / Tools
        </a>
        <a href="#smith" className="nav__link">
          04 / Smith
        </a>
        <a href="#contact" className="nav__cta">
          Commission →
        </a>
      </div>
    </nav>
  );
}
