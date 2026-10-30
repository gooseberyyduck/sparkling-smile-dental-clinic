"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = __importDefault(require("../config/db"));
const router = (0, express_1.Router)();
/*
  GET /api/clinic

  Returns the main clinic information.
*/
router.get("/", async (_req, res) => {
    try {
        const [rows] = await db_1.default.execute(`
      SELECT
        id,
        clinic_name,
        phone,
        email,
        whatsapp_number,
        address,
        slot_interval_minutes
      FROM clinic_info
      WHERE id = 1
      LIMIT 1
    `);
        const clinics = rows;
        if (clinics.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Clinic information not found",
            });
        }
        return res.json({
            success: true,
            clinic: clinics[0],
        });
    }
    catch (error) {
        console.error("Clinic information error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch clinic information",
        });
    }
});
exports.default = router;
