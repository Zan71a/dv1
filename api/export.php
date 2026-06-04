<?php
declare(strict_types=1);

$exports = [
    'transactions' => [
        'filename' => 'riwayat-transaksi.csv',
        'headers' => ['ID Transaksi', 'Waktu', 'Pelanggan', 'Total', 'Status'],
        'rows' => [
            ['#TRX-8892', '25 Okt 2023, 14:30', 'Budi Santoso', 'Rp 450.000', 'Selesai'],
            ['#TRX-8891', '25 Okt 2023, 13:15', 'Siti Aminah', 'Rp 125.500', 'Pending'],
            ['#TRX-8890', '25 Okt 2023, 11:45', 'Andi Pratama', 'Rp 2.100.000', 'Selesai'],
            ['#TRX-8889', '25 Okt 2023, 09:20', 'Pelanggan Umum', 'Rp 85.000', 'Dibatalkan'],
            ['#TRX-8888', '24 Okt 2023, 18:05', 'Diana Putri', 'Rp 340.000', 'Selesai'],
        ],
    ],
    'products' => [
        'filename' => 'inventaris-produk.csv',
        'headers' => ['Nama Produk', 'SKU', 'Kategori', 'Harga', 'Stok'],
        'rows' => [
            ['Kemeja Kerja Premium', 'CLO-092', 'Pakaian', 'Rp 250.000', '45'],
            ['Mouse Nirkabel Pro', 'ELK-104', 'Elektronik', 'Rp 450.000', '3'],
            ['Botol Minum Steel', 'ACC-055', 'Aksesoris', 'Rp 120.000', '120'],
            ['Caramel Macchiato', 'FNB-001', 'Kopi Spesial', 'Rp 45.000', '99+'],
            ['Butter Croissant', 'FNB-003', 'Pastry & Roti', 'Rp 32.000', '3'],
        ],
    ],
    'customers' => [
        'filename' => 'data-pelanggan.csv',
        'headers' => ['Nama Pelanggan', 'Email', 'Telepon', 'Total Transaksi', 'Status Member'],
        'rows' => [
            ['Alex Wijaya', 'alex.w@email.com', '+62 812 3456 7890', 'Rp 12.450.000', 'Gold'],
            ['Budi Santoso', 'budi.s@email.com', '+62 813 4567 8901', 'Rp 5.200.000', 'Silver'],
            ['Citra Dewi', 'citra.d@email.com', '+62 856 7890 1234', 'Rp 1.150.000', 'Bronze'],
            ['Dian Pratama', 'dian.p@email.com', '+62 811 2233 4455', 'Rp 8.900.000', 'Silver'],
        ],
    ],
    'reports' => [
        'filename' => 'laporan-keuangan.csv',
        'headers' => ['Metrik', 'Nilai', 'Perubahan'],
        'rows' => [
            ['Total Pendapatan', 'Rp 142.5M', '+12.5% vs bulan lalu'],
            ['Laba Kotor', 'Rp 84.2M', '+8.2% vs bulan lalu'],
            ['Laba Bersih', 'Rp 56.8M', '-2.1% vs bulan lalu'],
            ['Total Transaksi', '4,829', 'Stabil'],
        ],
    ],
];

$type = strtolower($_GET['type'] ?? 'transactions');

if (!isset($exports[$type])) {
    http_response_code(400);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode([
        'error' => 'Invalid export type',
        'available_types' => array_keys($exports),
    ]);
    exit;
}

$export = $exports[$type];

header('Content-Type: text/csv; charset=utf-8');
header('Content-Disposition: attachment; filename="' . $export['filename'] . '"');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');

$output = fopen('php://output', 'w');

// UTF-8 BOM helps Microsoft Excel detect Indonesian text and currency symbols correctly.
fprintf($output, chr(0xEF) . chr(0xBB) . chr(0xBF));
fputcsv($output, $export['headers'], ';');

foreach ($export['rows'] as $row) {
    fputcsv($output, $row, ';');
}

fclose($output);
