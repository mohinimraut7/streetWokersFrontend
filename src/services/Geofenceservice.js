// ══════════════════════════════════════════════════════════
//  Geofence Service (frontend) — "No Feriwala Area"
//  Feature: No Feriwala Area Geofencing
// ══════════════════════════════════════════════════════════
import apiClient from "../lib/apiClient";

// ── Check whether a lat/lng point is inside any active restricted area ──
export async function checkGeofenceLocation(latitude, longitude) {
  try {
    const { data } = await apiClient.post("/geofences/check-location", { latitude, longitude });
    return data; // { success, isInsideRestrictedArea, area, message }
  } catch (err) {
    return {
      success: false,
      isInsideRestrictedArea: false,
      area: null,
      message: err.response?.data?.message || "Could not check the geofence location.",
    };
  }
}

// ── Fetch all geofences (optionally filtered by status) ──
export async function fetchGeofences({ status } = {}) {
  try {
    const params = {};
    if (status) params.status = status;
    const { data } = await apiClient.get("/geofences", { params });
    return data; // { success, data }
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || "Could not load geofences.",
      data: [],
    };
  }
}

// ── Fetch single geofence ──
export async function fetchGeofenceById(id) {
  try {
    const { data } = await apiClient.get(`/geofences/${id}`);
    return data;
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || "Could not load this geofence.",
    };
  }
}

// ── Create geofence — A.M.C. / super_admin only ──
export async function createGeofence({ name, description, coordinates, status }) {
  try {
    const { data } = await apiClient.post("/geofences", { name, description, coordinates, status });
    return data;
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || "Could not create the geofence.",
    };
  }
}

// ── Update geofence — A.M.C. / super_admin only ──
export async function updateGeofence(id, { name, description, coordinates, status }) {
  try {
    const { data } = await apiClient.put(`/geofences/${id}`, { name, description, coordinates, status });
    return data;
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || "Could not update the geofence.",
    };
  }
}

// ── Delete geofence — A.M.C. / super_admin only ──
export async function deleteGeofence(id) {
  try {
    const { data } = await apiClient.delete(`/geofences/${id}`);
    return data;
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || "Could not delete the geofence.",
    };
  }
}