import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowLeft, ArrowRight } from "lucide-react";

export default function Lightbox({ items, index, onClose, onPrev, onNext }) {
  const item = items[index];

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.classList.add("lightbox-open");
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.body.classList.remove("lightbox-open");
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, onPrev, onNext]);

  if (!item) return null;

return (
    <motion.div className="lightbox" role="dialog" aria-modal="true" aria-label="Gallery viewer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} >
    <div className="lightbox__bar">
    <span>Verdara · Gallery</span>
    <span>
        {String(index + 1).padStart(2, "0")} /{" "}
        {String(items.length).padStart(2, "0")}
    </span>
    <button className="lb-btn" onClick={onClose} aria-label="Close gallery">
        <X size={18} strokeWidth={1.2} />
    </button>
    </div>

    <div className="lightbox__stage">
    <AnimatePresence mode="wait">
        <motion.img key={item.id} src={item.full} alt={item.alt} initial={{ opacity: 0, scale: 1.02 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }} />
    </AnimatePresence>
    </div>

    <p className="lightbox__meta">
        {item.cat} — {item.alt}
    </p>

    <div className="lightbox__nav">
    <button className="lb-btn" onClick={onPrev} aria-label="Previous image">
        <ArrowLeft size={18} strokeWidth={1.2} />
    </button>
    <button className="lb-btn" onClick={onNext} aria-label="Next image">
        <ArrowRight size={18} strokeWidth={1.2} />
    </button>
    </div>
    </motion.div>
  );
}
