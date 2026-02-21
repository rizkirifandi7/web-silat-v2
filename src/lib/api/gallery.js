import api from "@/lib/axios";

// Get all photos (public)
export const getGalleries = async (params) => {
  return api.get("/gallery", { params });
};

// Get photo by ID (public)
export const getGalleryById = async (id) => {
  return api.get(`/gallery/${id}`);
};

// Create new photo (admin/anggota)
export const createGallery = async (formData) => {
  return api.post("/gallery", formData);
};

// Update photo (admin/owner)
export const updateGallery = async (id, data) => {
  return api.patch(`/gallery/${id}`, data);
};

// Delete photo (admin/owner)
export const deleteGallery = async (id) => {
  return api.delete(`/gallery/${id}`);
};
