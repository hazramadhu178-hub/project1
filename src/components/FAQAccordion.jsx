import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { faqs } from "../data/faq";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function FAQAccordion() {
const [open, setOpen] = useState(0);

    return (
        <section className="vd-section vd-cream" id="faq" aria-label="Frequently asked questions">
        <div className="vd-container">
        <SectionHeading label="Good to Know" title={"Before you\narrive."} aside="Everything practical, answered plainly. Our reservations team is always available for anything else." />

        <div className="faq">
        {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
            <Reveal key={f.q} delay={Math.min(i, 4) * 0.04} amount={0.1}>
            <div className={`faq__item ${isOpen ? "is-open" : ""}`}>
                <h3 style={{ margin: 0 }}>
                <button className="faq__btn" onClick={() => setOpen(isOpen ? -1 : i)} aria-expanded={isOpen} aria-controls={`faq-panel-${i}`} id={`faq-btn-${i}`} >
                    <span className="vd-num" style={{ minWidth: "2.2rem" }}>
                    0{i + 1}
                    </span>
                    {f.q}
                    <span className="faq__icon" aria-hidden="true" />
                </button>
                </h3>
                
                <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div className="faq__panel" id={`faq-panel-${i}`} role="region" aria-labelledby={`faq-btn-${i}`} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }} >
                    <p style={{ paddingLeft: "clamp(0rem, 5vw, 3.7rem)" }}>
                        {f.a}
                    </p>
                    </motion.div>
                )}
                </AnimatePresence>
            </div>
            </Reveal>
        );
        })}
        </div>
        </div>
        </section>
    );
}
