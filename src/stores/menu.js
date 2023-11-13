import { defineStore } from "pinia";
import { ref } from "vue";
export const useMenuStore = defineStore("menuStore", () => {
  const menuList = ref([
    { name: "로그인", show: true, routeName: "user-login" },
    { name: "로그아웃", show: false, routeName: "user-logout" },
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
