
import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

interface ClinicSettings {
  clinic_name: string;
  phone: string | null;
  email: string | null;
  whatsapp_number: string | null;
  address: string | null;
  slot_interval_minutes: number;
}

const defaultSettings = {
  phone: "0503002504 / 026272214",
  email: "sparklingsmiledentalclinicad@gmail.com",
  whatsapp_number: "+971503002504",
  address:
    "103, Building 159, Sector E 15, Hamdan Street, Near Bilal Mosque, Opposite Al Salama Hospital, Al Zahiyah, Abu Dhabi",
};

export default function AdminClinicSettings() {
  const navigate = useNavigate();

  const token = sessionStorage.getItem("adminToken");

  const [clinicName, setClinicName] = useState(
    "Sparkling Smile Dental Clinic"
  );

  const [settings, setSettings] = useState(defaultSettings);
  const [slotDuration, setSlotDuration] = useState(30);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
      return;
    }

    async function loadSettings() {
      try {
        const response = await fetch(
          "http://localhost:5000/api/clinic"
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(
            data.message || "Unable to load clinic information"
          );
        }

        const clinic: ClinicSettings = data.clinic;

        setClinicName(clinic.clinic_name);

        setSettings({
          phone: clinic.phone || defaultSettings.phone,
          email: clinic.email || defaultSettings.email,
          whatsapp_number:
            clinic.whatsapp_number ||
            defaultSettings.whatsapp_number,
          address: clinic.address || defaultSettings.address,
        });

        setSlotDuration(clinic.slot_interval_minutes || 30);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Unable to load clinic information"
        );
      } finally {
        setLoading(false);
      }
    }

    loadSettings();
  }, [navigate, token]);

  function updateField(
    field: keyof typeof defaultSettings,
    value: string
  ) {
    setSettings((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSuccess("");
    setSaving(true);

    if (!token) {
      navigate("/admin/login");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/admin/clinic",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(settings),
        }
      );

      const data = await response.json();

      if (response.status === 401) {
        sessionStorage.removeItem("adminToken");
        sessionStorage.removeItem("adminInfo");
        navigate("/admin/login");
        return;
      }

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to save clinic settings"
        );
      }

      setSuccess("Clinic information saved successfully.");

      const clinic: ClinicSettings = data.clinic;

      setClinicName(clinic.clinic_name);

      setSettings({
        phone: clinic.phone || "",
        email: clinic.email || "",
        whatsapp_number: clinic.whatsapp_number || "",
        address: clinic.address || "",
      });

      setSlotDuration(clinic.slot_interval_minutes || 30);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to save clinic settings"
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="admin-settings-page">
        <main className="admin-settings-main">
          <p>Loading clinic settings...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="admin-settings-page">
      <header className="admin-settings-header">
        <div>
          <h1>Sparkling Smile</h1>
          <p>Clinic Administration</p>
        </div>

        <Link
          to="/admin/dashboard"
          className="admin-settings-back"
        >
          ← Back to Dashboard
        </Link>
      </header>

      <main className="admin-settings-main">
        <div className="admin-settings-heading">
          <p className="admin-settings-label">ADMINISTRATION</p>
          <h2>Clinic Settings</h2>
          <p>
            Manage your clinic's contact information displayed
            throughout the website.
          </p>
        </div>

        <form
          className="admin-settings-card"
          onSubmit={handleSubmit}
        >
          <div className="admin-settings-section-title">
            <h3>Clinic Information</h3>
            <p>
              Confirm the details before saving them.
            </p>
          </div>

          <div className="admin-settings-field">
            <label htmlFor="clinic-name">Clinic Name</label>
            <input
              id="clinic-name"
              value={clinicName}
              readOnly
            />
            <small>
              The clinic name is currently managed separately.
            </small>
          </div>

          <div className="admin-settings-field">
            <label htmlFor="clinic-phone">
              Phone Number(s)
            </label>
            <input
              id="clinic-phone"
              type="tel"
              value={settings.phone}
              onChange={(event) =>
                updateField("phone", event.target.value)
              }
              placeholder="Enter clinic phone number(s)"
              required
            />
          </div>

          <div className="admin-settings-field">
            <label htmlFor="clinic-email">Email Address</label>
            <input
              id="clinic-email"
              type="email"
              value={settings.email}
              onChange={(event) =>
                updateField("email", event.target.value)
              }
              placeholder="Enter clinic email"
              required
            />
          </div>

          <div className="admin-settings-field">
            <label htmlFor="clinic-whatsapp">
              WhatsApp Number
            </label>
            <input
              id="clinic-whatsapp"
              type="tel"
              value={settings.whatsapp_number}
              onChange={(event) =>
                updateField(
                  "whatsapp_number",
                  event.target.value
                )
              }
              placeholder="Include country code, for example +971..."
              required
            />
            <small>
              Use the international format for the WhatsApp link.
            </small>
          </div>

          <div className="admin-settings-field">
            <label htmlFor="clinic-address">
              Full Clinic Address
            </label>
            <textarea
              id="clinic-address"
              rows={4}
              value={settings.address}
              onChange={(event) =>
                updateField("address", event.target.value)
              }
              placeholder="Enter the complete clinic address"
              required
            />
          </div>

          <div className="admin-settings-info">
            <strong>Consultation duration</strong>
            <span>{slotDuration} minutes per slot</span>
            <small>
              Booking uses the current slot duration. This form
              does not change appointment availability.
            </small>
          </div>

          {error && (
            <div className="admin-settings-message error">
              {error}
            </div>
          )}

          {success && (
            <div className="admin-settings-message success">
              {success}
            </div>
          )}

          <div className="admin-settings-actions">
            <button
              type="submit"
              className="admin-settings-save"
              disabled={saving}
            >
              {saving ? "Saving..." : "Save Clinic Details"}
            </button>

            <Link
              to="/admin/dashboard"
              className="admin-settings-cancel"
            >
              Cancel
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
}
