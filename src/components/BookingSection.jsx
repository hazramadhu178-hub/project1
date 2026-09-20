import { Phone, Mail, MapPin, Clock } from "lucide-react";
import Reveal, { RevealLine } from "./Reveal";
import BookingForm from "./BookingForm";
import { socialLinks } from "./SocialIcons";

export default function BookingSection({ presetRoom }) {
    return (
        <section className="vd-section vd-dark" id="booking" aria-label="Booking and contact">
        <div className="vd-container" id="contact">
        <div className="sec-head">
        <div className="sec-head__meta">
        <Reveal y={14}><span className="vd-label">Reservations · Section 10</span></Reveal>
        <h2 className="vd-h2">
            <RevealLine>Your mountain</RevealLine>
            <RevealLine delay={0.08}>escape starts here.</RevealLine>
        </h2>
        </div>
        
        <Reveal delay={0.14} className="sec-head__aside">
        <p className="vd-body" style={{ color: "rgba(245,241,232,0.75)" }}>
            Share a few details and our reservations team will reply within
            twenty-four hours with availability and a tailored proposal.
        </p>
        </Reveal>
        </div>

        <div className="book-grid">
        <Reveal amount={0.1} className="book-panel"><BookingForm presetRoom={presetRoom} /></Reveal>
        <Reveal delay={0.12} amount={0.1}>
        <div className="contact-list">
        <div className="contact-item">
        <span>Address</span>
        <p style={{ fontSize: "0.92rem", lineHeight: 1.7 }}>
            Verdara Mountain Resort
            <br />
            Upper Ridge Road, Darjeeling
            <br />
            West Bengal 734101, India
        </p>
        </div>

        <div className="contact-item">
        <span>Phone</span>
        <a href="tel:+913540000000" style={{ fontSize: "0.92rem", display: "inline-flex", gap: "0.6rem", alignItems: "center" }} >
            <Phone size={14} strokeWidth={1.3} /> +91 354 000 0000
        </a>
        </div>

        <div className="contact-item">
        <span>Email</span>
        <a href="mailto:stay@verdararesort.com" style={{ fontSize: "0.92rem", display: "inline-flex", gap: "0.6rem", alignItems: "center" }} >
            <Mail size={14} strokeWidth={1.3} /> stay@verdararesort.com
        </a>
        </div>

        <div className="contact-item">
        <span>Check-in / Check-out</span>
        <p style={{ fontSize: "0.92rem", display: "inline-flex", gap: "0.6rem", alignItems: "center" }}>
            <Clock size={14} strokeWidth={1.3} /> 2:00 PM / 11:00 AM
        </p>
        </div>

        <div className="contact-item">
        <span>Location</span>
        <p style={{ fontSize: "0.92rem", display: "inline-flex", gap: "0.6rem", alignItems: "center" }}>
            <MapPin size={14} strokeWidth={1.3} /> Darjeeling, West Bengal, India
        </p>
        </div>

        <div className="contact-item">
        <span>Follow</span>
        <div className="socials" style={{ marginTop: "0.5rem" }}>
        {socialLinks.map(({ label, href, Icon }) => (
            <a key={label} href={href} aria-label={label}><Icon /></a>
        ))}
        </div>
        </div>
        </div>
        </Reveal>
        </div>
        </div>
        </section>
    );
}
