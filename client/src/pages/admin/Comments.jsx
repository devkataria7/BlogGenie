import React, { useEffect, useState } from "react";
import CommentTableItem from "../../components/admin/CommentTableItem";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [filter, setFilter] = useState("Not Approved");

  const { axios } = useAppContext();

  const fetchComments = async () => {
    try {
      const { data } = await axios.get("api/admin/comments");
      data.success ? setComments(data.comments) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);
  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 text-slate-300">
      <div className="flex justify-between items-center max-w-3xl">
        <h1 className="text-slate-100">Comments</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setFilter(`Approved`)}
            className={`shadow-custom-sm border border-slate-700 rounded-full px-4 py-1 cursor-pointer text-xs ${
              filter === `Approved`
                ? `text-primary bg-primary/10`
                : `text-slate-400 bg-slate-900/70`
            }`}
          >
            Approved
          </button>

          <button
            onClick={() => setFilter(`Not Approved`)}
            className={`shadow-custom-sm border border-slate-700 rounded-full px-4 py-1 cursor-pointer text-xs ${
              filter === `Not Approved`
                ? `text-primary bg-primary/10`
                : `text-slate-400 bg-slate-900/70`
            }`}
          >
            Not Approved
          </button>
        </div>
      </div>

      <div className="relative max-h-125 max-w-3xl overflow-x-auto mt-4 bg-slate-900/80 border border-slate-800 shadow rounded-lg scrollbar-hide">
        <table className="w-full text-sm text-slate-400">
          <thead className="text-xs text-slate-300 text-left uppercase sticky top-0 bg-slate-900 z-10 shadow-sm">
            <tr>
              <th scope="col" className="px-6 py-3">
                Blog title & Comment
              </th>
              <th scope="col" className="px-6 py-3 max-sm:hidden">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {comments
              .filter((comment) => {
                if (filter === "Approved") return comment.isApproved === true;
                return comment.isApproved === false;
              })
              .map((comment, index) => (
                <CommentTableItem
                  key={comment._id}
                  index={index}
                  comment={comment}
                  fetchComments={fetchComments}
                />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Comments;
