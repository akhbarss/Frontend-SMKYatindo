import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";

export const BASE_URL = import.meta.env.VITE_BACKEND_URL;
// export const BASE_URL = "http://2f11-175-158-57-190.ngrok-free.app/api";
// export const BASE_URL = "https://e1c8-175-158-57-190.ngrok-free.app/api";

const request = axios.create({
  baseURL: BASE_URL,
  timeout: 10000000,
  withCredentials: false,
});

request.interceptors.request.use(
  function (config: InternalAxiosRequestConfig<AxiosRequestConfig>) {
    // @ts-ignore
    config.headers["Authorization"] = `Bearer ${localStorage.getItem(
      "_TuVbwpW"
    )}`;
    // @ts-ignore
    config.headers["Module"] = document.title;
    return config;
  },
  function (error: any) {
    return Promise.reject(error);
  }
);

export default request;
