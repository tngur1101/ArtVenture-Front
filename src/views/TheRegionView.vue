<!-- 백엔드에 요청 보내서 지역 이름, 지역 코드 가져오기 -->
<!-- 지역 이름, 지역 코드를 받아오면 반복문 돌려서 내부에 RegionCard를 찍어야 함 -->
<!--  -->
<script setup>
import { ref } from "vue";
import { RouterView } from "vue-router";
import { getSidoList } from "@/api/region";
import RegionCard from "../components/regions/RegionCard.vue";
import { onMounted } from "vue";

const regions = ref([]);

onMounted(() => {
  console.log("sidoList 얻어오자");
  getSidoList(
    ({ data }) => {
      regions.value = data;
      //   console.log("data : ", data);
      console.log("region : ", regions.value);
    },
    (error) => {
      console.log(error);
    }
  );
});
</script>

<template>
  <div>
    <v-sheet class="mx-auto" elevation="8" max-width="100%">
      <v-slide-group
        v-model="model"
        class="pa-4"
        selected-class="bg-success"
        show-arrows
      >
        <v-slide-group-item
          v-for="region in regions"
          :key="region.regionId"
          v-slot="{ isSelected, toggle, selectedClass }"
        >
          <v-card :class="['ma-4']" height="200" width="200" @click="toggle">
            <v-img
              class="align-end text-white"
              height="150"
              src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
              cover
            >
              <v-card-title>{{ region.name }}</v-card-title>
            </v-img>
            <v-card-subtitle class="pt-4">
              {{ region.sidoId }}
            </v-card-subtitle>
          </v-card>
        </v-slide-group-item>
      </v-slide-group>
    </v-sheet>
  </div>
</template>

<style scoped></style>
