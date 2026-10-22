import express from "express";
import * as scheduleController from "../controllers/scheduleController.js";
import { validate } from "../middlewares/validationMiddleware.js";
import { validatePlace } from "../middlewares/validatePlaceMiddleware.js";
import {
  CreateScheduleSchema,
  DeleteScheduleSchema,
  GetScheduleSchema,
  UpdateScheduleSchema,
} from "../schemas/scheduleSchemas.js";

const router = express.Router({ mergeParams: true }); // mergeParams to access place_id from parent router

router.get(
  "/",
  validate(GetScheduleSchema),
  validatePlace,
  scheduleController.getSchedule,
);

router.post(
  "/",
  validate(CreateScheduleSchema),
  validatePlace,
  scheduleController.createSchedule,
);

router.patch(
  "/",
  validate(UpdateScheduleSchema),
  validatePlace,
  scheduleController.updateSchedule,
);

router.delete(
  "/",
  validate(DeleteScheduleSchema),
  validatePlace,
  scheduleController.deleteSchedule,
);

export default router;
