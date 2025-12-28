import axios from "axios";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await apiClient.post("/auth/renew");

        return apiClient(originalRequest);
      } catch (renewError) {
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }

        return Promise.reject(renewError);
      }
    }

    return Promise.reject(error);
  },
);

export default apiClient;
