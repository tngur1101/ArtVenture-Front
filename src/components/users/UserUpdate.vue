<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth.js";

const router = useRouter();
const authStore = useAuthStore();
const { user } = authStore;

const updateForm = ref({
  id: "",
  password: "",
  name: "",
  nickname: "",
  joindate: "",
});

const isUpdate = ref(false);

const update = async () => {
  try {
    console.log(updateForm.value);
    await authStore.update(updateForm.value);
    router.push("/");
  } catch (error) {
    console.log("수정 에러: ", error);
    alert("정보 수정에 실패하였습니다.");
  }
};

const init = () => {
  updateForm.value.id = user.id;
  updateForm.value.name = user.name;
  updateForm.value.joindate = user.joindate;
  updateForm.value.nickname = user.nickname;
};

init();
</script>

<template>
  <div>
    <v-card class="mx-auto" max-width="448" title="내 정보">
      <v-container>
        <v-text-field
          v-model="updateForm.id"
          color="primary"
          label="아이디"
          variant="filled"
          readonly
        >
        </v-text-field>

        <v-text-field
          v-model="updateForm.name"
          color="primary"
          label="이름"
          variant="filled"
          readonly
        ></v-text-field>

        <v-text-field
          v-model="updateForm.nickname"
          color="primary"
          label="닉네임"
          :variant="isUpdate ? 'outlined' : 'filled'"
          :readonly="!isUpdate"
        ></v-text-field>

        <v-text-field
          v-model="updateForm.joindate"
          color="primary"
          label="가입일"
          variant="filled"
          readonly
        ></v-text-field>
      </v-container>
      <v-divider />
      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn v-if="!isUpdate" color="primary" @click="isUpdate = !isUpdate">
          내 정보 수정
          <v-icon icon="mdi-chevron-right" end></v-icon>
        </v-btn>
        <v-btn v-else color="primary" @click="update">
          수정 완료
          <v-icon icon="mdi-chevron-right" end></v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<style scoped>
.read-only {
  background-color: lightgray;
}
</style>
