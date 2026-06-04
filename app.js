const rupiah = new Intl.NumberFormat("id-ID");

const products = [
  { name: "Caramel Macchiato", price: 45000, stock: "99+ Stok", category: "Kopi Spesial", image: "coffee" },
  { name: "Espresso Single", price: 25000, stock: "50 Stok", category: "Kopi Spesial", image: "coffee" },
  { name: "Butter Croissant", price: 32000, stock: "3 Stok", category: "Pastry & Roti", image: "croissant", low: true },
  { name: "Cafe Latte Hot", price: 40000, stock: "28 Stok", category: "Minuman Dingin", image: "muted-box" },
  { name: "Matcha Frappe", price: 52000, stock: "17 Stok", category: "Minuman Dingin", image: "muted-box" }
];

const inventory = [
  { name: "Kemeja Kerja Premium", sku: "CLO-092", price: 250000, stock: "Stok: 45", category: "Pakaian", image: "shirt" },
  { name: "Mouse Nirkabel Pro", sku: "ELK-104", price: 450000, stock: "Stok: 3 (Rendah)", category: "Elektronik", image: "mouse", low: true },
  { name: "Botol Minum Steel", sku: "ACC-055", price: 120000, stock: "Stok: 120", category: "Aksesoris", image: "muted-box" }
];

const customers = [
  ["Alex Wijaya", "alex.w@email.com", "+62 812 3456 7890", "Rp 12.450.000", "Gold"],
  ["Budi Santoso", "budi.s@email.com", "+62 813 4567 8901", "Rp 5.200.000", "Silver"],
  ["Citra Dewi", "citra.d@email.com", "+62 856 7890 1234", "Rp 1.150.000", "Bronze"],
  ["Dian Pratama", "dian.p@email.com", "+62 811 2233 4455", "Rp 8.900.000", "Silver"]
];

const tx = [
  ["#TRX-8892", "25 Okt 2023, 14:30", "Budi Santoso", "Rp 450.000", "Selesai"],
  ["#TRX-8891", "25 Okt 2023, 13:15", "Siti Aminah", "Rp 125.500", "Pending"],
  ["#TRX-8890", "25 Okt 2023, 11:45", "Andi Pratama", "Rp 2.100.000", "Selesai"],
  ["#TRX-8889", "25 Okt 2023, 09:20", "Pelanggan Umum", "Rp 85.000", "Dibatalkan"],
  ["#TRX-8888", "24 Okt 2023, 18:05", "Diana Putri", "Rp 340.000", "Selesai"]
];

function icon(name) {
  return `<span data-lucide="${name}"></span>`;
}

