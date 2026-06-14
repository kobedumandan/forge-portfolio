import { projects } from "../data/projects";
import "../styles/Work.css";

function ProjectRow({ p }) {
  return (
    <div className="project-row" style={{ "--accent": p.accent }}>
      {/* image side */}
      <div
        className="project-row__media"
        style={{ gridColumn: p.imgCol, "--proj-bg": p.bg }}
      >
        {/* placeholder browser frame mockup */}
        <div className="project-mock">
          <div className="project-mock__bar">
            <span className="project-mock__dot project-mock__dot--red" />
            <span className="project-mock__dot project-mock__dot--amber" />
            <span className="project-mock__dot project-mock__dot--gray" />
            <span className="project-mock__url">{p.url}</span>
          </div>
          <div className="project-mock__body">
            <div className="project-content-row1">
              <img src="../assets/dnsc-lrms/pic1.png" alt="" />
            </div>
            <div className="project-content-row2">
              <img src="../assets/dnsc-lrms/pic2.png" alt="" />
            </div>
          </div>
        </div>
        {/* ember glow overlay */}
        <div className="project-row__glow" />
        {/* index label */}
        <div className="project-row__index">№ {p.no}</div>
      </div>

      {/* copy side */}
      <div style={{ gridColumn: p.copyCol }}>
        <div className="project-row__kind">{p.kind}</div>
        <h3 className="project-row__name">{p.name}</h3>
        <p className="project-row__desc">{p.desc}</p>

        <div className="project-row__stack">
          {p.stack.map((tag) => (
            <span key={tag} className="project-row__tag">
              {tag}
            </span>
          ))}
        </div>

        <div className="project-row__links">
          {p.live && (
            <a
              href={p.live}
              target="_blank"
              rel="noreferrer"
              className="project-row__link project-row__link--primary"
            >
              Visit live →
            </a>
          )}
          {p.repo && (
            <a
              href={p.repo}
              target="_blank"
              rel="noreferrer"
              className="project-row__link"
            >
              Source code
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Work() {
  return (
    <section id="work" className="work">
      <div className="work__head">
        <div>
          <div className="work__eyebrow">— 02 / The Work</div>
          <h2 className="work__title">Recent pieces, pulled from the forge.</h2>
        </div>
        <div className="work__meta">
          {projects.length} / 12 SHOWN
          <br />
          <a href="#contact" className="work__meta-link">
            request full archive →
          </a>
        </div>
      </div>

      {projects.map((p) => (
        <ProjectRow key={p.no} p={p} />
      ))}
    </section>
  );
}
