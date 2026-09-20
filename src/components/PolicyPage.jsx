import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, X } from "lucide-react";

export default function PolicyPage({ policy, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    const prevFocus = document.activeElement;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      prevFocus?.focus?.();
    };
    // mount/unmount only — onClose closes via a stable state setter
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      className="policy-page"
      role="dialog"
      aria-modal="true"
      aria-label={policy.title}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="policy-page__bar">
        <button className="lb-btn" onClick={onClose} aria-label={`Back to site from ${policy.title}`}>
          <ArrowLeft size={17} strokeWidth={1.2} />
        </button>
        <span>Verdara · {policy.title}</span>
        <button ref={closeRef} className="lb-btn" onClick={onClose} aria-label="Close policy page">
          <X size={17} strokeWidth={1.2} />
        </button>
      </div>

      <div className="policy-page__scroll">
        <motion.article
          className="policy-doc"
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="vd-label">Verdara Mountain Resort</span>
          <h1>{policy.title}</h1>
          <p className="policy-doc__updated">{policy.updated} · Darjeeling, West Bengal</p>
          <p className="policy-doc__intro">{policy.intro}</p>

          {policy.sections.map((s, i) => (
            <section key={s.heading}>
              <h2>
                <span className="policy-num">{String(i + 1).padStart(2, "0")}</span>
                {s.heading}
              </h2>
              {s.paragraphs.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
              {s.list && (
                <ul>
                  {s.list.map((li) => (
                    <li key={li.slice(0, 24)}>{li}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          <div className="policy-doc__foot">
            <div>
              <p className="vd-caption" style={{ marginBottom: "0.4rem" }}>
                Questions?
              </p>
              <p style={{ fontSize: "0.95rem" }}>Our reservations team is happy to help.</p>
            </div>
            <div style={{ display: "grid", gap: "0.35rem" }}>
              <a href="mailto:stay@verdararesort.com" className="link-line">
                stay@verdararesort.com
              </a>
              <a href="tel:+913540000000" className="link-line">
                +91 354 000 0000
              </a>
            </div>
          </div>
        </motion.article>
      </div>
    </motion.div>
  );
}
