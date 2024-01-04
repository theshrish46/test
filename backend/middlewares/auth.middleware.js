import jwt from "jsonwebtoken";
import { APIError } from "./../utils/ApiError.js";
import User from "../models/User.js";

export const verifyJWT = async (req, _, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      throw new APIError(401, "No token found");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN);
    const user = await User.findById(decodedToken._id).select(
      "-password -refreshToken",
    );

    if (!user) {
      throw new APIError(402, "Invalid access or token");
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    throw new APIError(400, "JWT verification failed", error);
  }
};
