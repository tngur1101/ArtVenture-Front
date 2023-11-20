<script setup>
import { onMounted, ref, computed } from "vue";
import { useRoute } from "vue-router";
import { detailRegion } from "@/api/region";
import VKakaoMap from "@/components/regions/VKakaoMap.vue";
import RegionBoard from "../components/regions/RegionBoard.vue";

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

const clickPlace = (nowPlace) => {
  console.log(nowPlace);
  selectPlace.value = nowPlace;
};
</script>

<template>
  <div>{{ route.params.regionId }}번 지역 이동</div>
  <div class="map-container">
    <VKakaoMap :places="places" :selectPlace="selectPlace" />
    <RegionBoard :regionId="regionId" :regionName="지역이름" class="board" />
  </div>
  <div>
    <h3>달성 업적</h3>
    <v-container>
      <v-row>
        <v-col v-for="item in region.completeList" :key="item.featId" cols="2">
          <!-- cols 값은 가로 방향으로 카드를 배치할 개수를 나타냅니다 -->
          <v-card class="accomplished" hover @click="clickPlace(item)">
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
  <div>
    <hr />
    <h3>미달성 업적</h3>
    <v-container>
      <v-row>
        <v-col v-for="item in notComplete" :key="item.featId" cols="2">
          <!-- cols 값은 가로 방향으로 카드를 배치할 개수를 나타냅니다 -->
          <v-card class="unaccomplished" hover @click="clickPlace(item)">
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
.accomplished {
  background-color: lightgoldenrodyellow;
}
.unaccomplished {
  filter: grayscale(50%);
  background-color: lightgray;
  /* background-color: rgb(200, 200, 200); */
}

.map-container {
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.board {
  width: 30%;
}
</style>
