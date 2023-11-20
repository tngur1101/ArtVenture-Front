<script setup>
import { useRoute,useRouter } from "vue-router";
import { ref, computed } from "vue";
import { useBoardStore } from "@/stores/board";

const boardStore = useBoardStore();
console.log("boardStore: ", boardStore);

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
});

boardStore.getArticles(params.value);

const moveDetail = (articleNo) => {
  router.push({ name: "article-detail", params: { articleNo } });
};

const changePage = async (pageNum) => {
  console.log("페이지 변경, 페이지 번호: ", pageNum);
  params.value.pgno = pageNum;
  await boardStore.getArticles(params.value);
  articles.value[0] = {};
};

const getSearchArticles = (searchKeyword) => {
  console.log("BoardList의 조건 검색 메소드 호출: ", searchKeyword);
  params.value.key = searchKeyword.key;
  params.value.word = searchKeyword.word;
  params.value.pgno = 1;

  boardStore.getArticles(params.value);
};

const searchInfo = ref({
  key:"",
  word:"",
});

</script>

<template>
  <div style="margin-top: 5%;">
    <v-container class="fill-hegiht" fluid style="min-height: 434px">
      <v-fade-transition mode="out-in">
        <v-row>
          <v-col cols="13">
          <v-card>
            <v-img
              src="https://picsum.photos/350/165?random"
              height="400"
              cover
              class="bg-grey-lighten-2"
            ></v-img>
          </v-card>
        </v-col>
        </v-row>
      </v-fade-transition>
    </v-container>
    <v-btn><RouterLink :to="{ name: 'article-write' }">글쓰기</RouterLink></v-btn>
    <v-table>
    <thead>
      <tr>
        <th class="text-center">
          번호
        </th>
        <th class="text-center">
          제목
        </th>
        <th class="text-center">
          작성자
        </th>
        <th class="text-center">
          날짜
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="article in articles"
        :key="article.articleNo"
        @click="moveDetail(article.articleNo)"
      >
      <td>{{ article.articleNo }}</td>
        <td>{{ article.title }}</td>
        <td>{{ article.author }}</td>
        <td>{{ article.writeDate }}</td>
      </tr>
    </tbody>
  </v-table>
  </div>
</template>

<style scoped>
.article-item:hover {
  background-color: aquamarine;
}
</style>
