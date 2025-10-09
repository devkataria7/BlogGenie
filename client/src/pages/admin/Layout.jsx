import React from "react";
import { assets } from "../../assets/assets";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";
import { useAppContext } from "../../context/AppContext";

const Layout = () => {
  const { axios, navigate, setToken } = useAppContext();
  const logout = () => {
    localStorage.removeItem("token");
    axios.defaults.headers.common["Authorization"] = null;
    setToken(null);
    navigate("/");
  };
  return (
    <div className="flex flex-1 flex-col h-screen overflow-hidden">
      {/* Navbar fixed height */}
      <div className="flex items-center justify-between py-2 h-[70px] px-4 sm:px-12 border-b border-gray-200 flex-shrink-0">
        <img
          src={assets.logo}
          alt=""
          className="w-32 sm:w-40 cursor-pointer"
          onClick={() => navigate("/")}
        />
        <button
          onClick={logout}
          className="text-sm px-8 py-2 bg-primary text-white rounded-full cursor-pointer"
        >
          Logout
        </button>
      </div>

      {/* Sidebar + Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar fixed width */}
        <Sidebar />

        {/* Main content scrolls internally */}
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
