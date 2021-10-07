function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const languages = ["rust", "php", "javascript", "golang", "kotlin", "html", "css"]

const message = document.querySelector(".message");
const damageMessage = document.querySelector("#damage");
const html = document.getElementsByTagName("html")[0];
const btnsNivel = document.querySelectorAll(".btn-nivel");
const pointsPanel = document.querySelector("#points-panel");
const menu = document.querySelector("#menu");
const replay = document.querySelector(".replay");
const contentMenu = document.querySelector(".menu-content");
const contentDerrota = document.querySelector(".derrota-content");
const music = document.querySelector("#deno-ninja-music");
const totalPoints = document.querySelector(".total-points");

const moves = ["arrowleft", "arrowright"];
let nivel = "";
let screenWidth = screen.width;
let screenHeight = screen.height;
let points = 0;
let status = false;
let totalApples = 0;

let x = 0;
let flipped = 0;
let validMove = false;
const speed = 100;

let mouse = {
  x: 0,
  y: 0,
  width: 71,
  height: 27,
};

document.onmousemove = (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
}


btnsNivel.forEach((btn) => {
  btn.addEventListener("click", () => {
    nivel = btn.getAttribute("id");

    if (nivel == "easy") {
      difficult = 2000;
    } else if (nivel == "normal") {
      difficult = 1000;
    } else {
      difficult = 500;
    }

    status = true
    menu.style.display = "none";
    music.play();
    setInterval(generateEnemy, difficult);
  });
});

replay.addEventListener("click", () => {
  location.reload();
});

menu.style.display = "block";

function generateEnemy() {
  if (status) {
    let x = randomIntFromInterval(10, 90);
    let enemy = document.createElement("img");

    var enemyLanguage = languages[Math.floor(Math.random() * languages.length)];

    enemy.src = `../images/${enemyLanguage}.png`
    enemy.id = `ID${randomIntFromInterval(0, 1000)}`
    enemy.className = `enemy ${enemy.id}`
    enemy.style.top = -100

    enemy.setAttribute(
      "style",
      `left: ${x}vw;
     --y: -200px;`
    );

    document.getElementsByTagName("body")[0].appendChild(enemy);

    let collision = setInterval(() => { checkColission(enemy.id, enemyLanguage) }, 100);

    points++
    pointsPanel.innerHTML = points;

    setTimeout(() => {
      enemy.remove();
      clearInterval(collision)
    }, 4000);
  }
}

function checkColission(enemyID, enemyName) {
const enemy = document.querySelector(`#${enemyID}`).getBoundingClientRect();
  if (
    enemy.x < mouse.x + mouse.width &&
    enemy.x + enemy.width > mouse.x &&
    enemy.y < mouse.y + mouse.height &&
    enemy.y + enemy.height > mouse.y
  ) {
    music.pause();
    alert(`${enemyName} Pegou você!`);
    location.reload();
  }
}
