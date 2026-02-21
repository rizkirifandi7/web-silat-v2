import api from "@/lib/axios";

// Get all materials (public/admin)
export const getMaterials = async (params) => {
  return api.get("/materials", { params });
};

// Get material by ID
export const getMaterialById = async (id) => {
  return api.get(`/materials/${id}`);
};

// Create new material (admin)
export const createMaterial = async (data) => {
  return api.post("/materials", data);
};

// Update material (admin)
export const updateMaterial = async (id, data) => {
  return api.patch(`/materials/${id}`, data);
};

// Delete material (admin)
export const deleteMaterial = async (id) => {
  return api.delete(`/materials/${id}`);
};
