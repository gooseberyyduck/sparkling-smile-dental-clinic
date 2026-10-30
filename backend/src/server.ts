
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import serviceRoutes from "./routes/serviceRoutes";
import appointmentRoutes from "./routes/appointmentRoutes";
import adminRoutes from "./routes/adminRoutes";
import clinicRoutes from "./routes/clinicRoutes";
import adminClinicRoutes from "./routes/adminClinicRoutes";

import pool from "./config/db";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 5000;

/*
=========================================================
MIDDLEWARE
=========================================================
*/

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*
=========================================================
ROOT ROUTE
=========================================================
*/

app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "Sparkling Smile Dental Clinic API is running",
  });
});

/*
=========================================================
DATABASE HEALTH CHECK
=========================================================
*/

app.get("/api/health/db", async (_req, res) => {
  let connection;

  try {
    connection = await pool.getConnection();
    await connection.ping();

    return res.json({
      success: true,
      message: "Database connection successful",
    });
  } catch (error) {
    console.error("Database health check error:", error);

    return res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  } finally {
    connection?.release();
  }
});

/*
=========================================================
API ROUTES
=========================================================
*/

// Public services and service details
app.use("/api/services", serviceRoutes);

// Consultation booking and available time slots
app.use("/api/appointments", appointmentRoutes);

// Public clinic information
app.use("/api/clinic", clinicRoutes);

// Admin clinic settings
app.use("/api/admin/clinic", adminClinicRoutes);

// Admin login, profile and appointment management
app.use("/api/admin", adminRoutes);

/*
=========================================================
404 HANDLER
=========================================================
*/

app.use((_req, res) => {
  return res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

/*
=========================================================
GLOBAL ERROR HANDLER
=========================================================
*/

app.use(
  (
    error: unknown,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    console.error("Unhandled server error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
);

/*
=========================================================
START SERVER
=========================================================
*/

app.listen(PORT, () => {
  console.log(
    `Sparkling Smile Dental Clinic API running on port ${PORT}`
  );
});
