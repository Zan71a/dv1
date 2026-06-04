# Deploy ke Vercel

Project ini siap dideploy sebagai static site dengan Vercel Serverless Function
untuk export CSV.

## Via GitHub

1. Push folder ini ke repository GitHub.
2. Buka https://vercel.com/new.
3. Import repository.
4. Framework Preset: `Other`.
5. Build Command: kosongkan.
6. Output Directory: kosongkan.
7. Klik Deploy.

## Via Vercel CLI

```bash
npm i -g vercel
vercel login
vercel
vercel --prod
```

## Catatan

- Halaman utama memakai `index.html`, `styles.css`, `app.js`, dan `dashboard.png`.
- Endpoint export Vercel ada di `api/export.js`.
- Link export sekarang memakai `/api/export?type=reports` dan
  `/api/export?type=transactions`.
- File `api/export.php` hanya untuk XAMPP/local PHP lama. Vercel memakai
  `api/export.js`.
