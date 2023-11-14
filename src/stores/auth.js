import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const useAuthStore = defineStore(
  "auth",
  () => {
    //login User의 정보
    const user = ref({
      id: "",
      nickname: "",
      admin: "",
    });
    const token = ref(""); //jwt 토큰 정보

    const login = async (loginForm) => {
      const url = "http://localhost:80";
      const { data } = await axios.post(`${url}/member/login`, loginForm);
      // console.log("로그인 요청 후 응답 데이터:", data);

      token.value = data.token; //토큰 정보 저장

      const decoded = jwtDecode(data.token); //토큰에서 유저정보 추출하여 유저정보 저장
      console.log("디코딩된 토큰 정보 :", decoded);
      user.value.id = decoded.id;
      user.value.nickname = decoded.nickname;
      user.value.admin = decoded.admin;
    };

    const logout = () => {
      clearUser();
    };

    const clearUser = () => {
      user.value.id = "";
      user.value.nickname = "";
      user.value.admin = "";
      token.value = "";
    };

    return { user, token, login, logout, clearUser };
  },

  //새로고침시 데이터 유지를 위한 설정(localStorage에 저장해서 불러오는 방식)
  {
    persist: true,
  }
  //sessionStorage 사용하고 싶은 경우
  // {
  //   persist: {
  //     storage: sessionStorage,
  //   },
  // }
);
