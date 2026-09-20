import { useRef } from "react";
import { ArrowUpRight, ArrowLeft, ArrowRight } from "lucide-react";
import { experiences } from "../data/experiences";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

function ExperienceCard({ item, index }) {
    return (
        <Reveal as="div" delay={(index % 4) * 0.07} amount={0.15} className="exp-card-wrap" >
        <article className="exp-card" tabIndex={0}>
        <div className="vd-media">
            <img src={item.image} alt={item.title} loading="lazy" />
        </div>

        <div className="exp-card__top">
        <h3 className="exp-card__title">{item.title}</h3>
        <span className="exp-card__arrow">
            <ArrowUpRight size={16} strokeWidth={1.2} />
        </span>
        </div>

            <p className="exp-card__desc">{item.desc}</p>
            <span className="exp-card__duration">{item.duration}</span>
        </article>
        </Reveal>
    );
}

export default function ExperiencesSection() {
    const railRef = useRef(null);

    const scrollBy = (dir) => {
    const rail = railRef.current;
    if (!rail) return;
        rail.scrollBy({ left: dir * rail.clientWidth * 0.6, behavior: "smooth" });
    };

    return (
        <section className="vd-section vd-dark" id="experiences" aria-label="Experiences">
        <div className="vd-container">
        <SectionHeading label="Experiences" title={"The mountain\nis your playground."} aside="Days shaped by nature, culture and discovery — arranged privately by our guest experience team." >
        <div style={{ display: "flex", gap: "0.6rem", marginTop: "1.5rem" }}>
        <button className="lb-btn" onClick={() => scrollBy(-1)} aria-label="Previous experiences" >
            <ArrowLeft size={17} strokeWidth={1.2} />
        </button>

        <button className="lb-btn" onClick={() => scrollBy(1)} aria-label="Next experiences" >
            <ArrowRight size={17} strokeWidth={1.2} />
        </button>
        </div>
        </SectionHeading>
        </div>

        <div className="vd-container">
        <div className="exp-rail" ref={railRef}>
        {experiences.map((item, i) => (
            <ExperienceCard key={item.title} item={item} index={i} />
        ))}
        </div>
        <p className="vd-caption" style={{ color: "rgba(245,241,232,0.45)" }}> Drag or scroll horizontally — {experiences.length} curated experiences </p>
        </div>
        </section>
     );
}
