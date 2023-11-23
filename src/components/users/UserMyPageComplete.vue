<script setup>
import { storeToRefs } from "pinia";
import { useModalStore } from "../../stores/modal";
import FeatCard from "./FeatCard.vue";

const modalStore = useModalStore();
const { completeList } = storeToRefs(modalStore);
</script>

<template>
  <v-window-item value="complete">
    <v-container>
      <v-row>
        <v-col v-for="complete in completeList" :key="complete.featId" cols="4">
          <feat-card :cardObj="complete" />
        </v-col>
      </v-row>
    </v-container>
  </v-window-item>
</template>

<style scoped></style>
