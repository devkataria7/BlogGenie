import React from "react";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const BlogTableItem = ({ blog, fetchBlogs, index }) => {
  const { title, createdAt } = blog;
  const BlogDate = new Date(createdAt);

  const { axios } = useAppContext();

  const deleteBlog = async () => {
    const confirm = window.confirm("Delete confirm");
    if (!confirm) return;

    try {
      const { data } = await axios.post("/api/blog/delete", {
        id: blog._id,
      });

      if (data.success) {
        toast.success(data.message);
        await fetchBlogs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const togglePublish = async () => {
    try {
      const { data } = await axios.post("/api/blog/toggle-publish", {
        id: blog._id,
      });

      if (data.success) {
        toast.success(data.message);
        await fetchBlogs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <tr className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors duration-200">
      <th className="px-2 py-4 xl:px-6 font-medium text-slate-300">{index}</th>

      <td className="px-2 py-4 text-slate-200">{title}</td>

      <td className="px-2 py-4 max-sm:hidden text-slate-400">
        {BlogDate.toDateString()}
      </td>

      <td className="px-2 py-4 max-sm:hidden">
        <span
          className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
            blog.isPublished
              ? "bg-emerald-500/15 text-emerald-400"
              : "bg-amber-500/15 text-amber-400"
          }`}
        >
          {blog.isPublished ? "Published" : "Unpublished"}
        </span>
      </td>

      <td className="flex gap-3 px-2 py-4 text-xs">
        <button
          onClick={togglePublish}
          className="rounded-md border border-slate-700 bg-slate-800 px-3 py-1 text-slate-200 transition-all hover:border-[#6C63FF] hover:bg-[#6C63FF] hover:text-white"
        >
          {blog.isPublished ? "Unpublish" : "Publish"}
        </button>

        <button
          onClick={deleteBlog}
          className="rounded-md p-1 transition-all hover:bg-red-500/10"
        >
          <img
            src={assets.cross_icon}
            className="w-7 cursor-pointer transition-transform hover:scale-110"
            alt="delete"
          />
        </button>
      </td>
    </tr>
  );
};

export default BlogTableItem;
