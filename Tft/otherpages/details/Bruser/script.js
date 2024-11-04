const champions = [
    { name: "그웬", cost: 4, id: "gwen", imgUrl: "img/gwen.png" },
    { name: "모르가나", cost: 5, id: "morgana", imgUrl: "img/morgana.webp" },
    { name: "카타리나", cost: 3, id: "katarina", imgUrl: "img/katarina.webp" },
    { name: "다이애나", cost: 5, id: "diana", imgUrl: "img/diana.webp" },
    { name: "카사딘", cost: 2, id: "kasadin", imgUrl: "img/kasadin.webp" }
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