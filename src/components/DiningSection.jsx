import { ArrowRight } from "lucide-react";
import { IMG } from "../data/images";
import { dishes } from "../data/experiences";
import { scrollToSection } from "../data/nav";
import Reveal, { RevealLine } from "./Reveal";
import ParallaxImage from "./ParallaxImage";

const services = ["Breakfast", "Lunch", "Dinner", "Afternoon Tea", "Bar"];

export default function DiningSection() {
    return (
        <section className="vd-section vd-forest" id="dining" aria-label="Dining">
        <div className="vd-container split split--reverse">
        <Reveal className="split__media">
        <div className="dining__grid">
            <ParallaxImage src={IMG.diningWide} alt="The Pine Table set for an evening tasting menu" distance={26} />
        <div className="vd-media">
            <img src={IMG.diningA} alt="Seasonal mountain vegetables, plated" loading="lazy" />
        </div>
        
        <div className="vd-media">
            <img src={IMG.diningB} alt="A long table laid for dinner at the resort" loading="lazy" />
        </div>
        </div>
        </Reveal>

        <div className="split__body">
        <Reveal y={14}><span className="vd-label">The Pine Table</span></Reveal>
        <h2 className="vd-h2">
        <RevealLine>Local ingredients.</RevealLine>
        <RevealLine delay={0.08}>Mountain soul.</RevealLine>
        </h2>

        <Reveal delay={0.14}>
        <p className="vd-body">
            Our kitchen celebrates the flavours of the Eastern Himalayas,
            bringing together local produce, seasonal ingredients and
            contemporary techniques.
        </p>
        </Reveal>

        <Reveal delay={0.2} className="dining__times">
        {services.map((s) => (
            <span key={s}>{s}</span>
        ))}
        </Reveal>

        <Reveal delay={0.24} as="div" className="w-full">
        <ul className="dish-list">
            {dishes.map((d) => (
            <li key={d.name}>
                <b>{d.name}</b>
                <i>{d.note}</i>
            </li>
            ))}
        </ul>
        </Reveal>

        <Reveal delay={0.3}>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
        <button className="btn btn--light" onClick={() => scrollToSection("booking")}>
            <span>View Menu</span>
            <ArrowRight className="btn-arrow" size={15} strokeWidth={1.3} />
        </button>
        <button className="btn btn--ghost-light" onClick={() => scrollToSection("booking")} >
            <span>Reserve a Table</span>
            <ArrowRight className="btn-arrow" size={15} strokeWidth={1.3} />
        </button>
        </div>
        </Reveal>
        </div>
        </div>
        </section>
    );
}
