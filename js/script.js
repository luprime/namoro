const yesBtn = document.getElementById("yes");
const noBtn = document.getElementById("no");
const main = document.getElementById("main");
const finalScreen = document.getElementById("finalScreen");
const img = document.getElementById("topImage");
const buttonsContainer = document.querySelector(".buttons");

let noClickCount = 0;
let isRunningAway = false;

// Clique no NÃO
noBtn.addEventListener("click", () => {
  noClickCount++;

  // SIM cresce
  let yesSize = 1 + noClickCount * 0.2;
  yesBtn.style.transform = `scale(${yesSize})`;

  if (noClickCount === 1) {
    noBtn.style.transform = "scale(0.8)";
    img.src = "img/img2.jpeg";
  } else if (noClickCount === 2) {
    noBtn.style.transform = "scale(0.6)";
  } else if (noClickCount === 3) {
    moveButtonRandom();
  } else if (noClickCount >= 4) {
    isRunningAway = true;
  }
});

// Movimento aleatório (respeitando container .buttons)
function moveButtonRandom() {
  const containerRect = buttonsContainer.getBoundingClientRect();
  const maxX = containerRect.width - noBtn.offsetWidth;
  const maxY = containerRect.height - noBtn.offsetHeight;

  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);

  noBtn.style.left = `${randomX}px`;
  noBtn.style.top = `${randomY}px`;
}

// Fugir do mouse dentro do container
buttonsContainer.addEventListener("mousemove", (event) => {
  if (!isRunningAway) return;

  const containerRect = buttonsContainer.getBoundingClientRect();
  const mouseX = event.clientX - containerRect.left;
  const mouseY = event.clientY - containerRect.top;

  const btnRect = noBtn.getBoundingClientRect();
  const btnX = btnRect.left - containerRect.left + btnRect.width / 2;
  const btnY = btnRect.top - containerRect.top + btnRect.height / 2;

  const distX = btnX - mouseX;
  const distY = btnY - mouseY;
  const distance = Math.sqrt(distX * distX + distY * distY);

  if (distance < 20) { 
    let escapePower = 100;
    let offsetX = (distX / distance) * escapePower;
    let offsetY = (distY / distance) * escapePower;

    let newX = btnX + offsetX - noBtn.offsetWidth / 2;
    let newY = btnY + offsetY - noBtn.offsetHeight / 2;

    newX = Math.max(0, Math.min(containerRect.width - noBtn.offsetWidth, newX));
    newY = Math.max(0, Math.min(containerRect.height - noBtn.offsetHeight, newY));

    noBtn.style.left = `${newX}px`;
    noBtn.style.top = `${newY}px`;
  }
});

// SIM → final feliz
yesBtn.addEventListener("click", () => {
  main.classList.add("hidden");
  finalScreen.classList.remove("hidden");
});