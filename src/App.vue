<script setup>
import { RouterView } from "vue-router";
import TheHeadingNavbar from "./components/layout/TheHeadingNavbar.vue";
</script>

<template>
  <div>
    <the-heading-navbar></the-heading-navbar>
    <router-view></router-view>
  </div>
</template>

<style scoped></style>
