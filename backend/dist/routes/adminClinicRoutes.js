"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = __importDefault(require("../config/db"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
// Update the clinic's contact details.
// Only authenticated admins can use this endpoint.
router.put("/", authMiddleware_1.requireAdmin, async (req, res) => {
    try {
        const { phone, email, whatsapp_number, address, } = req.body;
        const fields = {
            phone,
            email,
            whatsapp_number,
            address,
        };
        for (const [key, value] of Object.entries(fields)) {
            if (typeof value !== "string" ||
                value.trim().length === 0) {
                return res.status(400).json({
                    success: false,
                    message: `${key} is required`,
                });
            }
        }
        await db_1.default.execute(`UPDATE clinic_info
       SET
         phone = ?,
         email = ?,
         whatsapp_number = ?,
         address = ?
       WHERE id = 1`, [
            phone.trim(),
            email.trim(),
            whatsapp_number.trim(),
            address.trim(),
        ]);
        const [rows] = await db_1.default.execute(`SELECT
         id,
         clinic_name,
         phone,
         email,
         whatsapp_number,
         address,
         slot_interval_minutes
       FROM clinic_info
       WHERE id = 1
       LIMIT 1`);
        const clinics = rows;
        if (clinics.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Clinic information was not found",
            });
        }
        return res.json({
            success: true,
            message: "Clinic information updated successfully",
            clinic: clinics[0],
        });
    }
    catch (error) {
        console.error("Clinic settings update error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to update clinic information",
        });
    }
});
exports.default = router;
