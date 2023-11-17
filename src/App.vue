<script setup>
import { RouterView } from "vue-router";
import TheHeadingNavbar from "./components/layout/TheHeadingNavbar.vue";
</script>

<template>
  <v-app>
  <div>
    <the-heading-navbar></the-heading-navbar>
    <router-view></router-view>
  </div>
</v-app>
</template>

<style scoped></style>
