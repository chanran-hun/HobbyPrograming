const champions = [
    { name: "스몰더", cost: 5, imgUrl: "" },
    { name: "칼리스타", cost: 4, imgUrl: "" },
    { name: "바루스", cost: 4, imgUrl: "" },
    { name: "징크스", cost: 3, imgUrl: "" },
    { name: "이즈리얼", cost: 3, imgUrl: "" },
    { name: "트리스타나", cost: 2, imgUrl: "" },
    { name: "트위치", cost: 1, imgUrl: "" },
    { name: "뇸뇸이", cost: 1, imgUrl: "" },
    { name: "애쉬", cost: 1, imgUrl: "" }
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