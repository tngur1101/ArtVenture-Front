<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useBoardStore } from "@/stores/board.js";
import { useAuthStore } from "@/stores/auth.js";

const authStore = useAuthStore();
const boardStore = useBoardStore();
const router = useRouter();

const boardForm = ref(null);

let selectedValue = ref("");

const items = [
  { title: "공지", value: 1 },
  { title: "공략", value: 2 },
  { title: "건의", value: 3 },
];

//등록 요청 보내고 등록 성공 시 목록 페이지 이동
const write = async () => {
  try {
    const imageData = new FormData(boardForm.value);
    console.log("form !!!!!!!!!!", imageData);
    imageData.append("author", authStore.user.nickname);
    imageData.append("type", selectedValue.value.value);

    if (!confirm("이대로 등록하시겠습니까?")) return;
    // console.log(writeForm.value.fileInfo);
    console.log("formData:");
    for (const entry of imageData.entries()) {
      console.log(entry[0], entry[1]);
    }
    // await boardStore.writeArticle(writeForm.value);
    await boardStore.writeArticle(imageData);

    router.push({ path: "/board/list" });
    alert("등록 성공");
  } catch (error) {
    //등록 시 에러 발생
    console.log("등록 에러 내용:", error);
    alert("등록 실패");
  }
};

// watch(selectedValue, (newValue, oldValue) => {
//   console.log("Selected Value changed:", newValue);
// });

//취소 버튼을 누르면 list로 돌아감
const moveList = () => {
  router.push({ name: "whole-article-list" });
};
</script>

<template>
  <div style="margin-top: 7%" class="write-page">
    <v-card variant="outlined" class="write-container" elevation="8" rounded="lg">
      <div class="aaa">글 작성</div>
      <form ref="boardForm">
        <div class="title-container">
          <div class="title">제목</div>
          <div class="title-content">
            <v-text-field density="compact" placeholder="제목을 입력해주세요" name="title"></v-text-field>
          </div>
        </div>
        <div>
          <v-col cols="12">
            <v-combobox
              :items="items"
              label="type"
              v-model="selectedValue"
              item-title="title"
              item-value="value"
            ></v-combobox>
          </v-col>
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
                name="content"
              ></v-textarea>
            </v-container>
          </div>
        </div>
        <div class="img-container">
          <v-file-input multiple label="이미지 넣기" name="files"></v-file-input>
        </div>
        <div class="btn-container">
          <v-btn class="regist-btn" @click="write">등록</v-btn>
          <v-btn class="cancel-btn" @click="moveList">취소</v-btn>
        </div>
      </form>
    </v-card>
  </div>
</template>

<style scoped>
.write-page {
  display: flex;
  justify-content: center;
  align-items: center;
}

.write-container {
  width: 70%;
}

.aaa {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  margin-top: 2%;
}

.title-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 3%;
}

.title {
  margin-left: 3%;
}

.title-content {
  width: 70%;
}

.content-container {
  display: flex;
  /* align-items: center; */
  padding: 3%;
  margin-left: 5%;
  flex-direction: column;
}

.text-content {
  margin-left: 4%;
}

.btn-container {
  margin-left: 10%;
  margin-bottom: 5%;
}

.regist-btn {
}

.cancel-btn {
  margin-left: 2%;
}

.img-container {
  width: 80%;
  margin: 0 auto;
}
</style>
