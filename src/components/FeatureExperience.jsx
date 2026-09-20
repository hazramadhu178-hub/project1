import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { IMG } from "../data/images";
import { scrollToSection } from "../data/nav";
import Reveal, { RevealLine } from "./Reveal";

export default function FeatureExperience() {
    const ref = useRef(null);
    const reduce = useReducedMotion();
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

    return (
        <section className="cinema" ref={ref} aria-label="Signature experience">
        <motion.div className="cinema__media" style={reduce ? undefined : { y }}>
            <img src={IMG.cloudSunrise} alt="Sunrise breaking above a sea of cloud over the Himalayan range" loading="lazy" />
        </motion.div>
        <div className="vd-grain" aria-hidden="true" />

        <div className="cinema__inner">
        <Reveal y={12}><span className="vd-label vd-label--plain">Signature Experience</span></Reveal>
        <h2 className="cinema__title">
            <RevealLine>Dawn above</RevealLine>
            <RevealLine delay={0.08}>the clouds</RevealLine>
        </h2>

        <Reveal delay={0.16}>
        <p className="vd-body" style={{ color: "rgba(245,241,232,0.82)", margin: "0 auto" }} >
            Begin the morning where the first light meets the Himalayas — a
            private ridge, a flask of first-flush tea and forty silent minutes
            before the valley wakes.
        </p>
        </Reveal>

        <Reveal delay={0.24}>
        <button className="btn btn--ghost-light" onClick={() => scrollToSection("experiences")} >
            <span>Discover the Experience</span>
            <ArrowRight className="btn-arrow" size={15} strokeWidth={1.3} />
        </button>
        </Reveal>
        </div>
        </section>
    );
}
