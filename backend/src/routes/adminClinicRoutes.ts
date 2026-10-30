import { Router } from "express";
import pool from "../config/db";
import { requireAdmin } from "../middleware/authMiddleware";

const router = Router();

// Update the clinic's contact details.
// Only authenticated admins can use this endpoint.
router.put("/", requireAdmin, async (req, res) => {
  try {
    const {
      phone,
      email,
      whatsapp_number,
      address,
    } = req.body;

    const fields = {
      phone,
      email,
      whatsapp_number,
      address,
    };

    for (const [key, value] of Object.entries(fields)) {
      if (
        typeof value !== "string" ||
        value.trim().length === 0
      ) {
        return res.status(400).json({
          success: false,
          message: `${key} is required`,
        });
      }
    }

    await pool.execute(
      `UPDATE clinic_info
       SET
         phone = ?,
         email = ?,
         whatsapp_number = ?,
         address = ?
       WHERE id = 1`,
      [
        phone.trim(),
        email.trim(),
        whatsapp_number.trim(),
        address.trim(),
      ]
    );

    const [rows] = await pool.execute(
      `SELECT
         id,
         clinic_name,
         phone,
         email,
         whatsapp_number,
         address,
         slot_interval_minutes
       FROM clinic_info
       WHERE id = 1
       LIMIT 1`
    );

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
        message: "Clinic information was not found",
      });
    }

    return res.json({
      success: true,
      message: "Clinic information updated successfully",
      clinic: clinics[0],
    });
  } catch (error) {
    console.error("Clinic settings update error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update clinic information",
    });
  }
});

export default router;