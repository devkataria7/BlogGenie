import asyncHandler from "../utils/asyncHandler.js";
import {
  fetchPublishedBlogs,
  fetchPublishedBlogById,
} from "../services/public/blogService.js";
import {
  createComment,
  fetchApprovedComments,
} from "../services/public/commentService.js";

export const getAllBlogs = asyncHandler(async (req, res) => {
  const blogs = await fetchPublishedBlogs();

  res.json({
    success: true,
    blogs,
  });
});

export const getBlogByID = asyncHandler(async (req, res) => {
  const blog = await fetchPublishedBlogById(req.params);

  res.json({
    success: true,
    blog,
  });
});

export const addComment = asyncHandler(async (req, res) => {
  await createComment(req.body);

  res.json({
    success: true,
    message: "Comment added for review.",
  });
});

export const getBlogComments = asyncHandler(async (req, res) => {
  const comments = await fetchApprovedComments(req.body);

  res.json({
    success: true,
    comments,
  });
});
