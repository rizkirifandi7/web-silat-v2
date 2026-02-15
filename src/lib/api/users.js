import api from "../axios";

export const params = {
  page: 1,
  limit: 10,
  search: "",
  role: "",
};

export const getUsers = async (params) => {
  const response = await api.get("/users", { params });
  return response.data;
};

export const createUser = async (data) => {
  const response = await api.post("/users", data);
  return response.data;
};

export const updateUser = async (id, data) => {
  const response = await api.patch(`/users/${id}`, data);
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await api.delete(`/users/${id}`);
  return response.data;
};
