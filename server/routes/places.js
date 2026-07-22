import express from "express";
import { pool } from "../db.js";

import multer from "multer";
const upload = multer();

const router = express.Router();

router.get("/", async (req, res) => {
  const page = Math.max(Number(req.query.page) || 1, 1);
  const limit = Math.max(Number(req.query.limit) || 10, 1);
  const offset = (page - 1) * limit;

  const query = `
        SELECT * FROM places
        ORDER BY updated_at DESC
        LIMIT $1 OFFSET $2;
      `;

  try {
    const result = await pool.query(query, [limit, offset]);

    return res.status(200).json({
      success: true,
      message: "Successfuly fetched places.",
      data: result.rows,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
});

router.patch("/:id", upload.none(), (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  console.log("Body: ", req.body);

  if (!id) {
    return res.status(400).json({ error: "Missing required field/s." });
  }

  const keys = Object.keys(updates);

  if (keys.length === 0) {
    return res.status(400).json({ error: "No fields provided for update" });
  }

  // TODO: handle input validation and enum type checking
  const setClause = keys
    .map((key, index) => `${key} = $${index + 1}`)
    .join(", ");

  const values = keys.map((key) => updates[key]);

  const query = `
    UPDATE places
    SET ${setClause}
    WHERE id = $${keys.length + 1}
  RETURNING *;
  `;

  try {
    const result = pool.query(query, [...values, id]);

    return res.status(200).json({
      success: true,
      message: "Successfully updated place.",
      data: result.rows,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
});

router.post("/", upload.none(), async (req, res) => {
  const {
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
  } = req.body;

  console.log("Body:", req.body);

  // Removed null-check for address_id while endpoints not completed yet
  if (!id || !name || !created_by || !category) {
    return res.status(400).json({ error: "Missing required field/s." });
  }

  const placesQuery = `
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
`;

  try {
    const result = await pool.query(placesQuery, [
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
    ]);
    return res.status(201).json({
      success: true,
      message: "Place created successfully.",
      insertedData: result.rows,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  const query = `
  DELETE FROM places
  WHERE id = $1
  RETURNING *;
  `;

  try {
    const result = pool.query(query, [id]);

    return res.status(200).json({
      success: true,
      message: "Place deleted successfully",
      data: result.rows,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
});

export default router;
