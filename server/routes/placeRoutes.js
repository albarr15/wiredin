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
import { fileValidation } from "../middlewares/fileValidationMiddleware.js";
import { MAX_FILE_IMAGE_SIZE } from "../../constants/fileConstants.js";

import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: MAX_FILE_IMAGE_SIZE },
});

const router = express.Router();

router.get("/", validate(GetAllPlacesSchema), placeController.getAllPlaces);

router.patch(
  "/:id",
  upload.single("image_url"),
  fileValidation,
  validate(UpdatePlaceSchema),
  placeController.updatePlace,
);

router.post(
  "/",
  upload.single("image_url"),
  fileValidation,
  validate(CreatePlaceSchema),
  placeController.createPlace,
);

router.delete("/:id", validate(DeletePlaceSchema), placeController.deletePlace);

export default router;
