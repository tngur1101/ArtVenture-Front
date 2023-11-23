<script setup>
import { ref } from "vue";
const props = defineProps({ totalPage: Number, totalVisible: Number });
const page = ref(1);
</script>

<template>
  <div class="text-center">
    <v-pagination
      v-model="page"
      :length="props.totalPage"
      :total-visible="props.totalVisible"
      @click="$emit('clickPage', page)"
    ></v-pagination>
  </div>
</template>

<style scoped></style>
