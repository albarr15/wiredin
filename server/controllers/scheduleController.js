import { Schedule } from "../models/scheduleModels.js";

export const createSchedule = async (req, res) => {
  const { place_id } = req.params;
  const properties = { ...req.body, place_id };

  try {
    const schedule = await Schedule.create(properties);

    return res.status(201).json({
      success: true,
      message: "Successfully created schedule.",
      insertedData: schedule,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

export const getSchedule = async (req, res) => {
  const { place_id } = req.params;

  try {
    const schedule = await Schedule.get(place_id);

    if (!schedule) {
      return res.status(404).json({ error: "Schedule not found." });
    }

    return res.status(200).json({
      success: true,
      message: "Successfully fetched schedule.",
      data: schedule,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

export const updateSchedule = async (req, res) => {
  const { place_id } = req.params;
  const updates = req.body;

  try {
    const schedule = await Schedule.update(place_id, updates);

    if (!schedule) {
      return res.status(404).json({
        error: "Schedule not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Successfully updated schedule.",
      data: schedule,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

export const deleteSchedule = async (req, res) => {
  const { place_id } = req.params;

  try {
    const schedule = await Schedule.get(place_id);

    if (!schedule) {
      return res.status(404).json({
        error: "Schedule not found.",
      });
    }

    const deletedSchedule = await Schedule.delete(place_id);

    return res.status(204).json({
      success: true,
      message: "Successfully deleted schedule.",
      data: deletedSchedule,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};
