const champions = [
    { name: "그웬", cost: 4, id: "gwen", imgUrl: "img/gwen.png" },
    { name: "모르가나", cost: 5, id: "morgana", imgUrl: "img/morgana.webp" },
    { name: "카타리나", cost: 3, id: "katarina", imgUrl: "img/katarina.webp" },
    { name: "다이애나", cost: 5, id: "diana", imgUrl: "img/diana.webp" },
    { name: "카사딘", cost: 2, id: "kasadin", imgUrl: "img/kasadin.webp" }
];

const items = [
    {name: "이온", imgUrl: "img/ion.png"},
    {name: "피바", imgUrl: "img/piba.png"},
    {name: "보건", imgUrl: "img/bogun.png"}
];

const champContainer = document.getElementById("champ-container");
const recommand = document.getElementById("item-recomand");

champions.forEach(champ => {
    const champDiv = document.createElement("div");
    champDiv.classList.add("champ");
    champDiv.id = champ.id;

    const photoDiv = document.createElement("div");
    photoDiv.classList.add("photo");

    photoDiv.style.backgroundImage = `url(${champ.imgUrl})`;

    const nameDiv = document.createElement("div");
    nameDiv.classList.add("name");
    nameDiv.textContent = champ.name;

    const costDiv = document.createElement("div");
    costDiv.classList.add("cost");
    costDiv.textContent = champ.cost;

    photoDiv.appendChild(nameDiv);
    photoDiv.appendChild(costDiv);

    champDiv.appendChild(photoDiv);

    champContainer.appendChild(champDiv);
});

items.forEach(item => {
    const img = document.createElement('img'); 
    img.src = item.imgUrl;                                                
    img.style.width = '100px';              
    img.style.margin = '0px';

    recommand.appendChild(img);              
});

const photos = [
    { id: "gwen", description: "그웬은 4코스트 챔피언입니다." },
    { id: "morgana", description: "모르가나는 5코스트 주문력 전사입니다." },
    // 기타 챔피언 설명 추가
];