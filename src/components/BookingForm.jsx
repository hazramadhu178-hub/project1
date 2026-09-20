import { useEffect, useMemo, useState } from "react";
import { Check } from "lucide-react";
import { rooms } from "../data/rooms";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function getToday() {
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  return local.toISOString().split("T")[0];
}


function createEmptyForm() {
    return {
        name: "",
        email: "",
        phone: "",
        checkIn: "",
        checkOut: "",
        adults: "2",
        children: "0",
        room: rooms[0].name,
        requests: "",
    };
}

export default function BookingForm({ presetRoom }) {
const [form, setForm] = useState(createEmptyForm);
const [error, setError] = useState("");
const [success, setSuccess] = useState(false);
const [loading, setLoading] = useState(false);

const today = useMemo(getToday, []);

useEffect(() => {
if (presetRoom) {
    setForm((oldForm) => ({
    ...oldForm,
    room: presetRoom,
    }));
}
  }, [presetRoom]);

function handleChange(e) {
const { name, value } = e.target;

setForm((oldForm) => ({
    ...oldForm,
    [name]: value,
}));
}

function validateForm(){
    if (form.name.trim().length < 2) {
        return "Please enter your full name.";
    }

    if (!EMAIL_PATTERN.test(form.email.trim())) {
        return "Please enter a valid email.";
    }

    if (form.phone.trim().length < 8) {
        return "Please enter a valid phone number.";
    }

    if (!form.checkIn) {
        return "Please select a check-in date.";
    }

    if (!form.checkOut) {
        return "Please select a check-out date.";
    }

    if (form.checkIn < today) {
        return "Check-in cannot be in the past.";
    }

    if (new Date(form.checkOut) <= new Date(form.checkIn)) {
        return "Check-out must be after check-in.";
    }

    if (Number(form.adults) < 1) {
        return "At least one adult is required.";
    }

    const totalGuests =
        Number(form.adults) + Number(form.children);

    if (totalGuests > 6) {
        return "For more than 6 guests, please contact us directly.";
    }

    return "";
}

async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setSuccess(false);

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
        const response = await fetch("/api/reservations", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        });

      const data = await response.json();

    if (!response.ok) {
        throw new Error(
        data.message || "Something went wrong."
        );
    }

    setSuccess(true);

    setForm(createEmptyForm());
    }catch (err) {
        setError(err.message);
    }finally {
        setLoading(false);
    }
}

if (success) {
    return (
        <div className="book-success" role="status">
        <span className="book-success__mark">
            <Check size={22} strokeWidth={1.3} />
        </span>
        <p className="vd-body" style={{ color: "rgba(245, 241, 232, 0.85)" }}>
            Thank you! Your enquiry has been sent successfully.
        </p>
        <button type="button" className="btn btn--sm btn--ghost-light" onClick={() => setSuccess(false)}>
            <span>Send another enquiry</span>
        </button>
        </div>
    );
}

  return (
    <form className="form-grid" onSubmit={handleSubmit} noValidate>

    <div className="field field--half">
        <label htmlFor="booking-name">Full Name</label>
        <input id="booking-name" type="text" name="name" placeholder="Your name" autoComplete="name" value={form.name} onChange={handleChange} require />
    </div>

    <div className="field field--half">
        <label htmlFor="booking-email">Email</label>
        <input id="booking-email" type="email" name="email" placeholder="you@email.com" autoComplete="email" value={form.email} onChange={handleChange} required />
    </div>

    <div className="field field--half">
        <label htmlFor="booking-phone">Phone</label>
        <input id="booking-phone" type="tel" name="phone" placeholder="+91 00000 00000" autoComplete="tel" value={form.phone} onChange={handleChange} required />
    </div>

    <div className="field field--half">
    <label htmlFor="booking-room">Room</label>
    <select id="booking-room" name="room" value={form.room} onChange={handleChange} >
        {rooms.map((room) => (
        <option key={room.id} value={room.name}>
            {room.name}
        </option>
        ))}
    </select>
    </div>

    <div className="field field--half">
        <label htmlFor="booking-checkin">Check-in</label>
        <input id="booking-checkin" type="date" name="checkIn" min={today} value={form.checkIn} onChange={handleChange} required />
    </div>

    <div className="field field--half">
        <label htmlFor="booking-checkout">Check-out</label>
        <input id="booking-checkout" type="date" name="checkOut" min={form.checkIn || today} value={form.checkOut} onChange={handleChange} required />
    </div>

    <div className="field field--half">
    <label htmlFor="booking-adults">Adults</label>
    <select id="booking-adults" name="adults" value={form.adults} onChange={handleChange} >
        {[1, 2, 3, 4, 5, 6].map((number) => (
        <option key={number} value={number}>
            {number}
        </option>
        ))}
    </select>
    </div>

    <div className="field field--half">
    <label htmlFor="booking-children">Children</label>
    <select id="booking-children" name="children" value={form.children} onChange={handleChange} >
        {[0, 1, 2, 3, 4].map((number) => (
        <option key={number} value={number}>
            {number}
        </option>
        ))}
    </select>
    </div>

    <div className="field field--full">
        <label htmlFor="booking-requests">Special Requests</label>
        <textarea id="booking-requests" name="requests" rows={3} placeholder="Special requests..." value={form.requests} onChange={handleChange} />
    </div>

    {error && (
    <p className="field__err field--full" role="alert">{error}</p>
    )}

    <div className="field--full">
    <button type="submit" className="btn" disabled={loading} aria-busy={loading} >
        <span>{loading ? "Sending..." : "Request to Book"}</span>
    </button>
    </div>
    </form>
  );
}