function renderDashboard() {
  document.querySelector("#dashboard").innerHTML = `
    <div class="dashboard-hero">
      <div>
        <span class="eyebrow">Live Store Overview</span>
        <h1>Retail Command Center</h1>
        <p>Penjualan hari ini bergerak stabil. Pantau kasir, stok kritis, dan produk terlaris tanpa pindah layar.</p>
        <div class="hero-metrics">
          <span>${icon("clock-3")} Shift Pagi</span>
          <span>${icon("wifi")} Terminal Online</span>
          <span>${icon("users")} 38 Pelanggan</span>
        </div>
      </div>
      <div class="hero-revenue click-card" data-action="metric-detail" data-title="Target Harian" data-value="86%">
        <span>Target Harian</span>
        <strong>86%</strong>
        <small>Rp 24.5M dari Rp 28.5M</small>
      </div>
      <button class="btn" data-action="date-filter">${icon("calendar-days")} Hari Ini</button>
    </div>
    <div class="grid stats">
      ${stat("banknote", "+12.5%", "Total Penjualan", "Rp 24.5M", "Naik dari rata-rata Selasa lalu")}
      ${stat("receipt", "+5.2%", "Transaksi", "1,284", "Antrean kasir lancar, refund 1.8%")}
      ${stat("shopping-bag", "+3.1%", "Average Order", "Rp 19.0K", "Bundle pastry ikut mendorong AOV")}
    </div>
    <div class="grid dashboard-layout">
      <section class="card chart click-card" data-action="open-chart">
        <div class="section-title">
          <div><h2>Tren Penjualan Hari Ini</h2><p>Pendapatan per jam dibanding target shift.</p></div>
          <span class="badge gold">Live</span>
        </div>
        <div class="dashboard-chart">
          ${["08", "10", "12", "14", "16", "18"].map((hour, i) => `<div class="dash-bar" data-action="hour-detail" data-title="${hour}:00" data-value="${[32, 48, 78, 92, 70, 56][i]}%" style="--h:${[32, 48, 78, 92, 70, 56][i]}%"><span></span><em>${hour}:00</em></div>`).join("")}
          <svg viewBox="0 0 620 260" aria-hidden="true"><path d="M20 205 C86 188, 102 172, 154 176 S234 112, 302 126 S398 48, 472 72 S554 96, 600 64" /></svg>
        </div>
        <div class="dashboard-insights">
          <div><span>Jam terbaik</span><strong>14:00</strong></div>
          <div><span>Metode populer</span><strong>QRIS</strong></div>
          <div><span>Stok kritis</span><strong>3 SKU</strong></div>
        </div>
      </section>
      <section class="card list-card">
        <div class="section-title"><h2>Produk Terlaris</h2><span class="badge">Top 3</span></div>
        <div class="product-list">
          ${mini("coffee", "Caramel Macchiato", "142 terjual", "Rp 6.3M")}
          ${mini("croissant", "Butter Croissant", "98 terjual", "Rp 3.1M")}
          ${mini("sandwich", "Chicken Sandwich", "45 terjual", "Rp 2.7M")}
        </div>
        <button class="btn" data-page="products" style="width:100%;margin-top:28px">${icon("package-search")} Lihat Inventaris</button>
      </section>
    </div>
    <div class="grid dashboard-bottom">
      <section class="card activity-card">
        <div class="section-title"><h2>Aktivitas Terbaru</h2><span class="badge">Real-time</span></div>
        <div class="activity-list">
          <div data-action="transaction-detail" data-title="#TRX-8892" data-value="Rp 450.000">${icon("receipt")} <span>Transaksi #TRX-8892 selesai</span><strong>Rp 450.000</strong></div>
          <div data-action="inventory-detail" data-title="Butter Croissant" data-value="CRO-022">${icon("triangle-alert")} <span>Butter Croissant stok rendah</span><strong>3 item</strong></div>
          <div data-action="customer-detail" data-title="Budi Santoso" data-value="Gold">${icon("user-plus")} <span>Member baru ditambahkan</span><strong>Gold</strong></div>
        </div>
      </section>
      <section class="card stock-card">
        <div class="section-title"><h2>Stok Perlu Dicek</h2><span class="badge bronze">3 item</span></div>
        <div class="stock-list">
          <div><b>Mouse Nirkabel Pro</b><span>3 tersisa</span><i style="--w:18%"></i></div>
          <div><b>Butter Croissant</b><span>3 tersisa</span><i style="--w:18%"></i></div>
          <div><b>Cafe Latte Hot</b><span>28 tersisa</span><i style="--w:62%"></i></div>
        </div>
      </section>
    </div>`;
}

function stat(iconName, chip, label, value, note) {
  return `<section class="card stat-card click-card" data-action="metric-detail" data-title="${label}" data-value="${value}"><div class="stat-top"><div class="tile-icon">${icon(iconName)}</div><span class="chip">${chip}</span></div><div><div class="label">${label}</div><div class="big">${value}</div><p>${note}</p></div></section>`;
}

function mini(image, name, qty, sales) {
  return `<div class="mini-product" data-action="top-product" data-title="${name}" data-value="${sales}"><div class="thumb ${image}"></div><div><strong>${name}</strong><span>${qty}</span></div><b>${sales}</b></div>`;
}

function renderSales() {
  document.querySelector("#sales").innerHTML = `
    <div class="sales-command"><div><span class="eyebrow">Point of Sale</span><h1>Kasir Cepat</h1><p>Pilih produk, filter kategori, dan mulai transaksi baru.</p></div><button class="btn primary" data-action="checkout">${icon("shopping-cart")} Checkout</button></div>
    <div class="filters">${["Semua Kategori","Kopi Spesial","Minuman Dingin","Pastry & Roti","Makanan Utama"].map((x,i)=>`<button class="pill ${i===0?"active":""}" data-action="filter" data-filter="${x}">${x}</button>`).join("")}</div>
    <div class="grid catalog">${products.map(productCard).join("")}</div>`;
}

