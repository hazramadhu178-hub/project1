import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Reveal, { RevealLine } from "./Reveal";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState("idle");

  const submit = (e) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      setState("error");
      return;
    }
    setState("done");
  };

  return (
    <section className="vd-section vd-ivory" aria-label="Newsletter">
      <div className="vd-container news-grid">
        <div>
          <Reveal y={14}>
            <span className="vd-label">Journal</span>
          </Reveal>
          <h2 className="vd-h2" style={{ marginTop: "1.25rem" }}>
            <RevealLine>Stories from</RevealLine>
            <RevealLine delay={0.08}>the mountains.</RevealLine>
          </h2>
        </div>

        <Reveal delay={0.14}>
          <p className="vd-body" style={{ marginBottom: "2rem" }}>
            Occasional notes from Verdara — new experiences, seasonal escapes and
            stories from Darjeeling.
          </p>

          <AnimatePresence mode="wait">
            {state === "done" ? (
              <motion.p
                key="ok"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="vd-caption"
                style={{ color: "var(--gold)" }}
                role="status"
              >
                Thank you — you're on the list.
              </motion.p>
            ) : (
              <motion.form
                key="form"
                className="news-form"
                onSubmit={submit}
                noValidate
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <label htmlFor="news-email" className="sr-only vd-caption">
                  Your email address
                </label>
                <input
                  id="news-email"
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setState("idle");
                  }}
                  aria-invalid={state === "error"}
                />
                <button className="btn btn--sm" type="submit">
                  <span>Subscribe</span>
                  <ArrowRight className="btn-arrow" size={14} strokeWidth={1.3} />
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          {state === "error" && (
            <p className="vd-caption" style={{ color: "#a15757", marginTop: "0.75rem" }}>
              Please enter a valid email address.
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
