import { Place } from "../models/placeModels.js";
import { supabase } from "../supabaseClient.js";

export const createPlace = async (req, res) => {
  const {
    id,
    name,
    address_id,
    created_by,
    category,
    pricing_tier,
    phone,
    email_address,
    facebook_url,
    instagram_url,
    tiktok_url,
    website_url,
  } = req.body;

  const file = req.file;
  const safeName = name.trim().replace(/[^a-zA-Z0-9-_ ]/g, "");
  const filePath = `public/${safeName}/${Date.now()}-${file.originalname}`;

  console.log("Body:", req.body);
  console.log("Image:", req.file);

  let uploadData;

  try {
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

    const image_url = publicUrlData.publicUrl;

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
    if (uploadData) {
      await supabase.storage.from("place-images").remove([uploadData.path]);
    }

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
