"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = __importDefault(require("readline/promises"));
const process_1 = require("process");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_1 = __importDefault(require("./config/db"));
async function main() {
    const rl = promises_1.default.createInterface({
        input: process_1.stdin,
        output: process_1.stdout,
    });
    try {
        console.log("\nSparkling Smile Dental Clinic");
        console.log("Create Admin Account\n");
        const username = (await rl.question("Admin username: ")).trim();
        const name = (await rl.question("Admin name: ")).trim();
        const password = await rl.question("Admin password: ");
        if (!username) {
            throw new Error("Username cannot be empty.");
        }
        if (!name) {
            throw new Error("Admin name cannot be empty.");
        }
        if (password.length < 8) {
            throw new Error("Password must contain at least 8 characters.");
        }
        /* --------------------------------------------------------
           CHECK EXISTING USERNAME
           -------------------------------------------------------- */
        const [existingRows] = await db_1.default.query(`
        SELECT id
        FROM admins
        WHERE username = ?
        LIMIT 1
        `, [username]);
        const existing = existingRows;
        if (existing.length > 0) {
            throw new Error("That username already exists.");
        }
        /* --------------------------------------------------------
           HASH PASSWORD
           -------------------------------------------------------- */
        const passwordHash = await bcryptjs_1.default.hash(password, 12);
        /* --------------------------------------------------------
           INSERT ADMIN
           -------------------------------------------------------- */
        const [result] = await db_1.default.query(`
        INSERT INTO admins
        (
          username,
          password_hash,
          name,
          is_active
        )
        VALUES (?, ?, ?, TRUE)
        `, [
            username,
            passwordHash,
            name,
        ]);
        const insertResult = result;
        console.log(`\nAdmin created successfully. ID: ${insertResult.insertId}`);
        console.log(`Username: ${username}`);
    }
    finally {
        rl.close();
        await db_1.default.end();
    }
}
main().catch((error) => {
    console.error("\nFailed to create admin:", error.message || error);
    process.exit(1);
});
