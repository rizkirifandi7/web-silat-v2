import api from "@/lib/axios";

export const getDashboardStats = async () => {
  return api.get("/dashboard/stats");
};
