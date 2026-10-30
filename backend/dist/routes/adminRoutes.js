"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = __importDefault(require("../config/db"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
/* ============================================================
   JWT SECRET
   ============================================================ */
function getJwtSecret() {
    return (process.env.JWT_SECRET ||
        "development-secret-change-before-deployment");
}
/* ============================================================
   ADMIN LOGIN
   ============================================================

   POST /api/admin/login

   Body:

   {
     "username": "admin",
     "password": "your-password"
   }
   ============================================================ */
router.post("/login", async (req, res) => {
    try {
        const { username, password, } = req.body;
        if (typeof username !== "string" ||
            !username.trim()) {
            return res.status(400).json({
                success: false,
                message: "Username is required",
            });
        }
        if (typeof password !== "string" ||
            !password) {
            return res.status(400).json({
                success: false,
                message: "Password is required",
            });
        }
        /* ------------------------------------------------------
           FIND ADMIN
           ------------------------------------------------------ */
        const [rows] = await db_1.default.query(`
          SELECT
            id,
            username,
            password_hash,
            name
          FROM admins
          WHERE username = ?
            AND is_active = TRUE
          LIMIT 1
          `, [username.trim()]);
        const admins = rows;
        if (admins.length === 0) {
            return res.status(401).json({
                success: false,
                message: "Invalid username or password",
            });
        }
        const admin = admins[0];
        /* ------------------------------------------------------
           VERIFY PASSWORD
           ------------------------------------------------------ */
        const passwordMatches = await bcryptjs_1.default.compare(password, admin.password_hash);
        if (!passwordMatches) {
            return res.status(401).json({
                success: false,
                message: "Invalid username or password",
            });
        }
        /* ------------------------------------------------------
           CREATE TOKEN
           ------------------------------------------------------ */
        const token = jsonwebtoken_1.default.sign({
            adminId: admin.id,
            username: admin.username,
        }, getJwtSecret(), {
            expiresIn: "8h",
        });
        return res.json({
            success: true,
            message: "Login successful",
            token,
            admin: {
                id: admin.id,
                username: admin.username,
                name: admin.name,
            },
        });
    }
    catch (error) {
        console.error("Admin login error:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to process login",
        });
    }
});
/* ============================================================
   VERIFY LOGIN
   ============================================================

   GET /api/admin/me
   ============================================================ */
router.get("/me", authMiddleware_1.requireAdmin, async (req, res) => {
    try {
        const [rows] = await db_1.default.query(`
          SELECT
            id,
            username,
            name
          FROM admins
          WHERE id = ?
            AND is_active = TRUE
          LIMIT 1
          `, [req.adminId]);
        const admins = rows;
        if (admins.length === 0) {
            return res.status(401).json({
                success: false,
                message: "Admin account not found",
            });
        }
        return res.json({
            success: true,
            admin: admins[0],
        });
    }
    catch (error) {
        console.error("Admin verification error:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to verify admin",
        });
    }
});
/* ============================================================
   GET APPOINTMENTS FOR A DAY
   ============================================================

   GET /api/admin/appointments?date=2026-10-10
   ============================================================ */
router.get("/appointments", authMiddleware_1.requireAdmin, async (req, res) => {
    try {
        const date = String(req.query.date || "");
        if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
            return res.status(400).json({
                success: false,
                message: "Valid date is required in YYYY-MM-DD format",
            });
        }
        const [rows] = await db_1.default.query(`
          SELECT

            a.id,
            a.appointment_date,
            a.start_time,
            a.end_time,
            a.status,
            a.notes,
            a.created_at,

            p.id AS patient_id,
            p.name AS patient_name,
            p.phone AS patient_phone,
            p.email AS patient_email,

            d.id AS doctor_id,
            d.name AS doctor_name,

            s.id AS service_id,
            s.name AS service_name

          FROM appointments a

          INNER JOIN patients p
            ON a.patient_id = p.id

          INNER JOIN doctors d
            ON a.doctor_id = d.id

          LEFT JOIN services s
            ON a.service_id = s.id

          WHERE a.appointment_date = ?

          ORDER BY
            a.start_time ASC,
            a.id ASC
          `, [date]);
        return res.json({
            success: true,
            date,
            data: rows,
        });
    }
    catch (error) {
        console.error("Admin appointments error:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to load appointments",
        });
    }
});
/* ============================================================
   UPDATE APPOINTMENT STATUS
   ============================================================

   PATCH /api/admin/appointments/:id/status

   Body:

   {
     "status": "CONFIRMED"
   }

   Allowed statuses:

   PENDING
   CONFIRMED
   CANCELLED
   COMPLETED
   ============================================================ */
router.patch("/appointments/:id/status", authMiddleware_1.requireAdmin, async (req, res) => {
    try {
        const appointmentId = Number(req.params.id);
        const { status, } = req.body;
        const allowedStatuses = [
            "PENDING",
            "CONFIRMED",
            "CANCELLED",
            "COMPLETED",
        ];
        if (!appointmentId ||
            Number.isNaN(appointmentId)) {
            return res.status(400).json({
                success: false,
                message: "Valid appointment ID is required",
            });
        }
        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid appointment status",
            });
        }
        const [result] = await db_1.default.query(`
          UPDATE appointments
          SET status = ?
          WHERE id = ?
          `, [
            status,
            appointmentId,
        ]);
        const updateResult = result;
        if (updateResult.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Appointment not found",
            });
        }
        return res.json({
            success: true,
            message: "Appointment status updated",
        });
    }
    catch (error) {
        console.error("Appointment status error:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to update appointment status",
        });
    }
});
exports.default = router;
