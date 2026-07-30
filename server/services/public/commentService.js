import Blog from "../../models/Blog.js";
import Comment from "../../models/Comment.js";
import AppError from "../../utils/AppError.js";

export const createComment = async ({ blog, name, content }) => {
  try {
    const existingBlog = await Blog.findById(blog);

    if (!existingBlog) {
      throw new AppError("Blog not found.", 404);
    }

    await Comment.create({
      blog,
      name,
      content,
    });

    return;
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError("Unable to add comment at the moment.", 503, error);
  }
};

export const fetchApprovedComments = async ({ blogID }) => {
  try {
    const blog = await Blog.findById(blogID);

    if (!blog) {
      throw new AppError("Blog not found.", 404);
    }

    const comments = await Comment.find({
      blog: blogID,
      isApproved: true,
    }).sort({ createdAt: -1 });

    return comments;
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError("Unable to fetch comments at the moment.", 503, error);
  }
};
