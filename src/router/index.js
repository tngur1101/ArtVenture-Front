import { createRouter, createWebHistory } from "vue-router";
import TheMainView from "../views/TheMainView.vue";
import BoardView from "@/views/BoardView.vue";
import BoardList from "@/views/BoardView/BoardList.vue";
import BoardWrite from "@/views/BoardView/BoardWrite.vue";
import BoardDetail from "@/views/BoardView/BoardDetail.vue";
import BoardModify from "@/views/BoardView/BoardModify.vue";
import UserRegist from "@/components/users/UserRegist.vue";
import { useAuthStore } from "../stores/auth";

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
          path: "/regist",
          name: "user-regist",
          component: UserRegist,
        },
        {
          path: "/mypage",
          name: "my-page",
          component: () => import("@/components/users/UserMyPage.vue"),
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
          name: "whole-article-list",
          component: BoardList,
        },

        //BoardList with type
        {
          path: "list/:type",
          name: "article-list",
          component: BoardList,
        },

        // BoardList with type, regionid
        {
          path: "list/:type/:regionId",
          name: "article-list-region",
          component: BoardList,
        },

        //BoardDetail
        {
          name: "article-detail",
          path: "detail/:articleNo",
          component: BoardDetail,
        },

        // BoardWrite
        {
          name: "article-write",
          path: "write",
          component: BoardWrite,
          meta: { requiresAuth: true }, //인증(로그인)필요
        },

        //BoardModify
        {
          name: "article-modify",
          path: "modify/:articleNo",
          component: BoardModify,
          meta: { requiresAuth: true },
          //관리자 권한 또한 필요한 경우
          //meta: {requiresAuth: true, requiresAdmin: true}
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const { checkAuth } = authStore;

  if (to.meta.requiresAuth) {
    // 여기에서 인증 여부 확인 로직을 추가합니다.
    const isAuthenticated = checkAuth(); // 인증 확인하는 함수 (예시)

    if (!isAuthenticated) {
      // 인증되지 않았을 경우 로그인 페이지로 리다이렉트
      next({ name: "user-login", query: { redirect: to.fullPath } });
    } else {
      // 인증되었을 경우 요청을 계속 진행
      next();
    }
  } else {
    // 인증이 필요하지 않은 페이지는 그냥 진행
    next();
  }
});

export default router;
