import asyncHandler from "../utils/asyncHandler.js";
import { login } from "../services/admin/adminService.js";
import { fetchAllBlogs } from "../services/admin/blogService.js";
import { fetchDashboardData } from "../services/admin/dashboardService.js";
import { generateContent as generateBlogContent } from "../services/ai/aiService.js";
import {
  fetchAllComments,
  deleteComment,
  approveCommentById,
} from "../services/admin/commentService.js";
import {
  toggleBlogPublishStatus,
  deleteBlog,
  createBlog,
} from "../services/admin/blogService.js";

// to login admin to dashboard
export const adminLogin = asyncHandler(async (req, res) => {
  const token = await login(req.body);

  res.json({ success: true, token });
});

// to get all blog lists
export const getAllBlogsAdmin = asyncHandler(async (req, res) => {
  const blogs = await fetchAllBlogs();

  res.json({
    success: true,
    blogs,
  });
});

// to get all commenst
export const getAllComments = asyncHandler(async (req, res) => {
  const comments = await fetchAllComments();

  res.json({
    success: true,
    comments,
  });
});

// dashboard data
export const getDashboard = asyncHandler(async (req, res) => {
  const dashboardData = await fetchDashboardData();

  res.json({
    success: true,
    dashboardData,
  });
});

// delete comment by id
export const deleteCommentByID = asyncHandler(async (req, res) => {
  await deleteComment(req.body);

  res.json({
    success: true,
    message: "Comment deleted successfully",
  });
});

// approve comment
export const approveComment = asyncHandler(async (req, res) => {
  await approveCommentById(req.body);

  res.json({
    success: true,
    message: "Comment approved successfully",
  });
});

// delete blog by id
export const deleteBlogByID = asyncHandler(async (req, res) => {
  await deleteBlog(req.body);

  res.json({
    success: true,
    message: "Blog deleted successfully",
  });
});

// toggle between publich and unpublish
export const togglePublish = asyncHandler(async (req, res) => {
  await toggleBlogPublishStatus(req.body);

  res.json({
    success: true,
    message: "Blog status updated",
  });
});

// add new blog
export const addBlog = asyncHandler(async (req, res) => {
  const blogData = JSON.parse(req.body.blog);

  await createBlog({
    ...blogData,
    imageFile: req.file,
  });

  res.json({
    success: true,
    message: "Blog added successfully",
  });
});

// used by addblog to generate content by AI
export const generateContent = asyncHandler(async (req, res) => {
  const content = await generateBlogContent(req.body);

  res.json({
    success: true,
    content,
  });
});
