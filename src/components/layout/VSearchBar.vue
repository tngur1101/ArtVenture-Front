<script setup>
import { defineProps, ref } from "vue";
const props = defineProps({ title: String, options: Array });
const key = ref(props.options[0].value);
const word = ref("");

const search = () => {
  console.log("key : ", key.value, " word : ", word.value);
};
</script>

<template>
  <div :class="['d-flex', 'flex-row', 'justify-center']">
    <v-select
      :label="props.title"
      :items="props.options"
      variant="outlined"
      item-title="text"
      item-value="value"
      v-model="key"
      :class="['v-col-2', 'pa-0']"
    ></v-select>
    <v-text-field
      density="compact"
      variant="solo"
      label="검색어를 입력하세요"
      append-inner-icon="mdi-magnify"
      single-line
      hide-details
      v-model="word"
      @click:append-inner="$emit('searchKeyword', key, word)"
      :class="['v-col-10', 'pa-0', 'custom-text-field']"
    ></v-text-field>
  </div>
</template>

<style scoped>
.custom-text-field {
  border-radius: 12px; /* 원하는 border radius 값으로 조정 */
  width: 50% !important; /* 원하는 너비 값으로 조정 */
  margin-left: 2%;
}
</style>
