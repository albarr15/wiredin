import { Amenity } from "../models/amenityModels.js";

export const createAmenity = async (req, res) => {
  const { place_id } = req.params;
  const properties = { ...req.body, place_id };

  try {
    const amenity = await Amenity.create(properties);

    return res.status(201).json({
      success: true,
      message: "Successfully created amenity.",
      insertedData: amenity,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

export const getAmenity = async (req, res) => {
  const { place_id } = req.params;

  try {
    const amenity = await Amenity.get(place_id);

    if (!amenity) {
      return res.status(404).json({ error: "Amenity not found." });
    }

    return res.status(200).json({
      success: true,
      message: "Successfully fetched amenity.",
      data: amenity,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

export const updateAmenity = async (req, res) => {
  const { place_id } = req.params;
  const updates = req.body;

  try {
    const amenity = await Amenity.update(place_id, updates);

    if (!amenity) {
      return res.status(404).json({
        error: "Amenity not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Successfully updated amenity.",
      data: amenity,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

export const deleteAmenity = async (req, res) => {
  const { place_id } = req.params;

  try {
    const amenity = await Amenity.get(place_id);

    if (!amenity) {
      return res.status(404).json({
        error: "Amenity not found.",
      });
    }

    const deletedAmenity = await Amenity.delete(place_id);

    return res.status(204).json({
      success: true,
      message: "Successfully deleted amenity.",
      data: deletedAmenity,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};
