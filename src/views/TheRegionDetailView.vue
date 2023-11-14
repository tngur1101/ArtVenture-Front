<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { detailRegion } from "@/api/region";
const route = useRoute();
const { regionId } = route.params;
const region = ref({});

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
    },
    (error) => {
      console.log(error);
    }
  );
};
</script>

<template>
  <div>{{ route.params.regionId }}번 지역 이동</div>
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
</template>

<style scoped></style>
