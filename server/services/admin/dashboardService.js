import Blog from "../../models/Blog.js";
import Comment from "../../models/Comment.js";
import AppError from "../../utils/AppError.js";

export const fetchDashboardData = async () => {
  try {
    const recentBlogs = await Blog.find({}).sort({ createdAt: -1 }).limit(5);

    const blogs = await Blog.countDocuments();
    const comments = await Comment.countDocuments();
    const drafts = await Blog.countDocuments({
      isPublished: false,
    });

    return {
      blogs,
      comments,
      drafts,
      recentBlogs,
    };
  } catch (error) {
    throw new AppError(
      "Unable to load dashboard data at the moment.",
      503,
      error,
    );
  }
};
