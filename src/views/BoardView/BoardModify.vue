<script setup>
import {ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useBoardStore} from "@/stores/board.js";

const boardStore = useBoardStore();
const router = useRouter();
const route = useRoute();

const modifyForm = ref({});

const setModifyInfo = async () => {
    await boardStore.getArticle(route.params.articleNo);
    modifyForm.value.articleNo = boardStore.article.articleNo;
    modifyForm.value.title = boardStore.article.title;
    modifyForm.value.content = boardStore.article.content;
};

setModifyInfo();

const modify = async () => {
    try{
        if(!confirm("이대로 수정하시겠습니까?")) return;
        await boardStore.modifyArticle(modifyForm.value);
        router.push("/board");
        alert("수정 성공");
    }catch (error){
        console.log("수정 에러 내용:",error);
        alert("수정 실패");
    }
};

</script>

<template>
    <div>
        <h1>게시글 수정</h1>
        <form @submit.prevent="modify">
            <label><input type="text" v-model.trim="modifyForm.title" required />제목</label>
            <br />
            <textarea cols="30" rows="10" v-model="modifyForm.content" required></textarea>
            <br />
            <button>수정</button>
        </form>
    </div>
</template>

<style scoped></style>