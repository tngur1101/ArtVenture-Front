<script setup>
import { ref } from "vue";

const tab = ref({});
</script>

<!-- <template>
  <div class="mypage-container">
    <div><h1>프로필</h1></div>
    <div><h1>내가 달성한 업적</h1></div>
    <div><h1>내가 쓴 글</h1></div>
  </div>
</template> -->
<template>
  <v-card class="margin">
    <v-tabs v-model="tab" color="deep-purple-accent-4" align-tabs="center">
      <v-tab :value="1">나의 정보</v-tab>
      <v-tab :value="2">달성 업적</v-tab>
      <v-tab :value="3">작성한 글</v-tab>
    </v-tabs>
    <v-window v-model="tab">
      <v-window-item v-for="n in 3" :key="n" :value="n">
        <v-container fluid>
          <v-row>
            <v-col v-for="i in 6" :key="i" cols="12" md="4">
              <v-img
                :src="`https://picsum.photos/500/300?image=${i * n * 5 + 10}`"
                :lazy-src="`https://picsum.photos/10/6?image=${i * n * 5 + 10}`"
                aspect-ratio="1"
              ></v-img>
            </v-col>
          </v-row>
        </v-container>
      </v-window-item>
    </v-window>
  </v-card>
</template>

<style scoped>
.margin {
  margin-top: 10%;
}
</style>
