import express from "express";
import { pool } from "../config/db.js";
import * as placeController from "../controllers/placeController.js";

import multer from "multer";
const upload = multer();

const router = express.Router();

router.get("/", placeController.getAllPlaces);

router.patch("/:id", upload.none(), placeController.updatePlace);

router.post("/", upload.none(), placeController.createPlace);

router.delete("/:id", placeController.deletePlace);

export default router;
