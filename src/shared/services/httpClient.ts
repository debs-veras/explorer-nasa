import axios from "axios";

export const httpClient = axios.create({
  baseURL: "https://api.nasa.gov",
  timeout: 10000,
  params: {
    api_key: import.meta.env.VITE_NASA_API_KEY,
  },
});
