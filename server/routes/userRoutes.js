import express from "express";
import * as userController from "../controllers/userController.js";
import multer from "multer";
import { validate } from "../middlewares/validationMiddleware.js";
import authenticateUser from "../middlewares/authMiddleware.js";
import { validateUser } from "../middlewares/validateUserMiddleware.js";
import {
  CreateUserSchema,
  DeleteUserSchema,
  GetUserSchema,
  UpdateUserSchema,
} from "../schemas/userSchemas.js";

const router = express.Router({ mergeParams: true }); // mergeParams to access place_id from parent router

// Note: not yet implementing file upload for profile pictures to save on storage

router.get(
  "/:id",
  validate(GetUserSchema),
  validateUser,
  userController.getUser,
);

router.post(
  "/",
  validate(CreateUserSchema),
  authenticateUser,
  userController.createUser,
);

router.patch(
  "/me",
  validate(UpdateUserSchema),
  authenticateUser,
  userController.updateUser,
);

router.delete(
  "/:id",
  validate(DeleteUserSchema),
  validateUser,
  userController.deleteUser,
);

export default router;
