import Reveal from "./Reveal";

export default function SectionHeading({
  label,
  number,
  title,
  aside,
  children,
  align = "end",
}) {
  return (
    <div className="sec-head" style={{ alignItems: align }}>
      <div className="sec-head__meta">
        <Reveal y={16}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1.5rem",
              flexWrap: "wrap",
            }}
          >
            {label ? <span className="vd-label">{label}</span> : <span />}
            {number ? <span className="vd-num">{number}</span> : null}
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="vd-h2" style={{ whiteSpace: "pre-line" }}>
            {title}
          </h2>
        </Reveal>
      </div>
      {(aside || children) && (
        <Reveal delay={0.16} className="sec-head__aside">
          {aside ? <p className="vd-body">{aside}</p> : null}
          {children}
        </Reveal>
      )}
    </div>
  );
}
