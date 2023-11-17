<script setup>
import { onMounted, ref, computed } from "vue";
import { useRoute } from "vue-router";
import { detailRegion } from "@/api/region";
import VKakaoMap from "@/components/regions/VKakaoMap.vue";
import { mapActions } from "pinia";

const route = useRoute();
const { regionId } = route.params;
const region = ref({});
const places = ref([]);
const selectPlace = ref({});

console.log(route.params.regionId);

onMounted(() => {
  getRegion();
});

const notComplete = computed(() => {
  return places.value.filter((item) =>
    region.value.completeList.every((comple) => comple.featId != item.featId)
  );
});

const getRegion = () => {
  console.log(regionId + "번 지역 요청");
  detailRegion(
    regionId,
    ({ data }) => {
      region.value = data;
      console.log("data : ", data);
      places.value = region.value.featList;
      console.log("places : ", places);
      console.log("complete : ", region.value.completeList);
      console.log("notComplete : ", notComplete.value);
    },
    (error) => {
      console.log(error);
    }
  );
};
</script>

<template>
  <div>{{ route.params.regionId }}번 지역 이동</div>
  <VKakaoMap :places="places" :selectPlace="selectPlace" />
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
  <div>
    <v-container>
      <v-row>
        <v-col v-for="(item, index) in places" :key="index" cols="2">
          <!-- cols 값은 가로 방향으로 카드를 배치할 개수를 나타냅니다 -->
          <v-card class="unaccomplished">
            <v-img
              src="https://cdn.vuetifyjs.com/docs/images/cards/purple-flowers.jpg"
            >
            </v-img>
            <v-card-title>{{ item.name }}</v-card-title>
            <v-card-text>{{ item.description }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped>
.unaccomplished {
  filter: grayscale(80%);
  background-color: gray;
}
</style>
