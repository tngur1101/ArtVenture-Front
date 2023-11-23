import axios from "axios";
import { useAuthStore } from "../stores/auth";
import { useMenuStore } from "../stores/menu";
import router from "../router";
const { VITE_VUE_API_URL } = import.meta.env;

const instance = axios.create({
  baseURL: VITE_VUE_API_URL,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});
//비동기 요청 전 인터셉트
instance.interceptors.request.use(
  (config) => {
    // console.log("config : ", config);
    const authStore = useAuthStore();

    config.headers.Authorization = `Bearer ${authStore.token}`;
    // console.log("요청 intercept", config);
    return config;
  },
  (error) => Promise.reject(error)
);

//비동기 요청 응답 수신 시, 인터셉트
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    // console.log("응답 에러 : ", error);
    //401에러 and 토큰 만료의 경우 ( 네트워크 응답 에러의 경우 response가 존재하지 않으므로 체크 필요 )
    if (
      error.response &&
      error.response.data.status === 401
      //  && error.response.data.message === "Token Expired"
    ) {
      //store의 유저정보 clear
      const authStore = useAuthStore();
      const menuStore = useMenuStore();

      authStore.clearUser();
      menuStore.changeMenuState();
      //로그인 페이지 이동 및 alert
      router.push({ name: "user-login" });
      alert("인증이 만료되었습니다. 다시 로그인 해주세요.");
    }

    return Promise.reject(error);
  }
);
export default instance;
