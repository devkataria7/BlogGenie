import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AppContext = createContext();

// ste axious url
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

// set axios interceptor
axios.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {
    toast.error(error.response?.data?.message || error.message);

    return Promise.reject(error);
  },
);

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();

  const [token, setToken] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [input, setInput] = useState("");

  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get("/api/blog/all");
      //   console.log(data);
      data.success ? setBlogs(data.blogs) : toast.error(data.message);
    } catch (error) {
      // handled by axios interceptor
      // toast.error(error.message);
    }
  };
  const value = {
    axios,
    navigate,
    token,
    setToken,
    blogs,
    setBlogs,
    input,
    setInput,
    fetchBlogs,
  };

  useEffect(() => {
    fetchBlogs();
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
      axios.defaults.headers.common["Authorization"] = `${token}`;
    }
  }, []);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
