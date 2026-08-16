import express from "express";
import * as amenityController from "../controllers/amenityController.js";
import multer from "multer";
import { validate } from "../middlewares/validationMiddleware.js";
import {
  CreateAmenitySchema,
  DeleteAmenitySchema,
  GetAmenitySchema,
  UpdateAmenitySchema,
} from "../schemas/amenitySchemas.js";
import { validatePlace } from "../middlewares/validatePlaceMiddleware.js";

const router = express.Router({ mergeParams: true }); // mergeParams to access place_id from parent router

router.get(
  "/",
  validate(GetAmenitySchema),
  validatePlace,
  amenityController.getAmenity,
);

router.post(
  "/",
  validate(CreateAmenitySchema),
  validatePlace,
  amenityController.createAmenity,
);

router.patch(
  "/",
  validate(UpdateAmenitySchema),
  validatePlace,
  amenityController.updateAmenity,
);

router.delete(
  "/",
  validate(DeleteAmenitySchema),
  validatePlace,
  amenityController.deleteAmenity,
);

export default router;
