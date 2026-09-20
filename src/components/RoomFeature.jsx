import { ArrowRight, Check } from "lucide-react";
import { IMG } from "../data/images";
import { roomAmenities } from "../data/rooms";
import { scrollToSection } from "../data/nav";
import Reveal, { RevealLine } from "./Reveal";
import ParallaxImage from "./ParallaxImage";

export default function RoomFeature() {
  return (
    <section className="vd-section vd-cream" aria-label="Room features">
      <div className="vd-container split">
        <Reveal className="split__media">
          <ParallaxImage
            src={IMG.roomFeature}
            alt="Guest suite interior with warm lamplight, linen bedding and mountain window"
          />
          <p className="vd-caption" style={{ marginTop: "0.9rem" }}>
            Fig. 02 — Himalayan Suite, west wing
          </p>
        </Reveal>

        <div className="split__body">
          <Reveal y={14}>
            <span className="vd-label">Your Private Retreat</span>
          </Reveal>
          <h2 className="vd-h2">
            <RevealLine>Designed for</RevealLine>
            <RevealLine delay={0.08}>quiet moments.</RevealLine>
          </h2>
          <Reveal delay={0.14}>
            <p className="vd-body">
              Every room is built from materials found within a hundred kilometres
              of the estate — cedar, river stone, hand-loomed wool. Nothing shouts.
              Everything is placed for comfort at the end of a long walk.
            </p>
          </Reveal>

          <Reveal delay={0.2} className="amenity-grid">
            {roomAmenities.map((a) => (
              <div className="amenity" key={a}>
                <Check size={14} strokeWidth={1.4} />
                {a}
              </div>
            ))}
          </Reveal>

          <Reveal delay={0.26}>
            <button className="btn btn--ghost" onClick={() => scrollToSection("stay")}>
              <span>Explore Your Stay</span>
              <ArrowRight className="btn-arrow" size={15} strokeWidth={1.3} />
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
