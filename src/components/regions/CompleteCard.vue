<!-- CompleteCard 만들기 -->
<!-- 클릭 시 맵 중앙 이동 -->
<!-- prop으로 전달된 정보들을 화면에 찍어야 함 -->

<script setup>
const props = defineProps({ cardObj: Object });
</script>

<template>
  <div class="card-container elevation-4">
    <v-card
      :class="['ma-4']"
      height="150"
      width="150"
      @click="$emit('clickCard')"
    >
      <v-img :src="props.cardObj.imageUrl" class="image"> </v-img>
      <v-card-title class="text-center">{{ props.cardObj.name }}</v-card-title>
      <!-- <v-card-text>{{ props.complete.description }}</v-card-text> -->
    </v-card>
  </div>
</template>

<style scoped>
.card-container {
  margin: 0 10px;
  border-radius: 5%;
  border: 1px solid lightgray;
}
.image {
  height: 100px;
  width: 150px;
}
</style>
