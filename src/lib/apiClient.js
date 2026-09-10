import axios from "axios";


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



apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message || "";
    if (status === 401 && message.includes("Invalid or expired token")) {
      localStorage.removeItem("svms_auth");
      if (typeof window !== "undefined" && window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;