const champions = [
    { name: "르블랑", cost: 5, imgUrl: "img/Leblanc.jpg" },
    { name: "말자하", cost: 5, imgUrl: "img/Malzahar.jpg" },
    { name: "조이", cost: 4, imgUrl: "img/Zoe.jpg" },
    { name: "엘리스", cost: 4, imgUrl: "img/Elise.jpg" },
    { name: "하이머딩거", cost: 4, imgUrl: "img/Heimerdinger.jpg" },
    { name: "실코", cost: 4, imgUrl: "img/Silco.jpg" },
    { name: "카시오페아", cost: 3, imgUrl: "img/Cassiopeia.jpg" },
    { name: "나미", cost: 3, imgUrl: "img/Nami.jpg" },
    { name: "코그모", cost: 3, imgUrl: "img/KogMaw.jpg" },
    { name: "트위스티드페이트", cost: 3, imgUrl: "img/TwistedFate.jpg" },
    { name: "스웨인", cost: 3, imgUrl: "img/Swain.jpg" },
    { name: "직스", cost: 2, imgUrl: "img/Ziggs.jpg" },
    { name: "레나타 글라스크", cost: 2, imgUrl: "img/Renata.jpg" },
    { name: "모르가나", cost: 1, imgUrl: "img/Morgana.jpg" },
    { name: "럭스", cost: 1, imgUrl: "img/Lux.jpg" },
    { name: "파우더", cost: 1, imgUrl: "img/Powder.jpg" },
    { name: "벡스", cost: 1, imgUrl: "img/Vex.jpg" },
    { name: "자이라", cost: 1, imgUrl: "img/Zyra.jpg" }
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