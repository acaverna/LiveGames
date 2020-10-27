function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const message = document.querySelector(".message");
const damageMessage = document.querySelector("#damage");
const html = document.getElementsByTagName("html")[0];
const tiger = document.querySelector(".tiger");
const btnsNivel = document.querySelectorAll(".btn-nivel");
const pointsPanel = document.querySelector("#points-panel");
const menu = document.querySelector("#menu");
const replay = document.querySelector(".replay");
const contentMenu = document.querySelector(".menu-content");
const contentDerrota = document.querySelector(".derrota-content");
const music = document.querySelector("#tiger-music");
const totalPoints = document.querySelector(".total-points");
const fishes = document.getElementsByClassName("fish");

const moves = ["arrowleft", "arrowright"];
let nivel = "";
let screenWidth = screen.width;
let screenHeight = screen.height;
let points = 0;
let status = true;
let totalApples = 0;
var difficult = 0;

let x = 0;
let flipped = 0;
let validMove = false;
const speed = 100;

function handleKeyDown(event) {
  // if its not an arrow key, we dont care
  if (!event.key.includes("Arrow")) {
    return;
  }
  switch (event.key) {
    case "ArrowLeft":
      x = x - 1;
      flipped = true;
      validMove = true;
      break;
    case "ArrowRight":
      x = x + 1;
      flipped = false;
      validMove = true;
      break;
  }

  if (validMove) {
    tiger.setAttribute(
      "style",
      `
        --rotateX: ${flipped ? "180deg" : "0"};
        --x: ${x * speed}px;
      `
    );
  }
}

window.addEventListener("keydown", handleKeyDown);

btnsNivel.forEach((btn) => {
  btn.addEventListener("click", () => {
    nivel = btn.getAttribute("id");

    if (nivel == "easy") {
      difficult = 0.1;
    } else if (nivel == "normal") {
      difficult = 0.4;
    } else {
      difficult = 0.8;
    }

    menu.style.display = "none";
    music.play();

    setInterval(() => {
      if (status) {
      }
    }, 3000);
  });
});

replay.addEventListener("click", () => {
  location.reload();
});

menu.style.display = "block";

function generatePoint() {
  if (status) {
    let x = randomIntFromInterval(10, 90);
    let fish = document.createElement("img");

    if (Math.random() > difficult) {
      fish.src = "../images/fish.png";
      fish.className = "rotten fish";
    } else {
      fish.src = "../images/rotten_fish.png";
      fish.className = "fish";
    }
    if (Math.random() < 0.1) {
      fish.src = "../images/patogordin.png";
      fish.className = "fish patogorgin";
    }

    totalApples++;

    fish.setAttribute(
      "style",
      `left: ${x}vw;
     --y: -90px;`
    );

    document.getElementsByTagName("body")[0].appendChild(fish);

    setTimeout(() => {
      fish.remove();
    }, 1000);
  }
}

function checkColission() {
  let tigerPos = tiger.getBoundingClientRect();

  for (i = 0; i < fishes.length; i++) {
    let fish = fishes[i];
    let fishPos = fish.getBoundingClientRect();

    if (
      tigerPos.x < fishPos.x + fishPos.width &&
      tigerPos.x + tigerPos.width > fishPos.x &&
      tigerPos.y < fishPos.y + fishPos.height &&
      tigerPos.y + tigerPos.height > fishPos.y
    ) {
      if (fish.src.endsWith("/images/rotten_fish.png")) {
        points--;
        pointsPanel.innerHTML = points;
        fish.remove();
      } else if (fish.src.endsWith("/images/patogordin.png")) {
        points += 10;
        pointsPanel.innerHTML = points;
        fish.remove();
      } else {
        points++;
        pointsPanel.innerHTML = points;
        fish.remove();
      }
    }
  }
}

setInterval(generatePoint, 3000);
setInterval(checkColission, 200);
