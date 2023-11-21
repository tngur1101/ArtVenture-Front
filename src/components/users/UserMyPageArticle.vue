<script setup>
import { storeToRefs } from "pinia";
import { useModalStore } from "../../stores/modal";
const modalStore = useModalStore();
const { articleList } = storeToRefs(modalStore);
</script>

<template>
  <v-window-item :class="['h-100', 'text-center']" value="article">
    <h3>최근 작성 게시글</h3>
    <v-card :class="['text-center', 'mx-4', 'scrollable-card']">
      <v-list>
        <v-list-item
          v-for="article in articleList"
          :key="article.articleNo"
          :value="article.articleNo"
          color="primary"
          variant="plain"
        >
          <v-container>
            <v-row>
              <v-col>{{ article.articleNo }}</v-col>
              <v-col>{{ article.title }}</v-col>
              <v-col>{{ article.updateDate }}</v-col>
            </v-row>
          </v-container>
        </v-list-item>
      </v-list>
    </v-card>
  </v-window-item>
</template>

<style scoped>
.scrollable-card {
  overflow-x: auto;
  overflow-y: auto;
  white-space: nowrap;
  max-width: 100%;
  height: 100%;
}
</style>
