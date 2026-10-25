import { pool } from "../config/db.js";

export const Amenity = {
  get: async (place_id) => {
    const result = await pool.query(
      `
      SELECT *
      FROM amenities
      WHERE place_id = $1
      LIMIT 1;
    `,
      [place_id],
    );

    return result.rows[0];
  },

  getMany: async (place_ids) => {
    const { rows } = await pool.query(
      `
      SELECT *
      FROM amenities
      WHERE place_id = ANY($1);
    `,
      [place_ids],
    );
    return rows;
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
        INSERT INTO amenities (
        ${insertClause})
        VALUES (
        ${placeholders})
        RETURNING *;`,
      values,
    );

    return result.rows[0];
  },

  update: async (place_id, updates) => {
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
        UPDATE amenities
        SET ${setClause}
        WHERE place_id = $${keys.length + 1}
        RETURNING *;`,
      [...values, place_id],
    );

    return result.rows[0];
  },

  delete: async (place_id) => {
    const result = await pool.query(
      `
        DELETE FROM amenities
        WHERE place_id = $1
        RETURNING *;
        `,
      [place_id],
    );

    return result.rows[0];
  },
};
