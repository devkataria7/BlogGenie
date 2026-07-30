import express from "express";
import auth from "../middleware/auth.js";
import upload from "../middleware/multer.js";
import {
  adminLogin,
  approveComment,
  deleteCommentByID,
  getAllBlogsAdmin,
  getAllComments,
  getDashboard,
  generateContent,
  addBlog,
  togglePublish,
  deleteBlogByID,
} from "../controllers/adminController.js";

const adminRouter = express.Router();

adminRouter.post("/login", adminLogin);
adminRouter.get("/comments", auth, getAllComments);
adminRouter.get("/blogs", auth, getAllBlogsAdmin);
adminRouter.get("/dashboard", auth, getDashboard);
adminRouter.post("/delete-comment", auth, deleteCommentByID);
adminRouter.post("/approve-comment", auth, approveComment);
adminRouter.post("/add", upload.single("image"), auth, addBlog);
adminRouter.post("/generate", auth, generateContent);
adminRouter.post("/delete-blog", auth, deleteBlogByID);
adminRouter.post("/toggle-publish", auth, togglePublish);

export default adminRouter;
