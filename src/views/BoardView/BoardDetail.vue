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
    <!-- 한개의 카드 안에
    맨 위에 제목
    그 아래 작성자, 등록 날짜
    그 밑에 선을 긋고
    그 밑에 해당 그의 내용을 적어준다.
    여기서 관건은 아직 구현이 덜 된 이미지 파일 첨부인데
    글 등록 시 첨부한 그림이 표기되어야 한다. -->

    <!-- 맨 밑에 다음글 이전글과 리스트를 만들어줄 것인가? -->
    <div style="margin-top: 7%;" class="detail-page">
        <v-card variant="outlined" class="detail-container">
        <div class="detail-title">{{ article.title }}</div>
        <div class="author-date-container">
            <div class="detail-date">{{ article.writeDate }}</div>
            <div class="detail-author">{{ article.author }}</div>
        </div>
        <v-divider :thickness="8" color="info" class="divider"></v-divider>
        <div class="detail-content"><pre v-text="article.content"></pre></div>
        <div class="btn-container">
            <v-btn class="modify-btn">수정</v-btn>
            <v-btn class="delete-btn" @click="deleteArticle">삭제</v-btn>
        </div>
    </v-card>
    </div>
    

</template>

<style scoped>
.detail-page{
    display: flex;
    justify-content: center;
    align-items: center;
}

.detail-container{
    width: 70%;
}

.detail-title{
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 5rem;
}

.detail-content{
    font-size: 1.5rem;
    padding: 10%;
}

.author-date-container{
    float: right;
    display: flex;
    flex-direction: column;
    width: 30%;
    /* justify-content: center; */
    align-items: center;
}

.detail-author{
}

.detail-date{
    margin-right: 3%;
}

.divider{
    margin-top: 7%;
}

.btn-container{
    margin-bottom: 1%;
}

.modify-btn{
    margin-left: 1%;
}

.delete-btn{
    margin-left: 1%;
}

</style>