import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import BlogTableItem from "../../components/admin/BlogTableItem";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [dashboardData, setDashBoardData] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: [],
  });

  const { axios } = useAppContext();
  const fetchDashboard = async () => {
    try {
      const { data } = await axios.get("/api/admin/dashboard");
      if (data.success) {
        setDashBoardData(data.dashboardData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);
  return (
    <div className="flex-1 p-4 md:p-10 text-slate-300">
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center gap-4 bg-slate-900/80 border border-slate-800 p-4 min-w-58 rounded shadow-lg shadow-black/20 cursor-pointer hover:scale-105 transition-all">
          <img src={assets.dashboard_icon_1} alt="" />
          <div>
            <p className="text-xl font-semibold text-slate-100">
              {dashboardData.blogs}
            </p>
            <p className="text-slate-400 font-light">Blogs</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-slate-900/80 border border-slate-800 p-4 min-w-58 rounded shadow-lg shadow-black/20 cursor-pointer hover:scale-105 transition-all">
          <img src={assets.dashboard_icon_2} alt="" />
          <div>
            <p className="text-xl font-semibold text-slate-100">
              {dashboardData.comments}
            </p>
            <p className="text-slate-400 font-light">Comments</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-slate-900/80 border border-slate-800 p-4 min-w-58 rounded shadow-lg shadow-black/20 cursor-pointer hover:scale-105 transition-all">
          <img src={assets.dashboard_icon_3} alt="" />
          <div>
            <p className="text-xl font-semibold text-slate-100">
              {dashboardData.drafts}
            </p>
            <p className="text-slate-400 font-light">Drafts</p>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-3 m-4 mt-6 text-slate-300">
          <img src={assets.dashboard_icon_4} alt="" />
          <p>Latest Blogs</p>
        </div>
        <div className="relative max-h-96 max-w-4xl overflow-y-auto shadow rounded-lg bg-slate-900/80 border border-slate-800 scrollbar-hide">
          <table className="w-full text-sm text-slate-400">
            <thead className="text-xs text-slate-300 text-left uppercase sticky top-0 bg-slate-900 z-10 shadow-sm">
              <tr>
                <th scope="col" className="px-2 py-4 xl:px-6">
                  #
                </th>
                <th scope="col" className="px-2 py-4 ">
                  content
                </th>
                <th scope="col" className="px-2 py-4 max-sm:hidden">
                  date
                </th>
                <th scope="col" className="px-2 py-4 max-sm:hidden">
                  status
                </th>
                <th scope="col" className="px-2 py-4 ">
                  action
                </th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.recentBlogs.map((blog, index) => {
                return (
                  <BlogTableItem
                    key={blog._id}
                    blog={blog}
                    fetchBlogs={fetchDashboard}
                    index={index + 1}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
