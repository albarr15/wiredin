import { Address } from "../models/addressModels.js";

export const createAddress = async (req, res) => {
  const { place_id } = req.params;
  const properties = { ...req.body, place_id };

  try {
    const address = await Address.create(properties);

    return res.status(201).json({
      success: true,
      message: "Successfully created addresss.",
      insertedData: address,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

export const getAddress = async (req, res) => {
  const { place_id } = req.params;

  try {
    const address = await Address.get(place_id);

    if (!address) {
      return res.status(404).json({ error: "Address not found." });
    }

    return res.status(200).json({
      success: true,
      message: "Successfully fetched address.",
      data: address,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

export const updateAddress = async (req, res) => {
  const { place_id } = req.params;
  const updates = req.body;

  try {
    const address = await Address.update(place_id, updates);

    if (!address) {
      return res.status(404).json({
        error: "Address not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Successfully updated address.",
      data: address,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

export const deleteAddress = async (req, res) => {
  const { place_id } = req.params;

  try {
    const address = await Address.get(place_id);

    if (!address) {
      return res.status(404).json({
        error: "Address not found.",
      });
    }

    const deletedAddress = await Address.delete(place_id);

    return res.status(204).json({
      success: true,
      message: "Successfully deleted address.",
      data: deletedAddress,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};
