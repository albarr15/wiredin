import { pool } from "../config/db.js";

export const Place = {
  getAll: async (limit, offset) => {
    const result = await pool.query(
      `
        SELECT * FROM places
        ORDER BY updated_at DESC
        LIMIT $1 OFFSET $2;
      `,
      [limit, offset],
    );
    return result.rows;
  },

  create: async (
    id,
    name,
    address_id,
    created_by,
    category,
    pricing_tier,
    image_url,
    phone,
    email_address,
    facebook_url,
    instagram_url,
    tiktok_url,
    website_url,
  ) => {
    const result = await pool.query(
      `
        INSERT INTO places (
            id,
            name,
            address_id,
            created_by,
            category,
            pricing_tier,
            image_url,
            phone,
            email_address,
            facebook_url,
            instagram_url,
            tiktok_url,
            website_url
        )
        VALUES (
            $1, $2, $3, $4, $5, $6, $7,
            $8, $9, $10, $11, $12, $13
        )
        RETURNING *;
    `,
      [
        id,
        name,
        address_id,
        created_by,
        category,
        pricing_tier,
        image_url,
        phone,
        email_address,
        facebook_url,
        instagram_url,
        tiktok_url,
        website_url,
      ],
    );

    return result.rows[0];
  },

  update: async (id, updates) => {
    const keys = Object.keys(updates);

    if (keys.length === 0) {
      throw new Error("No fields provided for update");
    }

    const setClause = keys
      .map((key, index) => `${key} = $${index + 1}`)
      .join(", ");

    const values = keys.map((key) => updates[key]);

    const result = await pool.query(
      `
        UPDATE places
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
        DELETE FROM places
        WHERE id = $1
        RETURNING *;
        `,
      [id],
    );

    return result.rows[0];
  },
};
