import { ArrowRight } from "lucide-react";
import { offers } from "../data/offers";
import { scrollToSection } from "../data/nav";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function OffersSection() {
  return (
    <section className="vd-section vd-cream" id="offers" aria-label="Special offers">
      <div className="vd-container">
        <SectionHeading
          label="Offers"
          number="Section 07"
          title={"Make your escape\na little longer."}
          aside="A handful of seasonal arrangements, each designed to add one more unhurried day to your stay."
        />

        <div className="offers-grid">
          {offers.map((o, i) => (
            <Reveal key={o.title} delay={i * 0.1}>
              <article className="offer">
              <div className="offer__meta">
                <span className="vd-caption">0{i + 1}</span>
                <span className="vd-caption">{o.meta}</span>
              </div>
              <div className="vd-media">
                <img src={o.image} alt={o.title} loading="lazy" />
              </div>
              <h3 className="vd-h3">{o.title}</h3>
              <p className="vd-body" style={{ fontSize: "0.92rem" }}>
                {o.desc}
              </p>
              <button
                className="link-line"
                style={{ alignSelf: "flex-start", background: "none", color: "inherit" }}
                onClick={() => scrollToSection("booking")}
              >
                View Offer
                <ArrowRight size={14} strokeWidth={1.3} />
              </button>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
