import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1];

export default function Preloader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.body.style.overflow = "hidden";
    let finish;
    const hide = () => setDone(true);
    if (document.readyState === "complete") {
      finish = window.setTimeout(hide, reduce ? 200 : 1300);
    } else {
      window.addEventListener("load", hide, { once: true });
      // safety so the loader never traps the page
      finish = window.setTimeout(hide, reduce ? 400 : 2600);
    }
    return () => {
      window.removeEventListener("load", hide);
      window.clearTimeout(finish);
    };
  }, []);

  // release the scroll lock as soon as the loader has finished
  useEffect(() => {
    if (done) document.body.style.overflow = "";
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-2%" }}
          transition={{ duration: 0.9, ease }}
          aria-hidden="false"
          role="status"
          aria-label="Verdara is loading"
        >
          <div className="preloader__inner">
            <div className="preloader__mark">
              <span className="preloader__ring" />
              <span className="preloader__leaf preloader__leaf--1" />
              <span className="preloader__leaf preloader__leaf--2" />
              <span className="preloader__leaf preloader__leaf--3" />
              <span className="preloader__leaf preloader__leaf--4" />
              <span className="preloader__leaf preloader__leaf--5" />
              <span className="preloader__leaf preloader__leaf--6" />
              <span className="preloader__leaf preloader__leaf--7" />
              <span className="preloader__leaf preloader__leaf--8" />
              <span className="preloader__core">V</span>
            </div>

            <div className="preloader__word">
              <span>Verdara</span>
              <small>Mountain Resort</small>
            </div>

            <div className="preloader__bar">
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.9, ease }}
              />
            </div>

            <p className="preloader__note">Where the mountains become home</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
