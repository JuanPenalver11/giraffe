import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const authUser = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) return res.status(401).json({ error: "Unauthorized" });

    const decoToken = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoToken.userId).select("-password");

    req.user = user;

    next();
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
