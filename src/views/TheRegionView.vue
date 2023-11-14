<!-- 백엔드에 요청 보내서 지역 이름, 지역 코드 가져오기 -->
<!-- 지역 이름, 지역 코드를 받아오면 반복문 돌려서 내부에 RegionCard를 찍어야 함 -->
<!--  -->
<script setup>
import { RouterView } from "vue-router";
import { getSidoList } from "@/api/region";
import RegionCard from "../components/regions/RegionCard.vue";
import { onMounted } from "vue";

const regions = ref([]);

onMounted(() => {
  console.log("sidoList 얻어오자");
  getSidoList(
    ({ data }) => {
      // regions.value = data.
    },
    (error) => {
      console.log(error);
    }
  );
});
</script>

<template>
  <div>
    <ul class="row">
      <li class="col" v-for="region in regions">
        <region-card :region-obj="region" />
      </li>
      <!-- <li class="col"><region-card /></li>
      <li class="col"><region-card /></li>
      <li class="col"><region-card /></li>
      <li class="col"><region-card /></li> -->
    </ul>
  </div>
</template>

<style scoped></style>
