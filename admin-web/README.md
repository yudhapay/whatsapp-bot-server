# WhatsApp Template Admin

Admin panel untuk mengelola template dokumen WhatsApp dengan React + Vite + TailwindCSS + Supabase.

## 🚀 Fitur

- ✅ Login admin dengan Supabase Auth
- ✅ Upload template dokumen (Word, PDF, Excel)
- ✅ Daftar dan kelola template
- ✅ Download template
- ✅ Hapus template
- ✅ Drag & drop file upload
- ✅ Responsive design dengan TailwindCSS
- ✅ Notifikasi real-time dengan react-hot-toast

## 📋 Prerequisites

- Node.js 18+
- npm atau yarn
- Akun Supabase
- Akun Vercel (untuk deployment)

## 🛠️ Installation

1. **Clone repository**
```bash
git clone <repository-url>
cd admin-web
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**
```bash
cp .env.example .env
```

Edit file `.env` dengan konfigurasi Supabase:
```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# App Configuration
VITE_APP_NAME=WhatsApp Template Admin
VITE_APP_VERSION=1.0.0
```

4. **Setup Supabase**
   - Buat project baru di Supabase
   - Enable Authentication
   - Buat bucket `templates` di Storage
   - Set policy untuk bucket `templates`

## 🚀 Running

### Development
```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:5173`

### Build untuk Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 🔧 Supabase Setup

### 1. Buat Project Supabase
1. Kunjungi [supabase.com](https://supabase.com)
2. Buat project baru
3. Catat URL dan anon key

### 2. Setup Authentication
1. Go to Authentication > Settings
2. Enable email authentication
3. Buat user admin baru

### 3. Setup Storage
1. Go to Storage
2. Buat bucket baru dengan nama `templates`
3. Set policy untuk bucket:

```sql
-- Policy untuk upload file
CREATE POLICY "Allow authenticated users to upload templates" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'templates' AND auth.role() = 'authenticated');

-- Policy untuk read file
CREATE POLICY "Allow authenticated users to read templates" ON storage.objects
FOR SELECT USING (bucket_id = 'templates' AND auth.role() = 'authenticated');

-- Policy untuk delete file
CREATE POLICY "Allow authenticated users to delete templates" ON storage.objects
FOR DELETE USING (bucket_id = 'templates' AND auth.role() = 'authenticated');
```

## 🚀 Deployment ke Vercel

### 1. Push ke GitHub
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. Connect ke Vercel
1. Kunjungi [vercel.com](https://vercel.com)
2. Import project dari GitHub
3. Set environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_APP_NAME`
   - `VITE_APP_VERSION`

### 3. Deploy
Vercel akan otomatis build dan deploy aplikasi.

## 📱 Cara Penggunaan

### Login
1. Buka aplikasi admin
2. Login dengan email dan password yang sudah didaftarkan di Supabase
3. Setelah login, Anda akan diarahkan ke dashboard

### Upload Template
1. Klik tab "Upload Template"
2. Drag & drop file template atau klik "Pilih File"
3. File yang didukung: .docx, .doc, .pdf, .xlsx, .xls
4. Maksimal ukuran: 10MB
5. Klik "Upload Template"

### Kelola Template
1. Klik tab "Daftar Template"
2. Lihat semua template yang sudah diupload
3. Download template dengan klik ikon download
4. Hapus template dengan klik ikon trash

## 🗂️ Struktur Proyek

```
admin-web/
├── src/
│   ├── components/
│   │   ├── Login.jsx
│   │   ├── Dashboard.jsx
│   │   ├── TemplateUpload.jsx
│   │   └── TemplateList.jsx
│   ├── contexts/
│   │   └── AuthContext.jsx
│   ├── lib/
│   │   └── supabase.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
├── .env.example
└── README.md
```

## 🎨 Styling

Aplikasi menggunakan TailwindCSS dengan custom color scheme:
- Primary: Blue (#3b82f6)
- Secondary: Gray
- Success: Green
- Error: Red

## 🔍 Troubleshooting

### Login gagal
1. Pastikan email dan password sudah didaftarkan di Supabase
2. Cek environment variables `VITE_SUPABASE_URL` dan `VITE_SUPABASE_ANON_KEY`
3. Pastikan Authentication sudah dienable di Supabase

### Upload gagal
1. Pastikan bucket `templates` sudah dibuat di Supabase Storage
2. Cek policy untuk bucket `templates`
3. Pastikan file format dan ukuran sesuai ketentuan

### Build gagal
1. Pastikan semua dependencies sudah terinstall
2. Cek environment variables
3. Pastikan tidak ada error di console

## 📞 Support

Jika ada masalah:
1. Cek console browser untuk error
2. Cek Supabase dashboard untuk logs
3. Pastikan environment variables sudah benar
4. Pastikan internet connection stabil