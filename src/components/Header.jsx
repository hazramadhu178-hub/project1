import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { navItems, scrollToSection } from "../data/nav";
import MobileMenu from "./MobileMenu";

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState("home");

useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
}, []);

useEffect(() => {
    const ids = navItems.map((n) => n.id);
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) setActive(entry.target.id);
            });
        },
        { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    ids.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
    });
        return () => observer.disconnect();
}, []);

const go = (id) => {
    setOpen(false);
    requestAnimationFrame(() => scrollToSection(id));
};

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

    return (
    <>
        <header className={`vd-header ${scrolled ? "is-scrolled" : ""}`}>
        <div className="vd-container vd-header__inner">
        <a href="#home" className="vd-logo" onClick={(e) => { e.preventDefault(); go("home"); }} aria-label="Verdara Mountain Resort — home" >
            <span className="vd-logo__mark">Verdara</span>
            <span className="vd-logo__sub">Mountain Resort</span>
        </a>

        <nav className="vd-nav" aria-label="Primary">
        {navItems.map((item) => (
            <button key={item.id} className={`vd-nav__item ${active === item.id ? "is-active" : ""}`} onClick={() => go(item.id)} aria-current={active === item.id ? "true" : undefined} >
                {item.label}
            </button>
        ))}
        </nav>

        <div className="vd-header__cta">
        <button className="btn btn--sm btn--light" onClick={() => go("booking")}>
            <span>Book Your Stay</span>
            <ArrowRight className="btn-arrow" size={14} strokeWidth={1.3} />
        </button>
        </div>

        <button className="vd-burger" onClick={() => setOpen(true)} aria-label="Open menu" aria-expanded={open} >
        <span />
        <span />
        </button>
        </div>
        </header>

    <AnimatePresence>
    {open && (
        <MobileMenu onClose={() => setOpen(false)} onNavigate={go} active={active} />
    )}
    </AnimatePresence>
    </>
  );
}
