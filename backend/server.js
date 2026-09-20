import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

dotenv.config({
  override: true,
  path: fileURLToPath(new URL("./.env", import.meta.url)),
});

const app = express();
const PORT = Number(process.env.PORT) || 5001;

app.use(express.json());

app.post("/api/reservations", async (req, res) => {
  const {
    name,
    email,
    phone,
    room,
    checkIn,
    checkOut,
    adults,
    children,
    requests,
  } = req.body || {};

  if (!name || !email || !phone || !checkIn || !checkOut) {
    return res.status(400).json({ message: "Name, email, phone, check-in and check-out are required." });
  }

  const isEmailConfigured = Boolean(process.env.EMAIL_USER && process.env.EMAIL_PASS && process.env.EMAIL_TO);

  if (!isEmailConfigured && process.env.NODE_ENV !== "production") {
    console.warn("Reservation email is not configured; accepting request in local development mode.");
    return res.status(200).json({
      message: "Reservation request received. Email delivery is disabled in local development mode.",
      devMode: true,
    });
  }

  if (!isEmailConfigured) {
    return res.status(500).json({
      message: "Reservation email is not configured. Add EMAIL_USER, EMAIL_PASS and EMAIL_TO in your .env file.",
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      replyTo: email,
      subject: `Reservation enquiry for ${room || "Mountain stay"}`,
      html: `
        <div style="margin:0;padding:32px 16px;background-color:#f4f7f6;font-family:Arial,Helvetica,sans-serif;color:#263634;">
          <div style="max-width:640px;margin:0 auto;background-color:#ffffff;border:1px solid #dce7e3;border-radius:12px;overflow:hidden;">
            <div style="padding:28px 32px;background-color:#1f5147;color:#ffffff;">
              <p style="margin:0 0 8px;font-size:12px;line-height:1.4;letter-spacing:1.5px;text-transform:uppercase;color:#c7e2d8;">Mountain Resort</p>
              <h2 style="margin:0;font-size:26px;line-height:1.25;font-weight:600;">New Reservation Enquiry</h2>
              <p style="margin:10px 0 0;font-size:14px;line-height:1.5;color:#e5f2ed;">A new guest has submitted a reservation request.</p>
            </div>
            <div style="padding:28px 32px;">
              <h3 style="margin:0 0 16px;font-size:16px;line-height:1.4;color:#1f5147;">Guest details</h3>
              <table role="presentation" style="width:100%;border-collapse:collapse;font-size:15px;line-height:1.5;">
                <tr>
                  <td style="width:34%;padding:10px 12px 10px 0;border-bottom:1px solid #edf1f0;color:#687773;font-weight:600;">Name</td>
                  <td style="padding:10px 0;border-bottom:1px solid #edf1f0;color:#263634;">${name}</td>
                </tr>
                <tr>
                  <td style="padding:10px 12px 10px 0;border-bottom:1px solid #edf1f0;color:#687773;font-weight:600;">Email</td>
                  <td style="padding:10px 0;border-bottom:1px solid #edf1f0;color:#263634;">${email}</td>
                </tr>
                <tr>
                  <td style="padding:10px 12px 10px 0;border-bottom:1px solid #edf1f0;color:#687773;font-weight:600;">Phone</td>
                  <td style="padding:10px 0;border-bottom:1px solid #edf1f0;color:#263634;">${phone}</td>
                </tr>
              </table>

              <h3 style="margin:28px 0 16px;font-size:16px;line-height:1.4;color:#1f5147;">Stay details</h3>
              <table role="presentation" style="width:100%;border-collapse:collapse;font-size:15px;line-height:1.5;">
                <tr>
                  <td style="width:34%;padding:10px 12px 10px 0;border-bottom:1px solid #edf1f0;color:#687773;font-weight:600;">Room</td>
                  <td style="padding:10px 0;border-bottom:1px solid #edf1f0;color:#263634;">${room || "Not specified"}</td>
                </tr>
                <tr>
                  <td style="padding:10px 12px 10px 0;border-bottom:1px solid #edf1f0;color:#687773;font-weight:600;">Check-in</td>
                  <td style="padding:10px 0;border-bottom:1px solid #edf1f0;color:#263634;">${checkIn}</td>
                </tr>
                <tr>
                  <td style="padding:10px 12px 10px 0;border-bottom:1px solid #edf1f0;color:#687773;font-weight:600;">Check-out</td>
                  <td style="padding:10px 0;border-bottom:1px solid #edf1f0;color:#263634;">${checkOut}</td>
                </tr>
                <tr>
                  <td style="padding:10px 12px 10px 0;color:#687773;font-weight:600;">Guests</td>
                  <td style="padding:10px 0;color:#263634;">${Number(adults || 0) + Number(children || 0)}</td>
                </tr>
              </table>

              <div style="margin-top:28px;padding:18px 20px;background-color:#f4f7f6;border-left:4px solid #c58a45;border-radius:4px;">
                <p style="margin:0 0 6px;font-size:14px;font-weight:600;color:#687773;">Special requests</p>
                <p style="margin:0;font-size:15px;line-height:1.6;color:#263634;white-space:pre-line;">${requests || "None"}</p>
              </div>
            </div>
            <div style="padding:18px 32px;border-top:1px solid #edf1f0;text-align:center;">
              <p style="margin:0;font-size:12px;line-height:1.5;color:#87938f;">Please reply to this email to contact the guest directly.</p>
            </div>
          </div>
        </div>
      `,
    });

    return res.status(200).json({ message: "Reservation request sent successfully." });
  } catch (error) {
    console.error("Reservation email failed:", error);
    return res.status(500).json({ message: "Something went wrong while sending your reservation request." });
  }
});

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Reservation server running on http://localhost:${PORT}`);
});
