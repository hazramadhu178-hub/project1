import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Search,
  Home,
  BedDouble,
  Compass,
  UtensilsCrossed,
  BookOpen,
  Images,
  Mail,
  ChevronDown,
  ArrowRight,
  Phone,
  Headphones,
  Sparkles,
  MapPin,
  CircleHelp,
  Mountain,
} from "lucide-react";
import { navItems } from "../data/nav";

const MAIN_ICONS = {
  home: Home,
  stay: BedDouble,
  experiences: Compass,
  dining: UtensilsCrossed,
  story: BookOpen,
  gallery: Images,
  contact: Mail,
};

const SUB_ITEMS = [
  { id: "welcome", label: "Overview", Icon: Mountain },
  { id: "offers", label: "Special Offers", Icon: Sparkles },
  { id: "location", label: "Finding Us", Icon: MapPin },
  { id: "faq", label: "Good to Know", Icon: CircleHelp },
];

export default function MobileMenu({ onClose, onNavigate, active }) {
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState(true);
  const closeRef = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
    // mount/unmount only — onClose closes via a stable state setter
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ⌘K focuses the sidebar search, like the reference design
  useEffect(() => {
    const onHotkey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onHotkey);
    return () => window.removeEventListener("keydown", onHotkey);
  }, []);

  const q = query.trim().toLowerCase();
  const matches = (label) => !q || label.toLowerCase().includes(q);
  const mainVisible = navItems.filter((n) => matches(n.label));
  const subVisible = SUB_ITEMS.filter((s) => matches(s.label));
  const searching = q.length > 0;

  const go = (id) => onNavigate(id);

  return (
    <>
      <motion.div
        className="vd-scrim"
        aria-hidden="true"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
      />
      <motion.aside
        className="vd-side"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        initial={{ x: "-104%" }}
        animate={{ x: 0 }}
        exit={{ x: "-104%" }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* head */}
        <div className="vd-side__head">
          <div className="vd-side__brand">
            <span className="vd-side__mark" aria-hidden="true">
              V
            </span>
            <span className="vd-side__name">
              Verdara
              <small>Mountain Resort</small>
            </span>
          </div>
          <button
            ref={closeRef}
            className="vd-side__close"
            onClick={onClose}
            aria-label="Close menu"
          >
            <X size={18} strokeWidth={1.6} />
          </button>
        </div>

        {/* search */}
        <div className="vd-side__search">
          <Search size={15} strokeWidth={1.6} aria-hidden="true" />
          <input
            ref={searchRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search stays, dining…"
            aria-label="Search sections"
          />
          <kbd aria-hidden="true">⌘K</kbd>
        </div>

        {/* nav */}
        <nav className="vd-side__nav" aria-label="Mobile and tablet">
          {!searching && <p className="vd-side__caption">Explore</p>}
          <ul className="vd-side__list">
            {mainVisible.map((item, i) => {
              const Icon = MAIN_ICONS[item.id] || Mountain;
              const isActive = active === item.id;
              return (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.12 + i * 0.04,
                    duration: 0.45,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <button
                    className={`vd-side__item${isActive ? " is-active" : ""}`}
                    onClick={() => go(item.id)}
                    aria-current={isActive ? "true" : undefined}
                  >
                    <Icon size={17} strokeWidth={1.5} aria-hidden="true" />
                    <span>{item.label}</span>
                    {item.id === "experiences" && (
                      <em className="vd-side__badge">8</em>
                    )}
                    {isActive && (
                      <span className="vd-side__dot" aria-hidden="true" />
                    )}
                  </button>
                </motion.li>
              );
            })}
          </ul>

          {searching ? (
            subVisible.length > 0 && (
              <>
                <p className="vd-side__caption">More from Verdara</p>
                <ul className="vd-side__list">
                  {subVisible.map((s) => (
                    <li key={s.id}>
                      <button
                        className={`vd-side__item${active === s.id ? " is-active" : ""}`}
                        onClick={() => go(s.id)}
                      >
                        <s.Icon size={17} strokeWidth={1.5} aria-hidden="true" />
                        <span>{s.label}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            )
          ) : (
            <>
              <button
                className="vd-side__item vd-side__group"
                onClick={() => setExpanded((v) => !v)}
                aria-expanded={expanded}
                aria-controls="vd-side-sub"
              >
                <Sparkles size={17} strokeWidth={1.5} aria-hidden="true" />
                <span>More from Verdara</span>
                <ChevronDown
                  size={15}
                  strokeWidth={1.6}
                  aria-hidden="true"
                  className={`vd-side__chev${expanded ? " is-open" : ""}`}
                />
              </button>
              <AnimatePresence initial={false}>
                {expanded && (
                  <motion.ul
                    id="vd-side-sub"
                    className="vd-side__sub"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {SUB_ITEMS.map((s) => (
                      <li key={s.id}>
                        <button
                          className={`vd-side__item vd-side__item--sub${
                            active === s.id ? " is-active" : ""
                          }`}
                          onClick={() => go(s.id)}
                          aria-current={active === s.id ? "true" : undefined}
                        >
                          <span>{s.label}</span>
                        </button>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </>
          )}

          {searching && mainVisible.length === 0 && subVisible.length === 0 && (
            <p className="vd-side__empty">
              No matches for “{query.trim()}”. Try “stay” or “dining”.
            </p>
          )}

          {/* reservations */}
          {!searching && (
            <>
              <p className="vd-side__caption">Reservations</p>
              <button
                className="vd-side__item vd-side__book"
                onClick={() => go("booking")}
              >
                <span className="vd-side__book-ic" aria-hidden="true">
                  <Phone size={15} strokeWidth={1.6} />
                </span>
                <span>Book Your Stay</span>
                <ArrowRight size={15} strokeWidth={1.6} aria-hidden="true" />
              </button>
            </>
          )}
        </nav>

        {/* support card */}
        <div className="vd-side__foot">
          <div className="vd-side__support">
            <p className="vd-side__support-title">
              <Headphones size={15} strokeWidth={1.6} aria-hidden="true" />
              Need support?
            </p>
            <p className="vd-side__support-text">
              Get in touch with our agents
            </p>
            <button
              className="vd-side__contact"
              onClick={() => go("contact")}
            >
              Contact us
            </button>
          </div>
          <p className="vd-side__locale">Darjeeling · West Bengal · India</p>
        </div>
      </motion.aside>
    </>
  );
}
