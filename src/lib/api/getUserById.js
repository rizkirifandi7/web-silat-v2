import api from "@/lib/axios";

export const getUserById = async (id) => {
  return api.get(`/users/${id}`);
};
