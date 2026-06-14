import { useEffect, useRef, useState } from "react";
import { projects } from "../data/projects";
import "../styles/Work.css";

function ProjectRow({ p, index }) {
  // alternate the layout: even rows put the image left, odd rows put it right
  const flipped = index % 2 === 1;
  const imgCol = flipped ? "2" : "1";
  const copyCol = flipped ? "1" : "2";

  // reveal the row once it scrolls into view (matches the Services pattern)
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
    <div
      ref={ref}
      className={`project-row${visible ? " is-visible" : ""}`}
      data-flipped={flipped}
      style={{ "--accent": p.accent }}
    >
      {/* image side */}
      <div
        className="project-row__media"
        style={{ gridColumn: imgCol, gridRow: 1, "--proj-bg": p.bg }}
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
            {p.pics != "1" ? (
              <>
                <div className="project-content-row1">
                  <img src={"src/assets/" + p.folder + "/pic1.png"} alt="" />
                </div>
                <div className="project-content-row2">
                  <img src={"src/assets/" + p.folder + "/pic2.png"} alt="" />
                </div>
              </>
            ) : (
              <>
                <div className="project-content-row3">
                  <img src={"src/assets/" + p.folder + "/pic1.png"} alt="" />
                </div>
              </>
            )}
          </div>
        </div>
        {/* ember glow overlay */}
        <div className="project-row__glow" />
        {/* index label */}
        <div className="project-row__index">№ {p.no}</div>
      </div>

      {/* copy side */}
      <div className="project-row__copy" style={{ gridColumn: copyCol, gridRow: 1 }}>
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

      {projects.map((p, i) => (
        <ProjectRow key={p.no} p={p} index={i} />
      ))}
    </section>
  );
}