function productCard(p) {
  return `<article class="card product-card click-card" data-action="add-product" data-title="${p.name}" data-value="Rp ${rupiah.format(p.price)}"><div class="thumb ${p.image}"><span class="chip stock ${p.low ? "low" : ""}">${p.stock}</span></div><div class="product-info"><h3>${p.name}</h3><div class="price">Rp ${rupiah.format(p.price)}</div></div></article>`;
}

function renderProducts() {
  document.querySelector("#products").innerHTML = `
    <div class="page-head"><div><span class="eyebrow">Inventory Control</span><h1>Inventaris Produk</h1><p>Kelola stok, harga, dan informasi barang Anda.</p></div><div><div class="search compact-search">${icon("search")}<input placeholder="Cari produk atau SKU..." /></div><button class="btn primary" data-action="add-inventory" style="width:100%;margin-top:16px">${icon("plus")} Tambah Produk Baru</button></div></div>
    <section class="card table-card product-table">
      <table>
        <thead>
          <tr><th>Produk</th><th>SKU</th><th>Kategori</th><th>Harga</th><th>Stok</th><th>Aksi</th></tr>
        </thead>
        <tbody>
          ${inventory.map(productRow).join("")}
        </tbody>
      </table>
    </section>`;
}

function productRow(p, index) {
  return `<tr class="click-row" data-action="inventory-detail" data-title="${escapeHtml(p.name)}" data-value="${escapeHtml(p.sku)}">
    <td><div class="table-product"><div class="thumb ${p.image}"></div><div><strong>${escapeHtml(p.name)}</strong><span>${escapeHtml(p.category)}</span></div></div></td>
    <td>${escapeHtml(p.sku)}</td>
    <td><span class="category">${escapeHtml(p.category)}</span></td>
    <td><strong>Rp ${rupiah.format(p.price)}</strong></td>
    <td><span class="badge ${p.low ? "bronze" : ""}">${escapeHtml(p.stock)}</span></td>
    <td><button class="icon-btn mini-action danger-action" data-action="delete-inventory" data-index="${index}" aria-label="Hapus ${escapeHtml(p.name)}">${icon("trash-2")}</button></td>
  </tr>`;
}

function renderCustomers() {
  document.querySelector("#customers").innerHTML = `
    <div class="page-head"><div><span class="eyebrow">Customer Hub</span><h1>Customers</h1><p>Manage your customer relationships</p></div><div class="search compact-search">${icon("search")}<input placeholder="Search customers..." /></div></div>
    <div class="card panel-toolbar"><div><button class="pill" data-action="status-filter">Status</button> <button class="pill" data-action="sort-list">Sort ${icon("list-filter")}</button></div><button class="btn primary" data-action="add-customer">${icon("user-plus")} Tambah Pelanggan</button></div>
    ${customerTable()}`;
}

function customerTable() {
  return `<section class="card table-card"><table><thead><tr><th>Nama Pelanggan</th><th>Kontak</th><th>Total Transaksi</th><th>Status Member</th><th>Aksi</th></tr></thead><tbody>${customers.map(c => `<tr class="click-row" data-action="customer-detail" data-title="${c[0]}" data-value="${c[3]}"><td><strong>${c[0]}</strong></td><td>${c[1]}<br><span style="color:var(--muted)">${c[2]}</span></td><td><strong>${c[3]}</strong></td><td><span class="badge ${c[4].toLowerCase()}">${c[4]}</span></td><td><button class="icon-btn mini-action" data-action="row-menu">${icon("more-horizontal")}</button></td></tr>`).join("")}</tbody></table></section>`;
}

