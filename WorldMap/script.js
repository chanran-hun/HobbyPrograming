// 지도를 표시할 div 요소를 선택
const map = L.map('map').setView([37.5665, 126.9780], 10); // 서울 중심 좌표 (위도, 경도)

// OpenStreetMap 타일 레이어 추가
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// 위치에 따른 지역 정보
function getRegionInfo(lat, lng) {
    if (lat >= 37.55 && lat <= 37.57 && lng >= 126.97 && lng <= 126.99) {
        return "서울의 중심부입니다!";
    } else if (lat >= 35.15 && lat <= 35.18 && lng >= 129.05 && lng <= 129.08) {
        return "부산입니다! 해운대가 유명하죠.";
    } else if (lat >= 35.85 && lat <= 35.87 && lng >= 128.60 && lng <= 128.62) {
        return "대구입니다! 활기찬 도시로 유명합니다.";
    } else {
        return "이 지역에 대한 정보가 없습니다.";
    }
}

// 지도를 클릭하면 해당 좌표에 맞는 지역 정보를 표시
map.on('click', function (e) {
    const { lat, lng } = e.latlng;
    const regionInfo = getRegionInfo(lat, lng);
    const popupContent = `<b>위도:</b> ${lat.toFixed(4)}<br><b>경도:</b> ${lng.toFixed(4)}<br><br>${regionInfo}`;

    // 클릭한 위치에 팝업 생성
    L.popup()
        .setLatLng(e.latlng)
        .setContent(popupContent)
        .openOn(map);
});