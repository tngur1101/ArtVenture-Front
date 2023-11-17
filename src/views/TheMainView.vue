<script setup>
import { RouterView } from "vue-router";
import TheUserView from "./TheUserView.vue";
import TheRegionView from "./TheRegionView.vue";
import MainBoardView from "./MainBoardView.vue";

const data = () => {
  model: null;
};
</script>

<template>
  <!-- <div>Main화면입니다.</div>
  <div>메인 이미지 자리</div>
  <the-region-view></the-region-view>
  <div>게시판 자리</div> -->
  <div>
    <v-carousel show-arrows="hover">
      <v-carousel-item
        src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        cover
      >
      </v-carousel-item>
      <v-carousel-item
        src="https://cdn.vuetifyjs.com/images/cards/hotel.jpg"
        cover
      >
      </v-carousel-item>
      <v-carousel-item
        src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
        cover
      >
      </v-carousel-item>
    </v-carousel>
  </div>
  <div>
    <TheRegionView></TheRegionView>
  </div>
  <div style="margin-top: 3%;">
    <MainBoardView></MainBoardView>
  </div>
</template>

<style scoped></style>
