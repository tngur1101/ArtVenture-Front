<script setup>
<<<<<<< HEAD
import { useRouter } from "vue-router";
=======
import {useRouter} from "vue-router";
>>>>>>> a3ba37d0bdd3a6fee0b623c65fc171e26cb59ef2
import { storeToRefs } from "pinia";
import { useMenuStore } from "../../stores/menu";
import { useAuthStore } from "../../stores/auth";

const router = useRouter();
const menuStore = useMenuStore();
const authStore = useAuthStore();
const { menuList } = storeToRefs(menuStore);
const { changeMenuState } = menuStore;

const logout = () => {
  console.log("logout!!!!!");
  authStore.logout();
  changeMenuState();
};

const moveList = () => {
<<<<<<< HEAD
  router.push({ name: "whole-article-list" });
};

const moveMain = () => {
  router.push({ name: "main" });
};
=======
  router.push({name:"whole-article-list"});
}

const moveMain = () => {
  router.push({name:"main"});
}

>>>>>>> a3ba37d0bdd3a6fee0b623c65fc171e26cb59ef2
</script>

<template>
  <v-app-bar :elevation="1">
<<<<<<< HEAD
    <v-app-bar-title style="cursor: pointer" @click="moveMain">
=======
    <v-app-bar-title style="cursor: pointer;" @click="moveMain">
>>>>>>> a3ba37d0bdd3a6fee0b623c65fc171e26cb59ef2
      Artventure
    </v-app-bar-title>
    <v-btn @click="moveList">게시판</v-btn>
    <template v-for="menu in menuList" :key="menu.routeName">
      <template v-if="menu.show">
        <template v-if="menu.routeName === 'user-logout'">
          <v-avatar color="info"><span class="text-h5">KYJ</span></v-avatar>
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

<style scoped></style>
