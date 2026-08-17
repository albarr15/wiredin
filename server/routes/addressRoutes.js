import express from "express";
import * as addressController from "../controllers/addressController.js";
import multer from "multer";
import { validate } from "../middlewares/validationMiddleware.js";
import { validatePlace } from "../middlewares/validatePlaceMiddleware.js";
import {
  CreateAddressSchema,
  DeleteAddressSchema,
  getAddressSchema,
  UpdateAddressSchema,
} from "../schemas/addressSchemas.js";

const router = express.Router({ mergeParams: true }); // mergeParams to access place_id from parent router

router.get(
  "/",
  validate(getAddressSchema),
  validatePlace,
  addressController.getAddress,
);

router.post(
  "/",
  validate(CreateAddressSchema),
  validatePlace,
  addressController.createAddress,
);

router.patch(
  "/",
  validate(UpdateAddressSchema),
  validatePlace,
  addressController.updateAddress,
);

router.delete(
  "/",
  validate(DeleteAddressSchema),
  validatePlace,
  addressController.deleteAddress,
);

export default router;
