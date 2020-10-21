const cigarra = document.querySelector(".cigarra");
const lifeBar = document.querySelector(".life-bar");
const message = document.querySelector(".message");
const damageMessage = document.querySelector("#damage");
const pointsPanel = document.querySelector("#points-panel");
const audio = document.querySelector("#soco");
const audioCigarra = document.querySelector("#cigarra-audio");
const poke = document.querySelector(".poke");
const html = document.getElementsByTagName("html")[0];

let screenWidth = screen.width;
let screenHeight = screen.height;
let points = 0;
let lifePoke = 100;

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
  if (Math.random() < 0.3) {
    const damage = Math.floor(Math.random() * 10);

    if (damage != 0) {
      lifePoke -= damage;

      if (lifePoke < 0) {
        alert("Você perdeu o jogo");
        location.reload();
        audioCigarra.play();
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

showCigarra();

setInterval(() => {
  damagePoke();
  showCigarra();
}, 3000);
