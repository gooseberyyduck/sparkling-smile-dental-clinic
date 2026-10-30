import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface Appointment {
  id: number;
  appointment_date: string;
  start_time: string;
  end_time: string;
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";
  notes: string | null;
  patient_name: string;
  patient_phone: string;
  patient_email: string | null;
  doctor_name: string;
  service_name: string | null;
}

interface AdminInfo {
  id: number;
  username: string;
  name: string;
}

function getTodayDate(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export default function AdminDashboard() {
  const navigate = useNavigate();

  const token = sessionStorage.getItem("adminToken");

  const [appointments, setAppointments] =
    useState<Appointment[]>([]);

  const [selectedDate, setSelectedDate] =
    useState(getTodayDate());

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const [admin, setAdmin] = useState<AdminInfo | null>(() => {
    const storedAdmin = sessionStorage.getItem("adminInfo");

    if (!storedAdmin) return null;

    try {
      return JSON.parse(storedAdmin) as AdminInfo;
    } catch {
      return null;
    }
  });

  function logout() {
    sessionStorage.removeItem("adminToken");
    sessionStorage.removeItem("adminInfo");
    navigate("/admin/login");
  }

  async function loadAdminProfile() {
    if (!token) {
      navigate("/admin/login");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/admin/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.status === 401) {
        logout();
        return;
      }

      if (response.ok && data.success) {
        setAdmin(data.admin);
        sessionStorage.setItem(
          "adminInfo",
          JSON.stringify(data.admin)
        );
      }
    } catch (error) {
      console.error("Failed to load admin profile:", error);
    }
  }

  async function loadAppointments(date: string) {
    if (!token) {
      navigate("/admin/login");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/appointments?date=${date}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.status === 401) {
        logout();
        return;
      }

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to load appointments"
        );
      }

      // The current backend returns the list in data.data.
      setAppointments(
        Array.isArray(data.data) ? data.data : []
      );
    } catch (error) {
      console.error("Failed to load appointments:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to load appointments"
      );

      setAppointments([]);
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(
    appointmentId: number,
    status: Appointment["status"]
  ) {
    if (!token) {
      navigate("/admin/login");
      return;
    }

    setUpdatingId(appointmentId);
    setError("");

    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/appointments/${appointmentId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await response.json();

      if (response.status === 401) {
        logout();
        return;
      }

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to update appointment"
        );
      }

      setAppointments((current) =>
        current.map((appointment) =>
          appointment.id === appointmentId
            ? { ...appointment, status }
            : appointment
        )
      );
    } catch (error) {
      console.error("Failed to update appointment:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to update appointment"
      );
    } finally {
      setUpdatingId(null);
    }
  }

  function formatTime(time: string) {
    const [hourString, minute] = time.split(":");
    const hour = Number(hourString);
    const suffix = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 === 0 ? 12 : hour % 12;

    return `${displayHour}:${minute} ${suffix}`;
  }

  function formatDate(date: string) {
    return new Date(`${date}T00:00:00`).toLocaleDateString(
      "en-IN",
      {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );
  }

  function getStatusClass(status: Appointment["status"]) {
    return `appointment-status status-${status.toLowerCase()}`;
  }

  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
      return;
    }

    void loadAdminProfile();
  }, []);

  useEffect(() => {
    if (token) {
      void loadAppointments(selectedDate);
    }
  }, [selectedDate]);

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <header className="admin-header">
        <div className="admin-header-brand">
          <div className="admin-header-logo">SS</div>

          <div>
            <h1>Sparkling Smile</h1>
            <span>Admin Panel</span>
          </div>
        </div>

        <div className="admin-header-right">
          <div className="admin-user">
            <strong>{admin?.name || "Clinic Administrator"}</strong>
            <span>@{admin?.username || "admin"}</span>
          </div>

          <button
            className="admin-logout-button"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </header>

      <main className="admin-main">
        {/* Page heading and actions */}
        <div className="admin-page-heading">
          <div>
            <h2>Appointments</h2>
            <p>
              View and manage consultation appointments.
            </p>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            <Link
              to="/admin/settings"
              className="admin-refresh-button"
              style={{ textDecoration: "none" }}
            >
              ⚙ Clinic Settings
            </Link>

            <button
              className="admin-refresh-button"
              onClick={() => loadAppointments(selectedDate)}
            >
              ↻ Refresh
            </button>
          </div>
        </div>

        {/* Date selector */}
        <section className="admin-date-section">
          <label htmlFor="appointment-date">
            Select Date
          </label>

          <input
            id="appointment-date"
            type="date"
            value={selectedDate}
            onChange={(event) =>
              setSelectedDate(event.target.value)
            }
          />
        </section>

        {/* Date summary */}
        <div className="admin-date-title">
          <h3>{formatDate(selectedDate)}</h3>

          <span>
            {appointments.length}{" "}
            {appointments.length === 1
              ? "appointment"
              : "appointments"}
          </span>
        </div>

        {error && (
          <div className="admin-error admin-dashboard-error">
            {error}
          </div>
        )}

        {loading ? (
          <div className="admin-loading">
            Loading appointments...
          </div>
        ) : appointments.length === 0 ? (
          <div className="admin-empty">
            <div className="admin-empty-icon">✓</div>

            <h3>No appointments</h3>

            <p>
              There are no consultation appointments scheduled
              for this date.
            </p>
          </div>
        ) : (
          <div className="appointments-table-wrapper">
            <table className="appointments-table">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Patient</th>
                  <th>Contact</th>
                  <th>Doctor</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {appointments.map((appointment) => (
                  <tr key={appointment.id}>
                    <td>
                      <div className="appointment-time">
                        <strong>
                          {formatTime(appointment.start_time)}
                        </strong>

                        <span>
                          – {formatTime(appointment.end_time)}
                        </span>
                      </div>
                    </td>

                    <td>
                      <div className="patient-info">
                        <strong>
                          {appointment.patient_name}
                        </strong>

                        {appointment.notes && (
                          <small>
                            Note: {appointment.notes}
                          </small>
                        )}
                      </div>
                    </td>

                    <td>
                      <div className="patient-contact">
                        <span>
                          {appointment.patient_phone}
                        </span>

                        {appointment.patient_email && (
                          <small>
                            {appointment.patient_email}
                          </small>
                        )}
                      </div>
                    </td>

                    <td>{appointment.doctor_name}</td>

                    <td>
                      <span className="consultation-badge">
                        Consultation
                      </span>
                    </td>

                    <td>
                      <span
                        className={getStatusClass(
                          appointment.status
                        )}
                      >
                        {appointment.status}
                      </span>
                    </td>

                    <td>
                      <div className="status-actions">
                        <select
                          aria-label={`Update status for ${appointment.patient_name}`}
                          value={appointment.status}
                          disabled={
                            updatingId === appointment.id
                          }
                          onChange={(event) =>
                            updateStatus(
                              appointment.id,
                              event.target
                                .value as Appointment["status"]
                            )
                          }
                        >
                          <option value="PENDING">Pending</option>
                          <option value="CONFIRMED">
                            Confirmed
                          </option>
                          <option value="CANCELLED">
                            Cancelled
                          </option>
                          <option value="COMPLETED">
                            Completed
                          </option>
                        </select>

                        {updatingId === appointment.id && (
                          <small>Saving...</small>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}