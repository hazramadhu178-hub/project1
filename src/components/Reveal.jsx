import { motion, useReducedMotion } from "framer-motion";

/**
 * Slow, elegant scroll reveal. Wraps any block of content.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 34,
  className = "",
  as = "div",
  amount = 0.25,
  style,
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] || motion.div;

  return (
    <MotionTag
      className={className}
      style={style}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{
        duration: 1.1,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </MotionTag>
  );
}

export function RevealLine({ children, delay = 0, className = "" }) {
  const reduce = useReducedMotion();
  return (
    <span style={{ display: "block", overflow: "hidden" }} className={className}>
      <motion.span
        style={{ display: "block" }}
        initial={reduce ? false : { y: "110%" }}
        whileInView={{ y: "0%" }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 1.15, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
}
