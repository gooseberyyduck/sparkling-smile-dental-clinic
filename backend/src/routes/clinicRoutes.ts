import { Router } from "express";
import pool from "../config/db";

const router = Router();

/*
  GET /api/clinic

  Returns the main clinic information.
*/
router.get("/", async (_req, res) => {
  try {
    const [rows] = await pool.execute(`
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

    const clinics = rows as Array<{
      id: number;
      clinic_name: string;
      phone: string | null;
      email: string | null;
      whatsapp_number: string | null;
      address: string | null;
      slot_interval_minutes: number;
    }>;

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
  } catch (error) {
    console.error("Clinic information error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch clinic information",
    });
  }
});

export default router;