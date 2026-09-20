import { ArrowRight } from "lucide-react";
import { IMG } from "../data/images";
import { scrollToSection } from "../data/nav";
import Reveal, { RevealLine } from "./Reveal";
import ParallaxImage from "./ParallaxImage";

export default function WelcomeSection() {
  return (
    <section className="vd-section vd-ivory" id="welcome" aria-labelledby="welcome-title">
      <div className="vd-container welcome__grid">
        <div className="welcome__text">
          <Reveal y={14}>
            <span className="vd-label">Welcome to Verdara</span>
          </Reveal>

          <h2 className="vd-h2" id="welcome-title">
            <RevealLine>A slower way to</RevealLine>
            <RevealLine delay={0.08}>experience the</RevealLine>
            <RevealLine delay={0.16}>Himalayas.</RevealLine>
          </h2>

          <Reveal delay={0.2}>
            <p className="vd-body">
              Hidden among the forests of Darjeeling, Verdara is a place designed
              for stillness. Wake to mountain mist, spend afternoons wandering
              through pine forests and return to rooms made warm by natural
              textures and quiet luxury.
            </p>
          </Reveal>

          <Reveal delay={0.28}>
            <button className="btn btn--ghost" onClick={() => scrollToSection("story")}>
              <span>Discover Our Story</span>
              <ArrowRight className="btn-arrow" size={15} strokeWidth={1.3} />
            </button>
          </Reveal>

          <Reveal delay={0.34} as="div" style={{ width: "100%" }}>
            <div className="welcome__figures">
              {[
                ["24", "Rooms & Suites"],
                ["2,042 m", "Above Sea Level"],
                ["18 acres", "Private Forest"],
              ].map(([v, l]) => (
                <div key={l} className="welcome__figure">
                  <p>{v}</p>
                  <p className="vd-caption">{l}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="welcome__media">
          <ParallaxImage
            src={IMG.welcome}
            alt="Layered Himalayan ridges seen from the forest above Verdara"
          />
          <div className="welcome__stack vd-media">
            <img
              src={IMG.welcomeSmall}
              alt="A timber-lined guest room with soft evening light"
              loading="lazy"
            />
          </div>
          <div className="welcome__cap">
            <span className="vd-caption">Fig. 01 — The eastern ridge</span>
            <span className="vd-caption">Darjeeling</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
