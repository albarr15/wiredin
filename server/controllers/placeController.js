import { Place } from "../models/placeModels.js";

export const createPlace = async (req, res) => {
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

  try {
    const place = await Place.create(
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
    );

    return res.status(201).json({
      success: true,
      message: "Successfully created place.",
      insertedData: place,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

export const getAllPlaces = async (req, res) => {
  const page = Math.max(Number(req.query.page) || 1, 1);
  const limit = Math.max(Number(req.query.limit) || 10, 1);
  const offset = (page - 1) * limit;

  try {
    const places = await Place.getAll(limit, offset);

    return res.status(200).json({
      success: true,
      message: "Successfully fetched places.",
      data: places,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

export const updatePlace = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  console.log("Body: ", req.body);

  if (!id) {
    return res.status(400).json({ error: "Missing required field/s." });
  }

  try {
    const place = Place.update(id, updates);
    return res.status(200).json({
      success: true,
      message: "Successfully updated place.",
      data: place,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

export const deletePlace = (req, res) => {
  const { id } = req.params;

  try {
    const place = Place.delete(id);
    return res.status(200).json({
      success: true,
      message: "Successfully deleted place.",
      data: place,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};
