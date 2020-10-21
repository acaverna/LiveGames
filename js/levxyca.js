const levxyca = document.querySelector(".levxyca");
const numberPoints = document.querySelector(".counterNumber");
const btnsNivel = document.querySelectorAll(".btn-nivel");
const derrota = document.querySelector(".derrota-content");
const music = document.querySelector("#levxyca-audio");

let nivel = "";
levxyca.style.display = "none";
let screenWidth = screen.width;
let screenHeight = screen.height;
let points = 0;
let lifeDedo = 100;
let status = true;

let mouse = {
  x: 0,
  y: 0,
  width: 71,
  height: 27,
};

let lastMouse = mouse;

const moves = ["arrowup", "arrowdown", "arrowleft", "arrowright"];

function moveLevxyca() {
  let move = moves[Math.floor(Math.random() * moves.length)];

  let x = mouse.x;
  let y = mouse.y;
  const speed = 1;
  let flipped = false;
  let rotate = 0;

  // if its not an arrow key, we dont care
  switch (move) {
    case "arrowup":
      y = y - 1;
      rotate = -90;
      break;
    case "arrowdown":
      y = y + 1;
      rotate = 90;
      break;
    case "arrowleft":
      x = x - 1;
      rotate = 0;
      flipped = true;
      break;
    case "arrowright":
      x = x + 1;
      rotate = 0;
      flipped = false;
      break;
    default:
      console.log("that is not a valid move");
      break;
  }

  levxyca.setAttribute(
    "style",
    `
        --rotatex: ${flipped ? "180deg" : "0"};
        --x: ${x * speed}px;
        --y: ${y * speed}px;
        --rotate: ${rotate}deg;
        transition: transform ${transition};
      `
  );
}

function trackMouse(event) {
  xlastMouse = mouse.x;
  ylastMouse = mouse.y;

  let xMouse = event.clientX;
  let yMouse = event.clientY;

  mouse.x = xMouse;
  mouse.y = yMouse;

  checkColission(mouse);
}

function checkColission(mouse) {
  let levxycaPos = levxyca.getBoundingClientRect();

  if (
    levxycaPos.x < mouse.x + mouse.width &&
    levxycaPos.x + levxycaPos.width > mouse.x &&
    levxycaPos.y < mouse.y + mouse.height &&
    levxycaPos.y + levxycaPos.height > mouse.y
  ) {
    music.pause();
    alert("A Levxyca Pegou você!");
    location.reload();
  }
}

function addPoints() {
  if (xlastMouse != mouse.x && ylastMouse != mouse.y) {
    points++;
    numberPoints.innerHTML = points;
  }
}

btnsNivel.forEach((btn) => {
  btn.addEventListener("click", () => {
    nivel = btn.getAttribute("id");

    if (nivel == "easy") {
      transition = "2s";
    } else if (nivel == "normal") {
      transition = "1s";
    } else {
      transition = "500ms";
    }

    levxyca.setAttribute("style", `transition: transform ${transition};`);

    menu.style.display = "none";

    levxyca.style.display = "initial";

    music.play();
    moveLevxyca();

    setInterval(() => {
      if (status) {
        moveLevxyca();
        addPoints();
      }
    }, 1000);
  });
});
