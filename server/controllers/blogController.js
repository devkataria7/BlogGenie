import imagekit from "../configs/imageKit.js";
import Blog from "../models/Blog.js";
import main from "../configs/gemini.js";
import Comment from "../models/Comment.js";

export const addBlog = async (req, res) => {
  try {
    // Parse blog data from request
    const { title, subtitle, description, category, isPublished } = JSON.parse(
      req.body.blog
    );

    const imageFile = req.file;

    // Validate required fields
    if (
      !title ||
      !category ||
      !description ||
      !imageFile ||
      isPublished === undefined
    ) {
      return res.json({ success: false, message: "Missing required field(s)" });
    }

    // Convert uploaded image buffer to base64 (no disk writes)
    const fileBase64 = imageFile.buffer.toString("base64");

    // Upload image to ImageKit
    const response = await imagekit.files.upload({
      file: fileBase64,
      fileName: imageFile.originalname,
      folder: "/blogs",
    });

    // Apply ImageKit transformations for optimization
    const optimizationImageURL = imagekit.helper.buildSrc({
      urlEndpoint: imagekit._options.urlEndpoint,
      src: response.filePath,
      transformation: [
        { quality: "auto" }, // auto compression
        { format: "webp" }, // convert to mordern format
        { width: "1208" }, // width resizing
      ],
    });

    // Save new blog in MongoDB
    await Blog.create({
      title,
      subtitle,
      description,
      category,
      image: optimizationImageURL,
      isPublished: Boolean(isPublished),
    });

    res.json({ success: true, message: "Blog added successfully" });
  } catch (error) {
    console.error("Add Blog Error:", error);
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
    const newPrompt = `
      You are an expert content writer. Generate a blog post for the following topic:

      Title: ${prompt}  
        

      Requirements:
      1. Write in clear, simple, and professional language.
      2. The blog should be **long and informative**, around 500–700 words or more.
      3. Include a catchy subtitle.
      4. Structure the blog as follows:
        - A brief, engaging introduction (2–3 paragraphs)
        - Main body with multiple sections, mixing paragraphs and bullet points for key tips, insights, or examples
        - A concise conclusion (1–2 paragraphs)
      5. Use headings or subheadings for each section if necessary.
      6. Keep it unique, reader-friendly, and scannable.
      7. Output only the blog content as plain text — do not include extra commentary or meta-text.
      `;

    const content = await main(newPrompt);
    res.json({ success: true, content });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
