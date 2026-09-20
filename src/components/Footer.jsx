import { ArrowRight } from "lucide-react";
import { navItems, scrollToSection } from "../data/nav";
import { socialLinks } from "./SocialIcons";
import Reveal from "./Reveal";

const info = [
    { label: "FAQ", target: "faq" },
    { label: "Cancellation Policy", policy: "cancellation" },
    { label: "Privacy Policy", policy: "privacy" },
    { label: "Terms & Conditions", policy: "terms" },
];

export default function Footer({ onOpenPolicy }) {
    return (
    <footer className="vd-footer">
    <div className="vd-container">
    <div className="foot-top">
        <Reveal className="foot-brand" amount={0.1}>
        <p className="foot-brand__mark">Verdara</p>
        <p className="foot-brand__tag">Where the mountains become home.</p>
        <button className="btn btn--ghost-light" style={{ marginTop: "2rem" }} onClick={() => scrollToSection("booking")} >
            <span>Book Your Stay</span>
            <ArrowRight className="btn-arrow" size={15} strokeWidth={1.3} />
        </button>
        </Reveal>

        <Reveal delay={0.1} amount={0.1}>
        <div className="foot-cols">
            <nav className="foot-col" aria-label="Footer">
            <h4>Explore</h4>
            <ul>
                {navItems.map((n) => (
                <li key={n.id}>
                    <button onClick={() => scrollToSection(n.id)}>{n.label}</button>
                </li>
                ))}
            </ul>
            </nav>

            <div className="foot-col">
            <h4>Information</h4>
            <ul>
                {info.map((i) => (
                <li key={i.label}>
                    <button
                    onClick={() =>
                        i.policy
                        ? onOpenPolicy?.(i.policy)
                        : scrollToSection(i.target)
                    }
                    >
                    {i.label}
                    </button>
                </li>
                ))}
            </ul>
            </div>

            <div className="foot-col">
            <h4>Contact</h4>
            <ul>
                <li><a href="tel:+913540000000">+91 354 000 0000</a></li>
                <li><a href="mailto:stay@verdararesort.com">stay@verdararesort.com</a></li>
                <li><button onClick={() => scrollToSection("booking")}>Darjeeling, West Bengal</button></li>
            </ul>
            
            <div className="socials" style={{ marginTop: "1.5rem" }}>
                {socialLinks.map(({ label, href, Icon }) => (
                    <a key={label} href={href} aria-label={label}><Icon /></a>
                ))}
            </div>
            </div>
        </div>
        </Reveal>
    </div>

    <div className="foot-bottom">
        <span>© 2026 Verdara Mountain Resort</span>
        <span>Darjeeling · West Bengal · India</span>
        <span>Crafted for quiet travellers</span>
    </div>
    </div>
    </footer>
  );
}
