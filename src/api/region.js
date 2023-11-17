import { useAuthStore } from "../stores/auth";
import { localAxios } from "../utils/http-commons";

console.log("regins.js");
const local = localAxios();

function detailRegion(regionId, success, fail) {
  const authStore = useAuthStore();
  console.log("지역 정보 요청 : ", regionId);
  local
    .post(`/region/${regionId}`, { userId: authStore.user.id })
    .then(success)
    .catch(fail);
}

function getSidoList(success, fail) {
  console.log("지역 리스트 요청");
  local.get(`/region`).then(success).catch(fail);
}
export { detailRegion, getSidoList };
