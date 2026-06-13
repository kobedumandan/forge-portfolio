import { useEffect, useRef, useState } from "react";
import AmbientEmbers from "./components/AmbientEmbers";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Divider from "./components/Divider";
import Services from "./components/Services";
import Work from "./components/Work";
import TechGrid from "./components/TechGrid";
import Smith from "./components/Smith";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ForgeCanvas from "./components/ForgeCanvas";
import "./styles/App.css";

const DOCK_MS = 1000;
const EASE = "cubic-bezier(.7,0,.2,1)";

export default function App() {
  const [entered, setEntered] = useState(false);
  const stageRef = useRef(null); // the fixed 3D stage wrapper
  const boxRef = useRef(null); // hero's right box — the dock target

  // lock scroll while the intro is up. also stop the browser from restoring
  // the previous scroll position on reload — the intro should always start at
  // the top, not wherever the user had scrolled to before refreshing.
  useEffect(() => {
    const prevRestore = window.history.scrollRestoration;
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = prevRestore || "auto";
      }
    };
  }, []);

  // on enter: fly the stage from full-screen down into the hero box,
  // then keep it pinned to that box as the page scrolls
  useEffect(() => {
    if (!entered) return;
    const stage = stageRef.current;
    const box = boxRef.current;
    if (!stage || !box) return;

    const dockToBox = () => {
      const r = box.getBoundingClientRect();
      stage.style.top = `${r.top}px`;
      stage.style.left = `${r.left}px`;
      stage.style.width = `${r.width}px`;
      stage.style.height = `${r.height}px`;
    };

    // animate the shrink
    stage.style.transition = ["top", "left", "width", "height"]
      .map((p) => `${p} ${DOCK_MS}ms ${EASE}`)
      .join(", ");
    const raf = requestAnimationFrame(dockToBox);

    // once docked, drop the transition and track the box on scroll/resize
    let onScroll;
    const done = setTimeout(() => {
      stage.style.transition = "none";
      document.body.style.overflow = "";
      onScroll = () => {
        dockToBox();
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
      onScroll();
    }, DOCK_MS + 40);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(done);
      if (onScroll) {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
      }
    };
  }, [entered]);

  return (
    <div className="app-root">
      {/* ===== LAYER 1: "THE FORGE" backdrop (behind the anvil) ===== */}
      <div aria-hidden="true" className="app-backdrop" data-entered={entered}>
        <div className="app-backdrop__word">
          <div className="app-backdrop-text1">THE</div>
          <div className="app-backdrop-text2">FORGE</div>
        </div>
      </div>

      {/* ===== LAYER 2: the 3D forge stage (full-screen, then docks) ===== */}
      <div ref={stageRef} className="app-stage">
        <ForgeCanvas entered={entered} />
      </div>

      {/* nav rides above the stage so the anvil scrolls under it */}
      <Nav entered={entered} />

      {/* ===== tap-to-enter prompt (above the stage) ===== */}
      <div className="app-enter" data-entered={entered}>
        <button
          type="button"
          onClick={() => setEntered(true)}
          disabled={entered}
          className="app-enter__btn"
        >
          <span className="app-enter__label">Tap to enter</span>
          {/* <span aria-hidden="true" className="app-enter__line" /> */}
        </button>
      </div>

      {/* ===== LAYER 3: the site itself (fades in on enter) ===== */}
      <div className="app-site" data-entered={entered}>
        <AmbientEmbers />
        <Hero stageBoxRef={boxRef} />
        <Divider />
        <Services />
        <Work />
        <TechGrid />
        <Smith />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}
