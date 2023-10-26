import axiosInstance, { AxiosResponse } from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios, { BASE_URL } from "./utils/axios";
import { RefreshToken, ResponseType } from "./types/global";

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: null | string = null): void => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

const isLocalStorage = import.meta.env.VITE_SESSION === "localstorage";
const Interceptors = ({ children }: { children: any }) => {
  const navigate = useNavigate();
  useEffect(() => {
    axios.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (err: any) => {
        const originalConfig = err.config;
        if (
          (err.response?.status === 401 ||
            err.response?.data?.message === "missing or malformed jwt") &&
          !originalConfig._retry
        ) {
          if (isRefreshing) {
            return new Promise(function (resolve, reject) {
              failedQueue.push({ resolve, reject });
            })
              .then((token) => {
                originalConfig.headers["Content-Type"] = "application/json";
                originalConfig.headers["Authorization"] = "Bearer " + token;
                originalConfig.headers["Module"] = document.title;
                return axiosInstance(originalConfig);
              })
              .catch((err) => {
                return Promise.reject(err);
              });
          }
          originalConfig._retry = true;
          isRefreshing = true;
          return new Promise(function (resolve, reject) {
            const refreshToken: string = localStorage.getItem("_RuvTpQv") ?? "";
            axiosInstance
              .post(
                `${BASE_URL}/v1/auth/refresh-token`,
                {
                  refresh_token: isLocalStorage ? refreshToken : null,
                },
                {
                  headers: {
                    "Content-Type": "application/json",
                    Module: document.title,
                  },
                }
              )
              .then((response: AxiosResponse<ResponseType<RefreshToken>>) => {
                if (isLocalStorage) {
                  localStorage.removeItem("_TuVbwpW");
                  localStorage.removeItem("_RuvTpQv");
                  localStorage.setItem(
                    "_TuVbwpW",
                    response.data.data.access_token
                  );
                  localStorage.setItem(
                    "_RuvTpQv",
                    response.data.data.refresh_token
                  );
                }
                axiosInstance.defaults.headers.common["Authorization"] =
                  "Bearer " + response.data.data.access_token;
                originalConfig.headers["Authorization"] =
                  "Bearer " + response.data.data.access_token;
                processQueue(null, response.data.data.access_token);
                resolve(axiosInstance(originalConfig));
              })
              .catch((err) => {
                processQueue(err, null);
                if (isLocalStorage) {
                  localStorage.removeItem("_TuVbwpW");
                  localStorage.removeItem("_RuvTpQv");
                }
                navigate("/ppdb/auth/login");

                reject(err);
              })
              .then(() => {
                isRefreshing = false;
              });
          });
        } else {
          return Promise.reject(err);
        }
      }
    );
  }, [navigate]);

  return children;
};

export default Interceptors;
