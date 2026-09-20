import { ArrowRight, MapPin } from "lucide-react";
import { nearby, travel } from "../data/offers";
import Reveal, { RevealLine } from "./Reveal";

export default function LocationSection() {
  return (
    <section className="vd-section vd-ivory" id="location" aria-label="Location">
      <div className="vd-container loc-grid">
        <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem", alignItems: "flex-start" }}>
          <Reveal y={14}>
            <span className="vd-label">Location · Section 08</span>
          </Reveal>
          <h2 className="vd-h2">
            <RevealLine>Find your way</RevealLine>
            <RevealLine delay={0.08}>to the mountains.</RevealLine>
          </h2>
          <Reveal delay={0.14}>
            <p className="vd-body">
              Verdara sits on a quiet ridge above Darjeeling, West Bengal —
              twenty minutes from the Mall, and a world away from it.
            </p>
          </Reveal>

          <Reveal delay={0.18} as="div" style={{ width: "100%" }}>
            <p className="vd-caption" style={{ marginBottom: "0.75rem" }}>
              Nearby
            </p>
            <ul className="near-list">
              {nearby.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.22} as="div" style={{ width: "100%" }}>
            <div className="travel-list">
              {travel.map((t) => (
                <div className="travel-row" key={t.label}>
                  <span className="vd-caption">{t.label}</span>
                  <span style={{ fontSize: "0.92rem" }}>{t.value}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.26}>
            <a
              className="btn"
              href="https://www.google.com/maps/search/?api=1&query=Darjeeling%2C%20West%20Bengal%2C%20India"
              target="_blank"
              rel="noreferrer noopener"
            >
              <span>Get Directions</span>
              <ArrowRight className="btn-arrow" size={15} strokeWidth={1.3} />
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="map-frame">
            <iframe
              className="map-frame__embed"
              title="Map showing Verdara Mountain Resort in Darjeeling"
              src="https://www.openstreetmap.org/export/embed.html?bbox=88.2063%2C27.0010%2C88.3263%2C27.0810&layer=mapnik&marker=27.0410%2C88.2663"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="map-frame__place">
              <span className="map-frame__pin" aria-hidden="true">
                <MapPin size={16} strokeWidth={1.5} />
              </span>
              <span>
                <strong>Verdara Mountain Resort</strong>
                <small>Darjeeling, West Bengal</small>
              </span>
            </div>
            <span className="vd-caption map-frame__coords">
              27.0410° N · 88.2663° E
            </span>
          </div>
          <p className="map-frame__hint">
            Drag to explore the area or use the button for turn-by-turn directions.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
