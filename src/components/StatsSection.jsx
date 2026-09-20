import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { stats } from "../data/experiences";
import Reveal, { RevealLine } from "./Reveal";
import { scrollToSection } from "../data/nav";

function Counter({ value, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setN(value);
      return;
    }
    let raf;
    const start = performance.now();
    const dur = 1800;
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, reduce]);

  return (
    <span ref={ref} className="stat__value">
      {n}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  return (
    <section className="vd-section vd-dark" aria-label="Sustainability">
      <div className="vd-container">
        <div className="sec-head">
          <div className="sec-head__meta">
            <Reveal y={14}>
              <span className="vd-label">Sustainability</span>
            </Reveal>
            <h2 className="vd-h2">
              <RevealLine>Luxury with</RevealLine>
              <RevealLine delay={0.08}>a lighter footprint.</RevealLine>
            </h2>
          </div>
          <Reveal delay={0.14} className="sec-head__aside">
            <p className="vd-body">
              Measured annually and published openly. Our aim is simple — leave
              the ridge in better condition than we found it.
            </p>
            <button
              className="link-line"
              style={{ marginTop: "1.5rem", background: "none", color: "inherit" }}
              onClick={() => scrollToSection("story")}
            >
              Learn About Our Approach
              <ArrowRight size={14} strokeWidth={1.3} />
            </button>
          </Reveal>
        </div>

        <div className="stats-grid">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="stat">
                <Counter value={s.value} suffix={s.suffix} />
                <p className="stat__label">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
