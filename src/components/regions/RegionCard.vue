<!-- RegionCard 만들기 -->
<!-- 클릭 시 region detail로 이동 -->
<!-- prop으로 전달된 정보들을 화면에 찍어야 함 -->

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const props = defineProps({ regionObj: Object });
const router = useRouter();

const onRegionClick = () => {
  console.log("지역 클릭");
  console.log(props.regionObj);
  router.push(`/region/${props.regionObj.sidoId}`);
};
</script>

<template>
  <div @click="onRegionClick">{{ props.regionObj.name }}</div>
</template>

<style scoped></style>
