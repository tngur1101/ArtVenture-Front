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
      <v-carousel-item
        src="https://img.freepik.com/free-photo/haedong-yonggungsa-temple-and-haeundae-sea-in-busan-buddhist-temple-in-busan-south-korea_335224-436.jpg?w=1380&t=st=1700745481~exp=1700746081~hmac=54b0cd2d269167ebd5ef0279c5bb712405b10f833f7017d2537d6859052ef11b"
        cover
      >
      </v-carousel-item>
      <v-carousel-item
        src="https://img.freepik.com/free-photo/geyongbokgung-palace-and-car-light-at-sunset-in-seoul-south-korea_335224-270.jpg?w=1380&t=st=1700744930~exp=1700745530~hmac=59c8949515f8fbff7127d592ead66436b19f423ccc7d874555dae20904bea10a"
        cover
      >
      </v-carousel-item>
      <v-carousel-item
        src="https://img.freepik.com/free-photo/rainbow-fountain-show-at-expo-bridge-in-south-korea_335224-485.jpg?w=1380&t=st=1700744984~exp=1700745584~hmac=1f49fd19c864af6215ff3e4f6becd9c7cd086864f09ffeff84f0cddcade374ff"
        cover
      >
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

<style scoped></style>
