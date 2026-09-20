import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";

export default function RoomCard({ room, index, onView, onBook }) {
  return (
    <Reveal delay={(index % 2) * 0.12}>
      <article className="room">
      <div className="vd-media room__media">
        <img src={room.image} alt={`${room.name} at Verdara Mountain Resort`} loading="lazy" />
        <span className="room__index">0{index + 1}</span>
        <span className="room__price-tag">
          From {room.price} <span style={{ color: "var(--stone)" }}>/ night</span>
        </span>
      </div>

      <div className="room__head">
        <h3 className="room__name">{room.name}</h3>
        <span className="vd-caption">{room.view}</span>
      </div>

      <div className="room__meta">
        <span>{room.size}</span>
        <span>{room.guests}</span>
        <span>{room.view}</span>
      </div>

      <p className="room__desc">{room.desc}</p>

      <div className="room__actions">
        <button className="room__link" onClick={() => onView(room)}>
          View Room
          <ArrowRight size={14} strokeWidth={1.3} />
        </button>
        <button className="room__book" onClick={() => onBook(room)}>
          Book Now
        </button>
      </div>
      </article>
    </Reveal>
  );
}
