import { Place } from "../models/placeModels.js";

export const validatePlace = async (req, res, next) => {
  const { place_id } = req.params;
  const place = await Place.get(place_id);

  if (!place) {
    return res.status(404).json({ error: "Place not found." });
  }

  next();
};
