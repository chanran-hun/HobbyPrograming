const champions = [
    { name: "노라와 유미", cost: 5, imgUrl: "img/Norra.webp" },
    { name: "제라스", cost: 5, imgUrl: "img/Xerath.webp" },
    { name: "밀리오", cost: 5, imgUrl: "img/Milio.webp" },
    { name: "나미", cost: 4, imgUrl: "img/Nami.webp" },
    { name: "라이즈", cost: 4, imgUrl: "img/Ryze.webp" },
    { name: "베이가", cost: 3, imgUrl: "" },
    { name: "직스", cost: 1, imgUrl: "" },
    { name: "조이", cost: 1, imgUrl: "" },
    { name: "아리", cost: 2, imgUrl: "" },
    { name: "세라핀", cost: 1, imgUrl: "" },
    { name: "소라카", cost: 1, imgUrl: "" },
    { name: "바드", cost: 3, imgUrl: "" },
    { name: "신드라", cost: 2, imgUrl: "" },
    { name: "질리언", cost: 2, imgUrl: "" },
    { name: "흐웨이", cost: 3, imgUrl: "" },
    { name: "카시오페아", cost: 2, imgUrl: "" },
    { name: "카르마", cost: 4, imgUrl: "" }
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