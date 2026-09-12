import { pool } from "../config/db.js";

export const User = {
  get: async (id) => {
    const result = await pool.query(
      `
            SELECT *
            FROM users
            WHERE id = $1
            LIMIT 1;`,
      [id],
    );

    return result.rows[0];
  },

  create: async (properties) => {
    const keys = Object.keys(properties);

    if (keys.length === 0) {
      throw new Error("No fields provided for create");
    }

    const insertClause = keys.join(", ");
    const placeholders = keys.map((_, index) => `$${index + 1}`).join(",");

    const values = keys.map((key) => properties[key]);

    const result = await pool.query(
      `
        INSERT INTO users (
        ${insertClause})
        VALUES (
        ${placeholders})
        RETURNING *;`,
      values,
    );

    return result.rows[0];
  },

  update: async (id, updates) => {
    const keys = Object.keys(updates);

    if (keys.length === 0) {
      throw new Error("No fields provided for update");
    }

    const setClause = [
      ...keys.map((key, i) => `${key} = $${i + 1}`),
      `updated_at = NOW()`,
    ].join(", ");

    const values = keys.map((key) => updates[key]);

    const result = await pool.query(
      `
        UPDATE users
        SET ${setClause}
        WHERE id = $${keys.length + 1}
        RETURNING *;`,
      [...values, id],
    );

    return result.rows[0];
  },

  delete: async (id) => {
    const result = await pool.query(
      `
        DELETE FROM users
        WHERE id = $1
        RETURNING *;
        `,
      [id],
    );

    return result.rows[0];
  },
};
