import { localAxios } from "../utils/http-commons";

const local = localAxios();

function detailRegion(regionId, success, fail) {
  console.log("지역 정보 요청 : ", regionId);
  local.get(`/region/${regionId}`).then(success).catch(fail);
}

function getSidoList(success, fail) {
  console.log("지역 리스트 요청");
  local.get(`/region`).then(success).catch(fail);
}
export { detailRegion, getSidoList };
