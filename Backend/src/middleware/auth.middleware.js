import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
import { UserModel } from "../models/user.model.js";

export const authMiddleware = async (req, res, next) => {
  try {
    let accessToken = req.cookies.accessToken;

    if (!accessToken) {
      return res.status(401).json({
        message: "Unauthorized request!",
      });
    }

    let decode = jwt.verify(accessToken, config.JWT_ACCESS_SECRET);

    if (!decode) {
      return res.status(401).json({
        message: "Unauthorized request!",
      });
    }

    let user = await UserModel.findById(decode.id);

    req.user = user;

    next();
  } catch (error) {
    throw new Error(error);
  }
};
