import api from "@/lib/axios";

export const login = async (email, password) => {
  return api.post("/auth/login", { email, password });
};

export const register = async (userData) => {
  return api.post("/auth/register", userData);
};

export const getProfile = async () => {
  return api.get("/auth/profile");
};

export const verifyToken = async () => {
  return api.get("/auth/verify");
};

export const logout = async () => {
  return api.post("/auth/logout");
};
