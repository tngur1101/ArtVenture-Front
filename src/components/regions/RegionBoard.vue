<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useRegionStore } from "../../stores/region";
import instance from "../../utils/MainAxios";
const regionStore = useRegionStore();
const axios = instance;
const router = useRouter();

const regionArticles = ref([]);
const props = defineProps({ regionId: Number, regionName: String });

const regionParam = ref({
  key: "",
  word: "",
  pgno: 1,
  spp: 6,
  type: 2,
  regionid: props.regionId,
});

const boardParam = ref({
  key: "",
  word: "",
  pgno: 1,
  spp: 20,
  type: 2,
  regionid: props.regionId,
});

const getRegionArticles = async (params) => {
  const { data } = await axios.get(`/board`, {
    params,
  });

  regionArticles.value = data.articles;
};

getRegionArticles(regionParam.value);

const moveRegionBoard = () => {
  router.push({
    name: "article-list-region",
    params: { type: 2, regionId: props.regionId },
  });
};

const moveDetail = (articleNo) => {
  router.push({ name: "article-detail", params: { articleNo } });
};
</script>

<template>
  <div class="board-container">
    <div class="container">
      <v-card width="100%">
        <div class="list-title" @click="moveRegionBoard">
          <v-list-item-title class="title">{{ regionStore.regionName }} 공략글</v-list-item-title>
        </div>
        <div class="list-content">
          <v-list lines="one">
            <v-list-item
              v-for="regionArticle in regionArticles"
              :key="regionArticle.articleNo"
              @click="moveDetail(regionArticle.articleNo)"
            >
              <v-card class="item-content">
                {{ regionArticle.title }}
              </v-card>
            </v-list-item>
          </v-list>
        </div>
      </v-card>
    </div>
  </div>
</template>

<style scoped>
.board-container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}

.list-title {
  display: flex;
  justify-content: center;
}

.container {
  width: 90%;
  /* border: 1px solid black; */
  min-height: 400px;
}

.item-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-left: 10%;
}

.title {
  margin: 10px;
  font-family: sans-serif;
  font-weight: 600;
  font-size: 1.5em;
}
</style>
