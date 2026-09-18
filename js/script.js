const promoButton = document.querySelector("#promoButton");
const defaultLabel = promoButton.textContent;
const promoLabel = "Promo: Kopi Pagi Disc 15%!";
let showingPromo = false;

promoButton.addEventListener("click", () => {
  showingPromo = !showingPromo;
  promoButton.textContent = showingPromo ? promoLabel : defaultLabel;
  console.log(showingPromo ? "Promo Kopi Tan ditampilkan." : "Promo Kopi Tan disembunyikan.");
});