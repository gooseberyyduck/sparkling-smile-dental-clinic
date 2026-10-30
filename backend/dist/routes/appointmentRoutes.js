"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = __importDefault(require("../config/db"));
const router = (0, express_1.Router)();
/*
============================================================
HELPER FUNCTIONS
============================================================
*/
function timeToMinutes(time) {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
}
function minutesToTime(totalMinutes) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00`;
}
function isValidDate(date) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return false;
    }
    const parsedDate = new Date(`${date}T00:00:00`);
    return !Number.isNaN(parsedDate.getTime());
}
function isValidTime(time) {
    return /^([01]\d|2[0-3]):[0-5]\d$/.test(time);
}
/*
============================================================
TEST ROUTE
============================================================
*/
router.get("/test", (_req, res) => {
    res.json({
        success: true,
        message: "Appointment route is working",
    });
});
/*
============================================================
GET AVAILABLE APPOINTMENT SLOTS
============================================================

Appointments are now CONSULTATION appointments.

Every online appointment is exactly 30 minutes.

The patient does NOT select a service.

Example:

/api/appointments/slots?date=2026-10-10
============================================================
*/
router.get("/slots", async (req, res) => {
    try {
        const date = String(req.query.date || "");
        if (!isValidDate(date)) {
            return res.status(400).json({
                success: false,
                message: "Valid date is required in YYYY-MM-DD format",
            });
        }
        /*
        --------------------------------------------------------
        GET CLINIC SLOT INTERVAL
        --------------------------------------------------------
        */
        const [clinicRows] = await db_1.default.query(`
      SELECT slot_interval_minutes
      FROM clinic_info
      WHERE id = 1
      LIMIT 1
      `);
        const clinics = clinicRows;
        if (clinics.length === 0) {
            return res.status(500).json({
                success: false,
                message: "Clinic information not configured",
            });
        }
        /*
        Consultation appointment duration is currently
        the same as the clinic's slot interval: 30 minutes.
        */
        const appointmentDuration = clinics[0].slot_interval_minutes;
        /*
        --------------------------------------------------------
        DETERMINE DAY OF WEEK
        --------------------------------------------------------
        */
        const selectedDate = new Date(`${date}T00:00:00`);
        const jsDay = selectedDate.getDay();
        // JavaScript:
        // Sunday = 0
        // Monday = 1
        // ...
        // Saturday = 6
        // Database:
        // Monday = 1
        // ...
        // Sunday = 7
        const databaseDay = jsDay === 0 ? 7 : jsDay;
        /*
        --------------------------------------------------------
        GET WORKING HOURS
        --------------------------------------------------------
        */
        const [workingRows] = await db_1.default.query(`
      SELECT
        opening_time,
        closing_time,
        break_start,
        break_end,
        is_working
      FROM working_hours
      WHERE day_of_week = ?
      LIMIT 1
      `, [databaseDay]);
        const workingHours = workingRows;
        if (workingHours.length === 0 ||
            !workingHours[0].is_working) {
            return res.json({
                success: true,
                date,
                appointment_duration_minutes: appointmentDuration,
                slots: [],
            });
        }
        const hours = workingHours[0];
        /*
        --------------------------------------------------------
        CONVERT WORKING HOURS TO MINUTES
        --------------------------------------------------------
        */
        const openingMinutes = timeToMinutes(hours.opening_time);
        const closingMinutes = timeToMinutes(hours.closing_time);
        const breakStart = hours.break_start
            ? timeToMinutes(hours.break_start)
            : null;
        const breakEnd = hours.break_end
            ? timeToMinutes(hours.break_end)
            : null;
        /*
        --------------------------------------------------------
        FIND ACTIVE DENTIST
        --------------------------------------------------------
        */
        const [doctorRows] = await db_1.default.query(`
      SELECT id
      FROM doctors
      WHERE is_active = TRUE
      ORDER BY id
      LIMIT 1
      `);
        const doctors = doctorRows;
        if (doctors.length === 0) {
            return res.status(500).json({
                success: false,
                message: "No active dentist configured",
            });
        }
        const doctorId = doctors[0].id;
        /*
        --------------------------------------------------------
        GENERATE CONSULTATION SLOTS
        --------------------------------------------------------
        */
        const slots = [];
        for (let startMinutes = openingMinutes; startMinutes + appointmentDuration <=
            closingMinutes; startMinutes += appointmentDuration) {
            const endMinutes = startMinutes + appointmentDuration;
            const startTime = minutesToTime(startMinutes);
            const endTime = minutesToTime(endMinutes);
            /*
            ------------------------------------------------------
            CHECK BREAK
            ------------------------------------------------------
            */
            const overlapsBreak = breakStart !== null &&
                breakEnd !== null &&
                startMinutes < breakEnd &&
                endMinutes > breakStart;
            if (overlapsBreak) {
                continue;
            }
            /*
            ------------------------------------------------------
            CHECK EXISTING APPOINTMENTS
            ------------------------------------------------------
            */
            const [appointmentRows] = await db_1.default.query(`
          SELECT id
          FROM appointments

          WHERE doctor_id = ?
            AND appointment_date = ?

            AND status IN (
              'PENDING',
              'CONFIRMED'
            )

            AND start_time < ?
            AND end_time > ?

          LIMIT 1
          `, [
                doctorId,
                date,
                endTime,
                startTime,
            ]);
            const existingAppointments = appointmentRows;
            slots.push({
                time: startTime.slice(0, 5),
                available: existingAppointments.length === 0,
            });
        }
        /*
        --------------------------------------------------------
        RETURN SLOTS
        --------------------------------------------------------
        */
        return res.json({
            success: true,
            date,
            appointment_duration_minutes: appointmentDuration,
            doctor_id: doctorId,
            slots,
        });
    }
    catch (error) {
        console.error("Appointment slot error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to generate appointment slots",
        });
    }
});
/*
============================================================
CREATE CONSULTATION APPOINTMENT
============================================================

POST /api/appointments

Request body:

{
  "appointment_date": "2026-10-10",
  "start_time": "10:00",
  "patient_name": "John Doe",
  "phone": "9876543210",
  "email": "john@example.com",
  "notes": "First visit"
}

There is NO service_id.

The doctor will decide the treatment after consultation.
============================================================
*/
router.post("/", async (req, res) => {
    const connection = await db_1.default.getConnection();
    try {
        const { appointment_date, start_time, patient_name, phone, email, notes, } = req.body;
        /*
        --------------------------------------------------------
        VALIDATE INPUT
        --------------------------------------------------------
        */
        if (typeof patient_name !== "string" ||
            patient_name.trim().length < 2) {
            return res.status(400).json({
                success: false,
                message: "Valid patient name is required",
            });
        }
        if (typeof phone !== "string" ||
            phone.trim().length < 7) {
            return res.status(400).json({
                success: false,
                message: "Valid phone number is required",
            });
        }
        if (typeof appointment_date !== "string" ||
            !isValidDate(appointment_date)) {
            return res.status(400).json({
                success: false,
                message: "Valid appointment_date is required",
            });
        }
        if (typeof start_time !== "string" ||
            !isValidTime(start_time)) {
            return res.status(400).json({
                success: false,
                message: "Valid start_time is required in HH:MM format",
            });
        }
        /*
        --------------------------------------------------------
        GET CLINIC SLOT INTERVAL
        --------------------------------------------------------
        */
        const [clinicRows] = await connection.query(`
      SELECT
        slot_interval_minutes
      FROM clinic_info
      WHERE id = 1
      LIMIT 1
      `);
        const clinics = clinicRows;
        if (clinics.length === 0) {
            return res.status(500).json({
                success: false,
                message: "Clinic information not configured",
            });
        }
        const appointmentDuration = clinics[0].slot_interval_minutes;
        /*
        --------------------------------------------------------
        DETERMINE DAY
        --------------------------------------------------------
        */
        const selectedDate = new Date(`${appointment_date}T00:00:00`);
        const jsDay = selectedDate.getDay();
        const databaseDay = jsDay === 0 ? 7 : jsDay;
        /*
        --------------------------------------------------------
        GET WORKING HOURS
        --------------------------------------------------------
        */
        const [workingRows] = await connection.query(`
        SELECT
          opening_time,
          closing_time,
          break_start,
          break_end,
          is_working
        FROM working_hours
        WHERE day_of_week = ?
        LIMIT 1
        `, [databaseDay]);
        const workingHours = workingRows;
        if (workingHours.length === 0 ||
            !workingHours[0].is_working) {
            return res.status(400).json({
                success: false,
                message: "The clinic is closed on the selected date",
            });
        }
        const hours = workingHours[0];
        /*
        --------------------------------------------------------
        TIME CALCULATIONS
        --------------------------------------------------------
        */
        const openingMinutes = timeToMinutes(hours.opening_time);
        const closingMinutes = timeToMinutes(hours.closing_time);
        const breakStart = hours.break_start
            ? timeToMinutes(hours.break_start)
            : null;
        const breakEnd = hours.break_end
            ? timeToMinutes(hours.break_end)
            : null;
        const startMinutes = timeToMinutes(`${start_time}:00`);
        const endMinutes = startMinutes +
            appointmentDuration;
        /*
        --------------------------------------------------------
        VALIDATE START TIME
        --------------------------------------------------------
        */
        if (startMinutes < openingMinutes ||
            startMinutes + appointmentDuration >
                closingMinutes) {
            return res.status(400).json({
                success: false,
                message: "Selected time is outside clinic hours",
            });
        }
        if ((startMinutes - openingMinutes) %
            appointmentDuration !== 0) {
            return res.status(400).json({
                success: false,
                message: "Selected time is not a valid appointment slot",
            });
        }
        /*
        --------------------------------------------------------
        CHECK BREAK
        --------------------------------------------------------
        */
        const overlapsBreak = breakStart !== null &&
            breakEnd !== null &&
            startMinutes < breakEnd &&
            endMinutes > breakStart;
        if (overlapsBreak) {
            return res.status(400).json({
                success: false,
                message: "Selected time overlaps the clinic break",
            });
        }
        /*
        --------------------------------------------------------
        FIND ACTIVE DENTIST
        --------------------------------------------------------
        */
        const [doctorRows] = await connection.query(`
        SELECT id
        FROM doctors
        WHERE is_active = TRUE
        ORDER BY id
        LIMIT 1
        `);
        const doctors = doctorRows;
        if (doctors.length === 0) {
            return res.status(500).json({
                success: false,
                message: "No active dentist configured",
            });
        }
        const doctorId = doctors[0].id;
        const startTime = minutesToTime(startMinutes);
        const endTime = minutesToTime(endMinutes);
        /*
        ========================================================
        START TRANSACTION
        ========================================================
        */
        await connection.beginTransaction();
        /*
        --------------------------------------------------------
        CHECK OVERLAPPING APPOINTMENT
        --------------------------------------------------------
        */
        const [overlappingRows,] = await connection.query(`
      SELECT id
      FROM appointments

      WHERE doctor_id = ?
        AND appointment_date = ?

        AND status IN (
          'PENDING',
          'CONFIRMED'
        )

        AND start_time < ?
        AND end_time > ?

      LIMIT 1
      `, [
            doctorId,
            appointment_date,
            endTime,
            startTime,
        ]);
        const overlapping = overlappingRows;
        if (overlapping.length > 0) {
            await connection.rollback();
            return res.status(409).json({
                success: false,
                message: "This appointment slot is no longer available",
            });
        }
        /*
        --------------------------------------------------------
        FIND OR CREATE PATIENT
        --------------------------------------------------------
        */
        const [patientRows] = await connection.query(`
        SELECT id
        FROM patients
        WHERE phone = ?
        ORDER BY id DESC
        LIMIT 1
        `, [phone.trim()]);
        const patients = patientRows;
        let patientId;
        if (patients.length > 0) {
            patientId = patients[0].id;
            await connection.query(`
        UPDATE patients
        SET
          name = ?,
          email = ?
        WHERE id = ?
        `, [
                patient_name.trim(),
                email
                    ? String(email).trim()
                    : null,
                patientId,
            ]);
        }
        else {
            const [patientResult] = await connection.query(`
          INSERT INTO patients
          (
            name,
            phone,
            email
          )
          VALUES (?, ?, ?)
          `, [
                patient_name.trim(),
                phone.trim(),
                email
                    ? String(email).trim()
                    : null,
            ]);
            const result = patientResult;
            patientId = result.insertId;
        }
        /*
        --------------------------------------------------------
        CREATE APPOINTMENT
        --------------------------------------------------------
        */
        const [appointmentResult] = await connection.query(`
        INSERT INTO appointments
        (
          patient_id,
          doctor_id,
          service_id,
          appointment_date,
          start_time,
          end_time,
          status,
          notes
        )
        VALUES (
          ?,
          ?,
          NULL,
          ?,
          ?,
          ?,
          'PENDING',
          ?
        )
        `, [
            patientId,
            doctorId,
            appointment_date,
            startTime,
            endTime,
            notes
                ? String(notes).trim()
                : null,
        ]);
        const appointment = appointmentResult;
        const appointmentId = appointment.insertId;
        /*
        --------------------------------------------------------
        CREATE OCCUPIED 30-MINUTE SLOT
        --------------------------------------------------------
        */
        await connection.query(`
      INSERT INTO appointment_slots
      (
        appointment_id,
        doctor_id,
        appointment_date,
        slot_start,
        slot_end
      )
      VALUES (?, ?, ?, ?, ?)
      `, [
            appointmentId,
            doctorId,
            appointment_date,
            startTime,
            endTime,
        ]);
        /*
        ========================================================
        COMMIT
        ========================================================
        */
        await connection.commit();
        /*
        ========================================================
        SUCCESS
        ========================================================
        */
        return res.status(201).json({
            success: true,
            message: "Consultation appointment booked successfully",
            appointment: {
                id: appointmentId,
                patient_id: patientId,
                doctor_id: doctorId,
                service_id: null,
                appointment_date,
                start_time: startTime.slice(0, 5),
                end_time: endTime.slice(0, 5),
                status: "PENDING",
            },
        });
    }
    catch (error) {
        try {
            await connection.rollback();
        }
        catch {
            // Ignore rollback error.
        }
        if (error?.code === "ER_DUP_ENTRY") {
            return res.status(409).json({
                success: false,
                message: "This appointment slot has just been booked by another patient",
            });
        }
        console.error("Appointment booking error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to create appointment",
        });
    }
    finally {
        connection.release();
    }
});
exports.default = router;
