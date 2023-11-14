<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { detailRegion } from "@/api/region";
import VKakaoMap from "@/components/regions/VKakaoMap.vue";

const route = useRoute();
const { regionId } = route.params;
const region = ref({});
const selectPlace = ref({});

console.log(route.params.regionId);

onMounted(() => {
  getRegion();
});

const getRegion = () => {
  console.log(regionId + "번 지역 요청");
  detailRegion(
    regionId,
    ({ data }) => {
      region.value = data;
      console.log("data : ", data);
    },
    (error) => {
      console.log(error);
    }
  );
};
</script>

<template>
  <div>{{ route.params.regionId }}번 지역 이동</div>
  <VKakaoMap :places="region.featList" :selectPlace="selectPlace" />
  <div>map 들어갈 자리</div>
  <div>
    <h3>클리어 한 업적</h3>
    <table>
      <tr>
        <th>featId</th>
        <th>featTime</th>
      </tr>
      <tr v-for="complete in region.completeList" :key="complete">
        <td>{{ complete.featId }}</td>
        <td>{{ complete.featTime }}</td>
      </tr>
    </table>
    <hr />
    <h3>전체 업적</h3>
    <table>
      <tr>
        <th>regionId</th>
        <th>order</th>
        <th>featId</th>
        <th>name</th>
        <th>latitude</th>
        <th>longitude</th>
      </tr>
      <tr v-for="feat in region.featList" :key="feat">
        <td>{{ feat.regionId }}</td>
        <td>{{ feat.order }}</td>
        <td>{{ feat.featId }}</td>
        <td>{{ feat.name }}</td>
        <td>{{ feat.latitude }}</td>
        <td>{{ feat.longitude }}</td>
      </tr>
    </table>
  </div>
</template>

<style scoped></style>
