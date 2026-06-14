import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

export const register = async (
  req,
  res
) => {
  try {
    const {
      name,
      email,
      password,
    } = req.body;

    const existingUser =
      await User.findOne({
        email,
      });

    if (existingUser) {
      return res.status(400).json({
        message:
          "User already exists",
      });
    }

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    const user =
      await User.create({
        name,
        email,
        password:
          hashedPassword,
      });

    const token =
      generateToken(
        user._id
      );

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message:
        error.message,
    });
  }
};

export const login = async (
  req,
  res
) => {
  try {
    const {
      email,
      password,
    } = req.body;

    const user =
      await User.findOne({
        email,
      });

    if (!user) {
      return res.status(400).json({
        message:
          "Invalid Credentials",
      });
    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      return res.status(400).json({
        message:
          "Invalid Credentials",
      });
    }

    const token =
      generateToken(
        user._id
      );

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message:
        error.message,
    });
  }
};

export const getProfile = async (
  req,
  res
) => {
  try {
    const user =
      await User.findById(
        req.user.id
      ).select("-password");

    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};