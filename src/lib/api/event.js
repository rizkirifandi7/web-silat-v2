import api from "@/lib/axios";

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
  return api.post("/events", formData);
};

// Update event
export const updateEvent = async (id, data) => {
  return api.patch(`/events/${id}`, data);
};

// Delete event
export const deleteEvent = async (id) => {
  return api.delete(`/events/${id}`);
};

// Create event payment (returns Midtrans token)
export const createEventPayment = async (data) => {
  return api.post("/payments", data);
};

// Sync payment status after midtrans success callback
export const syncPaymentStatus = async (orderId) => {
  return api.get(`/payments/status/${orderId}`);
};

// Register to event (free events)
export const registerToEvent = async (data) => {
  return api.post("/registrations", data);
};

// Check registration status
export const checkRegistration = async (eventId, userId) => {
  return api.get(`/registrations/check/${eventId}/${userId}`);
};

// Get user's event registrations
export const getRegistrationsByUser = async (userId) => {
  return api.get(`/registrations/user/${userId}`);
};

// Get event's participants
export const getRegistrationsByEvent = async (eventId) => {
  return api.get(`/registrations/event/${eventId}`);
};
