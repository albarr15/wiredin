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
  reviewController.createReview,
);

router.patch(
  "/",
  validate(UpdateReviewSchema),
  validatePlace,
  reviewController.updateReview,
);

router.delete(
  "/:id",
  validate(DeleteReviewSchema),
  validatePlace,
  reviewController.deleteReview,
);

export default router;
