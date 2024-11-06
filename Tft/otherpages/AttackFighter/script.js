const champions = [
    { name: "카밀", cost: 4, imgUrl: "img/camil.webp" },
    { name: "브라이어", cost: 5, imgUrl: "img/briar.webp" },
    { name: "올라프", cost: 4, imgUrl: "img/olaf.webp" },
    { name: "뽀삐", cost: 1, imgUrl: "img/ppoppi.webp" },
    { name: "워윅", cost: 1, imgUrl: "img/worwic.webp" },
    { name: "헤카림", cost: 3, imgUrl: "img/hecarim.webp" },
    { name: "닐라", cost: 2, imgUrl: "img/nila.webp" },
    { name: "피오라", cost: 4, imgUrl: "img/fiora.webp" },
    { name: "제이스", cost: 1, imgUrl: "img/jayce.webp" },
    { name: "아칼리", cost: 2, imgUrl: "img/acarli.webp" }
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