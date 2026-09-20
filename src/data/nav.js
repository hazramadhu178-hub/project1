export const navItems = [
  { id: "home", label: "Home" },
  { id: "stay", label: "Stay" },
  { id: "experiences", label: "Experiences" },
  { id: "dining", label: "Dining" },
  { id: "story", label: "Story" },
  { id: "gallery", label: "Gallery" },
  { id: "contact", label: "Contact" },
];

export function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const header = document.querySelector(".vd-header");
  const offset = header ? header.offsetHeight + 18 : 96;
  const top = Math.max(el.getBoundingClientRect().top + window.scrollY - offset, 0);
  window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
}
