"use strict";

console.log("P11 JavaScript aktif");

const produkUmkm = [
  { nama: "Kopi Tubruk Signature", kategori: "Tradisional", harga: 45000, stok: 24, unggulan: true },
  { nama: "Cold Brew Aren", kategori: "Menyegarkan", harga: 22000, stok: 12, unggulan: true },
  { nama: "Manual Brew V60", kategori: "Karismatik", harga: 25000, stok: 4, unggulan: false },
  { nama: "Salted Caramel Latte", kategori: "Creamy", harga: 32000, stok: 0, unggulan: false },
  { nama: "Dirty Latte", kategori: "Creamy", harga: 40000, stok: 9, unggulan: false },
  { nama: "Butterscotch Latte", kategori: "Creamy", harga: 28000, stok: 3, unggulan: false },
  { nama: "Tumbler Kopi Tan", kategori: "Aksesori", harga: 85000, stok: 15, unggulan: false },
  { nama: "Mug Keramik", kategori: "Aksesori", harga: 55000, stok: 8, unggulan: false },
  { nama: "Tote Bag Kanvas", kategori: "Aksesori", harga: 45000, stok: 20, unggulan: false },
  { nama: "Apron Barista", kategori: "Aksesori", harga: 120000, stok: 2, unggulan: false },
  { nama: "Gift Box Kopi Tan", kategori: "Aksesori", harga: 150000, stok: 6, unggulan: false },
];

function formatRupiah(nilai) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(nilai);
}

function statusStok(stok) {
  if (stok <= 0) {
    return { label: "Habis", className: "empty" };
  }

  if (stok <= 5) {
    return { label: "Stok terbatas", className: "warning" };
  }

  return { label: "Tersedia", className: "" };
}

function labelKategori(kategori) {
  switch (kategori) {
    case "Tradisional":
      return "Kopi seduh klasik";
    case "Menyegarkan":
      return "Minuman dingin";
    case "Karismatik":
      return "Seduh manual";
    case "Creamy":
      return "Kopi susu";
    case "Aksesori":
      return "Aksesori & merchandise";
    default:
      return "Produk UMKM";
  }
}

const produkGrid = document.querySelector("#produk-dinamis");
const produkRingkasan = document.querySelector("#produk-ringkasan");
const produkUnggulan = document.querySelector("#produk-unggulan");
const tombolFilter = document.querySelectorAll("[data-filter]");

if (produkGrid) {
  console.log("Target grid:", produkGrid);
  console.log("Target ringkasan:", produkRingkasan);
  console.log("Jumlah tombol filter:", tombolFilter.length);
}

function buatElemenProduk(produk) {
  const status = statusStok(produk.stok);

  const card = document.createElement("article");
  card.classList.add("js-product-card");

  if (produk.unggulan) {
    const badge = document.createElement("span");
    badge.classList.add("featured-badge");
    badge.textContent = "Produk unggulan";
    card.append(badge);
  }

  const title = document.createElement("h3");
  title.textContent = produk.nama;

  const kategori = document.createElement("p");
  kategori.classList.add("category-note");
  kategori.textContent = labelKategori(produk.kategori);

  const harga = document.createElement("p");
  harga.classList.add("price");
  harga.textContent = formatRupiah(produk.harga);

  const stok = document.createElement("span");
  stok.classList.add("stock-badge");
  if (status.className) {
    stok.classList.add(status.className);
  }
  stok.textContent = status.label;

  const aksi = document.createElement("p");
  aksi.textContent = produk.stok > 0 ? "Siap dipesan" : "Hubungi admin";

  const tombolSembunyi = document.createElement("button");
  tombolSembunyi.type = "button";
  tombolSembunyi.classList.add("ghost-button");
  tombolSembunyi.textContent = "Sembunyikan";
  tombolSembunyi.addEventListener("click", () => {
    card.remove();
    produkRingkasan.textContent = `${produk.nama} disembunyikan dari tampilan sementara. Data asli belum berubah.`;
  });

  card.append(title, kategori, harga, stok, aksi, tombolSembunyi);
  return card;
}

function buatEmptyState(kategori) {
  const empty = document.createElement("p");
  empty.classList.add("empty-state");
  empty.textContent = `Belum ada produk pada kategori ${kategori}.`;
  return empty;
}

function renderProduk(kategoriAktif = "Semua") {
  if (!produkGrid || !produkRingkasan) {

    if (document.body.dataset.page === "produk") {
      console.warn("Target render produk tidak ditemukan.");
    }
    return;
  }

  const produkTampil = kategoriAktif === "Semua"
    ? produkUmkm
    : produkUmkm.filter((produk) => produk.kategori === kategoriAktif);

  produkGrid.replaceChildren();

  if (produkTampil.length === 0) {
    produkGrid.append(buatEmptyState(kategoriAktif));
    produkRingkasan.textContent = `Kategori ${kategoriAktif} menampilkan 0 produk dari ${produkUmkm.length} total produk.`;
    return;
  }

  produkTampil.forEach((produk) => {
    produkGrid.append(buatElemenProduk(produk));
  });

  produkRingkasan.textContent = kategoriAktif === "Semua"
    ? `Menampilkan semua ${produkTampil.length} produk.`
    : `Kategori ${kategoriAktif} menampilkan ${produkTampil.length} produk dari ${produkUmkm.length} total produk.`;
}

// P11: menampilkan produk unggulan dari data
function tampilkanProdukUnggulan() {
  if (!produkUnggulan) {
    return;
  }

  const unggulan = produkUmkm.find((produk) => produk.unggulan === true);
  produkUnggulan.textContent = unggulan
    ? `Produk unggulan: ${unggulan.nama}`
    : "Belum ada produk unggulan.";
}

tombolFilter.forEach((tombol) => {
  tombol.addEventListener("click", (event) => {
    const tombolAktif = event.currentTarget;
    const kategori = tombolAktif.dataset.filter;

    tombolFilter.forEach((item) => {
      item.classList.remove("is-active");
      item.setAttribute("aria-pressed", "false");
    });
    tombolAktif.classList.add("is-active");
    tombolAktif.setAttribute("aria-pressed", "true");

    console.log("Kategori aktif:", kategori);
    renderProduk(kategori);
  });
});

tampilkanProdukUnggulan();
renderProduk();