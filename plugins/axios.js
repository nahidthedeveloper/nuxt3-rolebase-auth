import axios from "axios";
import {
  useAuth,
  useRuntimeConfig,
  navigateTo,
  useRequestHeaders,
} from "#imports";

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
      let token;
      
      // if (process.server) {
      //   const headers = useRequestHeaders(["cookie"]);
      //   const match = headers.cookie?.match(
      //     /auth\._token\.local=Bearer%20([^;]+)/
      //   );
      //   token = match ? decodeURIComponent(match[1]) : null;
      //   console.log("From Server : ", headers);
      // } else if (process.client) {
      //   const { data } = useAuth();
      //   token = data.value?.user?.token;
      // }

      const { data } = useAuth();
      token = data.value?.user?.token;

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
      if (process.client && error.response?.status === 401) {
        navigateTo("/login");
      }
      return Promise.reject(error);
    }
  );

  nuxtApp.provide("api", api);
});
