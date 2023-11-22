// import { useAuthStore } from "../stores/auth";
// import axios from "./MainAxios";

// const { VITE_VUE_API_URL } = import.meta.env;

// function localAxios() {
//   const authStore = useAuthStore();
//   const { token } = authStore();
//   const instance = axios.create({
//     baseURL: VITE_VUE_API_URL,
//     headers: {
//       "Content-Type": "application/json;charset=utf-8",
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   return instance;
// }

// export { localAxios };
