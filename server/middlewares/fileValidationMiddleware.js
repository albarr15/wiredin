import { fileTypeFromBuffer } from "file-type";
import fs from "fs";
import { ACCEPTED_IMAGE_TYPES } from "../../constants/fileConstants.js";

export const fileValidation = async (req, res, next) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        error: "Please upload a valid image.",
      });
    }

    const type = await fileTypeFromBuffer(file.buffer);

    if (!type || !ACCEPTED_IMAGE_TYPES.includes(type.mime)) {
      return res.status(400).json({
        error: "Invalid file type.",
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};
