-- ============================================================
-- SPARKLING SMILE DENTAL CLINIC
-- DATABASE SCHEMA
-- MySQL 26.7
-- ============================================================

-- Create database if it does not already exist
CREATE DATABASE IF NOT EXISTS dental_clinic;

-- Select the database
USE dental_clinic;


-- ============================================================
-- DROP OLD TABLES
-- ============================================================
-- Tables with foreign keys must be dropped before the tables
-- they reference.

DROP TABLE IF EXISTS appointment_slots;
DROP TABLE IF EXISTS appointments;
DROP TABLE IF EXISTS service_faqs;
DROP TABLE IF EXISTS working_hours;
DROP TABLE IF EXISTS services;
DROP TABLE IF EXISTS patients;
DROP TABLE IF EXISTS doctors;
DROP TABLE IF EXISTS admins;
DROP TABLE IF EXISTS clinic_info;


-- ============================================================
-- 1. CLINIC INFORMATION
-- ============================================================

CREATE TABLE clinic_info (
    id INT PRIMARY KEY,

    clinic_name VARCHAR(200) NOT NULL,

    phone VARCHAR(30),
    email VARCHAR(150),
    whatsapp_number VARCHAR(30),

    address TEXT,

    -- Starting times are generated at this interval.
    -- Example: 30 = 09:00, 09:30, 10:00, etc.
    slot_interval_minutes INT NOT NULL DEFAULT 30,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT chk_clinic_slot_interval
        CHECK (slot_interval_minutes > 0)
);


-- ============================================================
-- 2. ADMINS
-- ============================================================
-- Admin passwords will be stored as bcrypt hashes by Node.js.
-- NEVER store a plain-text password here.

CREATE TABLE admins (
    id INT AUTO_INCREMENT PRIMARY KEY,

    username VARCHAR(100) NOT NULL UNIQUE,

    password_hash VARCHAR(255) NOT NULL,

    name VARCHAR(150) NOT NULL,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);


-- ============================================================
-- 3. DOCTORS
-- ============================================================
-- Currently Sparkling Smile has one dentist.
-- This table is designed so more dentists can be added later.

CREATE TABLE doctors (
    id INT AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(150) NOT NULL,

    qualification VARCHAR(255),

    specialization VARCHAR(255),

    experience_years INT,

    bio TEXT,

    photo VARCHAR(255),

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT chk_doctor_experience
        CHECK (
            experience_years IS NULL
            OR experience_years >= 0
        )
);


-- ============================================================
-- 4. PATIENTS
-- ============================================================

CREATE TABLE patients (
    id INT AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(150) NOT NULL,

    phone VARCHAR(20) NOT NULL,

    email VARCHAR(150),

    date_of_birth DATE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);


-- ============================================================
-- 5. SERVICES
-- ============================================================
-- Every service gets a unique slug.
--
-- Example:
-- Root Canal Treatment
-- -> root-canal-treatment
--
-- duration_minutes = actual treatment duration.
--
-- slot_interval_minutes in clinic_info = available starting
-- time interval.
--
-- Example:
-- Slot interval = 30 minutes
-- Root Canal duration = 60 minutes
--
-- Possible starting times:
-- 09:00
-- 09:30
-- 10:00
-- ...
--
-- A 60-minute appointment starting at 09:00 occupies:
-- 09:00 and 09:30.
-- ============================================================

CREATE TABLE services (
    id INT AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(200) NOT NULL,

    slug VARCHAR(220) NOT NULL UNIQUE,

    category VARCHAR(100) NOT NULL,

    short_description TEXT,

    overview TEXT,

    when_needed TEXT,

    procedure_details TEXT,

    benefits TEXT,

    aftercare TEXT,

    duration_minutes INT NOT NULL DEFAULT 30,

    price DECIMAL(10, 2),

    image VARCHAR(255),

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT chk_service_duration
        CHECK (duration_minutes > 0),

    CONSTRAINT chk_service_price
        CHECK (
            price IS NULL
            OR price >= 0
        )
);


-- ============================================================
-- 6. SERVICE FAQs
-- ============================================================
-- A service can have multiple FAQ questions.
--
-- Example:
--
-- Root Canal Treatment
--   Q1: Is root canal treatment painful?
--   Q2: How long does the treatment take?
--   Q3: What happens after treatment?
-- ============================================================

CREATE TABLE service_faqs (
    id INT AUTO_INCREMENT PRIMARY KEY,

    service_id INT NOT NULL,

    question VARCHAR(500) NOT NULL,

    answer TEXT NOT NULL,

    display_order INT NOT NULL DEFAULT 0,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_service_faq_service
        FOREIGN KEY (service_id)
        REFERENCES services(id)
        ON DELETE CASCADE,

    CONSTRAINT chk_faq_display_order
        CHECK (display_order >= 0)
);


-- ============================================================
-- 7. WORKING HOURS
-- ============================================================
--
-- day_of_week:
-- 1 = Monday
-- 2 = Tuesday
-- 3 = Wednesday
-- 4 = Thursday
-- 5 = Friday
-- 6 = Saturday
-- 7 = Sunday
--
-- Current clinic schedule:
-- Every day: 09:00 AM - 09:00 PM
--
-- break_start and break_end are nullable because the clinic
-- currently has no specified fixed break.
-- ============================================================

