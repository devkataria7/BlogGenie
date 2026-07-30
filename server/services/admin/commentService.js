import Comment from "../../models/Comment.js";
import AppError from "../../utils/AppError.js";

export const fetchAllComments = async () => {
  try {
    const comments = await Comment.find({})
      .populate("blog")
      .sort({ createdAt: -1 });

    return comments;
  } catch (error) {
    throw new AppError("Unable to fetch comments at the moment.", 503, error);
  }
};

export const deleteComment = async ({ id }) => {
  try {
    const comment = await Comment.findById(id);

    if (!comment) {
      throw new AppError("Comment not found.", 404);
    }

    await comment.deleteOne();
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError(
      "Unable to delete the comment at the moment.",
      503,
      error,
    );
  }
};

export const approveCommentById = async ({ id }) => {
  try {
    const comment = await Comment.findById(id);

    if (!comment) {
      throw new AppError("Comment not found.", 404);
    }

    comment.isApproved = true;
    await comment.save();
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError(
      "Unable to approve the comment at the moment.",
      503,
      error,
    );
  }
};
