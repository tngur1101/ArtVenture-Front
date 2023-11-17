<script setup>
import {ref} from "vue";
import { useRouter } from "vue-router";
import {useBoardStore} from "@/stores/board.js";
import {useAuthStore} from "@/stores/auth.js";

const authStore = useAuthStore();
const boardStore = useBoardStore();
const router = useRouter();

const writeForm = ref({
    author: authStore.user.nickname,
    title: "",
    content: "",
});

//등록 요청 보내고 등록 성공 시 목록 페이지 이동
const write = async () => {
    try{
        if(!confirm("이대로 등록하시겠습니까?")) return;

        await boardStore.writeArticle(writeForm.value);
        router.push({path: "/board/list"});
        alert("등록 성공");
    }catch(error){
        //등록 시 에러 발생
        console.log("등록 에러 내용:", error);
        alert("등록 실패");
    }
};
</script>

<template>
    <div>
        <h1>게시글 등록</h1>
        <form @submit.prevent="write">
            <label><input type="text" v-model="writeForm.title" required />제목</label>
            <br />
            <textarea cols="30" rows="10" v-model="writeForm.content" required></textarea>
            <br />
            <button>등록</button>
        </form>
    </div>
</template>

<style scoped></style>