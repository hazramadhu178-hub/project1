import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ArrowRight } from "lucide-react";
import { rooms } from "../data/rooms";
import { scrollToSection } from "../data/nav";
import SectionHeading from "./SectionHeading";
import RoomCard from "./RoomCard";

function RoomDialog({ room, onClose, onBook }) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
    // mount/unmount only — onClose closes via a stable state setter
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      className="room-dialog"
      role="dialog"
      aria-modal="true"
      aria-label={room.name}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      onClick={onClose}
    >
      <motion.div
        className="room-dialog__panel"
        initial={{ y: 28, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="room-dialog__close" onClick={onClose} aria-label="Close">
          <X size={20} strokeWidth={1.2} />
        </button>
        <div className="vd-media">
          <img src={room.image} alt={`${room.name} interior`} />
        </div>
        <div className="room-dialog__body">
          <span className="vd-label">{room.view}</span>
          <h3 className="vd-h3">{room.name}</h3>
          <p className="vd-body" style={{ fontSize: "0.95rem" }}>
            {room.long}
          </p>
          <div className="room__meta">
            <span>{room.size}</span>
            <span>{room.guests}</span>
            <span>From {room.price} / night</span>
          </div>
          <ul className="room-dialog__features">
            {room.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <button className="btn" onClick={() => onBook(room)}>
            <span>Book This Room</span>
            <ArrowRight className="btn-arrow" size={15} strokeWidth={1.3} />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function StaySection({ onBookRoom }) {
  const [selected, setSelected] = useState(null);

  const book = (room) => {
    setSelected(null);
    onBookRoom?.(room.name);
    requestAnimationFrame(() => scrollToSection("booking"));
  };

  return (
    <section className="vd-section vd-ivory" id="stay" aria-label="Rooms and suites">
      <div className="vd-container">
        <SectionHeading
          label="Accommodation"
          number="Section 02"
          title={"Stay a little\nlonger."}
          aside="Rooms and suites designed around the landscape — each one placed to catch a particular hour of mountain light."
        />
        <div className="rooms-grid">
          {rooms.map((room, i) => (
            <RoomCard
              key={room.id}
              room={room}
              index={i}
              onView={setSelected}
              onBook={book}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <RoomDialog
            room={selected}
            onClose={() => setSelected(null)}
            onBook={book}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
