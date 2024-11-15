const champions = [
    { name: "노라와 유미", cost: 5, imgUrl: "img/Norra.webp" },
    { name: "제라스", cost: 5, imgUrl: "img/Xerath.webp" },
    { name: "밀리오", cost: 5, imgUrl: "img/Milio.webp" },
    { name: "나미", cost: 4, imgUrl: "img/Nami.webp" },
    { name: "라이즈", cost: 4, imgUrl: "img/Ryze.webp" },
    { name: "헤카림", cost: 3, imgUrl: "img/Hecarim.webp" },
    { name: "닐라", cost: 2, imgUrl: "img/Nilah.webp" },
    { name: "피오라", cost: 4, imgUrl: "img/Fiora.webp" },
    { name: "제이스", cost: 1, imgUrl: "img/Jayce.webp" },
    { name: "아칼리", cost: 2, imgUrl: "img/Akali.webp" }
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