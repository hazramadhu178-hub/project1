import { ArrowRight } from "lucide-react";
import { IMG } from "../data/images";
import { wellness } from "../data/experiences";
import { scrollToSection } from "../data/nav";
import Reveal, { RevealLine } from "./Reveal";
import ParallaxImage from "./ParallaxImage";

export default function WellnessSection() {
  return (
    <section className="vd-section vd-cream" aria-label="Wellness">
      <div className="vd-container well-grid">
        <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem", alignItems: "flex-start" }}>
          <Reveal y={14}>
            <span className="vd-label">Wellness · The Fern House</span>
          </Reveal>
          <h2 className="vd-h2">
            <RevealLine>Rest.</RevealLine>
            <RevealLine delay={0.09}>Breathe.</RevealLine>
            <RevealLine delay={0.18}>Reset.</RevealLine>
          </h2>
          <Reveal delay={0.22}>
            <p className="vd-body">
              Treatments drawn from Himalayan herbal traditions, practised in three
              quiet rooms set deep in the forest. Nothing is rushed; most guests
              stay an hour longer than they planned.
            </p>
          </Reveal>

          <Reveal delay={0.26} as="div" style={{ width: "100%" }}>
            <ul className="well-list">
              {wellness.map((w, i) => (
                <li key={w.name}>
                  <span>0{i + 1}</span>
                  <span>{w.name}</span>
                  <span>{w.meta}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.3}>
            <button className="btn btn--ghost" onClick={() => scrollToSection("booking")}>
              <span>Reserve a Treatment</span>
              <ArrowRight className="btn-arrow" size={15} strokeWidth={1.3} />
            </button>
          </Reveal>
        </div>

        <Reveal delay={0.12} className="well-media">
          <ParallaxImage
            src={IMG.wellnessA}
            alt="A calm treatment room with warm light and herbal oils"
            distance={30}
          />
          <ParallaxImage
            src={IMG.wellnessB}
            alt="Candlelight and folded linen in the spa pavilion"
            distance={30}
          />
        </Reveal>
      </div>
    </section>
  );
}
