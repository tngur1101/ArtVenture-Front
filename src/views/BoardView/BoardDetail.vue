<script setup>
import {computed} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useBoardStore} from "@/stores/board";

const boardStore = useBoardStore();
const article = computed(()=> {
    console.log(boardStore.article)
     return boardStore.article

    });   //store 데이터를 반응형으로 가져오기

const router = useRouter();
const route = useRoute();

boardStore.getArticle(route.params.articleNo);
console.log(article.value);

const deleteArticle = async () => {
    try{
        if(!confirm("정말 삭제하시겠습니까?")) return;

        await boardStore.deleteArticle(article.value.articleNo);
        router.push("/board");
        alert("삭제 완료!");
    }catch(error){
        console.log("삭제 에러: ", error);
        alert("삭제 실패");
    }
};

</script>

<template>
    <div>
        <h1>게시판 상세</h1>
        <!--목록 화면 이동-->
        <RouterLink to="/board">목록</RouterLink>
        <table>
            <tr>
                <th>글 번호</th>
                <td>{{ article.articleNo }}</td>
            </tr>
            <tr>
                <th>글 제목</th>
                <td>{{ article.title }}</td>
            </tr>
            <tr>
                <th>글 내용</th>
                <td>{{ article.content }}</td>
            </tr>
            <tr>
                <th>작성자</th>
                <td>{{ article.author }}</td>
            </tr>
        </table>

        <button @click="deleteArticle">삭제</button>
    </div>

</template>

<style scoped></style>