CREATE TABLE working_hours (
    id INT AUTO_INCREMENT PRIMARY KEY,

    day_of_week TINYINT NOT NULL UNIQUE,

    opening_time TIME NOT NULL,

    closing_time TIME NOT NULL,

    break_start TIME NULL,

    break_end TIME NULL,

    is_working BOOLEAN NOT NULL DEFAULT TRUE,

    CONSTRAINT chk_working_day
        CHECK (day_of_week BETWEEN 1 AND 7),

    CONSTRAINT chk_working_hours
        CHECK (closing_time > opening_time),

    CONSTRAINT chk_break_times
        CHECK (
            (break_start IS NULL AND break_end IS NULL)
            OR
            (
                break_start IS NOT NULL
                AND break_end IS NOT NULL
                AND break_end > break_start
                AND break_start >= opening_time
                AND break_end <= closing_time
            )
        )
);


-- ============================================================
-- 8. APPOINTMENTS
-- ============================================================
-- Stores the actual appointment.
--
-- Status:
-- PENDING
-- CONFIRMED
-- CANCELLED
-- COMPLETED
--
-- end_time is calculated according to the selected service's
-- duration.
-- ============================================================

CREATE TABLE appointments (
    id INT AUTO_INCREMENT PRIMARY KEY,

    patient_id INT NOT NULL,

    doctor_id INT NOT NULL,

    service_id INT NOT NULL,

    appointment_date DATE NOT NULL,

    start_time TIME NOT NULL,

    end_time TIME NOT NULL,

    status ENUM(
        'PENDING',
        'CONFIRMED',
        'CANCELLED',
        'COMPLETED'
    ) NOT NULL DEFAULT 'PENDING',

    notes TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_appointment_patient
        FOREIGN KEY (patient_id)
        REFERENCES patients(id)
        ON DELETE RESTRICT,

    CONSTRAINT fk_appointment_doctor
        FOREIGN KEY (doctor_id)
        REFERENCES doctors(id)
        ON DELETE RESTRICT,

    CONSTRAINT fk_appointment_service
        FOREIGN KEY (service_id)
        REFERENCES services(id)
        ON DELETE RESTRICT,

    CONSTRAINT chk_appointment_times
        CHECK (end_time > start_time)
);


-- ============================================================
-- 9. APPOINTMENT SLOTS
-- ============================================================
-- This table stores the individual 30-minute blocks occupied
-- by an appointment.
--
-- Example:
--
-- Root Canal:
-- 10:00 -> 11:00
--
-- creates:
--
-- 10:00 -> 10:30
-- 10:30 -> 11:00
--
-- This helps us prevent overlapping appointments.
--
-- A future Node.js transaction will create these rows together
-- with the appointment.
-- ============================================================

CREATE TABLE appointment_slots (
    id INT AUTO_INCREMENT PRIMARY KEY,

    appointment_id INT NOT NULL,

    doctor_id INT NOT NULL,

    appointment_date DATE NOT NULL,

    slot_start TIME NOT NULL,

    slot_end TIME NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_slot_appointment
        FOREIGN KEY (appointment_id)
        REFERENCES appointments(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_slot_doctor
        FOREIGN KEY (doctor_id)
        REFERENCES doctors(id)
        ON DELETE RESTRICT,

    CONSTRAINT chk_slot_times
        CHECK (slot_end > slot_start),

    -- A dentist cannot have two appointments occupying
    -- the same 30-minute block.
    CONSTRAINT uq_doctor_slot
        UNIQUE (
            doctor_id,
            appointment_date,
            slot_start
        )
);


-- ============================================================
-- INDEXES
-- ============================================================

CREATE INDEX idx_appointments_date
ON appointments(appointment_date);


CREATE INDEX idx_appointments_doctor_date
ON appointments(
    doctor_id,
    appointment_date
);


CREATE INDEX idx_appointments_patient
ON appointments(patient_id);


CREATE INDEX idx_appointments_status
ON appointments(status);


CREATE INDEX idx_appointment_slots_date
ON appointment_slots(
    appointment_date
);


CREATE INDEX idx_appointment_slots_doctor_date
ON appointment_slots(
    doctor_id,
    appointment_date
);


CREATE INDEX idx_services_category
ON services(category);


CREATE INDEX idx_services_active
ON services(is_active);


-- ============================================================
-- INSERT SPARKLING SMILE CLINIC INFORMATION
-- ============================================================

INSERT INTO clinic_info (
    id,
    clinic_name,
    phone,
    email,
    whatsapp_number,
    address,
    slot_interval_minutes
)
VALUES (
    1,
    'Sparkling Smile Dental Clinic',
    NULL,
    NULL,
    NULL,
    NULL,
    30
);


-- ============================================================
-- INSERT CURRENT WORKING HOURS
-- ============================================================
-- Every day: 09:00 AM - 09:00 PM
-- No fixed break currently specified.

INSERT INTO working_hours (
    day_of_week,
    opening_time,
    closing_time,
    break_start,
    break_end,
    is_working
)
VALUES
    (1, '09:00:00', '21:00:00', NULL, NULL, TRUE),
    (2, '09:00:00', '21:00:00', NULL, NULL, TRUE),
    (3, '09:00:00', '21:00:00', NULL, NULL, TRUE),
    (4, '09:00:00', '21:00:00', NULL, NULL, TRUE),
    (5, '09:00:00', '21:00:00', NULL, NULL, TRUE),
    (6, '09:00:00', '21:00:00', NULL, NULL, TRUE),
    (7, '09:00:00', '21:00:00', NULL, NULL, TRUE);


-- ============================================================
-- END OF SCHEMA
-- ============================================================