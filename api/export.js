const exportsByType = {
  transactions: {
    filename: "riwayat-transaksi.csv",
    headers: ["ID Transaksi", "Waktu", "Pelanggan", "Total", "Status"],
    rows: [
      ["#TRX-8892", "25 Okt 2023, 14:30", "Budi Santoso", "Rp 450.000", "Selesai"],
      ["#TRX-8891", "25 Okt 2023, 13:15", "Siti Aminah", "Rp 125.500", "Pending"],
      ["#TRX-8890", "25 Okt 2023, 11:45", "Andi Pratama", "Rp 2.100.000", "Selesai"],
      ["#TRX-8889", "25 Okt 2023, 09:20", "Pelanggan Umum", "Rp 85.000", "Dibatalkan"],
      ["#TRX-8888", "24 Okt 2023, 18:05", "Diana Putri", "Rp 340.000", "Selesai"],
    ],
  },
  products: {
    filename: "inventaris-produk.csv",
    headers: ["Nama Produk", "SKU", "Kategori", "Harga", "Stok"],
    rows: [
      ["Kemeja Kerja Premium", "CLO-092", "Pakaian", "Rp 250.000", "45"],
      ["Mouse Nirkabel Pro", "ELK-104", "Elektronik", "Rp 450.000", "3"],
      ["Botol Minum Steel", "ACC-055", "Aksesoris", "Rp 120.000", "120"],
      ["Caramel Macchiato", "FNB-001", "Kopi Spesial", "Rp 45.000", "99+"],
      ["Butter Croissant", "FNB-003", "Pastry & Roti", "Rp 32.000", "3"],
    ],
  },
  customers: {
    filename: "data-pelanggan.csv",
    headers: ["Nama Pelanggan", "Email", "Telepon", "Total Transaksi", "Status Member"],
    rows: [
      ["Alex Wijaya", "alex.w@email.com", "+62 812 3456 7890", "Rp 12.450.000", "Gold"],
      ["Budi Santoso", "budi.s@email.com", "+62 813 4567 8901", "Rp 5.200.000", "Silver"],
      ["Citra Dewi", "citra.d@email.com", "+62 856 7890 1234", "Rp 1.150.000", "Bronze"],
      ["Dian Pratama", "dian.p@email.com", "+62 811 2233 4455", "Rp 8.900.000", "Silver"],
    ],
  },
  reports: {
    filename: "laporan-keuangan.csv",
    headers: ["Metrik", "Nilai", "Perubahan"],
    rows: [
      ["Total Pendapatan", "Rp 142.5M", "+12.5% vs bulan lalu"],
      ["Laba Kotor", "Rp 84.2M", "+8.2% vs bulan lalu"],
      ["Laba Bersih", "Rp 56.8M", "-2.1% vs bulan lalu"],
      ["Total Transaksi", "4,829", "Stabil"],
    ],
  },
};

function csvEscape(value) {
  const text = String(value);
  return /[;"\n\r]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function toCsv(exportData) {
  const lines = [exportData.headers, ...exportData.rows];
  return `\uFEFF${lines.map((row) => row.map(csvEscape).join(";")).join("\n")}`;
}

export default function handler(req, res) {
  const type = String(req.query.type || "transactions").toLowerCase();
  const exportData = exportsByType[type];

  if (!exportData) {
    res.status(400).json({
      error: "Invalid export type",
      available_types: Object.keys(exportsByType),
    });
    return;
  }

  res.setHeader("Content-Type", "text/csv; charset=utf-8");
  res.setHeader("Content-Disposition", `attachment; filename="${exportData.filename}"`);
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0");
  res.status(200).send(toCsv(exportData));
}
