const yesBtn = document.getElementById("yes");
const noBtn = document.getElementById("no");
const main = document.getElementById("main");
const finalScreen = document.getElementById("finalScreen");
const img = document.getElementById("topImage");

noBtn.addEventListener("click", () => {
  img.src = "img/img2.jpeg"; // troca a imagem
  noBtn.style.transform = "scale(0.8)"; // botão NÃO menor
  yesBtn.style.transform = "scale(1.3)"; // botão SIM maior
});

yesBtn.addEventListener("click", () => {
  main.classList.add("hidden");
  finalScreen.classList.remove("hidden");
});