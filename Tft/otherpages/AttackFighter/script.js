const champions = [
    { name: "세비카", cost: 5, imgUrl: "img/Sevika.jpg" },
    { name: "제이스", cost: 5, imgUrl: "img/Jayce.jpg" },
    { name: "바이", cost: 4, imgUrl: "img/Vi.jpg" },
    { name: "암베사", cost: 4, imgUrl: "img/Ambessa.jpg" },
    { name: "갱플랭크", cost: 3, imgUrl: "img/Gangplank.jpg" },
    { name: "카밀", cost: 2, imgUrl: "img/Camille.jpg" },
    { name: "우르곳", cost: 2, imgUrl: "img/Urgot.jpg" },
    { name: "녹턴", cost: 2, imgUrl: "img/Nocturne.jpg" },
    { name: "다리우스", cost: 1, imgUrl: "img/Darius.jpg" },
    { name: "바이올렛", cost: 1, imgUrl: "img/Violet.jpg" }
];

const items = [
    {imgUrl: "img/giant.png"},
    {imgUrl: "img/piba.png"},
    {imgUrl: "img/Sterak.png"}
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