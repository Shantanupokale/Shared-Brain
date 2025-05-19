import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "https://shared-brain-alpha.vercel.app/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false, // change to true if you need cookies
});

export default axiosInstance;
