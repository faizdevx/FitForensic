import User from "../models/User.js";

export async function getMe(req, res) {
  const user = await User.findById(req.userId).select("-passwordHash");

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  return res.status(200).json({ user });
}

export async function updateMe(req, res) {
  const allowedFields = ["name", "avatar", "bio"];
  const updates = {};

  for (const field of allowedFields) {
    if (req.body[field] !== undefined) {
      updates[field] = req.body[field];
    }
  }

  const user = await User.findByIdAndUpdate(
    req.userId,
    updates,
    { new: true, runValidators: true }
  ).select("-passwordHash");

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  return res.status(200).json({ user });
}
