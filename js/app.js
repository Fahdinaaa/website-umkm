"use strict";

console.log("P09 JavaScript aktif");

const produkUmkm = [
  { nama: "Kopi Tubruk Signature", kategori: "Tradisional", harga: 45000, stok: 24, unggulan: true },
  { nama: "Cold Brew Aren", kategori: "Menyegarkan", harga: 22000, stok: 12, unggulan: true },
  { nama: "Manual Brew V60", kategori: "Karismatik", harga: 25000, stok: 4, unggulan: false },
  { nama: "Salted Caramel Latte", kategori: "Creamy", harga: 32000, stok: 0, unggulan: false },
  { nama: "Dirty Latte", kategori: "Creamy", harga: 40000, stok: 9, unggulan: false },
  { nama: "Butterscotch Latte", kategori: "Creamy", harga: 28000, stok: 3, unggulan: false },
];

const formatRupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

console.table(produkUmkm);
console.log(formatRupiah.format(produkUmkm[0].harga));

function statusStok(stok) {
  if (stok === 0) {
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
    default:
      return "Produk UMKM";
  const labelAksi = produk.stok > 0 ? "Siap dipesan" : "Hubungi admin";
  }
}

function renderProduk() {
  const grid = document.querySelector("#produk-dinamis");
  const ringkasan = document.querySelector("#produk-ringkasan");

  if (!grid || !ringkasan) {
    return;
  }

  let jumlahTersedia = 0;
  let jumlahUnggulan = 0;
  let markup = "";

  for (const produk of produkUmkm) {
    const status = statusStok(produk.stok);
    const kategori = labelKategori(produk.kategori);
    const labelAksi = produk.stok > 0 ? "Siap dipesan" : "Hubungi admin";
    const badgeUnggulan = produk.unggulan
      ? '<span class="featured-badge">Produk unggulan</span>'
      : "";

    if (produk.stok > 0) {
      jumlahTersedia = jumlahTersedia + 1;
    }

    if (produk.unggulan) {
      jumlahUnggulan = jumlahUnggulan + 1;
    }

    markup = markup + `
      <article class="js-product-card">
        ${badgeUnggulan}
        <h3>${produk.nama}</h3>
        <p>${kategori}</p>
        <p class="price">${formatRupiah.format(produk.harga)}</p>
        <span class="stock-badge ${status.className}">${status.label}</span>
        <p>${labelAksi}</p>
      </article>
    `;
  }

  grid.innerHTML = markup;
  ringkasan.textContent = `${jumlahTersedia} produk tersedia dari ${produkUmkm.length} data, ${jumlahUnggulan} di antaranya produk unggulan.`;
}
document.addEventListener("DOMContentLoaded", renderProduk);