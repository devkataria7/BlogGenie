import express from "express";
import upload from "../middleware/multer.js";
import auth from "../middleware/auth.js";
import {
  addComment,
  getAllBlogs,
  getBlogByID,
  getBlogComments,
} from "../controllers/blogController.js";

const blogRouter = express.Router();

blogRouter.get("/all", getAllBlogs);
blogRouter.get("/:blogID", getBlogByID);
blogRouter.post("/add-comment", addComment);
blogRouter.post("/comments", getBlogComments);

export default blogRouter;
