import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useAuthStore } from "./auth";

export const useModalStore = defineStore("modal", () => {
  const authStore = useAuthStore();
  const { user } = authStore;
  const isOpenModal = ref(false);
  const completeList = ref([]);
  const articleList = ref([]);
  const url = "http://localhost:80";

  const openModal = async () => {
    console.log("store의 openModal() 호출");
    isOpenModal.value = true;
    const { data } = await axios.get(`${url}/member/${user.id}`);
    completeList.value = data.completeList;
    articleList.value = data.articles;
  };

  const closeModal = () => {
    isOpenModal.value = false;
  };

  return {
    isOpenModal,
    openModal,
    completeList,
    articleList,
    closeModal,
  };
});
