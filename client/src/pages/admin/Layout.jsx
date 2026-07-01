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
    <div className="flex flex-1 flex-col h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="flex items-center justify-between py-2 h-[70px] px-4 sm:px-12 border-b border-slate-800 bg-slate-950/90 flex-shrink-0">
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

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 overflow-auto bg-slate-950">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