function renderReports() {
  document.querySelector("#reports").innerHTML = `
    <div class="report-hero">
      <div>
        <span class="eyebrow">Financial Command Center</span>
        <h1>Laporan Keuangan & Analitik</h1>
        <p>Pantau revenue, margin, kategori, dan jam ramai dalam satu layar.</p>
      </div>
      <div class="hero-actions">
        <button class="btn" data-action="period-filter">${icon("calendar")} Bulan Ini</button>
        <a class="btn primary" href="api/export?type=reports">${icon("download")} Ekspor Excel</a>
      </div>
      <div class="hero-insight click-card" data-action="growth-detail" data-title="Net Growth" data-value="+18.7%">
        <span>Net Growth</span>
        <strong>+18.7%</strong>
        <small>Revenue naik stabil, margin perlu dijaga di weekend.</small>
      </div>
    </div>

    <div class="grid report-grid">
      ${reportMetric("wallet", "Total Pendapatan", "Rp 142.5M", "+12.5%", "Target 86% tercapai")}
      ${reportMetric("trending-up", "Laba Kotor", "Rp 84.2M", "+8.2%", "Margin 59.1%")}
      ${reportMetric("activity", "Laba Bersih", "Rp 56.8M", "-2.1%", "Biaya operasional naik")}
      ${reportMetric("receipt", "Total Transaksi", "4,829", "Stabil", "AOV Rp 29.5K")}
    </div>

    <div class="grid report-main">
      <section class="card revenue-card click-card" data-action="chart-detail" data-title="Tren Pendapatan" data-value="6 bulan">
        <div class="section-title">
          <div><h2>Tren Pendapatan</h2><p>Perbandingan pendapatan dan laba bersih 6 bulan terakhir.</p></div>
          <span class="badge gold">Live</span>
        </div>
        <div class="modern-chart">
          ${["Jan","Feb","Mar","Apr","Mei","Jun"].map((m, i) => `<div class="bar-group" data-action="month-detail" data-title="${m}" data-value="${[38,46,68,88,78,92][i]}%" style="--h:${[38,46,68,88,78,92][i]}%;--p:${[28,34,48,62,58,70][i]}%"><span></span><i></i><em>${m}</em></div>`).join("")}
          <svg viewBox="0 0 640 260" aria-hidden="true">
            <path d="M20 205 C90 190, 110 180, 160 168 S250 95, 310 112 S410 58, 480 78 S570 40, 620 54" />
          </svg>
        </div>
        <div class="report-table mini-table">
          <div><span>Channel terbaik</span><strong>POS Terminal</strong></div>
          <div><span>Jam tersibuk</span><strong>12:00 - 14:00</strong></div>
          <div><span>Refund rate</span><strong>1.8%</strong></div>
        </div>
      </section>

      <aside class="card category-card click-card" data-action="category-detail" data-title="Kategori Terlaris" data-value="Makanan 45%">
        <div class="section-title"><h2>Kategori Terlaris</h2></div>
        <div class="donut modern"><span>45%<small>Makanan</small></span></div>
        <div class="category-row" data-action="category-row" data-title="Makanan Utama" data-value="45%"><b>Makanan Utama</b><span>45%</span><i style="--w:45%"></i></div>
        <div class="category-row" data-action="category-row" data-title="Minuman" data-value="30%"><b>Minuman</b><span>30%</span><i style="--w:30%"></i></div>
        <div class="category-row" data-action="category-row" data-title="Dessert" data-value="15%"><b>Dessert</b><span>15%</span><i style="--w:15%"></i></div>
        <div class="category-row" data-action="category-row" data-title="Lainnya" data-value="10%"><b>Lainnya</b><span>10%</span><i style="--w:10%"></i></div>
      </aside>
    </div>

    <div class="grid report-bottom">
      <section class="card insight-card">
        <h2>Insight Operasional</h2>
        <div class="insight-list">
          <div data-action="insight-detail" data-title="Minuman dingin" data-value="+21%">${icon("arrow-up-right")} Produk minuman dingin naik 21% setelah jam 15:00.</div>
          <div data-action="insight-detail" data-title="Promo bundle" data-value="Rp 18.4M">${icon("badge-percent")} Promo bundle memberi kontribusi Rp 18.4M.</div>
          <div data-action="insight-detail" data-title="Biaya pastry" data-value="+6.8%">${icon("triangle-alert")} Biaya bahan pastry naik 6.8% bulan ini.</div>
        </div>
      </section>
      <section class="card table-card compact-performance">
        <table>
          <thead><tr><th>Cabang</th><th>Pendapatan</th><th>Margin</th><th>Status</th></tr></thead>
          <tbody>
            <tr class="click-row" data-action="branch-detail" data-title="Main Branch" data-value="Rp 72.4M"><td>Main Branch</td><td>Rp 72.4M</td><td>61%</td><td><span class="badge gold">Top</span></td></tr>
            <tr class="click-row" data-action="branch-detail" data-title="North Kiosk" data-value="Rp 38.8M"><td>North Kiosk</td><td>Rp 38.8M</td><td>55%</td><td><span class="badge">Normal</span></td></tr>
            <tr class="click-row" data-action="branch-detail" data-title="West Booth" data-value="Rp 31.3M"><td>West Booth</td><td>Rp 31.3M</td><td>49%</td><td><span class="badge bronze">Review</span></td></tr>
          </tbody>
        </table>
      </section>
    </div>`;
}

