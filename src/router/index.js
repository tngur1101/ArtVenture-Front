import { createRouter, createWebHistory } from "vue-router";
import TheMainView from "../views/TheMainView.vue";
import BoardView from "@/views/BoardView.vue";
import BoardList from "@/views/BoardView/BoardList.vue";
import BoardWrite from "@/views/BoardView/BoardWrite.vue";
import BoardDetail from "@/views/BoardView/BoardDetail.vue";
import BoardModify from "@/views/BoardView/BoardModify.vue";
import UserRegist from "@/components/users/UserRegist.vue";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "main",
      component: TheMainView,
    },
    {
      path: "/region/:regionId",
      name: "region",
      component: () => import("@/views/TheRegionDetailView.vue"),
    },
    {
      path: "/user",
      name: "user",
      component: () => import("@/views/TheUserView.vue"),
      children: [
        {
          path: "/login",
          name: "user-login",
          component: () => import("@/components/users/UserLogin.vue"),
        },
        {
          path:"/regist",
          name:"user-regist",
          component: UserRegist,
        },
      ],
    },
    //BoardView
    {
      path: "/board",
      component: BoardView,
      redirect: "/board/list/0",
      children: [
        //BoardList without type
        {
          path: "list",
          name:"whole-article-list",
          component: BoardList,
        },

        //BoardList with type
        {
          path: "list/:type",
          name:"article-list",
          component: BoardList,
        },

        //BoardDetail
        {
          name: "article-detail",
          path:"detail/:articleNo",
          component: BoardDetail,
        },

        // BoardWrite
        {
          name: "article-write",
          path: "write",
          component: BoardWrite,
          meta: {requiresAuth: true}, //인증(로그인)필요
        },

        //BoardModify
        {
          name: "article-modify",
          path: "modify/:articleNo",
          component: BoardModify,
          meta: {requiresAuth: true},
          //관리자 권한 또한 필요한 경우
          //meta: {requiresAuth: true, requiresAdmin: true}
        },
      ],
    },
  ],
});

export default router;
