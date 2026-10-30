"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = __importDefault(require("../config/db"));
const router = (0, express_1.Router)();
/*
GET /api/services

Returns all active dental services.
*/
router.get("/", async (_req, res) => {
    try {
        const [rows] = await db_1.default.query(`
      SELECT
        id,
        name,
        slug,
        category,
        short_description,
        duration_minutes,
        price,
        image
      FROM services
      WHERE is_active = TRUE
      ORDER BY category, name
      `);
        res.json({
            success: true,
            data: rows,
        });
    }
    catch (error) {
        console.error("Error fetching services:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch services",
        });
    }
});
/*
GET /api/services/:slug

Returns the full information for one service.
This will be used for our dedicated service pages.
*/
router.get("/:slug", async (req, res) => {
    try {
        const { slug } = req.params;
        const [serviceRows] = await db_1.default.query(`
      SELECT
        id,
        name,
        slug,
        category,
        short_description,
        overview,
        when_needed,
        procedure_details,
        benefits,
        aftercare,
        duration_minutes,
        price,
        image
      FROM services
      WHERE slug = ?
        AND is_active = TRUE
      LIMIT 1
      `, [slug]);
        const services = serviceRows;
        if (services.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Service not found",
            });
        }
        const service = services[0];
        const [faqRows] = await db_1.default.query(`
      SELECT
        id,
        question,
        answer,
        display_order
      FROM service_faqs
      WHERE service_id = ?
      ORDER BY display_order, id
      `, [service.id]);
        res.json({
            success: true,
            data: {
                ...service,
                faqs: faqRows,
            },
        });
    }
    catch (error) {
        console.error("Error fetching service:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch service",
        });
    }
});
exports.default = router;
