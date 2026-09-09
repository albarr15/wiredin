import { Review } from "../models/reviewModels.js";

export const createReview = async (req, res) => {
  const properties = { ...req.body };

  try {
    const review = await Review.create(properties);

    return res.status(201).json({
      success: true,
      message: "Successfully created review.",
      insertedData: review,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

export const getReviewById = async (req, res) => {
  const { id } = req.params;

  try {
    const review = await Review.getById(id);

    if (!review) {
      return res.status(404).json({ error: "Review not found." });
    }

    return res.status(200).json({
      success: true,
      message: "Successfully fetched review.",
      data: review,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

export const getReviewsByPlaceId = async (req, res) => {
  const { place_id } = req.params;

  try {
    const review = await Review.getByPlaceId(place_id);

    if (!review) {
      return res.status(404).json({ error: "Review not found." });
    }

    return res.status(200).json({
      success: true,
      message: "Successfully fetched review/s.",
      data: review,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

export const updateReview = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const review = await Review.update(id, updates);

    if (!review) {
      return res.status(404).json({
        error: "Review not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Successfully updated review.",
      data: review,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

export const deleteReview = async (req, res) => {
  const { id } = req.params;

  try {
    const review = await Review.getById(id);

    if (!review) {
      return res.status(404).json({
        error: "Review not found.",
      });
    }

    const deletedReview = await Review.delete(id);

    return res.status(204).json({
      success: true,
      message: "Successfully deleted review.",
      data: deletedReview,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};
