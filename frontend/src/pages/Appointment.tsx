import { useEffect } from "react";

const WHATSAPP_URL =
  `https://wa.me/971503002504?text=${encodeURIComponent(
    "Hello Sparkling Smile Dental Clinic, I would like to book an appointment. Please let me know how I can proceed."
  )}`;

function Appointment() {
  useEffect(() => {
    window.location.replace(WHATSAPP_URL);
  }, []);

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        textAlign: "center",
        background: "#EDF5FC",
        color: "#0B1F3A",
      }}
    >
      <h1>Contact us on WhatsApp</h1>

      <p>
        Redirecting you to Sparkling Smile Dental Clinic
        to arrange your appointment.
      </p>

      <a
        href={WHATSAPP_URL}
        style={{
          display: "inline-block",
          marginTop: "16px",
          padding: "14px 24px",
          borderRadius: "10px",
          background: "#0B1F3A",
          color: "#FFFFFF",
          textDecoration: "none",
          fontWeight: 600,
        }}
      >
        Continue to WhatsApp
      </a>
    </main>
  );
}

export default Appointment;