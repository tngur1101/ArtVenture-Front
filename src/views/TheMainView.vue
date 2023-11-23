<script setup>
import TheRegionView from "./TheRegionView.vue";
import MainBoardView from "./MainBoardView.vue";
</script>

<template>
  <!-- <div>Main화면입니다.</div>
  <div>메인 이미지 자리</div>
  <the-region-view></the-region-view>
  <div>게시판 자리</div> -->
  <div>
    <v-carousel show-arrows="hover">
      <v-carousel-item cover><img src="@/assets/images/Daegu.jpg" alt="" class="crousel-image" /> </v-carousel-item>
      <v-carousel-item cover><img src="@/assets/images/Daejeon.jpg" alt="" class="crousel-image" /> </v-carousel-item>
      <v-carousel-item cover><img src="@/assets/images/Gyeongju.jpg" alt="" class="crousel-image" /> </v-carousel-item>
      <v-carousel-item cover><img src="@/assets/images/Jeonju.jpg" alt="" class="crousel-image" /> </v-carousel-item>
      <v-carousel-item cover
        ><img src="@/assets/images/SeokchonLake.jpg" alt="" class="crousel-image" />
      </v-carousel-item>
      <v-carousel-item cover
        ><img src="@/assets/images/SeongsanSunrisePeak.jpg" alt="" class="crousel-image" />
      </v-carousel-item>
    </v-carousel>
  </div>
  <div>
    <TheRegionView></TheRegionView>
  </div>
  <div style="margin-top: 3%">
    <MainBoardView></MainBoardView>
  </div>
</template>

<style scoped>
.crousel-image {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
</style>
