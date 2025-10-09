import express from "express";
import {
  adminLogin,
  approveComment,
  deleteCommentByID,
  getAllBlogsAdmin,
  getAllComments,
  getDashboard,
} from "../controllers/adminController.js";
import auth from "../middleware/auth.js";

const adminRouter = express.Router();

adminRouter.post("/login", adminLogin);
adminRouter.get("/comments", auth, getAllComments);
adminRouter.get("/blogs", auth, getAllBlogsAdmin);
adminRouter.get("/dashboard", auth, getDashboard);
adminRouter.post("/delete-comment", auth, deleteCommentByID);
adminRouter.post("/approve-comment", auth, approveComment);

export default adminRouter;
