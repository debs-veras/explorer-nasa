import axios from "axios";

export const httpClient = axios.create({
  baseURL: "https://api.nasa.gov",
  timeout: 10000,
  params: {
    api_key: import.meta.env.VITE_NASA_API_KEY,
  },
});

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.data?.msg) error.message = error.response.data.msg;
    return Promise.reject(error);
  },
);
