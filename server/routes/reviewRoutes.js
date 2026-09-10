import express from "express";
import * as reviewController from "../controllers/reviewController.js";
import { validate } from "../middlewares/validationMiddleware.js";
import {
  CreateReviewSchema,
  DeleteReviewSchema,
  GetReviewByIdSchema,
  GetReviewsByPlaceIdSchema,
  UpdateReviewSchema,
} from "../schemas/reviewSchemas.js";
import { validatePlace } from "../middlewares/validatePlaceMiddleware.js";
import authenticateUser from "../middlewares/authMiddleware.js";

const router = express.Router({ mergeParams: true }); // mergeParams to access place_id from parent router

router.get(
  "/:id",
  validate(GetReviewByIdSchema),
  validatePlace,
  reviewController.getReviewById,
);

router.get(
  "/",
  validate(GetReviewsByPlaceIdSchema),
  validatePlace,
  reviewController.getReviewsByPlaceId,
);

router.post(
  "/",
  validate(CreateReviewSchema),
  validatePlace,
  authenticateUser,
  reviewController.createReview,
);

router.patch(
  "/:id",
  validate(UpdateReviewSchema),
  validatePlace,
  authenticateUser,
  reviewController.updateReview,
);

router.delete(
  "/:id",
  validate(DeleteReviewSchema),
  validatePlace,
  authenticateUser,
  reviewController.deleteReview,
);

export default router;
