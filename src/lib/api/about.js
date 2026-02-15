import api from "@/lib/axios";

// Get about info
export const getAboutInfo = async () => {
  return api.get("/about");
};

// Update about info
export const updateAboutInfo = async (formData) => {
  return api.patch("/about", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Get founders
export const getFounders = async () => {
  return api.get("/about/founders");
};

// Create founder
export const createFounder = async (formData) => {
  return api.post("/about/founders", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Update founder
export const updateFounder = async (id, formData) => {
  return api.patch(`/about/founders/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Delete founder
export const deleteFounder = async (id) => {
  return api.delete(`/about/founders/${id}`);
};
