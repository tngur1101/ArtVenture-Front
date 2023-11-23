<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth.js";

const router = useRouter();
const authStore = useAuthStore();

const registForm = ref({
  id: "",
  password: "",
  name: "",
  nickname: "",
});

const regist = async () => {
  try {
    console.log(registForm.value);
    await authStore.regist(registForm.value);
    router.push("/");
  } catch (error) {
    console.log("회원가입 실패 에러: ", error);
    alert("회원가입에 실패하였습니다.");
  }
};
</script>

<template>
  <div>
    <v-card class="mx-auto" max-width="448" title="User Registration">
      <v-container>
        <v-text-field
          v-model="registForm.id"
          color="primary"
          label="id"
          variant="underlined"
        >
        </v-text-field>

        <v-text-field
          v-model="registForm.password"
          color="primary"
          label="Password"
          placeholder="Enter your password"
          variant="underlined"
          type="password"
        ></v-text-field>

        <v-text-field
          v-model="registForm.name"
          color="primary"
          label="name"
          variant="underlined"
        ></v-text-field>

        <v-text-field
          v-model="registForm.nickname"
          color="primary"
          label="nickname"
          variant="underlined"
        ></v-text-field>

        <v-checkbox
          v-model="terms"
          color="secondary"
          label="I agree to site terms and conditions"
        ></v-checkbox>
      </v-container>

      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="success" @click="regist">
          회원가입
          <v-icon icon="mdi-chevron-right" end></v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
