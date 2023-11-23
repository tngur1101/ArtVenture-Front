<script setup>
import { storeToRefs } from "pinia";
import { ref } from "vue";
import UserMyPageInfo from "./UserMyPageInfo.vue";
import UserMyPageComplete from "./UserMyPageComplete.vue";
import UserMyPageArticle from "./UserMyPageArticle.vue";
import { useModalStore } from "@/stores/modal";
const tab = ref({});
const modalStore = useModalStore();
const { isOpenModal } = storeToRefs(modalStore);
</script>

<template>
  <v-dialog v-model="isOpenModal" width="800">
    <v-card :class="['elevation-4', 'rounded-xl', 'modal-card']">
      <v-tabs v-model="tab" color="deep-purple-accent-4" align-tabs="center">
        <v-tab :value="info">나의 정보</v-tab>
        <v-tab :value="complete">달성 업적</v-tab>
        <v-tab :value="article">작성한 글</v-tab>
      </v-tabs>
      <v-window v-model="tab" scrollable :class="['scrollable-tabs']">
        <user-my-page-info />
        <user-my-page-complete />
        <user-my-page-article />
      </v-window>
    </v-card>
  </v-dialog>
</template>
<style scoped>
.modal-card {
  min-width: 800px;
  height: 600px;
}

.scrollable-tabs {
  overflow-x: auto;
  overflow-y: auto;
  white-space: nowrap;
  max-width: 100%;
  height: 90%;
}
</style>
