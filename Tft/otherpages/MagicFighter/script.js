const champions = [
    { name: "럼블", cost: 5, imgUrl: "img/Rumble.jpg" },
    { name: "모데카이저", cost: 5, imgUrl: "img/Mordekaiser.jpg" },
    { name: "에코", cost: 4, imgUrl: "img/Ekko.jpg" },
    { name: "아칼리", cost: 2, imgUrl: "img/Akali.jpg" }
];

const items = [
    {imgUrl: "img/ion.png"},
    {imgUrl: "img/nicetouch.png"},
    {imgUrl: "img/bogun.png"}
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