"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const serviceRoutes_1 = __importDefault(require("./routes/serviceRoutes"));
const appointmentRoutes_1 = __importDefault(require("./routes/appointmentRoutes"));
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
const clinicRoutes_1 = __importDefault(require("./routes/clinicRoutes"));
const adminClinicRoutes_1 = __importDefault(require("./routes/adminClinicRoutes"));
const db_1 = __importDefault(require("./config/db"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT) || 5000;
/*
=========================================================
MIDDLEWARE
=========================================================
*/
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
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
        connection = await db_1.default.getConnection();
        await connection.ping();
        return res.json({
            success: true,
            message: "Database connection successful",
        });
    }
    catch (error) {
        console.error("Database health check error:", error);
        return res.status(500).json({
            success: false,
            message: "Database connection failed",
        });
    }
    finally {
        connection?.release();
    }
});
/*
=========================================================
API ROUTES
=========================================================
*/
// Public services and service details
app.use("/api/services", serviceRoutes_1.default);
// Consultation booking and available time slots
app.use("/api/appointments", appointmentRoutes_1.default);
// Public clinic information
app.use("/api/clinic", clinicRoutes_1.default);
// Admin clinic settings
app.use("/api/admin/clinic", adminClinicRoutes_1.default);
// Admin login, profile and appointment management
app.use("/api/admin", adminRoutes_1.default);
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
app.use((error, _req, res, _next) => {
    console.error("Unhandled server error:", error);
    return res.status(500).json({
        success: false,
        message: "Internal server error",
    });
});
/*
=========================================================
START SERVER
=========================================================
*/
app.listen(PORT, () => {
    console.log(`Sparkling Smile Dental Clinic API running on port ${PORT}`);
});
