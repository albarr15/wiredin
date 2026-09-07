import express from "express";
import * as placeController from "../controllers/placeController.js";
import { validate } from "../middlewares/validationMiddleware.js";
import {
  GetAllPlacesSchema,
  UpdatePlaceSchema,
  CreatePlaceSchema,
  DeletePlaceSchema,
} from "../schemas/placeSchemas.js";
import amenityRoutes from "./amenityRoutes.js";
import addressRoutes from "./addressRoutes.js";
import scheduleRoutes from "./scheduleRoutes.js";

import { fileValidation } from "../middlewares/fileValidationMiddleware.js";
import { MAX_FILE_IMAGE_SIZE } from "../constants/fileConstants.js";

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

router.use("/:place_id/amenities", amenityRoutes);
router.use("/:place_id/addresses", addressRoutes);
router.use("/:place_id/schedules", scheduleRoutes);

export default router;
