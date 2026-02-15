import api from "../axios";

// Get all events
export const getEvents = async (params) => {
  return api.get("/events", { params });
};

// Get event by ID
export const getEventById = async (id) => {
  return api.get(`/events/${id}`);
};

// Create new event
export const createEvent = async (formData) => {
  return api.post("/events", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Update event
export const updateEvent = async (id, data) => {
  return api.patch(`${"/events"}/${id}`, data);
};

// Delete event
export const deleteEvent = async (id) => {
  return api.delete(`${"/events"}/${id}`);
};
