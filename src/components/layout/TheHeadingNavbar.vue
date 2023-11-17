<script setup>
import { storeToRefs } from "pinia";
import { useMenuStore } from "../../stores/menu";
import { useAuthStore } from "../../stores/auth";

const menuStore = useMenuStore();
const authStore = useAuthStore();
const { menuList } = storeToRefs(menuStore);
const { changeMenuState } = menuStore;
const logout = () => {
  console.log("logout!!!!!");
  authStore.logout();
  changeMenuState();
};
</script>

<template>
  <v-app-bar :elevation="1">
    <v-app-bar-title style="cursor: pointer"> Artventure </v-app-bar-title>
    <template v-for="menu in menuList" :key="menu.routeName">
      <template v-if="menu.show">
        <template v-if="menu.routeName === 'user-logout'">
          <v-avatar color="info"> <span class="text-h5">pic</span></v-avatar>
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
