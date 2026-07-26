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
  const page = req.query.page;
  const limit = req.query.limit;
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

  try {
    const place = await Place.update(id, updates);
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

export const deletePlace = async (req, res) => {
  const { id } = req.params;

  try {
    const place = await Place.delete(id);
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
