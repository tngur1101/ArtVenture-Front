<script setup>
import { RouterView } from "vue-router";
import TheUserView from "./TheUserView.vue";
import TheRegionView from "./TheRegionView.vue";
import BoardView from "@/views/BoardView.vue";


  const data = () => {
    model:null;
  };
</script>

<template>
  <!-- <div>Main화면입니다.</div>
  <div>메인 이미지 자리</div>
  <the-region-view></the-region-view>
  <div>게시판 자리</div> -->
  <div>
    <v-carousel show-arrows="hover">
      <v-carousel-item src="https://cdn.vuetifyjs.com/images/cards/docks.jpg" cover>
      </v-carousel-item>
      <v-carousel-item src="https://cdn.vuetifyjs.com/images/cards/hotel.jpg" cover>
      </v-carousel-item>
      <v-carousel-item src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" cover>
      </v-carousel-item>
    </v-carousel>
  </div>
  <div>
    <!-- <TheRegionView></TheRegionView> -->
    <v-sheet
    class="mx-auto"
    elevation="8"
    max-width="100%"
  >
    <v-slide-group
      v-model="model"
      class="pa-4"
      selected-class="bg-success"
      show-arrows
    >
      <v-slide-group-item
        v-for="n in 15"
        :key="n"
        v-slot="{ isSelected, toggle, selectedClass }"
      >
        <v-card
          :class="['ma-4', selectedClass]"
          height="200"
          width="200"
          @click="toggle"
        >
        <v-img
      class="align-end text-white"
      height="150"
      src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
      cover
    >
      <v-card-title>Top 10 Australian beaches</v-card-title>
    </v-img>
    <v-card-subtitle class="pt-4">
      Number 10
    </v-card-subtitle>          
        </v-card>
      </v-slide-group-item>
    </v-slide-group>
  </v-sheet>
  </div>
  <div>
   <v-container class="big-surface-variant mb-6">
    <v-row
        align="center"
        no-gutters
        style="height: 150px;"
      >
        <v-col
          v-for="n in 2"
          :key="n"
        >
          <v-sheet class="pa-2 ma-2">
            <v-list lines="two">
  <v-list-item
    v-for="n in 3"
    :key="n"
    :title="'Item ' + n"
    subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit"
  ></v-list-item>
</v-list>
          </v-sheet>
        </v-col>
      </v-row>
   </v-container>
  </div>
</template>

<style scoped></style>
