<script setup>
import { onMounted, ref, computed } from "vue";
import { useRoute } from "vue-router";
import { detailRegion } from "@/api/region";
import VKakaoMap from "@/components/regions/VKakaoMap.vue";
import RegionBoard from "../components/regions/RegionBoard.vue";
import CompleteCard from "../components/regions/CompleteCard.vue";
import RegionDescription from "../components/regions/RegionDescription.vue";

const route = useRoute();
const { regionId } = route.params;
const region = ref({});
const places = ref([]);
const selectPlace = ref({});

// console.log(route.params.regionId);

onMounted(() => {
  getRegion();
});

const notComplete = computed(() => {
  return places.value.filter((item) =>
    region.value.completeList.every((comple) => comple.featId != item.featId)
  );
});

const getRegion = () => {
  detailRegion(
    regionId,
    ({ data }) => {
      region.value = data;
      // console.log("data : ", data);
      places.value = region.value.featList;
      // console.log("places : ", places);
      // console.log("complete : ", region.value.completeList);
      // console.log("notComplete : ", notComplete.value);
    },
    (error) => {
      console.log(error);
    }
  );
};

const clickPlace = (nowPlace) => {
  selectPlace.value = nowPlace;
};
</script>

<template>
  <div class="margin">
    <div class="map-container">
      <VKakaoMap
        v-if="places.length > 0"
        :places="places"
        :selectPlace="selectPlace"
        :completePlaces="region.completeList"
      />
      <div class="right">
        <RegionBoard :regionId="regionId" />
        <region-description :featObj="selectPlace" />
      </div>
    </div>
    <div>
      <h3>달성 업적</h3>
      <div>
        <v-sheet class="mx-auto" elevation="8" max-width="100%">
          <v-slide-group
            v-model="model"
            class="pa-4"
            selected-class="bg-success"
            show-arrows
          >
            <v-slide-group-item
              v-for="complete in region.completeList"
              :key="complete.featId"
            >
              <complete-card
                class="accomplished"
                :card-obj="complete"
                @click-card="clickPlace(complete)"
              />
            </v-slide-group-item>
          </v-slide-group>
        </v-sheet>
      </div>
    </div>
    <br />
    <div>
      <h3>미달성 업적</h3>
      <div>
        <v-sheet class="mx-auto" elevation="8" max-width="100%">
          <v-slide-group
            v-model="model"
            class="pa-4"
            selected-class="bg-success"
            show-arrows
          >
            <v-slide-group-item
              v-for="uncomplete in notComplete"
              :key="uncomplete.featId"
            >
              <complete-card
                class="unaccomplished"
                :card-obj="uncomplete"
                @click-card="clickPlace(uncomplete)"
              />
            </v-slide-group-item>
          </v-slide-group>
        </v-sheet>
      </div>
    </div>
  </div>
</template>

<style scoped>
.margin {
  margin-top: 5%;
}
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

.right {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 30%;
}
</style>
