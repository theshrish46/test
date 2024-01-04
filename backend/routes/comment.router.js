import express from "express";
import { commentPost, likedUser } from "../controllers/comment.controller.js";

const commentRouter = express.Router();

commentRouter.post("/comment/:id", commentPost);
commentRouter.post("/like/:id", likedUser);

export { commentRouter };
