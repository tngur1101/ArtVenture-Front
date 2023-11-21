<!-- CompleteCard 만들기 -->
<!-- 클릭 시 맵 중앙 이동 -->
<!-- prop으로 전달된 정보들을 화면에 찍어야 함 -->

<script setup>
const props = defineProps({ cardObj: Object });
</script>

<template>
  <v-card class="mx-auto">
    <v-img
      class="align-end text-white"
      src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
      cover
    >
      <v-card-title>{{ props.cardObj.name }}</v-card-title>
    </v-img>

    <v-card-subtitle class="pt-4">
      클리어 : {{ props.cardObj.featTime }}
    </v-card-subtitle>

    <v-card-text>
      <div>{{ props.cardObj.description }}</div>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.card-container {
  margin: 0 10px;
  border-radius: 5%;
  border: 1px solid lightgray;
}
</style>
