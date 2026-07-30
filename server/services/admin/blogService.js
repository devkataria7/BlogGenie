import Blog from "../../models/Blog.js";
import AppError from "../../utils/AppError.js";
import Comment from "../../models/Comment.js";
import imagekit from "../../configs/imageKit.js";

export const fetchAllBlogs = async () => {
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });

    return blogs;
  } catch (error) {
    // console.error("Error fetching blogs:", error);

    throw new AppError("Unable to fetch blogs at the moment.", 503, error);
  }
};

export const toggleBlogPublishStatus = async ({ id }) => {
  try {
    const blog = await Blog.findById(id);

    if (!blog) {
      throw new AppError("Blog not found.", 404);
    }

    blog.isPublished = !blog.isPublished;
    await blog.save();

    return;
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError(
      "Unable to update blog status at the moment.",
      503,
      error,
    );
  }
};

export const deleteBlog = async ({ id }) => {
  try {
    // Check existence
    const blog = await Blog.findById(id);

    if (!blog) {
      throw new AppError("Blog not found.", 404);
    }

    await blog.deleteOne();

    // Delete associated comments
    await Comment.deleteMany({ blog: id });

    return;
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError("Unable to delete blog at the moment.", 503, error);
  }
};

export const createBlog = async ({
  title,
  subtitle,
  description,
  category,
  isPublished,
  imageFile,
}) => {
  try {
    if (
      !title ||
      !category ||
      !description ||
      !imageFile ||
      isPublished === undefined
    ) {
      throw new AppError("Missing required field(s).", 400);
    }

    // Convert uploaded image buffer to base64
    const fileBase64 = imageFile.buffer.toString("base64");

    // Upload image to ImageKit
    const response = await imagekit.files.upload({
      file: fileBase64,
      fileName: imageFile.originalname,
      folder: "/blogs",
    });

    // Optimize image URL
    const optimizationImageURL = imagekit.helper.buildSrc({
      urlEndpoint: imagekit._options.urlEndpoint,
      src: response.filePath,
      transformation: [
        { quality: "auto" },
        { format: "webp" },
        { width: "1208" },
      ],
    });

    await Blog.create({
      title,
      subtitle,
      description,
      category,
      image: optimizationImageURL,
      isPublished: Boolean(isPublished),
    });

    return;
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError("Unable to add the blog at the moment.", 503, error);
  }
};
