<script setup>
import { storeToRefs } from "pinia";
import { useMenuStore } from "../../stores/menu";

const menuStore = useMenuStore();
const { menuList } = storeToRefs(menuStore);
const { changeMenuState } = menuStore;

const logout = () => {
  console.log("logout!!!!!");

  changeMenuState();
};
</script>

<template>
  <div>
    <nav>
      <div>
        <ul>
          <template v-for="menu in menuList" :key="menu.routeName">
            <template v-if="menu.show">
              <template v-if="menu.routeName === 'user-logout'">
                <li>
                  <router-link to="/" @click.prevent="logout">{{
                    menu.name
                  }}</router-link>
                </li>
              </template>
              <template v-else>
                <li>
                  <router-link :to="{ name: menu.routeName }">{{
                    menu.name
                  }}</router-link>
                </li>
              </template>
            </template>
          </template>
        </ul>
      </div>
    </nav>
  </div>
</template>

<style scoped></style>