function reportMetric(iconName, label, value, trend, note) {
  return `<section class="card stat-card report-metric click-card" data-action="metric-detail" data-title="${label}" data-value="${value}"><div class="stat-top"><div class="tile-icon">${icon(iconName)}</div><span class="chip">${trend}</span></div><div><div class="label">${label}</div><div class="big">${value}</div><p>${note}</p></div></section>`;
}

function renderSuppliers() {
  const suppliers = [["PT. Sumber Pangan Segar","Sayuran & Buah","2 PO OTW","Rp 12.500.000"],["Global Beverage Indo","Minuman Kemasan","Selesai","Lunas"],["Bakti Daging Sentosa","Daging Olahan","Terlambat","Rp 8.200.000"]];
  document.querySelector("#suppliers").innerHTML = `
    <div class="page-head"><div><span class="eyebrow">Inventory Network</span><h1>Manajemen Supplier</h1><p>Kelola pemasok, PO, dan hutang usaha secara proaktif.</p></div><button class="btn primary" data-action="new-po">${icon("shopping-cart")} Buat PO Baru</button></div>
    <div class="grid stats">${stat("truck", "+2 bulan ini", "Total Pemasok Aktif", "24")}${stat("hourglass", "3 menunggu pengiriman", "PO Sedang Berjalan", "8")}${stat("wallet-cards", "Jatuh tempo minggu ini: Rp 12M", "Total Hutang Usaha", "Rp 45.2M")}</div>
    <h2 style="margin-top:42px">Daftar Pemasok Utama</h2><div class="grid supplier-grid">${suppliers.map(s => `<article class="card supplier-card click-card" data-action="supplier-detail" data-title="${s[0]}" data-value="${s[3]}"><h2>${s[0]}</h2><p>${s[1]}</p><div class="supplier-meta"><div data-action="shipment-detail">Status Pengiriman<br><strong>${s[2]}</strong></div><div data-action="debt-detail">Hutang Usaha<br><strong>${s[3]}</strong></div></div><div class="supplier-actions"><button class="btn" data-action="supplier-detail" data-title="${s[0]}" data-value="${s[3]}">Detail</button><button class="btn primary" data-action="order-stock" data-title="${s[0]}">Pesan Stok</button></div></article>`).join("")}</div>`;
}

function renderTransactions() {
  document.querySelector("#transactions").innerHTML = `
    <div class="page-head"><div><h1>Riwayat Transaksi</h1><p>Kelola dan pantau semua transaksi penjualan masa lalu.</p></div><a class="btn" href="api/export?type=transactions">${icon("download")} Unduh Excel</a></div>
    <div class="card panel-toolbar"><div class="search compact-search">${icon("search")}<input placeholder="ID Transaksi atau Nama" /></div><button class="pill" data-action="status-filter">Semua Status ${icon("chevron-down")}</button></div>
    <section class="card table-card"><table><thead><tr><th>ID Transaksi</th><th>Waktu</th><th>Pelanggan</th><th>Total</th><th>Status</th><th>Aksi</th></tr></thead><tbody>${tx.map(r => `<tr class="click-row" data-action="transaction-detail" data-title="${r[0]}" data-value="${r[3]}"><td><strong>${r[0]}</strong></td><td>${r[1]}</td><td>${r[2]}</td><td><strong>${r[3]}</strong></td><td><span class="badge">${r[4]}</span></td><td><button class="icon-btn mini-action" data-action="row-menu">${icon("more-horizontal")}</button></td></tr>`).join("")}</tbody></table></section>`;
}

function renderSettings() {
  document.querySelector("#settings").innerHTML = `<div class="page-head"><div><span class="eyebrow">Terminal Preferences</span><h1>Settings</h1><p>Configure terminal preferences and account behavior.</p></div></div><section class="card settings-card">${["Dark terminal mode","Inventory alerts","Daily report emails","Receipt auto-print"].map(x => `<div class="setting-row" data-action="toggle-setting" data-title="${x}"><strong>${x}</strong><span class="toggle"></span></div>`).join("")}</section>`;
}

