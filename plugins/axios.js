import axios from "axios";
import { useAuth } from "#imports";

export default defineNuxtPlugin((nuxtApp) => {
  const api = axios.create({
    baseURL: process.server
      ? useRuntimeConfig().apiBaseUrl
      : useRuntimeConfig().public.apiBaseUrl,
    headers: {
      "Content-Type": "application/json",
    },
  });

  api.interceptors.request.use(
    (config) => {
      const { data } = useAuth();
      const token = data.value.user.token;

      if (token && !config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        navigateTo("/login");
      }
      return Promise.reject(error);
    }
  );

  nuxtApp.provide("api", api);
});
