import { Review } from "../models/reviewModels.js";

export const createReview = async (req, res) => {
  const { place_id } = req.params;
  const user_id = req.user.id;
  const properties = { ...req.body, place_id, created_by: user_id };

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

export const getReviewsByUserId = async (req, res) => {
  const user_id = req.user.id;

  try {
    const review = await Review.getByUserId(user_id);

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
  const user_id = req.user.id;
  const updates = { ...req.body, created_by: user_id };

  try {
    const review = await Review.getById(id);

    if (!review) {
      return res.status(404).json({
        error: "Review not found.",
      });
    } else if (review["created_by"] !== user_id) {
      return res.status(403).json({
        error: "Review creator does not match with user id.",
      });
    }

    const updatedReview = await Review.update(id, updates);

    return res.status(200).json({
      success: true,
      message: "Successfully updated review.",
      data: updatedReview,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

export const deleteReview = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user.id;

  try {
    const review = await Review.getById(id);

    if (!review) {
      return res.status(404).json({
        error: "Review not found.",
      });
    } else if (review["created_by"] !== user_id) {
      return res.status(403).json({
        error: "Review creator does not match with user id.",
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

export const getPlaceRating = async (req, res) => {
  const { place_id } = req.params;

  try {
    const rating = await Review.getPlaceRating(place_id);

    if (!rating) {
      return res.status(404).json({ error: "Place rating not found." });
    }

    return res.status(200).json({
      success: true,
      message: "Successfully fetched place rating.",
      data: rating,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};
