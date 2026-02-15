import api from "@/lib/axios";

// Get all products (public)
export const getProducts = async (params) => {
  return api.get("/products", { params });
};

// Get product by ID (public)
export const getProductById = async (id) => {
  return api.get(`/products/${id}`);
};

// Create new product (admin)
export const createProduct = async (formData) => {
  return api.post("/products", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Update product (admin)
export const updateProduct = async (id, formData) => {
  return api.patch(`/products/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Delete product (admin)
export const deleteProduct = async (id) => {
  return api.delete(`/products/${id}`);
};
