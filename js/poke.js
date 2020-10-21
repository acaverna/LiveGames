const cigarra = document.querySelector(".cigarra");
const lifeBar = document.querySelector(".life-bar");
const message = document.querySelector(".message");
const damageMessage = document.querySelector("#damage");
const pointsPanel = document.querySelector("#points-panel");
const audio = document.querySelector("#soco");
const audioCigarra = document.querySelector("#cigarra-audio");
const poke = document.querySelector(".poke");
const html = document.getElementsByTagName("html")[0];
const btnsNivel = document.querySelectorAll(".btn-nivel");
const menu = document.querySelector("#menu");
const replay = document.querySelector(".replay");
const contentMenu = document.querySelector(".menu-content");
const contentDerrota = document.querySelector(".derrota-content");
const music = document.querySelector("#poke-audio");
const totalPoints = document.querySelector(".total-points");

let nivel = "";
let maxDamage = 0;
let chanceDamage = 0;
let screenWidth = screen.width;
let screenHeight = screen.height;
let points = 0;
let lifePoke = 100;
let status = true;

cigarra.addEventListener("click", () => {
  audio.play();

  points += 10;

  if (points === 200) {
    html.style.cursor = "url('../images/m_chinela_azul.png'), auto";
  }

  if (points === 400) {
    html.style.cursor = "url('../images/m_chinela_verde.png'), auto";
  }

  if (points === 700) {
    html.style.cursor = "url('../images/m_chinela_marrom.png'), auto";
  }

  if (points === 1100) {
    html.style.cursor = "url('../images/m_chinela_preta.png'), auto";
  }

  pointsPanel.innerText = points;

  showCigarra();
});

function damagePoke() {
  if (Math.random() < chanceDamage) {
    const damage = Math.floor(Math.random() * maxDamage);

    if (damage != 0) {
      chanceDamage;
      lifePoke -= damage;

      if (lifePoke <= 0) {
        status = false;
        music.pause();
        totalPoints.innerText = points;
        menu.style.display = "block";
        audioCigarra.play();
        contentDerrota.style.display = "block";
        contentMenu.style.display = "none";
      }

      lifeBar.style.width = `${lifePoke}%`;

      poke.src = "../images/poke_dano.png";
      damageMessage.innerText = damage;
      message.style.display = "block";

      setTimeout(() => {
        message.style.display = "none";
        poke.src = "../images/poke_normal.png";
      }, 2000);
    }
  }
}

function showCigarra() {
  const positionX = Math.floor(Math.random() * (screenWidth - 160));
  const positionY = Math.floor(Math.random() * (screenHeight - 160));

  cigarra.setAttribute(
    "style",
    `
        top: ${positionY}px;
        left: ${positionX}px;
    `
  );
}

btnsNivel.forEach((btn) => {
  btn.addEventListener("click", () => {
    nivel = btn.getAttribute("id");

    if (nivel == "easy") {
      chanceDamage = 0.3;
      maxDamage = 10;
    } else if (nivel == "normal") {
      chanceDamage = 0.5;
      maxDamage = 15;
    } else {
      chanceDamage = 0.7;
      maxDamage = 20;
    }

    music.play();

    menu.style.display = "none";

    showCigarra();

    setInterval(() => {
      if (status) {
        damagePoke();
        showCigarra();
      }
    }, 3000);
  });
});

replay.addEventListener("click", () => {
  location.reload();
});

menu.style.display = "block";
