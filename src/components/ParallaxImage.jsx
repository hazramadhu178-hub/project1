import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

/**
 * Subtle vertical parallax + reveal for editorial imagery.
 */
export default function ParallaxImage({
  src,
  alt,
  className = "",
  distance = 42,
  scale = 1.14,
  loading = "lazy",
}) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-distance, distance]);

  return (
    <div ref={ref} className={`vd-media ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        loading={loading}
        decoding="async"
        style={
          reduce
            ? { height: "100%" }
            : { y, height: `calc(100% + ${distance * 2}px)`, scale }
        }
      />
    </div>
  );
}
