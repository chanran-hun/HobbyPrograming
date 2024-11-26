const champions = [
    { name: "제이스", cost: 5, imgUrl: "img/Jayce.jpg" },
    { name: "징크스", cost: 5, imgUrl: "img/Jinx.jpg" },
    { name: "케이틀린", cost: 5, imgUrl: "img/Caitlyn.jpg" },
    { name: "트위치", cost: 4, imgUrl: "img/Twitch.jpg" },
    { name: "코르키", cost: 4, imgUrl: "img/Corki.jpg" },
    { name: "이즈리얼", cost: 3, imgUrl: "img/Ezreal.jpg" },
    { name: "갱플랭크", cost: 3, imgUrl: "img/Gangplank.jpg" },
    { name: "제리", cost: 2, imgUrl: "img/Zeri.jpg" },
    { name: "트리스타나", cost: 2, imgUrl: "img/Tristana.jpg" },
    { name: "드레이븐", cost: 1, imgUrl: "img/Draven.jpg" },
    { name: "매디", cost: 1, imgUrl: "img/Maddie.jpg" }
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