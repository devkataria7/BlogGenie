import React from "react";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const CommentTableItem = ({ comment, fetchComments }) => {
  const { blog, createdAt, _id } = comment;
  const BlogDate = new Date(createdAt);

  const { axios } = useAppContext();

  const approveComment = async () => {
    try {
      const { data } = await axios.post("/api/admin/approve-comment", {
        id: _id,
      });
      if (data.success) {
        toast.success(data.message);
        fetchComments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteComment = async () => {
    try {
      const confirm = window.confirm("Delete confirmation");
      if (!confirm) {
        return;
      }
      const { data } = await axios.post("/api/admin/delete-comment", {
        id: _id,
      });
      if (data.success) {
        toast.success(data.message);
        fetchComments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <tr className="border-y border-slate-800">
      <td className="px-6 py-4 text-slate-300">
        <b className="font-medium text-slate-100">Blog</b>: {blog.title}
        <br />
        <br />
        <b className="font-medium text-slate-100">Name</b>: {comment.name}
        <br />
        <b className="font-medium text-slate-100">Comment</b>: {comment.content}
      </td>
      <td className="px-6 py-4 max-sm:hidden text-slate-400">
        {BlogDate.toLocaleDateString()}
      </td>
      <td className="px-6 py-4">
        <div className="inline-flex items-center gap-4 ">
          {!comment.isApproved ? (
            <img
              onClick={approveComment}
              src={assets.tick_icon}
              className="w-5 hover:scale-110 transition-all cursor-pointer"
              alt=""
            />
          ) : (
            <p className="text-xs border border-emerald-600 bg-emerald-500/10 text-emerald-400 rounded-full px-3 py-1 ">
              Approved
            </p>
          )}
          <img
            onClick={deleteComment}
            src={assets.bin_icon}
            className="w-5 hover:scale-110 transition-all cursor-pointer"
            alt=""
          />
        </div>
      </td>
    </tr>
  );
};

export default CommentTableItem;
