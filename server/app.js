import authenticateUser from "./authMiddleware.js";
import express from "express";
import cors from "cors";
import multer from "multer";
import "dotenv/config";

import { pool } from "./db.js";

pool.connect().then(() => console.log("DB connected!"));

const upload = multer();
const app = express();
const port = 3000;

const corsOptions = {
  origin: "http://localhost:5173", // Only allow this domain
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed custom headers
  credentials: true, // Allow cookies or authorization headers
  optionsSuccessStatus: 200, // For legacy browser support (IE11)
};

// Apply options to all routes
app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/profile", authenticateUser, (req, res) => {
  res.json({
    message: "Welcome to your profile!",
    userId: req.user.id,
  });
});

app.post("/addresses", upload.none(), async (req, res) => {
  const { id, street, city, province, country, zip_code } = req.body;

  console.log("Body: ", req.body);

  if (!id) {
    return res.status(400).json({
      error: "Missing required field/s.",
    });
  }

  const addressQuery = `
  INSERT INTO addresses (
    id,
    street, city, province, country, zip_code
  )
  VALUES (
    $1, $2, $3, $4, $5, $6
  )
  RETURNING *;
`;

  try {
    const result = await pool.query(addressQuery, [
      id,
      street,
      city,
      province,
      country,
      zip_code,
    ]);

    return res.status(201).json({
      success: true,
      message: "Successfully created place.",
      insertedData: result.rows,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
});

app.get("/places", async (req, res) => {
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

app.patch("/places/:id", upload.none(), (req, res) => {
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

app.post("/places", upload.none(), async (req, res) => {
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

app.post("/", (req, res) => {
  res.send("Got a POST request");
});

app.put("/user", (req, res) => {
  res.send("Got a PUT request at /user");
});

app.delete("/user", (req, res) => {
  res.send("Got a DELETE request at /user");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
