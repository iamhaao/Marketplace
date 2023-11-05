import User from "../models/user.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import { response } from "express";
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
export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User not found!!!!"));
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(401, "Invalid Password!!!"));
    }

    const token = jwt.sign({ id: validUser._id }, "iamhaao");
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ validUser });
  } catch (error) {
    next(error); // If there's an error in the try block
  }
};
export const google = async (req, res, next) => {
  const { email, username, avatar } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      const token = jwt.sign({ id: user._id }, "iamhaao");
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json({ user });
    } else {
      const newUser = new User({ username, email, avatar });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, "iamhaao");
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json({ newUser });
    }
  } catch (error) {
    next(error);
  }
};
