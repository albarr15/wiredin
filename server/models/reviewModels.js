import { pool } from "../config/db.js";

export const Review = {
  getById: async (id) => {
    const result = await pool.query(
      `
      SELECT *
      FROM reviews
      WHERE id = $1
      LIMIT 1;
    `,
      [id],
    );

    return result.rows[0];
  },

  getByPlaceId: async (place_id) => {
    const result = await pool.query(
      `
      SELECT *
      FROM reviews
      WHERE place_id = $1;
    `,
      [place_id],
    );

    return result.rows;
  },

  getByUserId: async (user_id) => {
    const result = await pool.query(
      `
      SELECT *
      FROM reviews
      WHERE created_by = $1;
    `,
      [user_id],
    );

    return result.rows;
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
        INSERT INTO reviews (
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
        UPDATE reviews
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
        DELETE FROM reviews
        WHERE id = $1
        RETURNING *;
        `,
      [id],
    );

    return result.rows[0];
  },

  getPlaceRating: async (place_id) => {
    const result = await pool.query(
      `
      SELECT COUNT(id) AS review_count, ROUND(AVG(rating), 1) AS rating_avg
      FROM reviews
      WHERE place_id = $1;
    `,
      [place_id],
    );

    return result.rows;
  },
};
