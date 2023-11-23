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
      joindate: "",
      // completeList: [],
    });
    const token = ref(""); //jwt 토큰 정보

    const url = "http://localhost:80";
    const login = async (loginForm) => {
      const { data } = await axios.post(`${url}/member/login`, loginForm);
      // console.log("로그인 요청 후 응답 데이터:", data);

      token.value = data.token; //토큰 정보 저장

      const decoded = jwtDecode(data.token); //토큰에서 유저정보 추출하여 유저정보 저장
      console.log("디코딩된 토큰 정보 :", decoded);
      user.value.id = decoded.id;
      user.value.nickname = decoded.nickname;
      user.value.name = decoded.name;
      user.value.joindate = decoded.joindate;
      user.value.admin = decoded.admin;
      // user.value.completeList = decoded.completeList;
    };

    const logout = () => {
      clearUser();
    };

    const clearUser = () => {
      user.value.id = "";
      user.value.nickname = "";
      user.value.admin = "";
      user.value.name = "";
      user.value.joindate = "";
      token.value = "";
    };

    const regist = async (registForm) => {
      //user등록 api 받는 코드 추가
      console.log("회원가입 할 유저 : ", registForm);
      await axios.post(`${url}/member`, registForm);
    };

    const update = async (updateForm) => {
      console.log("갱신할 정보 : ", updateForm);
      await axios.put(`${url}/member`, updateForm);
      // const updateUser = await axios.get(`url` / member, user.value.id);
      // console.log(updateUser);
    };

    const checkAuth = () => {
      console.log("로그인 확인 checkAuth() 호출");
      // 현재 store에 토큰이 없으면 바로 로그인 화면
      if (token === "") return false;
    };

    return { user, token, login, logout, clearUser, regist, update, checkAuth };
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
