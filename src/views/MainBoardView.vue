<script setup>
import {ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {localAxios} from "@/utils/http-commons";

const axios = localAxios();
const router = useRouter();
const notiArticles = ref([]);
const tendArticles = ref([]);

const notiParam = ref({
    key:"",
    word:"",
    pgno:1,
    spp:6,
    type:"1",
});

const tendParam = ref({
    key:"",
    wrod:"",
    pgno:1,
    spp:6,
    type:"3",
});

const getNotiArticles = async (params) => {
    const {data} = await axios.get(`/board`, {
        params,
    });

    notiArticles.value = data.articles;
    console.log("notiArticles: ", notiArticles.value);
};

const getTendArticles = async (params) => {
    const {data} = await axios.get(`/board`, {
        params,
    });

    tendArticles.value = data.articles;
    console.log("tendArticles: ", tendArticles.value);
};

getNotiArticles(notiParam.value);
getTendArticles(tendParam.value);

const moveNoti = () => {
    router.push({name:"article-list", params: {type:"1"}});
}

const moveTend = () => {
    router.push({name:"article-list", params: {type:"3"}});
}


</script>

<template>
    <div class="board-container">
        <div class="noti-container">
            <v-card
            width="100%"
            >
            <div class="list-title" @click="moveNoti">
                <v-list-item-title>공지글</v-list-item-title>
            </div>
            <div class="list-content">
            <v-list lines="one">
                <v-list-item 
                v-for="notiArticle in notiArticles"
                :key="notiArticle.articleNo"
                >
                <v-card class="item-content">
                    {{ notiArticle.title }}   
                </v-card>
                </v-list-item>
            </v-list>
        </div>
            </v-card>
        </div>
        <div class="tend-container">
            <v-card
            width="100%"
            >
            <div class="list-title" @click="moveTend">
                <v-list-item-title>건의글</v-list-item-title>
            </div>
            <v-list lines="one">
                <v-list-item 
                v-for="tendArticle in tendArticles"
                :key="tendArticle.articleNo"
                >
                <v-card class="item-content">
                    {{ tendArticle.title }}   
                </v-card>
                </v-list-item>
            </v-list>
            </v-card>
        </div>
    </div>
</template>

<style scoped>
.board-container{
display: flex;
flex-direction: row;
justify-content: space-around;
align-items: center;
}

.list-title{
    display: flex;
    justify-content: center;
}


.noti-container{
    width: 35%;
}

.tend-container{
    width: 35%;
}

.item-content{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-left: 10%;
}


</style>