<script setup>
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useMenuStore } from "../../stores/menu";
import { useAuthStore } from "../../stores/auth";
import { useModalStore } from "../../stores/modal";

const router = useRouter();
const menuStore = useMenuStore();
const authStore = useAuthStore();
const modalStore = useModalStore();
const { menuList } = storeToRefs(menuStore);
const { changeMenuState } = menuStore;
const { openModal } = modalStore;

const logout = () => {
  console.log("logout!!!!!");
  authStore.logout();
  changeMenuState();
};

const moveList = () => {
  router.push({ name: "whole-article-list" });
};

const moveMain = () => {
  router.push({ name: "main" });
};

const openDialog = () => {
  console.log("open modal");
  openModal();
  // router.push({ name: "my-page" });
};
</script>

<template>
  <v-app-bar :elevation="1">
    <v-app-bar-title style="cursor: pointer" @click="moveMain">
      Artventure
    </v-app-bar-title>
    <v-btn @click="moveList">게시판</v-btn>
    <template v-for="menu in menuList" :key="menu.routeName">
      <template v-if="menu.show">
        <template v-if="menu.routeName === 'user-logout'">
          <v-avatar color="info" class="profile" @click="openDialog"
            ><span class="text-h5">KYJ</span></v-avatar
          >
          <v-btn
            ><router-link to="/" @click.prevent="logout">{{
              menu.name
            }}</router-link></v-btn
          >
        </template>
        <template v-else>
          <v-btn
            ><router-link :to="{ name: menu.routeName }">{{
              menu.name
            }}</router-link></v-btn
          >
        </template>
      </template>
    </template>
  </v-app-bar>
</template>

<style scoped>
.profile {
  cursor: pointer;
}
</style>
