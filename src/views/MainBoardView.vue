<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import instance from "../utils/MainAxios";
const axios = instance;
const router = useRouter();
const notiArticles = ref([]);
const tendArticles = ref([]);

const notiParam = ref({
  key: "",
  word: "",
  pgno: 1,
  spp: 6,
  type: "1",
});

const tendParam = ref({
  key: "",
  word: "",
  pgno: 1,
  spp: 6,
  type: "3",
});

const getNotiArticles = async (params) => {
  const { data } = await axios.get(`/board`, {
    params,
  });

  notiArticles.value = data.articles;
  // console.log("notiArticles: ", notiArticles.value);
};

const getTendArticles = async (params) => {
  const { data } = await axios.get(`/board`, {
    params,
  });

  tendArticles.value = data.articles;
  // console.log("tendArticles: ", tendArticles.value);
};

getNotiArticles(notiParam.value);
getTendArticles(tendParam.value);

const moveNoti = () => {
  router.push({ name: "article-list", params: { type: "1" } });
};

const moveTend = () => {
  router.push({ name: "article-list", params: { type: "3" } });
};

const moveDetail = (articleNo) => {
  router.push({ name: "article-detail", params: { articleNo } });
};
</script>

<template>
  <div class="board-container">
    <div class="noti-container">
      <v-card width="100%" class="card1">
        <div class="list-title" @click="moveNoti">
          <v-list-item-title>공지글</v-list-item-title>
        </div>
        <div class="list-content">
          <v-list lines="one" class="list-background">
            <v-list-item
              v-for="notiArticle in notiArticles"
              :key="notiArticle.articleNo"
              class="item-content"
              @click="moveDetail(notiArticle.articleNo)"
            >
              <!-- <v-card class="item-content"> -->
              {{ notiArticle.title }}
              <!-- </v-card> -->
            </v-list-item>
          </v-list>
        </div>
      </v-card>
    </div>
    <div class="tend-container">
      <v-card width="100%" class="card2">
        <div class="list-title" @click="moveTend">
          <v-list-item-title>건의글</v-list-item-title>
        </div>
        <v-list lines="one" class="list-background2">
          <v-list-item
            v-for="tendArticle in tendArticles"
            :key="tendArticle.articleNo"
            class="item-content"
            @click="moveDetail(tendArticle.articleNo)"
          >
            <!-- <v-card class="item-content"> -->
            {{ tendArticle.title }}
            <!-- </v-card> -->
          </v-list-item>
        </v-list>
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

.noti-container {
  width: 35%;
}

.card1 {
  background: #e66465;
  border-radius: 25px;
}

.card2 {
  background-color: #9198e5;
  border-radius: 25px;
}

.tend-container {
  width: 35%;
}

.list-background {
  transition: color 0.3s, background-color 0.3s;
}

.list-background2 {
  transition: color 0.3s, background-color 0.3s;
}

.item-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  /* margin-left: 10%; */
}

.list-background :hover {
  color: #fff;
  background-color: #eca8a8;
}

.list-background2 :hover {
  color: #fff;
  background-color: #a6acee;
}
</style>
