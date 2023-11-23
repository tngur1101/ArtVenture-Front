<script setup>
import { ref, watch, onMounted } from "vue";

const container = ref(null);
const map = ref(null);
const positions = ref([]);
const markers = ref([]);
const lines = ref([]);
const lines2 = ref([]);

const props = defineProps({
  places: Array,
  selectPlace: Object,
  completePlaces: Array,
});

watch(
  () => props.selectPlace.value,
  () => {
    console.log("props Lat!!!!!!!!!!!!", props.selectPlace.latitude);
    console.log("props Lng!!!!!!!!!!!!", props.selectPlace.longitude);
    // 이동할 위도 경도 위치를 생성합니다
    const moveLatLon = new kakao.maps.LatLng(
      props.selectPlace.latitude,
      props.selectPlace.longitude
    );

    // 지도 중심을 부드럽게 이동시킵니다
    // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
    map.value.panTo(moveLatLon);
  },
  { deep: true }
);

onMounted(() => {
  // console.log("KakaoMap onMounted() 호출");
  if (window.kakao && window.kakao.maps) initMap();
  else loadScript();
});

const loadScript = () => {
  console.log("map javascript load 실행");
  const script = document.createElement("script");
  // autoload=false 설정 필수
  // 그림 그리려면 drawing library 추가해야 함
  script.src = `http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${
    import.meta.env.VITE_KAKAO_MAP_SERVICE_KEY
  }&libraries=services,clusterer`;
  /* global kakao */
  script.onload = () => kakao.maps.load(() => initMap());
  document.head.appendChild(script);
};

const initMap = () => {
  console.log("initMap 실행");
  const options = {
    center: new kakao.maps.LatLng(33.450701, 126.570667),
    level: 3,
  };
  map.value = new kakao.maps.Map(container.value, options);
  getPosition();
  loadMarkers();
  drawLines();
};

const getPosition = () => {
  console.log("getPosition 실행");
  positions.value = [];

  for (let place of props.places) {
    let obj = {};
    obj.latlng = new kakao.maps.LatLng(place.latitude, place.longitude);
    obj.title = place.name;

    positions.value.push(obj);
  }
};

const loadMarkers = () => {
  // 현재 표시되어있는 marker들이 있다면 map에 등록된 marker를 제거한다.
  deleteMarkers();

  // 마커 이미지를 생성합니다
  //   const imgSrc = require("@/assets/map/markerStar.png");
  // 마커 이미지의 이미지 크기 입니다
  //   const imgSize = new kakao.maps.Size(24, 35);
  //   const markerImage = new kakao.maps.MarkerImage(imgSrc, imgSize);

  // 마커를 생성합니다
  markers.value = [];
  positions.value.forEach((position) => {
    const marker = new kakao.maps.Marker({
      map: map.value, // 마커를 표시할 지도
      position: position.latlng, // 마커를 표시할 위치
      title: position.title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됨.
      clickable: true, // // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
      // image: markerImage, // 마커의 이미지
    });
    markers.value.push(marker);
  });

  // 4. 지도를 이동시켜주기
  // 배열.reduce( (누적값, 현재값, 인덱스, 요소)=>{ return 결과값}, 초기값);
  const bounds = new kakao.maps.LatLngBounds();
  for (let position of positions.value) {
    // console.log("Bound 설정 position : ", position);
    bounds.extend(position.latlng);
  }
  // const bounds = positions.value.reduce(
  //   (bounds, position) => bounds.extend(position.latlng),
  //   new kakao.maps.LatLngBounds()
  // );
  map.value.setBounds(bounds); // 마커가 한 화면에 나오게 map의 level을 조절해줌
};

const deleteMarkers = () => {
  if (markers.value.length > 0) {
    markers.value.forEach((marker) => marker.setMap(null));
  }
};

const drawLines = () => {
  console.log("drawLines() 실행!!!");
  console.log("completes : ", props.completePlaces);
  lines.value = [];
  lines2.value = [];

  for (let i = 0; i < props.completePlaces.length; i++) {
    // console.log(props.completePlaces[i]);
    var complete = props.completePlaces[i];
    lines.value.push(
      new kakao.maps.LatLng(complete.latitude, complete.longitude)
    );
    // lines2.value.push(
    //   new kakao.maps.LatLng(complete.latitude, complete.longitude + 0.3)
    // );
  }

  // console.log("lines.value : ", lines.value);
  var polyline = new kakao.maps.Polyline({
    path: lines.value, // 선을 구성하는 좌표배열 입니다
    strokeWeight: 5, // 선의 두께 입니다
    strokeColor: "#000000", // 선의 색깔입니다
    strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
    strokeStyle: "solid", // 선의 스타일입니다
  });

  // var polyline2 = new kakao.maps.Polyline({
  //   path: lines2.value, // 선을 구성하는 좌표배열 입니다
  //   strokeWeight: 5, // 선의 두께 입니다
  //   strokeColor: "#000000", // 선의 색깔입니다
  //   strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
  //   strokeStyle: "solid", // 선의 스타일입니다
  // });

  // 지도에 선을 표시합니다
  polyline.setMap(map.value);
  // polyline2.setMap(map.value);
};
</script>

<template>
  <div ref="container" id="map"></div>
</template>

<style>
#map {
  /* margin-top: 5%; */
  width: 60%;
  height: 600px;
}
</style>