function activate(page) {
  document.querySelectorAll(".page").forEach(el => el.classList.toggle("active", el.id === page));
  document.querySelectorAll(".nav-item[data-page]").forEach(el => el.classList.toggle("active", el.dataset.page === page));
  document.querySelector("#globalSearch").placeholder = page === "sales" ? "Cari produk (SKU, Nama)..." : page === "customers" ? "Search customers..." : page === "suppliers" ? "Search suppliers..." : "Search...";
  window.scrollTo({ top: 0, behavior: "smooth" });
  refreshIcons();
}

[renderDashboard, renderSales, renderProducts, renderCustomers, renderReports, renderSuppliers, renderTransactions, renderSettings].forEach(fn => fn());
document.addEventListener("click", handleClick);
document.addEventListener("submit", handleSubmit);
document.querySelector("#globalSearch").addEventListener("keydown", event => {
  if (event.key === "Enter") {
    toast(`Mencari: ${event.currentTarget.value || "semua data"}`);
  }
});
refreshIcons();

function handleClick(event) {
  const pageTarget = event.target.closest("[data-page]");
  if (pageTarget) {
    activate(pageTarget.dataset.page);
    return;
  }

  const actionTarget = event.target.closest("[data-action]");
  if (!actionTarget) return;

  const action = actionTarget.dataset.action;
  if (action === "close-modal") return closeModal();
  if (action === "confirm-modal") return confirmModal();
  if (action === "add-inventory") return openProductForm();

  if (action === "delete-inventory") {
    event.stopPropagation();
    const index = Number(actionTarget.dataset.index);
    const product = inventory[index];
    if (!product) return;
    inventory.splice(index, 1);
    renderProducts();
    refreshIcons();
    return toast(`${product.name} dihapus`);
  }

  if (action === "filter") {
    actionTarget.closest(".filters").querySelectorAll(".pill").forEach(item => item.classList.remove("active"));
    actionTarget.classList.add("active");
    return toast(`Filter aktif: ${actionTarget.dataset.filter}`);
  }

  if (action === "toggle-setting") {
    actionTarget.classList.toggle("enabled");
    return toast(`${actionTarget.dataset.title} ${actionTarget.classList.contains("enabled") ? "aktif" : "nonaktif"}`);
  }

  if (action === "notifications") {
    return openModal("Notifikasi", "Terminal Update", [
      ["Stok rendah", "Butter Croissant tersisa 3 item."],
      ["Laporan siap", "Export laporan bulan ini sudah tersedia."],
      ["Shift aktif", "Shift Pagi berjalan normal."]
    ]);
  }

  if (action === "help" || action === "support") {
    return openModal("Bantuan", "Support Center", [
      ["Status sistem", "Semua layanan berjalan normal."],
      ["Kontak support", "Tim support siap membantu operasional terminal."],
      ["Dokumentasi", "Panduan kasir, inventory, report, dan supplier tersedia."]
    ]);
  }

  if (action === "profile") {
    return openModal("Profil", "Admin Terminal", [
      ["Role", "Store Manager"],
      ["Cabang", "Main Branch"],
      ["Shift", "Pagi"]
    ]);
  }

  if (action === "logout") {
    return openModal("Session", "Logout", [["Konfirmasi", "Simulasi logout. Integrasi auth bisa disambungkan ke backend."]]);
  }

  const title = actionTarget.dataset.title || readableAction(action);
  const value = actionTarget.dataset.value || "Siap diproses";
  if (action === "inventory-detail") {
    const product = inventory.find(item => item.sku === value);
    if (product) {
      return openModal("Detail Produk", product.name, [
        ["SKU", product.sku],
        ["Kategori", product.category],
        ["Harga", `Rp ${rupiah.format(product.price)}`],
        ["Stok", product.stock]
      ]);
    }
  }

  const detailMap = {
    "add-product": [["Produk", title], ["Harga", value], ["Status", "Ditambahkan ke keranjang simulasi."]],
    "checkout": [["Keranjang", "3 item aktif"], ["Estimasi total", "Rp 102.000"], ["Status", "Siap pembayaran."]],
    "add-customer": [["Form", "Tambah pelanggan"], ["Field", "Nama, kontak, member status"], ["Status", "Customer baru bisa dibuat."]],
    "new-po": [["Purchase Order", "PO baru"], ["Supplier", "Pilih pemasok"], ["Status", "Draft PO dibuat."]],
    "order-stock": [["Supplier", title], ["Aksi", "Pesan stok"], ["Status", "Draft order disiapkan."]],
    "date-filter": [["Periode", "Hari ini"], ["Opsi", "Hari ini, 7 hari, 30 hari"], ["Status", "Filter tanggal aktif."]],
    "period-filter": [["Periode", "Bulan ini"], ["Data", "Pendapatan, laba, transaksi"], ["Status", "Report diperbarui."]],
    "row-menu": [["Aksi cepat", "Detail, edit, export"], ["Status", "Menu row aktif."]],
    "status-filter": [["Filter", "Semua status"], ["Opsi", "Selesai, Pending, Dibatalkan"], ["Status", "Filter bisa dipilih."]],
    "sort-list": [["Urutkan", "Terbaru, terbesar, A-Z"], ["Status", "Sorting aktif."]]
  };

  openModal(readableAction(action), title, detailMap[action] || [["Nilai", value], ["Aksi", readableAction(action)], ["Status", "Elemen ini sudah interaktif."]]);
}

