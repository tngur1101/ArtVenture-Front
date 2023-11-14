<script setup>
import { RouterView } from "vue-router";
import TheUserView from "./TheUserView.vue";
import TheRegionView from "./TheRegionView.vue";
</script>

<template>
  <div>Main화면입니다.</div>
  <div>메인 이미지 자리</div>
  <the-region-view></the-region-view>
  <div>게시판 자리</div>
</template>

<style scoped></style>
