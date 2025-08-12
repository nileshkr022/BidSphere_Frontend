// src/services/axios.js
import axios from "axios";

// Ensure no trailing slash in baseURL
const backendURL = import.meta.env.VITE_BACKEND_URL.replace(/\/$/, "");

export const axiosInstance = axios.create({
    baseURL: backendURL,      // All requests start with this
    withCredentials: true,    // Send cookies / credentials
});

// General API request helper
export const apiConnector = (method, url, bodyData = null, headers = null, params = null) => {
    return axiosInstance({
        method,
        url,       // Example: "/api/v1/auth/signup"
        data: bodyData,
        headers,
        params
    });
};
