import readline from "readline/promises";
import {
  stdin as input,
  stdout as output,
} from "process";

import bcrypt from "bcryptjs";

import pool from "./config/db";


async function main() {
  const rl =
    readline.createInterface({
      input,
      output,
    });

  try {
    console.log(
      "\nSparkling Smile Dental Clinic"
    );

    console.log(
      "Create Admin Account\n"
    );


    const username =
      (
        await rl.question(
          "Admin username: "
        )
      ).trim();


    const name =
      (
        await rl.question(
          "Admin name: "
        )
      ).trim();


    const password =
      await rl.question(
        "Admin password: "
      );


    if (!username) {
      throw new Error(
        "Username cannot be empty."
      );
    }

    if (!name) {
      throw new Error(
        "Admin name cannot be empty."
      );
    }

    if (password.length < 8) {
      throw new Error(
        "Password must contain at least 8 characters."
      );
    }


    /* --------------------------------------------------------
       CHECK EXISTING USERNAME
       -------------------------------------------------------- */

    const [existingRows] =
      await pool.query(
        `
        SELECT id
        FROM admins
        WHERE username = ?
        LIMIT 1
        `,
        [username]
      );

    const existing =
      existingRows as {
        id: number;
      }[];

    if (existing.length > 0) {
      throw new Error(
        "That username already exists."
      );
    }


    /* --------------------------------------------------------
       HASH PASSWORD
       -------------------------------------------------------- */

    const passwordHash =
      await bcrypt.hash(
        password,
        12
      );


    /* --------------------------------------------------------
       INSERT ADMIN
       -------------------------------------------------------- */

    const [result] =
      await pool.query(
        `
        INSERT INTO admins
        (
          username,
          password_hash,
          name,
          is_active
        )
        VALUES (?, ?, ?, TRUE)
        `,
        [
          username,
          passwordHash,
          name,
        ]
      );


    const insertResult =
      result as {
        insertId: number;
      };


    console.log(
      `\nAdmin created successfully. ID: ${insertResult.insertId}`
    );

    console.log(
      `Username: ${username}`
    );

  } finally {
    rl.close();

    await pool.end();
  }
}


main().catch((error) => {
  console.error(
    "\nFailed to create admin:",
    error.message || error
  );

  process.exit(1);
});