<!-- RegionCard 만들기 -->
<!-- 클릭 시 region detail로 이동 -->
<!-- prop으로 전달된 정보들을 화면에 찍어야 함 -->

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useRegionStore } from "../../stores/region";

const props = defineProps({ regionObj: Object });
const router = useRouter();
const regionStore = useRegionStore();

const onRegionClick = () => {
  // console.log("지역 클릭");
  // console.log(props.regionObj);
  regionStore.moveRegion(props.regionObj.name);
  router.push(`/region/${props.regionObj.sidoId}`);
};
</script>

<template>
  <div>
    <v-card :class="['ma-4']" height="200" width="200" @click="onRegionClick">
      <v-img
        class="align-end text-white"
        height="150"
        :src="props.regionObj.imageUrl"
        cover
      >
        <v-card-title>{{ props.regionObj.name }}</v-card-title>
      </v-img>
      <v-card-subtitle class="pt-4">
        {{ props.regionObj.name }}
      </v-card-subtitle>
    </v-card>
  </div>
</template>

<style scoped></style>
