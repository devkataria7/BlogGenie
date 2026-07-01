import React from "react";
import { useNavigate } from "react-router-dom";

const BlogCard = ({ blog }) => {
  const { title, description, category, image, _id } = blog;
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/blog/${_id}`)}
      className="w-full rounded-xl overflow-hidden border border-slate-800 bg-slate-900/90 shadow-lg shadow-black/20 hover:scale-105 hover:shadow-primary/20 duration-300 cursor-pointer"
    >
      <img src={image} alt={title} className="aspect-video object-cover" />
      <span className="ml-5 mt-4 px-3 py-1 inline-block bg-primary/15 rounded-full text-primary text-xs">
        {category}
      </span>
      <div className="p-5">
        <h5 className="mb-2 font-medium text-slate-100">{title}</h5>
        <p
          className="mb-3 text-xs text-slate-400"
          dangerouslySetInnerHTML={{ __html: description.slice(0, 80) }}
        ></p>
      </div>
    </div>
  );
};

export default BlogCard;
