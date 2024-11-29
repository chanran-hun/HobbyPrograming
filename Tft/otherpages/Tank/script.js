const champions = [
    { name: "가렌", cost: 4, imgUrl: "img/Garen.jpg" },
    { name: "엘리스", cost: 4, imgUrl: "img/Elise.jpg" },
    { name: "일라오이", cost: 4, imgUrl: "img/Illaoi.jpg" },
    { name: "문도박사", cost: 4, imgUrl: "img/DrMundo.jpg" },
    { name: "스카", cost: 3, imgUrl: "img/Scar.jpg" },
    { name: "누누", cost: 3, imgUrl: "img/Nunu.jpg" },
    { name: "로리스", cost: 3, imgUrl: "img/Loris.jpg" },
    { name: "블리츠크랭크", cost: 3, imgUrl: "img/Blitz.jpg" },
    { name: "스웨인", cost: 3, imgUrl: "img/Swain.jpg" },
    { name: "레니", cost: 3, imgUrl: "img/Renni.jpg" },
    { name: "블라디미르", cost: 2, imgUrl: "img/Vladi.jpg" },
    { name: "벤더", cost: 2, imgUrl: "img/Vander.jpg" },
    { name: "세트", cost: 2, imgUrl: "img/Sett.jpg" },
    { name: "레오나", cost: 2, imgUrl: "img/Leona.jpg" },
    { name: "렐", cost: 2, imgUrl: "img/Rell.jpg" },
    { name: "아무무", cost: 1, imgUrl: "img/Amumu.jpg" },
    { name: "스텝", cost: 1, imgUrl: "img/Steb.jpg" },
    { name: "트런들", cost: 1, imgUrl: "img/Trundle.jpg" },
    { name: "신지드", cost: 1, imgUrl: "img/Singed.jpg" }
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