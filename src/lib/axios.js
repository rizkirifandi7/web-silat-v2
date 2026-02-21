import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: "/api/proxy",
  withCredentials: true,
});

// Response interceptor — auto-unwrap response.data
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // Handle 401 Unauthorized — token expired
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        Cookies.remove("user_role", { path: "/" });
        // Jangan redirect kalau sudah di halaman login/register
        const isAuthPage =
          window.location.pathname === "/login" ||
          window.location.pathname === "/register";
        if (!isAuthPage) {
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  },
);

export default api;
