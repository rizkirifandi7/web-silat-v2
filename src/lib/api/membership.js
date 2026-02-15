import api from "@/lib/axios";

export const verifyMember = async (id) => {
  return api.get(`/anggota/verify/${id}`);
};
