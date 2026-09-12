import { User } from "../models/userModels.js";

export const createUser = async (req, res) => {
  const user_id = req.user.id;
  const properties = { ...req.body, id: user_id };

  try {
    const user = await User.create(properties);

    return res.status(201).json({
      success: true,
      message: "Successfully created user.",
      insertedData: user,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

export const getUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.get(id);

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    return res.status(200).json({
      success: true,
      message: "Successfully fetched user.",
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const user = await User.update(id, updates);

    if (!user) {
      return res.status(404).json({
        error: "User not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Successfully updated user.",
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.get(id);

    if (!user) {
      return res.status(404).json({
        error: "User not found.",
      });
    }

    const deletedUser = await User.delete(id);

    return res.status(204).json({
      success: true,
      message: "Successfully deleted user.",
      data: deletedUser,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};
