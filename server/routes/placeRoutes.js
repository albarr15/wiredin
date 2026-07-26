import express from "express";
import { pool } from "../config/db.js";
import * as placeController from "../controllers/placeController.js";
import { validate } from "../middlewares/validationMiddleware.js";
import {
  GetAllPlacesSchema,
  UpdatePlaceSchema,
  CreatePlaceSchema,
  DeletePlaceSchema,
} from "../schemas/placeSchemas.js";

import multer from "multer";
const upload = multer();

const router = express.Router();

router.get("/", validate(GetAllPlacesSchema), placeController.getAllPlaces);

router.patch(
  "/:id",
  upload.none(),
  validate(UpdatePlaceSchema),
  placeController.updatePlace,
);

router.post(
  "/",
  upload.none(),
  validate(CreatePlaceSchema),
  placeController.createPlace,
);

router.delete("/:id", validate(DeletePlaceSchema), placeController.deletePlace);

export default router;
