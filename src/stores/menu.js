import { defineStore } from "pinia";
import { ref } from "vue";
import { useAuthStore } from "./auth";

export const useMenuStore = defineStore("menuStore", () => {
  const authStore = useAuthStore();

  const menuList = ref([
    { name: "로그인", show: !authStore.token, routeName: "user-login" },
    { name: "로그아웃", show: !!authStore.token, routeName: "user-logout" },
  ]);

  const changeMenuState = () => {
    menuList.value = menuList.value.map((item) => ({
      ...item,
      show: !item.show,
    }));
  };

  return {
    menuList,
    changeMenuState,
  };
});
