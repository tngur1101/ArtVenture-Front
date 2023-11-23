<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, computed, watch } from "vue";
import { useBoardStore } from "@/stores/board";
import VPagination from "../../components/layout/VPagination.vue";
import VSearchBar from "../../components/layout/VSearchBar.vue";

const boardStore = useBoardStore();
// console.log("boardStore: ", boardStore);

const articles = computed(() => boardStore.articles);
const totalPageCount = computed(() => boardStore.totalPageCount);

const router = useRouter();
const route = useRoute();

const params = ref({
  key: "", //조건 검색 시 컬럼명
  word: "", //해당 컬럼에 일치하는 데이터
  pgno: 1, //조회할 페이지 번호
  spp: 20, //한번에 얻어올 게시글 개수
  type: route.params.type, //글의 타입
  regionid: route.params.regionId,
});

// console.log(params);

watch(
  () => route.params.type,
  (newType) => {
    params.value.type = newType;
    boardStore.getArticles(params.value);
    // console.log("타입 변경");
  }
);
const selectTitle = "검색조건";
const selectOptions = ref([
  { value: "", text: "전체글" },
  { value: "title", text: "제목" },
  { value: "author", text: "작성자" },
]);

boardStore.getArticles(params.value);
// console.log(params.value);

const moveDetail = (articleNo) => {
  router.push({ name: "article-detail", params: { articleNo } });
};

const changePage = async (pageNum) => {
  params.value.pgno = pageNum;
  await boardStore.getArticles(params.value);
};

const getSearchArticles = (key, word) => {
  params.value.key = key;
  params.value.word = word;
  params.value.pgno = 1;

  boardStore.getArticles(params.value);
};
</script>

<template>
  <div style="margin-top: 5%">
    <v-container class="fill-hegiht" fluid style="min-height: 434px">
      <v-fade-transition mode="out-in">
        <v-row>
          <v-col cols="13">
            <v-card>
              <v-img src="https://picsum.photos/350/165?random" height="400" cover class="bg-grey-lighten-2"></v-img>
            </v-card>
          </v-col>
        </v-row>
      </v-fade-transition>
    </v-container>

    <div class="search-background">
      <div class="search-bar-container">
        <v-search-bar @search-keyword="getSearchArticles" :title="selectTitle" :options="selectOptions" />
      </div>
      <div class="board-title-container">
        <div class="board-title">게시판 목록</div>
        <div>
          <v-btn class="write-btn"><RouterLink :to="{ name: 'article-write' }">글쓰기</RouterLink></v-btn>
        </div>
      </div>
    </div>

    <div class="card-container">
      <v-card class="vcard" elevation="10">
        <v-table>
          <thead>
            <tr>
              <th class="text-center">번호</th>
              <th class="text-center">제목</th>
              <th class="text-center">작성자</th>
              <th class="text-center">날짜</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="article in articles"
              :key="article.articleNo"
              @click="moveDetail(article.articleNo)"
              class="row-container"
            >
              <td>{{ article.articleNo }}</td>
              <td>{{ article.title }}</td>
              <td>{{ article.author }}</td>
              <td>{{ article.updateDate }}</td>
            </tr>
          </tbody>
        </v-table>
        <v-pagination :total-page="totalPageCount" :total-visible="5" @click-page="(pgNum) => changePage(pgNum)" />
      </v-card>
    </div>
  </div>
</template>

<style scoped>
.article-item:hover {
  background-color: aquamarine;
}
td {
  text-align: center;
}

.vcard {
  width: 70%;
}

.card-container {
  display: flex;
  justify-content: center;
  /* background: linear-gradient(0.25turn, #3f87a6, #ebf8e1, #f69d3c); */
}

.board-title-container {
  margin: 0 auto;
  width: 70%;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 2rem;
  /* margin-left: 15%; */
}

.write-btn {
  position: absolute;
  right: 0;
  /* margin-left: 15%;s */
}

.board-title {
  justify-content: center;
  font-family: "Your-Mechanical-Font", sans-serif; /* 원하는 기계적인 폰트명으로 변경 */
  font-size: 24px; /* 원하는 크기로 변경 */
  font-weight: bold; /* 글자 굵기 설정 (선택 사항) */
  text-transform: uppercase; /* 대문자 변환 (선택 사항) */
  letter-spacing: 2px; /* 글자 간격 설정 (선택 사항) */
}

.search-bar-container {
  width: 70%;
  margin: 0 auto;
  /* background: linear-gradient(0.25turn, #3f87a6, #ebf8e1, #f69d3c); */
}

.search-background {
  /* background: linear-gradient(0.25turn, #3f87a6, #ebf8e1, #f69d3c); */
  height: 10rem;
  padding-top: 2rem;
}

.row-container {
}

.row-container :hover {
  color: #fff;
  background-color: #bbb8b8;
}
</style>
