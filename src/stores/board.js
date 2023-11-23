import { ref } from "vue";
import { defineStore } from "pinia";
import instance from "../utils/MainAxios";
// import axios from "@/utils/boardAxios";
// import axios from "axios";

const local = instance;

export const useBoardStore = defineStore("board", () => {
  /*==============목록 start================== */
  const articles = ref([]);
  const totalPageCount = ref(0);
  const getArticles = async (params) => {
    const { data } = await local.get(`/board`, {
      params,
    });
    // console.log("params: ", params);
    // console.log("getArticles의 응답 데이터 : ", data);

    articles.value = data.articles;
    totalPageCount.value = data.totalPageCount;
  };

  /*===============상세==================== */
  const article = ref({});
  const getArticle = async (articleNo) => {
    const { data } = await local.get(`/board/${articleNo}`);
    // console.log(`getArticle(${articleNo})의 응답 데이터 : `, data);

    article.value = data;
  };

  /*==========등록========================= */
  const writeConfig = {
    headers: {
      "Content-Type": "multipart/form-data",
      // dataType: "json",
      // 'Content-Type': false,
    },
  };
  const writeArticle = async (article) => {
    // console.log("registArticle() 요청, 등록데이터 : ", article);
    return await local.post(`/board`, article, writeConfig);
  };

  /*========================삭제====================== */
  const deleteArticle = async (articleNo) => {
    // console.log("삭제 요청 보냄 삭제 글번호: ", articleNo);
    return await local.delete(`/board/${articleNo}`);
  };

  /*=============수정========================= */
  const modifyArticle = async (article) => {
    // console.log("modifyArticle() 요청, 수정데이터: ", article);
    return await local.put(`/board`, article);
  };

  return {
    article,
    articles,
    totalPageCount,
    getArticles,
    writeArticle,
    getArticle,
    deleteArticle,
    modifyArticle,
  };
});
