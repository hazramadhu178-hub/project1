import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import { IMG } from "../data/images";
import { scrollToSection } from "../data/nav";
import { RevealLine } from "./Reveal";

export default function Hero() {
    const ref = useRef(null);
    const reduce = useReducedMotion();
    const { scrollYProgress } = useScroll({
        target: ref,
    offset: ["start start", "end start"],
    });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  const ease = [0.22, 1, 0.36, 1];

return (
    <section className="hero" id="home" ref={ref}>
        <motion.div className="hero__media" style={reduce ? undefined : { y }}>
        <motion.img src={IMG.hero} alt="Mist drifting through Himalayan pine forest above Darjeeling at first light" fetchPriority="high" initial={reduce ? false : { scale: 1.18 }} animate={{ scale: 1 }} transition={{ duration: 8, ease: "easeOut" }} />
      </motion.div>
      <div className="hero__scrim" />
      <div className="hero__mist" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="vd-grain" aria-hidden="true" />

      <motion.div className="vd-container hero__content" style={{ opacity: fade }}>
        <motion.span className="vd-label" initial={reduce ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 1, ease }} >
          Darjeeling · West Bengal
        </motion.span>

        <h1 className="hero__title">
            <RevealLine delay={0.5}>Where the</RevealLine>
            <RevealLine delay={0.62}>Mountains</RevealLine>
            <RevealLine delay={0.74}>
            <em>become</em> Home.
            </RevealLine>
        </h1>

        <motion.p className="hero__desc" initial={reduce ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.05, duration: 1.1, ease }} >
            A secluded mountain retreat surrounded by mist, forest and the timeless
            beauty of the Himalayas.
        </motion.p>

        <motion.div className="hero__actions" initial={reduce ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 1.1, ease }} >
        <button className="btn btn--light" onClick={() => scrollToSection("welcome")}>
            <span>Explore the Resort</span>
            <ArrowRight className="btn-arrow" size={15} strokeWidth={1.3} />
        </button>
        <button className="btn btn--ghost-light" onClick={() => scrollToSection("booking")} >
            <span>Book Your Stay</span>
            <ArrowRight className="btn-arrow" size={15} strokeWidth={1.3} />
        </button>
        </motion.div>
        </motion.div>

        <motion.div className="vd-container" initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1.2 }} >
        <div className="hero__foot">
            <span>Darjeeling, India</span>
            <span aria-hidden="true" style={{ opacity: 0.4 }}>
            Est. 2016 · 24 Rooms & Suites
            </span>
        <button className="hero__scroll" onClick={() => scrollToSection("welcome")} >
                Scroll to explore
                <ArrowDown size={14} strokeWidth={1.3} />
        </button>
        </div>
        </motion.div>

      <span className="hero__side">27.0410° N · 88.2663° E</span>
    </section>
  );
}
