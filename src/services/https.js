import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:6500",
});


api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export const http = {
  get: (url) => api.get(url).then((res) => res.data),
  post: (url, data) => api.post(url, data).then((res) => res.data),
  put: (url, data) => api.put(url, data).then((res) => res.data),
  delete: (url) => api.delete(url).then((res) => res.data),
};

export const sendOtp = (mobile) =>
  api.post("/auth/send-otp", { mobile }).then((res) => res.data);

export const checkOtp = (mobile, code) =>
  api.post("/auth/check-otp", { mobile, code }).then((res) => res.data);

export const addToBasketApi = (tourId) =>
  api.put(`/basket/${tourId}`).then((res) => res.data);

export const getBasketApi = () =>
  api.get("/basket").then((res) => res.data);

export const getProfileApi = () =>
  api.get("/user/profile").then((res) => res.data);

export const updateProfileApi = (data) =>
  api.put("/user/profile", data).then((res) => res.data);

export const getMyToursApi = () =>
  api.get("/user/tours").then((res) => res.data);
export const getTransactionsApi = () =>
  api.get("/user/transactions").then((res) => res.data);

export const createOrderApi = (data) =>
  api.post("/order", data).then((res) => res.data);

export default api;
