import { techCategories } from '../data/tech';
import '../styles/TechGrid.css';

function CategoryRack({ cat }) {
  return (
    <div className="tech-rack">
      <div className="tech-rack__head">
        <div>
          <div className="tech-rack__idx">{cat.idx}</div>
          <h3 className="tech-rack__name">{cat.name}</h3>
        </div>
      </div>

      <div className="tech-rack__items">
        {cat.items.map((t) => (
          <div key={t.name} className="tech-tile">
            <div className="tech-tile__icon">{t.icon}</div>
            <div className="tech-tile__name">{t.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TechGrid() {
  return (
    <section id="tools" className="tech">
      <div className="tech__head">
        <div className="tech__eyebrow">— 03 / Toolbelt</div>
        <h2 className="tech__title">The tools on the wall.</h2>
        <p className="tech__intro">
          Every smith has favorites. These are the ones that stay near the anvil.
        </p>
      </div>

      <div className="tech__grid">
        {techCategories.map((cat) => (
          <CategoryRack key={cat.name} cat={cat} />
        ))}
      </div>
    </section>
  );
}
