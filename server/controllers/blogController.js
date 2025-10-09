import fs from "fs";
import imagekit from "../configs/imageKit.js";
import Blog from "../models/Blog.js";
import Comment from "../models/Comment.js";
import main from "../configs/gemini.js";

export const addBlog = async (req, res) => {
  try {
    const { title, subtitle, description, category, isPublished } = JSON.parse(
      req.body.blog
    );

    const imageFile = req.file;

    if (
      !title ||
      !category ||
      !description ||
      !imageFile ||
      isPublished === undefined
    ) {
      return res.json({ success: false, message: "Missing required field(s)" });
    }

    const fileBuffer = fs.readFileSync(imageFile.path);
    const fileBase64 = fileBuffer.toString("base64");

    // upload image at imagekit
    const response = await imagekit.files.upload({
      file: fileBase64,
      fileName: imageFile.originalname,
      folder: "/blogs",
    });

    // console.log("response.filePath:", response.filePath);
    // console.log("URL :", process.env.IMAGEKIT_URL_ENDPOINT);
    // console.log("URL :", imagekit._options.urlEndpoint);
    // console.log("RESPONSE :", response);

    // Delete the local file after successful upload
    fs.unlinkSync(imageFile.path);

    // optimization through imagekit url transformation
    const optimizationImageURL = imagekit.helper.buildSrc({
      urlEndpoint: imagekit._options.urlEndpoint,
      src: response.filePath,
      transformation: [
        { quality: "auto" }, // auto compression
        { format: "webp" }, // convert to mordern format
        { width: "1208" }, // width resizing
      ],
    });

    const image = optimizationImageURL;

    await Blog.create({
      title,
      subtitle,
      description,
      category,
      image,
      isPublished: Boolean(isPublished),
    });

    res.json({ success: true, message: "Blog added successfully" });
  } catch (error) {
    // console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true });
    res.json({ success: true, blogs });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getBlogByID = async (req, res) => {
  try {
    const { blogID } = req.params;
    const blog = await Blog.findById(blogID);
    if (!blog) {
      return res.json({ success: false, message: "Blog not found" });
    }
    res.json({ success: true, blog });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const deleteBlogByID = async (req, res) => {
  try {
    const { id } = req.body;
    await Blog.findByIdAndDelete(id);

    // delete all comment associated with this blog
    await Comment.deleteMany({ blog: id });

    res.json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const togglePublish = async (req, res) => {
  try {
    const { id } = req.body;
    // console.log(id);
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.json({ success: false, message: "Blog not found" });
    }

    blog.isPublished = !blog.isPublished;
    await blog.save();

    res.json({ success: true, message: "Blog status updated" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const addComment = async (req, res) => {
  try {
    const { blog, name, content } = req.body;
    await Comment.create({ blog, name, content });
    res.json({ success: true, message: "comment added for review" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getBlogComments = async (req, res) => {
  try {
    const { blogID } = req.body;

    const comments = await Comment.find({
      blog: blogID,
      isApproved: true,
    }).sort({ createdAt: -1 });

    res.json({ success: true, comments });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const generateContent = async (req, res) => {
  try {
    const { prompt } = req.body;

    const content = await main(
      prompt + "Generate a blog content for this topic in simple text format"
    );
    res.json({ success: true, content });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
