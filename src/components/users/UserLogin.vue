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

const moveSignup = () =>{
  router.push({name:"user-regist"});
}
</script>

<template>
  <!-- <div>
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
  </div> -->
  <div style="margin-top: 8%;">
    <form @submit.prevent="login">
      <v-card
      class="mx-auto pa-12 pb-8"
      elevation="8"
      max-width="448"
      rounded="lg"
    >
      <div class="text-subtitle-1 text-medium-emphasis">Account</div>

      <v-text-field
        density="compact"
        placeholder="Email address"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"
        v-model="loginForm.id"
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
        Password

        <a
          class="text-caption text-decoration-none text-blue"
          href="#"
          rel="noopener noreferrer"
          target="_blank"
        >
          Forgot login password?</a>
      </div>

      <v-text-field
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        density="compact"
        placeholder="Enter your password"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        @click:append-inner="visible = !visible"
        v-model="loginForm.password"
      ></v-text-field>

      <v-card
        class="mb-12"
        color="surface-variant"
        variant="tonal"
      >
        <v-card-text class="text-medium-emphasis text-caption">
          Warning: After 3 consecutive failed login attempts, you account will be temporarily locked for three hours. If you must login now, you can also click "Forgot login password?" below to reset the login password.
        </v-card-text>
      </v-card>

      <v-btn
        block
        class="mb-8"
        color="blue"
        size="large"
        variant="tonal"
        type="submit"
      >
        로그인
      </v-btn>

      <v-btn class="text-center" @click="moveSignup">
        <!-- <router-link :to="{name:'user-regist'}"> -->
          Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
        <!-- </router-link> -->
      </v-btn>
    </v-card>
    </form>
  </div>
</template>

<style scoped></style>