function handleSubmit(event) {
  if (event.target.id !== "productForm") return;
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
  const name = String(formData.get("name") || "").trim();
  const sku = String(formData.get("sku") || "").trim();
  const category = String(formData.get("category") || "").trim();
  const price = Number(String(formData.get("price") || "0").replace(/\D/g, ""));
  const stockCount = Number(String(formData.get("stock") || "0").replace(/\D/g, ""));

  if (!name || !sku || !category || !price) {
    return toast("Nama, SKU, kategori, dan harga wajib diisi");
  }

  inventory.unshift({
    name,
    sku,
    category,
    price,
    stock: `Stok: ${stockCount || 0}${stockCount <= 5 ? " (Rendah)" : ""}`,
    image: "muted-box",
    low: stockCount <= 5,
  });

  renderProducts();
  closeModal();
  refreshIcons();
  toast(`${name} ditambahkan`);
}

function openProductForm() {
  document.querySelector("#modalKicker").textContent = "Inventory";
  document.querySelector("#modalTitle").textContent = "Tambah Produk Baru";
  document.querySelector("#modalBody").innerHTML = `
    <form id="productForm" class="product-form">
      <label>Nama Produk<input name="name" required placeholder="Contoh: Kopi Susu Aren" /></label>
      <label>SKU<input name="sku" required placeholder="INV-001" /></label>
      <label>Kategori<input name="category" required placeholder="Minuman" /></label>
      <div class="form-grid">
        <label>Harga<input name="price" required inputmode="numeric" placeholder="45000" /></label>
        <label>Stok<input name="stock" inputmode="numeric" placeholder="12" /></label>
      </div>
    </form>`;
  document.querySelector(".modal-actions").innerHTML = `
    <button class="btn" data-action="close-modal">Batal</button>
    <button class="btn primary" type="submit" form="productForm">${icon("plus")} Tambah</button>`;
  document.querySelector("#modalBackdrop").classList.add("show");
  document.querySelector("#modalBackdrop").setAttribute("aria-hidden", "false");
  refreshIcons();
}

function openModal(kicker, title, rows) {
  document.querySelector("#modalKicker").textContent = kicker;
  document.querySelector("#modalTitle").textContent = title;
  document.querySelector("#modalBody").innerHTML = `<div class="detail-grid">${rows.map(([key, value]) => `<div><span>${key}</span><strong>${value}</strong></div>`).join("")}</div>`;
  document.querySelector(".modal-actions").innerHTML = `
    <button class="btn" data-action="close-modal">Tutup</button>
    <button class="btn primary" data-action="confirm-modal">Lanjutkan</button>`;
  document.querySelector("#modalBackdrop").classList.add("show");
  document.querySelector("#modalBackdrop").setAttribute("aria-hidden", "false");
  refreshIcons();
}

function closeModal() {
  document.querySelector("#modalBackdrop").classList.remove("show");
  document.querySelector("#modalBackdrop").setAttribute("aria-hidden", "true");
}

function confirmModal() {
  closeModal();
  toast("Aksi diproses");
}

function toast(message) {
  const toastEl = document.querySelector("#toast");
  toastEl.textContent = message;
  toastEl.classList.add("show");
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => toastEl.classList.remove("show"), 2200);
}

function readableAction(action) {
  return action.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[char]));
}

function refreshIcons() {
  if (window.lucide) {
    lucide.createIcons({ attrs: { "stroke-width": 2.2 } });
  }
}
