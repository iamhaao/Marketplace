import User from "../models/user.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
export const signup = async (req, res, next) => {
  const { email, password, username } = req.body;
  const hashedPassword = await bcryptjs.hash(password, 10);
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });
  try {
    await newUser.save();
    res.status(201).json("user create successfull!");
  } catch (error) {
    next(error);
  }
};
