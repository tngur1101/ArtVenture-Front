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
    modifyForm.value.updateDate = boardStore.article.updateDate;
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

//취소 버튼을 누르면 detail로 돌아감
const moveArticle = (articleNo) => {
    router.push({ name: "article-detail", params: { articleNo } });
}

</script>

<template>
    <div style="margin-top: 7%;" class="modify-page">
        <v-card variant="outlined" class="modify-container" elevation="8" rounded="lg">
            <div class="aaa">글 수정</div>
            <div class="title-container">
                <div class="title">제목</div>
                <div class="title-content"><v-text-field density="compact" placeholder="제목을 입력해주세요" v-model="modifyForm.title"></v-text-field></div>
            </div>
            <v-divider :thickness="8" class="divider"></v-divider>
            <div class="content-container">
                <div class="text-content">내용</div>
                <div class="text">
                    <v-container fluid>
                        <v-textarea 
                        clearable
                        clear-icon="mdi-close-circle"
                        label="Text"
                        model-value="내용을 입력해주세요"
                        v-model="modifyForm.content"
                        ></v-textarea>
                    </v-container>
                </div>
            </div>
            <div class="btn-container">
                <v-btn class="modify-btn" @click="modify">수정</v-btn>
                <v-btn class="cancel-btn" @click="moveArticle">취소</v-btn>
            </div>
        </v-card>
    </div>
</template>

<style scoped>
.modify-page{
    display: flex;
    justify-content: center;
    align-items: center;
}

.modify-container{
    width: 70%;
}

.aaa{
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
    margin-top: 2%;
}

.title-container{
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 3%;
}

.title{
margin-left: 3%;
}

.title-content{
    width: 70%;
}

.content-container{
    display: flex;
    /* align-items: center; */
    padding: 3%;
    margin-left: 5%;
    flex-direction: column;
}

.text-content{
    margin-left: 4%;
}

.btn-container{
    margin-left: 10%;
    margin-bottom: 5%;
}

.modify-btn{

}

.cancel-btn{
    margin-left: 2%;
}
</style>