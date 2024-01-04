import express from "express";

import {
  write,
  getPost,
  getPostWithId,
  editPostWithId,
  deletePostWithId,
} from "./../controllers/blog.controller.js";
import { verifyJWT } from "./../middlewares/auth.middleware.js";

const blogRouter = express.Router();

blogRouter.post("/write", verifyJWT, write);
blogRouter.get("/getpost", getPost);
blogRouter.get("/getpost/:id", getPostWithId);
blogRouter.put("/edit/:id", editPostWithId);
blogRouter.delete("/delete/:id", deletePostWithId);

export { blogRouter };
