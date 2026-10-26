// ===== Cabeçalho muda ao rolar =====
const header = document.getElementById("header");

function atualizarHeader() {
  header.classList.toggle("is-scrolled", window.scrollY > 60);
}
atualizarHeader();
window.addEventListener("scroll", atualizarHeader, { passive: true });

// ===== Menu mobile =====
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

function fecharMenu() {
  nav.classList.remove("is-open");
  menuBtn.setAttribute("aria-expanded", "false");
}

menuBtn.addEventListener("click", () => {
  const aberto = nav.classList.toggle("is-open");
  menuBtn.setAttribute("aria-expanded", String(aberto));
});
nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", fecharMenu));

// ===== Lightbox da galeria =====
const cards = [...document.querySelectorAll(".card")];
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
let indiceAtual = 0;

function mostrar(i) {
  indiceAtual = (i + cards.length) % cards.length;
  const card = cards[indiceAtual];
  lightboxImg.src = card.dataset.full;
  lightboxImg.alt = card.querySelector("img").alt;
}

function abrir(i) {
  mostrar(i);
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
}

function fechar() {
  lightbox.hidden = true;
  document.body.style.overflow = "";
}

cards.forEach((card, i) => {
  card.tabIndex = 0;
  card.addEventListener("click", () => abrir(i));
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      abrir(i);
    }
  });
});

document.getElementById("lightboxClose").addEventListener("click", fechar);
document.getElementById("lightboxPrev").addEventListener("click", () => mostrar(indiceAtual - 1));
document.getElementById("lightboxNext").addEventListener("click", () => mostrar(indiceAtual + 1));

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) fechar();
});

document.addEventListener("keydown", (e) => {
  if (lightbox.hidden) return;
  if (e.key === "Escape") fechar();
  if (e.key === "ArrowLeft") mostrar(indiceAtual - 1);
  if (e.key === "ArrowRight") mostrar(indiceAtual + 1);
});
