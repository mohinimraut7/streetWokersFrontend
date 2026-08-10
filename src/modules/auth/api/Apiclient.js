import axios from "axios";

// Backend base URL — set VITE_API_BASE_URL in your .env file (e.g. http://localhost:5010/api)
// Falls back to localhost:5010 (matches your current backend PORT) if not set.
const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5010/api";

const apiClient = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

// Attach the saved JWT token (if any) to every outgoing request
apiClient.interceptors.request.use((config) => {
  try {
    const raw = localStorage.getItem("svms_auth");
    const session = raw ? JSON.parse(raw) : null;
    if (session?.token) {
      config.headers.Authorization = `Bearer ${session.token}`;
    }
  } catch {
    // ignore malformed storage
  }
  return config;
});

export default apiClient;