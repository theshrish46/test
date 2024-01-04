import express from "express";
import {
  getuserpost,
  login,
  register,
} from "../controllers/auth.controller.js";
const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);

authRouter.post("/getuserpost", getuserpost);

export { authRouter };
