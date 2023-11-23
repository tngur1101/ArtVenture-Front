<script setup>
import { RouterView } from "vue-router";
import TheHeadingNavbar from "./components/layout/TheHeadingNavbar.vue";
import UserMyPage from "./components/users/UserMyPage.vue";
</script>

<template>
  <v-app>
    <div :class="['h-100', 'w-100']">
      <the-heading-navbar></the-heading-navbar>
      <user-my-page></user-my-page>
      <router-view></router-view>
    </div>
  </v-app>
</template>

<style scoped></style>
