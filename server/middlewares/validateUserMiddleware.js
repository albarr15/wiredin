import { User } from "../models/userModels.js";

export const validateUser = async (req, res, next) => {
    const { id } = req.params;
    const user = await User.get(id);

    if (!user) {
        return res.status(404).json({ error: "User not found." });
    }

    next();
};
