import Blog from "../../models/Blog.js";
import AppError from "../../utils/AppError.js";

export const fetchPublishedBlogs = async () => {
  try {
    const blogs = await Blog.find({ isPublished: true });

    return blogs;
  } catch (error) {
    throw new AppError("Unable to fetch blogs at the moment.", 503, error);
  }
};

export const fetchPublishedBlogById = async ({ blogID }) => {
  try {
    const blog = await Blog.findById(blogID);

    if (!blog) {
      throw new AppError("Blog not found.", 404);
    }

    return blog;
  } catch (error) {
    if (error instanceof AppError) throw error;

    throw new AppError("Unable to fetch blog at the moment.", 503, error);
  }
};
