import api from "@/lib/axios";

// Get all donation campaigns
export const getCampaigns = async (params) => {
  return api.get("/donations/campaigns", { params });
};

// Get campaign by ID
export const getCampaignById = async (id) => {
  return api.get(`/donations/campaigns/${id}`);
};

// Create new campaign
export const createCampaign = async (formData) => {
  return api.post("/donations/campaigns", formData);
};

// Update campaign
export const updateCampaign = async (id, data) => {
  return api.patch(`/donations/campaigns/${id}`, data);
};

// Delete campaign
export const deleteCampaign = async (id) => {
  return api.delete(`/donations/campaigns/${id}`);
};

// Submit a new donation
export const submitDonation = async (data) => {
  return api.post("/donations", data);
};
