<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useMenuStore } from "../../stores/menu";

const { changeMenuState } = useMenuStore();
const authStore = useAuthStore();

const router = useRouter();

const loginForm = ref({
  id: "",
  password: "",
});

const login = async () => {
  try {
    await authStore.login(loginForm.value);
    changeMenuState();
    router.push("/");
  } catch (error) {
    console.log("로그인 실패 에러:", error);
    alert("아이디 또는 비밀번호가 일치하지 않습니다.");
  }
};
</script>

<template>
  <div>
    <h1>로그인</h1>
    <form @submit.prevent="login">
      <fieldset>
        <label><input type="text" v-model="loginForm.id" /> 아이디</label>
        <br />
        <label
          ><input type="password" v-model="loginForm.password" />
          비밀번호</label
        >
        <br />
        <button>로그인</button>
      </fieldset>
    </form>
  </div>
</template>

<style scoped></style>
