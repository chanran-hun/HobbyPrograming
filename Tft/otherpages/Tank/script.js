const champions = [
    { name: "타릭", cost: 4, imgUrl: "" },
    { name: "탐켄치", cost: 4, imgUrl: "" },
    { name: "라칸", cost: 4, imgUrl: "" },
    { name: "나서스", cost: 4, imgUrl: "" },
    { name: "모데카이저", cost: 3, imgUrl: "" },
    { name: "오공", cost: 3, imgUrl: "" },
    { name: "벡스", cost: 3, imgUrl: "" },
    { name: "쉔", cost: 3, imgUrl: "" },
    { name: "스웨인", cost: 3, imgUrl: "" },
    { name: "니코", cost: 3, imgUrl: "" },
    { name: "누누", cost: 2, imgUrl: "" },
    { name: "갈리오", cost: 2, imgUrl: "" },
    { name: "럼블", cost: 2, imgUrl: "" },
    { name: "쉬바나", cost: 2, imgUrl: "" },
    { name: "릴리아", cost: 1, imgUrl: "" },
    { name: "엘리스", cost: 1, imgUrl: "" },
    { name: "잭스", cost: 1, imgUrl: "" },
    { name: "블리츠크랭크", cost: 1, imgUrl: "" }
];

const items = [
    {imgUrl: "img/Warmog.png"},
    {imgUrl: "img/Redemption.png"},
    {imgUrl: "img/Gargoyle.png"}
];

const champContainer = document.getElementById("champ-container");

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

const recommand = document.getElementById("item-recomand");

items.forEach(item => {
    const img = document.createElement('img'); 
    img.src = item.imgUrl;                                                
    img.style.width = '100px';              
    img.style.margin = '0px';

    recommand.appendChild(img);              
});