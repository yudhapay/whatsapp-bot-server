# WhatsApp Template Bot System

Sistem end-to-end untuk chatbot WhatsApp dengan template dokumen otomatis dan web admin.

## 🎯 Overview

Sistem ini terdiri dari 3 komponen utama:
1. **Bot Server** (Node.js + Express) - Menangani webhook WhatsApp dan generate dokumen
2. **Admin Web** (React + Vite + TailwindCSS) - Interface untuk mengelola template
3. **Supabase** - Database dan storage untuk template

## 🚀 Fitur Utama

### Bot Server
- ✅ Webhook endpoint untuk WhatsApp Go API
- ✅ Parsing pesan user otomatis
- ✅ Template dokumen dari Supabase Storage
- ✅ Generate dokumen Word (.docx) dengan data dinamis
- ✅ Kirim dokumen langsung ke WhatsApp
- ✅ Error handling dan logging lengkap
- ✅ PM2 untuk production deployment

### Admin Web
- ✅ Login admin dengan Supabase Auth
- ✅ Upload template dokumen (Word, PDF, Excel)
- ✅ Daftar dan kelola template
- ✅ Download dan hapus template
- ✅ Drag & drop file upload
- ✅ Responsive design dengan TailwindCSS
- ✅ Notifikasi real-time

## 📋 Prerequisites

- Node.js 18+
- npm atau yarn
- Akun WhatsApp Go API
- Akun Supabase
- Akun Render (untuk bot server)
- Akun Vercel (untuk admin web)

## 🛠️ Quick Start

### 1. Clone Repository
```bash
git clone <repository-url>
cd whatsapp-template-bot
```

### 2. Setup Bot Server
```bash
cd bot-server
npm install
cp .env.example .env
# Edit .env dengan konfigurasi WhatsApp Go dan Supabase
npm run dev
```

### 3. Setup Admin Web
```bash
cd admin-web
npm install
cp .env.example .env
# Edit .env dengan konfigurasi Supabase
npm run dev
```

### 4. Setup Supabase
1. Buat project baru di Supabase
2. Enable Authentication
3. Buat bucket `templates` di Storage
4. Set policy untuk bucket `templates`

## 🔧 Konfigurasi

### Environment Variables

#### Bot Server (.env)
```env
# WhatsApp Go API
WHATSAPP_API_URL=https://api.whatsapp-go.com
WHATSAPP_API_KEY=your_api_key
WHATSAPP_WEBHOOK_TOKEN=your_webhook_token

# Supabase
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Server
PORT=3000
NODE_ENV=development
```

#### Admin Web (.env)
```env
# Supabase
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key

# App
VITE_APP_NAME=WhatsApp Template Admin
```

## 📱 Cara Penggunaan

### User WhatsApp
Kirim pesan dengan format:
```
buat [nama_template] untuk [nama] di [lokasi] [tanggal]
```

**Contoh:**
```
buat surat undangan untuk Andi di Jakarta 8 September 2024
```

### Admin Web
1. Buka admin web
2. Login dengan akun Supabase
3. Upload template baru
4. Kelola template yang ada

## 🚀 Deployment

### Bot Server ke Render
1. Push ke GitHub
2. Connect ke Render
3. Set environment variables
4. Deploy

### Admin Web ke Vercel
1. Push ke GitHub
2. Connect ke Vercel
3. Set environment variables
4. Deploy

## 🗂️ Struktur Proyek

```
whatsapp-template-bot/
├── bot-server/                 # Node.js Bot Server
│   ├── src/
│   │   ├── controllers/        # Webhook controller
│   │   ├── routes/            # API routes
│   │   ├── services/          # Business logic
│   │   ├── middleware/        # Middleware
│   │   ├── utils/             # Utilities
│   │   └── server.js          # Main server file
│   ├── package.json
│   ├── ecosystem.config.js    # PM2 config
│   └── README.md
├── admin-web/                 # React Admin Panel
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── contexts/          # React contexts
│   │   ├── lib/               # Utilities
│   │   └── App.jsx            # Main app
│   ├── package.json
│   └── README.md
└── README.md                  # This file
```

## 🔄 Arsitektur Sistem

```
User WhatsApp → WhatsApp Go API → Webhook Server → Supabase Storage
                     ↓
              Generate Document → Send to User

Admin Web → Supabase Auth → Upload Template → Supabase Storage
```

## 📝 Template Format

Template harus menggunakan placeholder:
- `[NAMA]` atau `{{NAMA}}` - Nama penerima
- `[LOKASI]` atau `{{LOKASI}}` - Lokasi acara
- `[TANGGAL]` atau `{{TANGGAL}}` - Tanggal acara

## 🐛 Troubleshooting

### Bot tidak merespon
1. Cek webhook URL di WhatsApp Go dashboard
2. Cek logs di folder `bot-server/logs/`
3. Pastikan environment variables sudah benar

### Template tidak ditemukan
1. Pastikan template sudah diupload via admin web
2. Cek nama template sesuai dengan yang diminta user
3. Pastikan file berekstensi `.docx`

### Admin web tidak bisa login
1. Pastikan user sudah didaftarkan di Supabase
2. Cek environment variables Supabase
3. Pastikan Authentication sudah dienable

## 📞 Support

Jika ada masalah:
1. Cek logs di `bot-server/logs/`
2. Cek console browser untuk admin web
3. Cek Supabase dashboard untuk logs
4. Pastikan semua environment variables sudah benar

## 📄 License

MIT License - lihat file LICENSE untuk detail.

## 🤝 Contributing

1. Fork repository
2. Buat feature branch
3. Commit changes
4. Push ke branch
5. Buat Pull Request

## 📧 Contact

Untuk pertanyaan atau dukungan, silakan buat issue di repository ini.

