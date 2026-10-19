import { UserModel } from "../models/user.model.js";
import bcrypt from "bcrypt";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateTokens.js";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

export let registerService = async (data) => {
  try {
    let { name, email, password } = data;

    if (!email || !password) {
      throw new Error("All fields are required!");
    }

    const isExisted = await UserModel.findOne({ email });

    if (isExisted) {
      throw new Error("User already exists with this email!");
    }

    let hashPass = bcrypt.hashSync(password, 10);

    let newUser = await UserModel.create({ name, email, password: hashPass });

    let accessToken = generateAccessToken(newUser._id);
    let refreshToken = generateRefreshToken(newUser._id);

    newUser.refreshToken = refreshToken;

    await newUser.save();

    return { accessToken, refreshToken, newUser };
  } catch (error) {
    throw new Error(error);
  }
};

export let loginService = async (data) => {
  try {
    let { name, email, password } = data;

    if (!email || !password) {
      throw new Error("All fields are required!");
    }

    const isExisted = await UserModel.findOne({ email });
    if (!isExisted) {
      throw new Error("User not found!");
    }

    let hashPass = bcrypt.compareSync(password, isExisted.password);

    if (!hashPass) {
      throw new Error("Invalid credentials!");
    }

    let accessToken = generateAccessToken(isExisted._id);
    let refreshToken = generateRefreshToken(isExisted._id);

    isExisted.refreshToken = refreshToken;

    await isExisted.save();

    return { accessToken, refreshToken, isExisted };
  } catch (error) {
    throw new Error(error);
  }
};

export let getAccessTokenService = async (refreshToken) => {
  let decode = jwt.verify(refreshToken, config.JWT_REFRESH_SECRET);

  if (!decode) {
    throw new Error("Unauthorized!");
  }

  let user = await UserModel.findById(decode.id);

  if (refreshToken !== user.refreshToken) {
    throw new Error("Unauthorized!");
  }

  let accessToken = generateAccessToken(user._id);

  return accessToken;
};
