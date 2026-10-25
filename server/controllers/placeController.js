import { Place } from "../models/placeModels.js";
import { Address } from "../models/addressModels.js";
// import { Schedule } from "../models/scheduleModels.js";
// import { Amenities } from "../models/amenityModels.js";

import { supabase } from "../supabaseClient.js";

export const createPlace = async (req, res) => {
  const properties = req.body;

  const file = req.file;

  let uploadData;
  let image_url;

  try {
    if (file) {
      const safeName = properties.name.trim().replace(/[^a-zA-Z0-9-_ ]/g, "");
      const filePath = `public/${safeName}/${Date.now()}-${file.originalname}`;

      const { data, error } = await supabase.storage
        .from("place-images")
        .upload(filePath, file.buffer, {
          contentType: file.mimetype,
        });

      if (error) {
        throw error;
      }

      uploadData = data;

      const { data: publicUrlData } = supabase.storage
        .from("place-images")
        .getPublicUrl(data.path);

      image_url = publicUrlData.publicUrl;
      properties.image_url = image_url;
    }

    const place = await Place.create(properties);

    return res.status(201).json({
      success: true,
      message: "Successfully created place.",
      insertedData: place,
    });
  } catch (err) {
    if (uploadData) {
      await supabase.storage.from("place-images").remove([uploadData.path]);
    }

    return res.status(500).json({
      error: err.message,
    });
  }
};

const ALLOWED_QUERY = ["addresses", "schedules", "amenities"];

export const getAllPlaces = async (req, res) => {
  const page = req.query.page;
  const limit = req.query.limit;
  const offset = (page - 1) * limit;

  const include = (req.query.include || "")
    .split(",")
    .map((s) => s.trim())
    .filter((s) => ALLOWED_QUERY.includes(s));

  try {
    const places = await Place.getAll(limit, offset);

    if (places.length > 0 && include.includes("addresses")) {
      const ids = places.map((p) => p.id);
      const addresses = await Address.getMany(ids);

      const byPlace = new Map();
      for (const address of addresses) {
        if (!byPlace.has(address.place_id)) byPlace.set(address.place_id, []);
        byPlace.get(address.place_id).push(address);
      }

      for (const place of places) {
        place.addresses = byPlace.get(place.id) || [];
      }
    }

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
  const file = req.file;

  let uploadData;
  let initialImage;

  try {
    if (file) {
      const existingPlace = await Place.get(id);

      if (!existingPlace) {
        return res.status(404).json({
          error: "Place not found.",
        });
      }

      const placeName = updates.name ?? existingPlace.name;
      const safeName = placeName.trim().replace(/[^a-zA-Z0-9-_ ]/g, "");
      const filePath = `public/${safeName}/${Date.now()}-${file.originalname}`;

      initialImage = existingPlace.image_url;

      const { data, error } = await supabase.storage
        .from("place-images")
        .upload(filePath, file.buffer, {
          contentType: file.mimetype,
        });

      if (error) throw error;

      uploadData = data;

      const { data: publicUrlData } = supabase.storage
        .from("place-images")
        .getPublicUrl(uploadData.path);

      updates.image_url = publicUrlData.publicUrl;
    }

    const place = await Place.update(id, updates);

    if (!place) {
      return res.status(404).json({
        error: "Place not found.",
      });
    }

    if (initialImage) {
      const prefix = "/storage/v1/object/public/place-images/";
      const path = decodeURIComponent(initialImage.split(prefix)[1]);

      const { error: removeError } = await supabase.storage
        .from("place-images")
        .remove([path]);

      if (removeError) {
        console.error("Failed to delete old image:", removeError);
      }
    }

    return res.status(200).json({
      success: true,
      message: "Successfully updated place.",
      data: place,
    });
  } catch (err) {
    if (uploadData) {
      await supabase.storage.from("place-images").remove([uploadData.path]);
    }

    return res.status(500).json({
      error: err.message,
    });
  }
};

export const deletePlace = async (req, res) => {
  const { id } = req.params;

  try {
    const place = await Place.get(id);

    if (!place) {
      return res.status(404).json({ error: "Place not found." });
    }

    const imagePath = place.image_url;

    const deletedPlace = await Place.delete(id);

    if (imagePath) {
      const prefix = "/storage/v1/object/public/place-images/";
      const path = decodeURIComponent(imagePath.split(prefix)[1]);

      const { error: removeError } = await supabase.storage
        .from("place-images")
        .remove([path]);

      if (removeError) {
        console.error("Failed to delete image from storage:", removeError);
      }
    }
    return res.status(200).json({
      success: true,
      message: "Successfully deleted place.",
      data: deletedPlace,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};
